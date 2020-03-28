import React from 'react'
import { Content, Text, ListItem, List, Left, Right, Button, Icon, CheckBox, Body } from 'native-base'
import {SwipeListView} from 'react-native-swipe-list-view'

import {useDispatch,useSelector} from 'react-redux'


import {selectedCategory} from '../modules/category/actions'
import {category} from '../dummyData/dummyCategory'
import { RootState } from '../modules';



export default function SideBar()
{
    const selectedCategoryId = useSelector((state:RootState)=>state.category.categoryId)
    const dispatch = useDispatch()

    const addCategory = () =>{
        
    }

    const editCategory = (id:number) =>{
        console.log(id)
    }

    const deleteCategory = (id:number) =>{
        console.log(id)
    }

    const selectCategory = (id:number) =>{
        console.log(id)
        dispatch(selectedCategory(id))
    }

    return (
        <Content style={{backgroundColor:'#FFFFFF'}}>
            <List>
                <ListItem itemDivider>
                    <Left>
                        <Text>Category</Text>
                    </Left>
                    <Right>
                        <Button transparent onPress={()=>addCategory()}>
                            <Icon name="add"/>
                        </Button>
                    </Right>
                </ListItem>
                <ListItem noIndent onPress={()=>selectCategory(0)}>
                    <Icon name="ios-list"/>
                    <Body>
                        <Text>All</Text>
                    </Body>
                </ListItem>
                {
                    category.map((v,i)=>{
                        return (
                        <ListItem noIndent key={i} onPress={()=>selectCategory(v.ID)}>
                            <CheckBox checked={v.checked} />
                            <Body>
                                <Text>{v.CategoryName}</Text>
                            </Body>
                    <Right>
                        <Icon name='md-square' style={{ color: v.color, paddingLeft:10,paddingRight:10}} />
                    </Right>
                        </ListItem>
                        )
                    })
                }
            </List>
        </Content>
    )
}