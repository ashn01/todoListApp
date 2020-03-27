import React, { useRef } from 'react';
import { StyleSheet} from 'react-native';
import {Container, Drawer} from 'native-base';

import SideBar from './SideBar'
import HeaderBar from './HeaderBar'
import TodoLists from './TodoLists'
import FooterBar from './FooterBar'

export default function Todo() {
  const drawerRef = useRef()

  const openDrawer = () =>{
    drawerRef && drawerRef.current && drawerRef!.current!._root.open()
  }
  const closeDrawer = () =>{
    drawerRef && drawerRef.current && drawerRef!.current!._root.close()
  }
    return (
        <Container>
            <Drawer ref={drawerRef}
                    content={<SideBar/>}
                    onClose={()=>closeDrawer()}>
              <HeaderBar openDrawer={()=>openDrawer()}/>
              <TodoLists/>
              <FooterBar/>
            </Drawer>
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
