import React from 'react'
import {Button, Icon, Left, Body, Title, Right,Header} from 'native-base';
import { useNavigation } from '@react-navigation/native';

// styles
import styles from '../helper/styles'
import LinearGradient from 'react-native-linear-gradient';

export default function SettingHeaderBar() {

    const navigation = useNavigation()

    return (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#6C0FA7', '#3E0066']}>
        <Header style={{backgroundColor: 'transparent', margin:-2}}>
            <Left>
                <Button transparent onPress={() => navigation.goBack()}>
                    <Icon name='ios-arrow-back' />
                </Button>
            </Left>
            <Body>
                <Title>
                    Settings
                </Title>
            </Body>
            <Right>
            
            </Right>
        </Header>
        </LinearGradient>
    )
}