import React from 'react'
import {Button, Icon, Left, Body, Title, Right,Header} from 'native-base';
import { useNavigation } from '@react-navigation/native';


export default function HeaderBar() {
    // a hook which gives access to the navigation object
    const navigation = useNavigation(); 

    const handleMenu=()=>{
        console.log("open menu")
    }

    const addTodo=()=>{
        console.log("Add todo")
        navigation.navigate('AddTodo')
    }

    return (
        <Header>
            <Left>
                <Button transparent onPress={()=>handleMenu()}>
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