import React, { useState, useRef } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { ListItem, Text, Right, Icon, Button, CheckBox, Body, Item, Toast, ActionSheet } from 'native-base'
import { useNavigation } from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable'

import ITodo from '../interfaces/ITodo'

// notification register
import PushNotification from '../helper/pushNotification'

// db
import { updateTodo, deleteTodo as dbDeleteTodo } from '../helper/sqlite'

type TodoProps = {
    init: () => void,
    todo: ITodo,
    color: string
}

export default function Todo({ init, todo, color }: TodoProps) {
    // navigation hook to open modals
    const navigation = useNavigation()
    const itemRef = useRef<Swipeable>(null);

    const editTodo = () => { // navigate to edit todo page
        navigation.navigate('EditTodo', { todoId: todo.id })
        try {
            itemRef && itemRef.current && itemRef.current.close();

        } catch (err) {
            console.log(err)
        }
    }

    const toggleCheckBox = (id: number) => { // fired when user click checkbox
        // database
        todo.todoCompleted = !todo.todoCompleted
        updateTodo(todo);

        if(todo.todoCompleted) // complete, so remove notification
            PushNotification.removeNotification(todo.id);
        else // back to in completed todo, so add notification
            PushNotification.addNotification(todo);
        init();
        // show toast
        Toast.show({
            text:todo.todoCompleted ? "Todo completed!" : "Todo incompleted!",
            type:'success',
            duration:2000,
            style:{
                bottom:'20%', 
                width:'60%', 
                left:0,
                right:0,
                marginLeft:'auto',
                marginRight:'auto',
                borderRadius:300
            },
            textStyle: {
                textAlign: 'center'
            }
        })
    }

    const deleteTodo = () => {
        ActionSheet.show({
            options: ["Delete", "Cancel"],
            cancelButtonIndex: 1,
            destructiveButtonIndex: 0,
            title: "Delete Todo"
        },
            buttonIndex => {
                if (buttonIndex === 0) { // delete todo
                    try {

                        itemRef && itemRef.current && itemRef.current.close();
                    } catch (err) {
                        console.log(err)
                    }
                    dbDeleteTodo(todo);
                    init();
                }
            })
    }

    const RightAction = (progress:Animated.AnimatedInterpolation, dragX:Animated.AnimatedInterpolation) => {
        return (
            <Item  style={styles.actionView}>
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
            ref={itemRef}
        >
            <ListItem noIndent style={styles.list} onLongPress={() => editTodo()}>
                <CheckBox checked={todo.todoCompleted != 0} onPress={() => toggleCheckBox(todo.id as number)} />
                <Body>
                    <Text style={{ textDecorationLine: todo.todoCompleted == 1 ? 'line-through' : 'none' }}>{todo.todoName}</Text>
                </Body>
                <Right>
                    <Button transparent >
                        <Icon name='md-square' style={{ color: color }} />
                    </Button>
                </Right>
            </ListItem>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: 'white'
    },
    actionView: {
        width: '30%',
        marginLeft:-1 // to remove underlined space between todo and items
    },
    actionButton: {
        width: '50%',
        height: '100%',
        justifyContent: 'center'
    },
    actionEdit: {
        backgroundColor: '#2bc26c',
        borderRadius:0,
        // borderTopRightRadius: 0,
        // borderBottomRightRadius: 0,
    },
    actionDelete: {
        backgroundColor: '#eb4034',
        borderRadius:0,
        // borderTopLeftRadius: 0,
        // borderBottomLeftRadius: 0,
    },
    actionIcon: {
        color: 'white'
    },
})