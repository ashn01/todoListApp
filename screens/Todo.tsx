import React from 'react';
import { StyleSheet} from 'react-native';
import {Container} from 'native-base';

import HeaderBar from './HeaderBar'
import TodoLists from './TodoLists'


export default function Todo() {
    return (
        <Container>
            <HeaderBar/>
            <TodoLists/>
        </Container>
    );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 64,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
