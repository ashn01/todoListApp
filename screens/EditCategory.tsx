import React, { useState } from 'react'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Input, Content, Item, Label, Subtitle, Text } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid';
import DateTimePicker from '@react-native-community/datetimepicker'
import {Platform} from 'react-native'

import {useSelector} from 'react-redux'
import { RootState } from '../modules';

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
    // get category from redux
    const editCategory:ICategory = useSelector((state:RootState)=>state.category.categories.find(c=>c.id == categoryId))
    // set category from redux. if it is undefined, set initialstate
    const [category, setCategory] = useState<ICategory>(editCategory || initialState);

    React.useEffect(()=>{
        
    },[categoryId])
    
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
                    <Button>
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