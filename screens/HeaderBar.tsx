import React, { useState } from 'react'
import {Button, Icon, Left, Body, Title, Right,Header, Toast, ActionSheet } from 'native-base';
import { useNavigation } from '@react-navigation/native';

// styles
import styles from '../helper/styles'

// redux
import {useDispatch,useSelector} from 'react-redux'
import { RootState } from '../modules';
import {deleteCategory} from '../modules/category/actions'

// db
import {deleteCategory as dbDeleteCategory} from '../helper/sqlite'

// interface
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
            const selected:ICategory = categories.find(c=>c.id === selectedCategoryId) as ICategory
            setTitle(selected.categoryName);
        }
    }

    const removeCategory= ()=>{
        ActionSheet.show({
            options: ["Delete", "Cancel"],
            cancelButtonIndex: 1,
            destructiveButtonIndex: 0,
            title: "Delete Category"
        },
            buttonIndex => {
                if (buttonIndex === 0) { // select Delete
                    // update db
                    dbDeleteCategory(selectedCategoryId)
                    // update redux
                    dispatch(deleteCategory(selectedCategoryId))
                    // show toast
                    Toast.show({
                        text: 'Category Deleted!',
                        buttonText: 'Close',
                        duration: 2000
                    })
                }
            })
    }

    return (
        <Header style={styles.headerBackground}>
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
