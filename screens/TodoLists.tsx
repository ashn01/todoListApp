import React from 'react'
import { List, ListItem, Left, Text, Right, Icon, Button, Content, CheckBox, Body} from 'native-base'
import { useNavigation } from '@react-navigation/native';

// redux
import { useSelector } from 'react-redux';
import { RootState } from '../modules';

import {dummy} from '../dummyData/dummyTodo'

export default function TodoLists()
{
    const navigation = useNavigation();
    const curRoute = useSelector((state:RootState)=>state.navigation.route)

    const editTodo = (index:number) =>{
        console.log(index)
    }
    return (
        <Content>
            <List>
                {
                    dummy.map((v,i)=>{
                        if(curRoute === "Todo" && v.TodoCompleted === false)
                        {
                            return (
                                <ListItem noIndent key={i}>
                                    <CheckBox checked={false}/>
                                    <Body>
                                        <Text>{v.TodoName}</Text>
                                    </Body>
                                    <Right>
                                        <Button transparent onPress={()=>editTodo(1)}>
                                            <Icon name='md-square' style={{color:v.color, marginRight:0 }}/>
                                            <Icon name='ios-arrow-forward' />
                                        </Button>
                                    </Right>
                                </ListItem>
                            )
                        }else if(curRoute === "Completed" && v.TodoCompleted === true)
                        {
                            return (
                                <ListItem noIndent key={i}>
                                    <CheckBox checked={true}/>
                                    <Body>
                                        <Text>{v.TodoName}</Text>
                                    </Body>
                                    <Right>
                                        <Button transparent onPress={()=>editTodo(1)}>
                                            <Icon name='md-square' style={{color:v.color, marginRight:0 }}/>
                                            <Icon name='ios-arrow-forward' />
                                        </Button>
                                    </Right>
                                </ListItem>
                            )
                        }
                        else
                            return null;
                    })
                }
            </List>
        </Content>
    )
}