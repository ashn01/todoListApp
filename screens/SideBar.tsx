import React from 'react'
import { Content, ListItem, Text,List, Left, Right, Button, Icon, CheckBox, Body } from 'native-base'
import {SwipeListView} from 'react-native-swipe-list-view'
import {View, StyleSheet,  TouchableOpacity, TouchableHighlight} from 'react-native'
import {useDispatch,useSelector} from 'react-redux'


import {selectedCategory} from '../modules/category/actions'
import {category} from '../dummyData/dummyCategory'
import { RootState } from '../modules';



export default function SideBar()
{
    React.useEffect(()=>{
    },[])
    const selectedCategoryId = useSelector((state:RootState)=>state.category.categoryId)
    const dispatch = useDispatch()

    const addCategory = () =>{
        
    }

    const editCategory = (id:number) =>{
        console.log(id)
    }

    const deleteCategory = (id:number) =>{
        console.log(id)
    }

    const selectCategory = (id:number) =>{
        console.log(id)
        dispatch(selectedCategory(id))
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
                <ListItem noIndent onPress={()=>selectCategory(0)}>
                    <Icon name="ios-list"/>
                    <Body>
                        <Text>All</Text>
                    </Body>
                </ListItem>
            </List>
            <SwipeListView 
                data={category}
                renderItem={(data, rowMap) => (
                        <ListItem style={{backgroundColor:'#FFFFFF'}} onPress={()=>selectCategory(data.item.ID)}>
                            <CheckBox checked={data.item.checked} />
                            <Body>
                                <Text>{data.item.CategoryName}</Text>
                            </Body>
                            <Right>
                                <Icon name='md-square' style={{ color: data.item.color, paddingLeft:10,paddingRight:10}} />
                            </Right>
                        </ListItem>
                )}
                renderHiddenItem={(data, rowMap) => (
                    <View style={styles.rowBack}>
                        <TouchableOpacity
                            style={[styles.backRightBtn, styles.backRightBtnLeft]}
                        >
                            <Icon name="md-create"/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.backRightBtn, styles.backRightBtnRight]}
                        >
                            <Icon name="md-trash"/>
                        </TouchableOpacity>
                    </View>
                )}
                rightOpenValue={-100}
                closeOnRowPress
                closeOnRowOpen
                closeOnRowBeginSwipe
                disableRightSwipe
                />
        </Content>
    )
}

const styles = StyleSheet.create({
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 50,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 50,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});