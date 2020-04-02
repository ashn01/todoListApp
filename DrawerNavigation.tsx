import React, { useState } from 'react';
import 'react-native-gesture-handler';
import {createDrawerNavigator,DrawerContentScrollView} from '@react-navigation/drawer';

import { ListItem, Text,List, Left, Right, Button, Icon, CheckBox, Body } from 'native-base'

// screens
import Todo from './screens/Todo';

// redux
import {useDispatch,useSelector} from 'react-redux'
import {selectedCategory, updateCategory} from './modules/category/actions'
import { RootState } from './modules';

import ICategory from './interfaces/ICategory'
import { useNavigation } from '@react-navigation/native';

// db
import {updateCategory as dbUpdateCategory} from './helper/sqlite'

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props)
{
  const allCategories:ICategory[] = useSelector((state:RootState)=>state.category.categories);
  // to set selected category's background
  const selectedCategoryId:number = useSelector((state:RootState)=>state.category.categoryId)
  const dispatch = useDispatch()
  const navigation = useNavigation();

  React.useEffect(()=>{
    
  },[allCategories])

  const addCategory = () =>{
    navigation.navigate('EditCategory',{categoryId:-1})
  }

  const selectCategory = (id:number) =>{
      dispatch(selectedCategory(id))
      props.navigation.closeDrawer()
  }

  const checkCategory = (id:number)=>{
    // update redux
    var category = allCategories.find(c=>c.id === id)
    category.checked = !category.checked
    dispatch(updateCategory(category))

    // update database
    dbUpdateCategory(category);
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
          allCategories.map((v,i)=>{
            return (
              <ListItem key={i} onPress={() => selectCategory(v.id)}>
                <CheckBox checked={v.checked == true} onPress={()=>checkCategory(v.id)}/>
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