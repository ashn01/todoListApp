import React from 'react'
import {Button, Icon, Text, Footer, FooterTab } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import {StyleSheet} from 'react-native'

import { useSelector, useDispatch } from 'react-redux';
import { currentRoute } from '../modules/navigation/actions';
import { RootState } from '../modules';

export default function FooterBar() {
    // a hook which gives access to the navigation object
    const navigation = useNavigation(); 
    const curRoute = useSelector((state:RootState)=>state.navigation.route)
    const dispatch = useDispatch();

    const handleTodo=()=>{
        dispatch(currentRoute("Todo"))
    }

    const handleCompleted=()=>{
        dispatch(currentRoute("Completed"))
        
    }
    return (
        <Footer >
            <FooterTab style={styles.background}>
                <Button vertical style={styles.background} active={curRoute==="Todo" ? true : false} onPress={()=>handleTodo()}>
                    <Icon name="apps"/>
                    <Text>Todo</Text>
                </Button>
                <Button vertical style={styles.background} active={curRoute==="Completed" ? true : false} onPress={()=>handleCompleted()}>
                    <Icon name="navigate"/>
                    <Text>Completed</Text>
                </Button>
            </FooterTab>
        
        </Footer>
    );
}


const styles = StyleSheet.create({
    background:{
        backgroundColor:'#877fbd'
    }
})