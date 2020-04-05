import React, { useState } from 'react'
import { List, ListItem, Left, Text, Right, Icon, Button, Content, CheckBox, Body, Input} from 'native-base'
import { useNavigation } from '@react-navigation/native';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { setTodos } from '../modules/todo/actions'

// db
import {addTodo, getAllTodos, getTodos, updateTodo} from '../helper/sqlite'

import ITodo from '../interfaces/ITodo';

export default function TodoLists()
{
    // navigation hook to open modals
    const navigation = useNavigation()
    // get Current route exp) todo or completed
    const curRoute = useSelector((state:RootState)=>state.navigation.route) 
    // get selected category to generate proper todos being contained by the selected category
    const selectedCategoryId = useSelector((state:RootState)=>state.category.categoryId)
    // get all categories to display color
    const allCategoryies = useSelector((state:RootState)=>state.category.categories)
    // get all todos to display in list
    const allTodos = useSelector((state:RootState)=>state.todo.todos)
    
    const dispatch = useDispatch()

    // todo text for new todo
    const [todoText, setTodoText] = useState('');

    React.useEffect(()=>{
        initTodos();  
    },[])

    React.useEffect(()=>{
        initTodos();  
    },[selectedCategoryId, allCategoryies])

    // get data from db and store redux
    const initTodos = async ()=>{
        if(selectedCategoryId === 0) // select all
        {
            const todos = await getAllTodos();
            dispatch(setTodos(todos))
        }
        else // select any specific
        {
            const todos = await getTodos(selectedCategoryId);
            dispatch(setTodos(todos))
        }
    }

    const createTodo =async() =>{
        const newTodo:ITodo = { key:null, 
                                id:null, 
                                todoName:todoText, 
                                todoDescription:"", 
                                todoDeadline:new Date(), 
                                todoCompleted: false, 
                                categoryId:selectedCategoryId,
                            }
        setTodoText(""); // reset input field
        var id = await addTodo(newTodo);
        initTodos()
    }

    const editTodo = (id:number) =>{ // navigate to edit todo page
        navigation.navigate('EditTodo',{todoId:id})
    }

    const toggleCheckBox = (id:number) =>{ // fired when user click checkbox
        // database
        const todo = allTodos.find(t=>t.id == id)
        todo.todoCompleted = !todo.todoCompleted
        updateTodo(todo);
        initTodos();
    }

    const getColor = (id:number)=>{ // get correspond color from categories
        const category = allCategoryies.find(c=>c.id == id)
        if(category !== undefined)
            return category.color
        else
            return '#ffffff' // undefiend means 'ALL' 
    }

    return (
        <Content>
            <List>
                <ListItem noIndent>
                    <Body>
                        <Input placeholder='Click here to add a todo' 
                        value={todoText}
                        onChangeText={(e)=>setTodoText(e)}
                        onSubmitEditing={()=>createTodo()}/>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => createTodo()}>
                            <Icon name='md-add' />
                        </Button>
                    </Right>
                </ListItem>
                {   
                    allTodos.map((v,i)=>{
                        if (curRoute == "Todo" && v.todoCompleted == 0) {
                            return (
                                <ListItem noIndent key={i}>
                                    <CheckBox checked={v.todoCompleted != 0} onPress={()=>toggleCheckBox(v.id)}/>
                                    <Body>
                                        <Text>{v.todoName}</Text>
                                    </Body>
                                    <Right>
                                        <Button transparent onPress={() => editTodo(v.id)}>
                                            <Icon name='md-square' style={{ color: getColor(v.categoryId) , marginRight: 0 }} />
                                            <Icon name='ios-arrow-forward' />
                                        </Button>
                                    </Right>
                                </ListItem>
                            )
                        } else if (curRoute == "Completed" && v.todoCompleted == 1) {
                            return (
                                <ListItem noIndent key={i}>
                                    <CheckBox checked={v.todoCompleted == 1} onPress={()=>toggleCheckBox(v.id)}/>
                                    <Body>
                                        <Text style={{textDecorationLine:'line-through'}}>{v.todoName}</Text>
                                    </Body>
                                    <Right>
                                        <Button transparent onPress={() => editTodo(v.id)}>
                                            <Icon name='md-square' style={{ color: getColor(v.categoryId) , marginRight: 0 }} />
                                            <Icon name='ios-arrow-forward' />
                                        </Button>
                                    </Right>
                                </ListItem>
                            )
                        }
                        else
                        {
                            return null;
                        }
                    })
                }
            </List>
        </Content>
    )
}