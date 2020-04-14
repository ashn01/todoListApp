import React, { useState } from 'react'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Input, Content, Item, Label, Subtitle, Toast } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid';
import DateTimePicker from '@react-native-community/datetimepicker'
import {Platform} from 'react-native'
import { Switch } from 'react-native-gesture-handler';

// styles
import styles from '../helper/styles'

// redux
import {useSelector, useDispatch} from 'react-redux'
import { RootState } from '../modules';
import {updateTodo} from '../modules/todo/actions'

// db
import {updateTodo as dbUpdateTodo} from '../helper/sqlite'

// interface
import ITodo from '../interfaces/ITodo'


export default function EditTodo({route, navigation})
{
    const {todoId} = route.params
    const todos = useSelector((state:RootState)=>state.todo.todos)
    const [todo, setTodo] = useState<ITodo>(todos.find(t=>t.id == todoId));
    const [showPicker, setShowPicker] = useState(false);
    const [mode, setMode] = useState('date')

    const dispatch = useDispatch();
    

    React.useEffect(()=>{
        setTodo(todos.find(t=>t.id == todoId))
    },[todoId])

    const onChangeDate = (event, selectedDate:Date) => {
        var date:Date = selectedDate || todo.todoDeadline
        if(mode === 'date')
        {
            setShowPicker(Platform.OS === 'ios');
            setMode('time')
            setTodo({ ...todo, todoDeadline: date })
            setShowPicker(true);
        }
        else if( mode === 'time')
        {
            onChangeTime(date)
        }
    }

    // set Time
    const onChangeTime = (selectedDate:Date) =>{
        var date:Date = selectedDate || todo.todoDeadline
        date.setHours (selectedDate.getHours())
        date.setMinutes(selectedDate.getMinutes())
        setShowPicker(Platform.OS === 'ios');
        setMode('date')
        setTodo({ ...todo, todoDeadline: date })

    }

    const dateFormat = () =>{
        var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

        var d = todo.todoDeadline
        var doW = days[d.getDay()]
        var mon = months[d.getMonth()]
        var day = d.getDate()
        var year = d.getFullYear()
        var hour = (d.getHours() % 12 ? d.getHours() % 12 : 12).toString();
        var min = d.getMinutes().toString();
        hour = parseInt(hour) < 10 ? "0"+hour : hour
        min = parseInt(min) < 10 ? "0"+min : min
        var ampm = d.getHours() >= 12 ? 'pm' : 'am'

        return doW+", "+mon+" "+day+", "+year+"  "+hour+":"+min+" "+ampm
    }

    const editTodo = () =>{
        // show toast
        Toast.show({
            text:'Todo saved!',
            buttonText:'Close',
            type:'success',
            duration:2000
        })
        // update db
        dbUpdateTodo(todo)
        // update redux
        dispatch(updateTodo(todo))
        navigation.goBack();
    }
    
    return (
        <Container>
            <Header style={styles.headerBackground}>
                <Left>
                    <Button transparent onPress={()=>navigation.goBack()}>
                        <Icon name='ios-arrow-back'/>
                    </Button>
                </Left>
                <Body>
                    <Title>Edit Todo</Title>
                    <Subtitle>{todo.todoName}</Subtitle>
                </Body>
                <Right>
                    <Button transparent onPress={()=>editTodo()}>
                        <Icon name='md-checkmark'/>
                    </Button>
                </Right>
            </Header>
            <Content>
                <Grid>
                    <Row >
                        <Col style={{ width: '5%' }} />
                        <Col style={{ width: '90%' }} >
                            <Row>
                                <Col style={{ width: '75%' }}>
                                    <Item stackedLabel>
                                        <Label>Todo Title</Label>
                                        <Input
                                            value={todo.todoName}
                                            onChangeText={(text) => setTodo({ ...todo, todoName: text })} />
                                    </Item>
                                </Col>
                                <Col style={{ width: '25%' }}>
                                    <Item stackedLabel>
                                        <Label>Completed</Label>
                                        <Switch value={todo.todoCompleted == 1} 
                                                onValueChange={(v) => setTodo({ ...todo, todoCompleted: v })}
                                                style={{height:50}}></Switch>
                                    </Item>
                                </Col>
                            </Row>

                            <Item stackedLabel onPress={() => { setShowPicker(true); }}>
                                <Label>Deadline</Label>
                                <Input  value={dateFormat()} 
                                        editable={false} 
                                        disabled={true}/>
                                {
                                    showPicker &&
                                    (<DateTimePicker
                                        timeZoneOffsetInMinutes={0}
                                        value={todo.todoDeadline}
                                        mode={mode as any}
                                        display='default'
                                        onChange={onChangeDate}
                                    />)
                                }
                            </Item>

                            <Item stackedLabel>
                                <Label>Description</Label>
                                <Input
                                    value={todo.todoDescription} multiline={true}
                                    onChangeText={(text) => setTodo({ ...todo, todoDescription: text })} />
                            </Item>
                        </Col>
                        <Col style={{ width: '5%' }} />
                    </Row>
                </Grid>
            </Content>
        </Container>
    )
}