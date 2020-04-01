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
import {selectedCategory} from './modules/category/actions'
import { RootState } from './modules';

import ICategory from './interfaces/ICategory'

// db
import {getCategories} from './helper/sqlite'

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props)
{
  const [category,setCategory] = useState<ICategory[]>([]);
  React.useEffect(()=>{
    getCategory()
  },[])

  const selectedCategoryId = useSelector((state:RootState)=>state.category.categoryId)
  const dispatch = useDispatch()

  const getCategory = async () =>{
    const categories = await getCategories();
    setCategory(categories)
  }

  const addCategory = () =>{
      console.log(props.navigation)
  }

  const selectCategory = (id:number) =>{
      console.log(id)
      dispatch(selectedCategory(id))
      props.navigation.closeDrawer()
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
          category.map((v,i)=>{
            return (
              <ListItem key={i} onPress={() => selectCategory(v.id)}>
                <CheckBox checked={v.checked === 1} />
                <Body>
                  <Text>{v.categoryName}</Text>
                </Body>
                <Right>
                  <Icon name='md-square' style={{ color: v.color, paddingLeft: 10, paddingRight: 10 }} />
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