import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Settings({navigation}:any) {
  return (
    <View style={styles.container}>
      <Text>This is Settings!</Text>
    </View>
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
