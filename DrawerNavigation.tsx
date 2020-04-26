import React, { useState } from 'react';
import 'react-native-gesture-handler';
import {createDrawerNavigator,DrawerContentScrollView} from '@react-navigation/drawer';

import { useNavigation } from '@react-navigation/native';
import { ListItem, Text,List, Left, Right, Button, Icon, CheckBox, Body, Title } from 'native-base'

// screens
import Todo from './screens/Home';

// redux
import {useDispatch,useSelector} from 'react-redux'
import {selectedCategory, updateCategory} from './modules/category/actions'
import {setTodos} from './modules/todo/actions'
import { RootState } from './modules';

// interface
import ICategory from './interfaces/ICategory'

// styles
import styles from './helper/styles'

// db
import {updateCategory as dbUpdateCategory, getAllTodosWithChecked} from './helper/sqlite'

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props:any)
{
  // get all categories from store
  const allCategories:ICategory[] = useSelector((state:RootState)=>state.category.categories);
  // to set selected category's background
  const selectedCategoryId:number = useSelector((state:RootState)=>state.category.categoryId)
  const dispatch = useDispatch()
  const navigation = useNavigation();

  const addCategory = () =>{
    navigation.navigate('EditCategory',{categoryId:-1})
    props.navigation.closeDrawer()
  }

  const setting = () =>{
    navigation.navigate('Setting');
    props.navigation.closeDrawer()
  }

  const selectCategory = (id:number) =>{
      dispatch(selectedCategory(id))
      props.navigation.closeDrawer()
  }

  // todos under checked categories will display in todo list when selected category is 'ALL'
  const checkCategory = async (id:number)=>{
    // update redux
    var category:ICategory = allCategories.find(c=>c.id === id) as ICategory // it will return ICategory, no undefined
    category.checked = !category.checked
    dispatch(updateCategory(category))

    // update database
    const v = await dbUpdateCategory(category);

    // retreive data
    if(selectedCategoryId === 0){ 
      // update todo redux
      const todos = await getAllTodosWithChecked();
      dispatch(setTodos(todos))
    }
  }

  return (
    <DrawerContentScrollView {...props} style={{marginTop:-4}}>
      <List >
        <ListItem itemDivider style={[styles.headerBackground, styles.headerHeight]}>
          <Left>
            <Title>Doobido</Title>
          </Left>
          <Right>
            <Button transparent onPress={()=>setting()}>
              <Icon name="ios-settings" style={{color:'#fff'}}/>
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
              <ListItem key={i} onPress={() => selectCategory(v.id as number)} style={{backgroundColor:'#'}}>
                <CheckBox checked={v.checked == true} onPress={()=>checkCategory(v.id as number)}/>
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
        <ListItem last onPress={() => addCategory()}>
          <Left></Left>
          <Body>
              <Icon name="add" />
          </Body>
          <Right></Right>
        </ListItem>
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