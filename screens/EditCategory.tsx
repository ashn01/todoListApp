import React, { useState, useCallback } from 'react'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Input, Content, Item, Label, Subtitle, Text } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid';

import {useDispatch,useSelector} from 'react-redux'
import {addCategory} from '../modules/category/actions'

import { RootState } from '../modules';

// db
import {addOrEditCategory} from '../helper/sqlite'

// interface
import ICategory from '../interfaces/ICategory'


const initialState: ICategory = {
    id:null,
    key:null,
    categoryName:"",
    color:"",
    checked:0,
    Owner:null
}

export default function EditCategory({route, navigation})
{
    // get category id from param
    const {categoryId} = route.params
    // get callback function
    const {setUpdate} = route.params
    // get category from redux
    const selectedCategory:ICategory = useSelector((state:RootState)=>state.category.categories.find(c=>c.id == categoryId))
    // set category from redux. if it is undefined, set initialstate
    const [category, setCategory] = useState<ICategory>(selectedCategory || initialState);

    const dispatch = useDispatch();

    React.useEffect(()=>{
        
    },[categoryId])

    const editCategory = ()=>{
        addOrEditCategory(categoryId,category);
        if(categoryId === -1)
            dispatch(addCategory(category))
    }
    return (
        <Container>
            <Header>
                <Left>
                    <Button onPress={()=>navigation.goBack()}>
                        <Icon name='ios-arrow-back'/>
                    </Button>
                </Left>
                <Body>
                    <Title>{categoryId != -1 ? "Edit" : "Add"} Category</Title>
                    <Subtitle>{category.categoryName}</Subtitle>
                </Body>
                <Right>
                    <Button onPress={()=>editCategory()}>
                        <Icon name='md-checkmark'/>
                    </Button>
                </Right>
            </Header>
            <Content>
                <Grid>
                    <Row >
                        <Col style={{ width: '5%' }} />
                        <Col style={{ width: '90%' }} >
                            <Item stackedLabel>
                                <Label>Category Title</Label>
                                <Input
                                    nativeID='categoryName'
                                    value={category.categoryName}
                                    onChangeText={(text) => setCategory({ ...category, categoryName: text })} />
                            </Item>
                            <Item stackedLabel>
                                <Label>Color</Label>
                                <Input
                                    value={category.color}
                                    onChangeText={(text) => setCategory({ ...category, color: text })} />
                            </Item>
                        </Col>
                        <Col style={{ width: '5%' }} />
                    </Row>
                </Grid>
            </Content>
        </Container>
    )
}