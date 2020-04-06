import React, { useState } from 'react'
import { List, ListItem, Left, Text, Right, Icon, Button, Content, CheckBox, Body, Input} from 'native-base'
import { useNavigation } from '@react-navigation/native';

import ITodo from '../interfaces/ITodo'

// db
import {updateTodo} from '../helper/sqlite'

type TodoProps = {
    init : ()=>void,
    todo : ITodo,
    color: string
}


export default function Todo({init, todo, color}: TodoProps)
{
    // navigation hook to open modals
    const navigation = useNavigation()

    const editTodo = () =>{ // navigate to edit todo page
        navigation.navigate('EditTodo',{todoId:todo.id})
    }

    const toggleCheckBox = (id:number) =>{ // fired when user click checkbox
        // database
        todo.todoCompleted = !todo.todoCompleted
        updateTodo(todo);
        init();
    }

    return (
        <ListItem noIndent>
            <CheckBox checked={todo.todoCompleted != 0} onPress={() => toggleCheckBox(todo.id)} />
            <Body>
                <Text style={{textDecorationLine:todo.todoCompleted == 1 ? 'line-through':'none'}}>{todo.todoName}</Text>
            </Body>
            <Right>
                <Button transparent onPress={() => editTodo()}>
                    <Icon name='md-square' style={{ color: color, marginRight: 0 }} />
                    <Icon name='ios-arrow-forward' />
                </Button>
            </Right>
        </ListItem>
    )
}