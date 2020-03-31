import React from 'react'
import {Button, Icon, Left, Body, Title, Right,Header, Drawer } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from 'react-redux';
import { RootState } from '../modules';


import {category} from '../dummyData/dummyCategory'


export default function HeaderBar() {
    // a hook which gives access to the navigation object
    const navigation = useNavigation(); 
    const selectedCategoryId = useSelector((state:RootState)=>state.category.categoryId)

    const editCategory=()=>{
        console.log("editCategory")
    }

    const deleteCategory=()=>{
        console.log("deleteCategory")
    }

    return (
        <Header>
            <Left>
                <Button transparent onPress={()=>navigation.openDrawer()}>
                    <Icon name='menu' />
                </Button>
            </Left>
            <Body>
                <Title>
                    {
                        selectedCategoryId === 0 ? "ALL" :
                        category.find(c => c.ID === selectedCategoryId).CategoryName
                    }
                </Title>
            </Body>
            <Right>
                <Button transparent onPress={()=>editCategory()}>
                    <Icon name='md-create' />
                </Button>
                <Button transparent onPress={()=>deleteCategory()}>
                    <Icon name='md-trash' />
                </Button>
            </Right>
        </Header>
    );
}