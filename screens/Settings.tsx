import React from 'react';
import { StyleSheet } from 'react-native';
import {Container,Content} from 'native-base'
import SettingHeaderBar from './SettingHeaderBar'

export default function Settings({navigation}:any) {
  return (
    <Container>
      <SettingHeaderBar/>
      <Content>

      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
