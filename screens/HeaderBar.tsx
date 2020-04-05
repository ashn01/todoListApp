import React, { useState } from 'react'
import {Button, Icon, Left, Body, Title, Right,Header, Drawer, Root } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import {useDispatch,useSelector} from 'react-redux'
import { RootState } from '../modules';
import {deleteCategory as delCategory} from '../modules/category/actions'

import {deleteCategory} from '../helper/sqlite'
import ICategory from '../interfaces/ICategory';

export default function HeaderBar() {
    // a hook which gives access to the navigation object
    const navigation = useNavigation(); 
    // selected category Id to be used edit category, and remove category
    const selectedCategoryId:number = useSelector((state:RootState)=>state.category.categoryId)
    // selected category for its name on title
    const categories:ICategory[] = useSelector((state:RootState)=>state.category.categories)
    const [title, setTitle] = useState('');
    const dispatch = useDispatch()

    React.useEffect(()=>{
        setHeader();
    },[selectedCategoryId,categories])

    const editCategory=()=>{
        navigation.navigate('EditCategory',{categoryId:selectedCategoryId})
    }

    const setHeader= async ()=>{
        if(selectedCategoryId === 0)
            setTitle("ALL");
        else
        {
            const selected = categories.find(c=>c.id === selectedCategoryId)
            setTitle(selected.categoryName);
        }
    }

    const removeCategory= ()=>{
        deleteCategory(selectedCategoryId)
        dispatch(delCategory(selectedCategoryId))
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
            {
                // All category cannot be editted and deleted
                selectedCategoryId !== 0 &&
                (
                    <>
                        <Button transparent onPress={() => editCategory()}>
                            <Icon name='md-create' />
                        </Button>
                        <Button transparent onPress={() => removeCategory()}>
                            <Icon name='md-trash' />
                        </Button>
                    </>
                )
            }
            </Right>
        </Header>
    );
}