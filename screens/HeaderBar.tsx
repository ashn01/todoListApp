import React from 'react'
import {Button, Icon, Left, Body, Title, Right,Header, Drawer } from 'native-base';
import { useNavigation } from '@react-navigation/native';


interface Props {
    openDrawer:()=>void
}

export default function HeaderBar({openDrawer}:Props) {
    // a hook which gives access to the navigation object
    const navigation = useNavigation(); 
    const handleMenu=()=>{
        console.log("Handle")
        openDrawer();
    }

    const addTodo=()=>{
        console.log("Add todo")
        navigation.navigate('AddTodo')
    }

    return (
        <Header>
            <Left>
                <Button transparent onPress={openDrawer}>
                    <Icon name='menu' />
                </Button>
            </Left>
            <Body>
                <Title>Todo</Title>
            </Body>
            <Right>
                <Button transparent onPress={()=>addTodo()}>
                    <Icon name='add' />
                </Button>
            </Right>
        </Header>
    );
}