import React, { useState } from 'react'
import { List, ListItem, Right, Icon, Button, Content, Body, Input, Toast} from 'native-base'
import { useNavigation } from '@react-navigation/native';
import moment from 'moment'

import Todo from './Todo'

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { setTodos } from '../modules/todo/actions'

// db
import {addTodo, getAllTodosWithChecked, getTodos, updateTodo} from '../helper/sqlite'

// notification register
import PushNotification from '../helper/pushNotification'

// interface
import ITodo from '../interfaces/ITodo';

import {validationName} from '../helper/general'
import {GetAllOptions} from '../helper/SettingValues'

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
            const todos = await getAllTodosWithChecked();
            dispatch(setTodos(todos))
        }
        else // select any specific
        {
            const todos = await getTodos(selectedCategoryId);
            dispatch(setTodos(todos))
        }
    }

    const getColor = (id:number)=>{ // get correspond color from categories
        const category = allCategoryies.find(c=>c.id == id)
        if(category !== undefined)
            return category.color
        else
            return '#ffffff' // undefiend means 'ALL' 
    }

    const createTodo =async() =>{
        if(validationName(todoText)){
            // get settings value and add default deadline time to new todo
            const settings = await GetAllOptions();
            var deadline = new Date(new Date().getTime()+60000*settings.defaultDeadlineTime);

            // create todo
            const newTodo:ITodo = { key:null, 
                                    id:null, 
                                    todoName:todoText, 
                                    todoDescription:"", 
                                    todoDeadline:deadline, 
                                    todoCompleted: false, 
                                    categoryId:selectedCategoryId,
                                }
            setTodoText(""); // reset input field

            // add Todo to database and set auto incremented id, then add notification
            const id = await addTodo(newTodo);
            newTodo.id = id;
            PushNotification.addNotification(newTodo);


            initTodos()
            // show toast
            Toast.show({
                text:"Todo Added!",
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
            
        }else{
            // show toast
            Toast.show({
                text:"Empty todo cannot be added",
                type:'warning',
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
                                <Todo key={i} color={getColor(v.categoryId)} init={initTodos} todo={v}/>
                            )
                        } else if (curRoute == "Completed" && v.todoCompleted == 1) {
                            return (
                                <Todo key={i} color={getColor(v.categoryId)} init={initTodos} todo={v}/>
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