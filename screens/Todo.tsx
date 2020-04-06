import React, { useState } from 'react'
import {Animated, StyleSheet, View} from 'react-native'
import { ListItem, Text, Right, Icon, Button, CheckBox, Body, Item} from 'native-base'
import { useNavigation } from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable'

import ITodo from '../interfaces/ITodo'

// db
import {updateTodo, deleteTodo as dbDeleteTodo} from '../helper/sqlite'

type TodoProps = {
    init : ()=>void,
    todo : ITodo,
    color: string
}

type SwipeableProps = {
    progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation
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

    const deleteTodo = () =>{
        dbDeleteTodo(todo);
        init();
    }

    const RightAction = (progress, dragX)=>{
        return (
            <Item style={styles.actionView}>
                <Button style={[styles.actionButton, styles.actionEdit]} onPress={() => editTodo()}>
                    <Icon name='md-create' style={styles.actionIcon} />
                </Button>
                <Button style={[styles.actionButton, styles.actionDelete]} onPress={() => deleteTodo()}>
                    <Icon name='md-trash' style={styles.actionIcon} />
                </Button>
            </Item>
        )
    }

    return (
        <Swipeable
            renderRightActions={(p, d) => RightAction(p, d)}
            overshootRight={false}
        >
            <ListItem noIndent style={styles.list} onLongPress={()=>editTodo()}>
                <CheckBox checked={todo.todoCompleted != 0} onPress={() => toggleCheckBox(todo.id)} />
                <Body>
                    <Text style={{ textDecorationLine: todo.todoCompleted == 1 ? 'line-through' : 'none' }}>{todo.todoName}</Text>
                </Body>
                <Right>
                    <Button transparent >
                        <Icon name='md-square' style={{ color: color}} />
                    </Button>
                </Right>
            </ListItem>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    list: {
        backgroundColor:'white'
    },
    actionView :{
        width:'30%'
    },
    actionButton : {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        margin: 'auto'
    },
    actionEdit : {
        backgroundColor: '#2bc26c',
        borderTopRightRadius : 0,
        borderBottomRightRadius : 0,
    },
    actionDelete : {
        backgroundColor: '#eb4034',
        borderTopLeftRadius : 0,
        borderBottomLeftRadius : 0,
    },
    actionIcon : {
        color:'white'
    },
})