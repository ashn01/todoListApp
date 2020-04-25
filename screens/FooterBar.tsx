import React from 'react'
import {Button, Icon, Text, Footer, FooterTab, StyleProvider } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import {StyleSheet} from 'react-native'

import { useSelector, useDispatch } from 'react-redux';
import { currentRoute } from '../modules/navigation/actions';
import { RootState } from '../modules';

// theme variables
import getTheme from '../native-base-theme/components'
import customTheme from '../native-base-theme/variables/platform'

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
        <StyleProvider style={getTheme(customTheme)}>
            <Footer style={{borderTopWidth:1, borderTopColor:'#DFE2E5'}}>
                <FooterTab style={styles.background}>
                    <Button vertical style={styles.background} active={curRoute==="Todo" ? true : false} onPress={()=>handleTodo()}>
                        <Icon name="ios-list"/>
                        <Text>Todo</Text>
                    </Button>
                    <Button vertical style={styles.background} active={curRoute==="Completed" ? true : false} onPress={()=>handleCompleted()}>
                        <Icon name="md-checkmark"/>
                        <Text>Completed</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </StyleProvider>
    );
}


const styles = StyleSheet.create({
    background:{
        backgroundColor:'#ffffff',
    }
})