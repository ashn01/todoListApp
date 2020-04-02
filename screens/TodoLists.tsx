import React, { useState } from 'react'
import { List, ListItem, Left, Text, Right, Icon, Button, Content, CheckBox, Body, Input} from 'native-base'
import { useNavigation } from '@react-navigation/native';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '../modules';

import {dummy} from '../dummyData/dummyTodo'
import {category} from '../dummyData/dummyCategory'

export default function TodoLists()
{
    // navigation hook to open modals
    const navigation = useNavigation()
    // get Current route exp) todo or completed
    const curRoute = useSelector((state:RootState)=>state.navigation.route) 
    // get selected category to generate proper todos being contained by the selected category
    const selectedCategory = useSelector((state:RootState)=>state.category.categoryId)

    // todo text
    const [todoText, setTodoText] = useState('');

    const addTodo =() =>{
        console.log(todoText);
        setTodoText(''); // empty todo field
    }

    const editTodo = (id:number) =>{
        console.log(id)
        navigation.navigate('EditTodo',{todoId:id})
    }
    return (
        <Content>
            <List>
                <ListItem noIndent>
                    <Body>
                        <Input placeholder='Click here to add a todo' 
                        value={todoText}
                        onChangeText={(e)=>setTodoText(e)}
                        onSubmitEditing={()=>addTodo()}/>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => addTodo()}>
                            <Icon name='md-add' />
                        </Button>
                    </Right>
                </ListItem>
                {   false&&
                    dummy.map((v,i)=>{
                        let cate = category.find(c => c.id == v.NewCategoryId)
                        if(selectedCategory === 0)// all checked
                        {
                            if (cate.checked === false)
                                return null;

                            if (curRoute === "Todo" && v.TodoCompleted === false) {
                                return (
                                    <ListItem noIndent key={i}>
                                        <CheckBox checked={false} />
                                        <Body>
                                            <Text>{v.TodoName}</Text>
                                        </Body>
                                        <Right>
                                            <Button transparent onPress={() => editTodo(v.ID)}>
                                                <Icon name='md-square' style={{ color: cate.color, marginRight: 0 }} />
                                                <Icon name='ios-arrow-forward' />
                                            </Button>
                                        </Right>
                                    </ListItem>
                                )
                            } else if (curRoute === "Completed" && v.TodoCompleted === true) {
                                return (
                                    <ListItem noIndent key={i}>
                                        <CheckBox checked={true} />
                                        <Body>
                                            <Text>{v.TodoName}</Text>
                                        </Body>
                                        <Right>
                                            <Button transparent onPress={() => editTodo(v.ID)}>
                                                <Icon name='md-square' style={{ color: cate.color, marginRight: 0 }} />
                                                <Icon name='ios-arrow-forward' />
                                            </Button>
                                        </Right>
                                    </ListItem>
                                )
                            }
                            else
                                return null;
                        }
                        else// selected specific category
                        {
                            if (v.NewCategoryId === selectedCategory && curRoute === "Todo" && v.TodoCompleted === false) {
                                return (
                                    <ListItem noIndent key={i}>
                                        <CheckBox checked={false} />
                                        <Body>
                                            <Text>{v.TodoName}</Text>
                                        </Body>
                                        <Right>
                                            <Button transparent onPress={() => editTodo(v.ID)}>
                                                <Icon name='md-square' style={{ color: cate.color, marginRight: 0 }} />
                                                <Icon name='ios-arrow-forward' />
                                            </Button>
                                        </Right>
                                    </ListItem>
                                )
                            } else if (v.NewCategoryId === selectedCategory && curRoute === "Completed" && v.TodoCompleted === true) {
                                return (
                                    <ListItem noIndent key={i}>
                                        <CheckBox checked={true} />
                                        <Body>
                                            <Text>{v.TodoName}</Text>
                                        </Body>
                                        <Right>
                                            <Button transparent onPress={() => editTodo(v.ID)}>
                                                <Icon name='md-square' style={{ color: cate.color, marginRight: 0 }} />
                                                <Icon name='ios-arrow-forward' />
                                            </Button>
                                        </Right>
                                    </ListItem>
                                )
                            }
                            else
                                return null;
                        }                        
                    })
                }
            </List>
        </Content>
    )
}