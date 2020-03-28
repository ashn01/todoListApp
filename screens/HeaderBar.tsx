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

    const addTodo=()=>{
        console.log("Add todo")
        navigation.navigate('AddTodo')
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
                <Button transparent onPress={()=>addTodo()}>
                    <Icon name='add' />
                </Button>
            </Right>
        </Header>
    );
}