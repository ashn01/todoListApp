import React from 'react'
import {Button, Icon, Left, Body, Title, Right,Header} from 'native-base';
import { useNavigation } from '@react-navigation/native';

// styles
import styles from '../helper/styles'

export default function SettingHeaderBar() {

    const navigation = useNavigation()

    return (
        <Header style={styles.headerBackground}>
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
    )
}