import React, { useState } from 'react'
import {Button, Icon, Left, Body, Title, Right,Header, Drawer } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from 'react-redux';
import { RootState } from '../modules';


// import {category} from '../dummyData/dummyCategory'

import {getCategory,addCategory} from '../helper/sqlite'


export default function HeaderBar() {
    // a hook which gives access to the navigation object
    const navigation = useNavigation(); 
    const selectedCategoryId = useSelector((state:RootState)=>state.category.categoryId)
    const [title, setTitle] = useState('');

    React.useEffect(()=>{
        setHeader();
    },[selectedCategoryId])

    const editCategory=()=>{
        console.log("editCategory")
        addCategory('Bello','#123123',false)
        addCategory('Dello','#00ff00',false)
        addCategory('Jello','#ffff00',false)
        addCategory('Mello','#00ffff',false)
    }

    const setHeader= async ()=>{
        if(selectedCategoryId === 0)
            setTitle("ALL");
        else
        {
            const category = await getCategory(selectedCategoryId);
            setTitle(category.categoryName);
        }
    }

    const deleteCategory= async ()=>{
        console.log("deleteCategory")
    }

    return (
        <Header>
            <Left>
                <Button transparent onPress={()=>navigation.openDrawer()}>
                    <Icon name='menu' />
                </Button>
            </Left>
            <Body>
                <Title>
                    {
                       title
                    }
                </Title>
            </Body>
            <Right>
                <Button transparent onPress={()=>editCategory()}>
                    <Icon name='md-create' />
                </Button>
                <Button transparent onPress={()=>deleteCategory()}>
                    <Icon name='md-trash' />
                </Button>
            </Right>
        </Header>
    );
}