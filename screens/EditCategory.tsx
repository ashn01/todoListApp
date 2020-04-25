import React, { useState } from 'react'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Input, Content, Item, Label, Subtitle, View, Toast } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid';
import { TriangleColorPicker, fromHsv } from 'react-native-color-picker'

// styles
import styles from '../helper/styles'

// redux
import {useDispatch,useSelector} from 'react-redux'
import {addCategory, updateCategory, selectedCategory as selectCategory} from '../modules/category/actions'
import { RootState } from '../modules';

// db
import {insertCategory, updateCategory as dbUpdateCategory} from '../helper/sqlite'

// interface
import ICategory from '../interfaces/ICategory'
import LinearGradient from 'react-native-linear-gradient';


const initialState: ICategory = {
    id:null,
    key:null,
    categoryName:"",
    color:"#000",
    checked:0,
    Owner:null
}

export default function EditCategory({route, navigation}:any)
{
    // get category id from param
    const {categoryId} = route.params
    // get category from redux
    // this can be ICategory or undefined
    const selectedCategory = useSelector((state:RootState)=>state.category.categories.find(c=>c.id == categoryId))
    // set category from redux. if it is undefined, set initialstate
    const [category, setCategory] = useState<ICategory>(selectedCategory || initialState);

    const dispatch = useDispatch();

    const editCategory = async () => {
        if (categoryId === -1) {
            // show toast
            Toast.show({
                text:'Category Added!',
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
            // insert database
            var id = await insertCategory(category);
            category.id = id
            // update redux
            dispatch(addCategory(category))
            dispatch(selectCategory(id))
        }
        else
        {
            // show toast
            Toast.show({
                text:'Category Modified!',
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
            // update database
            dbUpdateCategory(category)
            // update redux
            dispatch(updateCategory(category))
        }
        navigation.goBack();
    }

    return (
        <Container>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#6C0FA7', '#3E0066']}>
            <Header style={{backgroundColor: 'transparent', margin:-2}}>
                <Left>
                    <Button transparent onPress={()=>navigation.goBack()}>
                        <Icon name='ios-arrow-back'/>
                    </Button>
                </Left>
                <Body>
                    <Title>{categoryId != -1 ? "Edit" : "Add"} Category</Title>
                    <Subtitle>{category.categoryName}</Subtitle>
                </Body>
                <Right>
                    <Button transparent onPress={()=>editCategory()}>
                        <Icon name='md-checkmark'/>
                    </Button>
                </Right>
            </Header>
            </LinearGradient>
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
                            <View style={{height:300}}>
                                <TriangleColorPicker
                                    defaultColor='#000000'
                                    color={category.color}
                                    onColorChange={color => setCategory({ ...category, color: fromHsv(color) })}
                                    onColorSelected={color => console.log("a"+color)}
                                    style={{flex:1}}
                                />
                            </View>
                        </Col>
                        <Col style={{ width: '5%' }} />
                    </Row>
                </Grid>
            </Content>
        </Container>
    )
}
