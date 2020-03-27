import React from 'react'
import { Content, Text, ListItem, List, Left, Right, Button, Icon, CheckBox, Body } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid';

import {category} from '../dummyData/dummyCategory'

export default function SideBar()
{
    const addCategory = () =>{
        
    }

    const editCategory = (id:number) =>{
        console.log(id)
    }

    return (
        <Content style={{backgroundColor:'#FFFFFF'}}>
            <List>
                <ListItem itemDivider>
                    <Left>
                        <Text>Category</Text>
                    </Left>
                    <Right>
                        <Button transparent onPress={()=>addCategory()}>
                            <Icon name="add"/>
                        </Button>
                    </Right>
                </ListItem>
                {
                    category.map((v,i)=>{
                        return (
                        <ListItem noIndent key={i}>
                            <CheckBox checked={v.checked} />
                            <Body>
                                <Text>{v.CategoryName}</Text>
                            </Body>
                            <Right>
                                <Button transparent >
                                    <Icon name='md-square' style={{ color: v.color, marginRight: 0 }} />
                                    <Icon name='ios-arrow-forward' onPress={()=>editCategory(v.ID)}/>
                                </Button>
                            </Right>
                        </ListItem>
                        )
                    })
                }
            </List>
        </Content>
    )
}