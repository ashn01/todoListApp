import React, { useRef } from 'react';
import { StyleSheet} from 'react-native';
import {Container, Drawer} from 'native-base';

import HeaderBar from './HeaderBar'
import TodoLists from './TodoLists'
import FooterBar from './FooterBar'

export default function Todo() {
    return (
        <Container>
              <HeaderBar/>
              <TodoLists/>
              <FooterBar/>
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
