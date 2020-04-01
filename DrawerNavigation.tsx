import React, { useState } from 'react';
import 'react-native-gesture-handler';
import {createDrawerNavigator,DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import {SwipeListView} from 'react-native-swipe-list-view'
import {View, StyleSheet,  TouchableOpacity, TouchableHighlight} from 'react-native'

import { Content, ListItem, Text,List, Left, Right, Button, Icon, CheckBox, Body } from 'native-base'

// screens
import Todo from './screens/Todo';

// redux
import {useDispatch,useSelector} from 'react-redux'
import {selectedCategory, setCategory} from './modules/category/actions'
import { RootState } from './modules';

import ICategory from './interfaces/ICategory'
import { useNavigation } from '@react-navigation/native';


const Drawer = createDrawerNavigator();

function CustomDrawerContent(props)
{
  // to display categories on panel
  const categories:ICategory[] = useSelector((state:RootState)=>state.category.categories);
  // to set selected category's background
  const selectedCategoryId:number = useSelector((state:RootState)=>state.category.categoryId)
  const dispatch = useDispatch()
  const navigation = useNavigation();

  const [update,setUpdate] = useState(0) // force update

  React.useEffect(()=>{
    console.log("category changes")
  },[update])

  const addCategory = () =>{
    navigation.navigate('EditCategory',{categoryId:-1})
  }

  const selectCategory = (id:number) =>{
      console.log(id)
      dispatch(selectedCategory(id))
      props.navigation.closeDrawer()
  }

  const checkCategory = (id:number)=>{
    var category = categories.find(c=>c.id === id)
    category.checked = category.checked == 0 ? 1 : 0
    dispatch(setCategory(category))

    setUpdate(update+1);// force update
  }

  return (
    <DrawerContentScrollView {...props}>
      <List>
        <ListItem itemDivider>
          <Left>
            <Text>Category</Text>
          </Left>
          <Right>
            <Button transparent onPress={()=>addCategory()}>
              <Icon name="add" />
            </Button>
          </Right>
        </ListItem>
        <ListItem noIndent onPress={() => selectCategory(0)}>
          <Icon name="ios-list" />
          <Body>
            <Text>All</Text>
          </Body>
        </ListItem>
        { 
          categories.map((v,i)=>{
            return (
              <ListItem key={i} onPress={() => selectCategory(v.id)}>
                <CheckBox checked={v.checked === 1} onPress={()=>checkCategory(v.id)}/>
                <Body>
                  <Text>{v.categoryName}</Text>
                </Body>
                <Right>
                  <Icon name='md-square' style={{ color: v.color, paddingLeft: 10, paddingRight: 10}} />
                </Right>
              </ListItem>
            )
          })
        }
      </List>
    </DrawerContentScrollView>
  )
}

export default function MainNavigation() {
    return (
        <Drawer.Navigator drawerContent={props=><CustomDrawerContent {...props} />} drawerContentOptions={{activeBackgroundColor:'#ff00ff'}}>
          <Drawer.Screen name="All" component={Todo}/>
        </Drawer.Navigator>
    );
}