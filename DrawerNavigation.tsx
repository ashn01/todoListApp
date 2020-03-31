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

// category
import {category} from './dummyData/dummyCategory'

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props)
{
  React.useEffect(()=>{
  },[])
  const selectedCategoryId = useSelector((state:RootState)=>state.category.categoryId)
  const dispatch = useDispatch()

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
              <ListItem key={i} onPress={() => selectCategory(v.ID)}>
                <CheckBox checked={v.checked} />
                <Body>
                  <Text>{v.CategoryName}</Text>
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

/*

const styles = StyleSheet.create({
  rowBack: {
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
  },
  backRightBtn: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 50,
  },
  backRightBtnLeft: {
      backgroundColor: 'blue',
      right: 50,
  },
  backRightBtnRight: {
      backgroundColor: 'red',
      right: 0,
  },
});

<SwipeListView onTouchStart={()=>console.log("touched")} onScroll={()=>console.log("EndCapture")} onTouchEnd={()=>console.log("touchEnd")}
        data={category}
        renderItem={(data, rowMap) => (
            <ListItem style={{ backgroundColor: '#FFFFFF' }} onPress={() => selectCategory(data.item.ID)}>
              <CheckBox checked={data.item.checked} />
              <Body>
                <Text>{data.item.CategoryName}</Text>
              </Body>
              <Right>
                <Icon name='md-square' style={{ color: data.item.color, paddingLeft: 10, paddingRight: 10 }} />
              </Right>
            </ListItem>
        )}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnLeft]}
            >
              <Icon name="md-create" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
            >
              <Icon name="md-trash" />
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-100}
        closeOnRowPress
        closeOnRowOpen
        closeOnRowBeginSwipe
        disableRightSwipe
      />
*/