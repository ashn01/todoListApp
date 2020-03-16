import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface todo {
    ID : number | null,
    TodoName : string,
    TodoDescription : string,
    TodoDeadline : Date,
    TodoCompleted : boolean,
    NewCategoryId : number
}

interface category {
    ID : number,
    CategoryName : string,
    Owner : string | null,
    todos : [todo] | null
}

const dummy : category = {
    ID:1,
    CategoryName:"Dummy",
    Owner:null,
    todos :[
        {
            ID : 1,
            TodoName: "Something to do",
            TodoDescription : "",
            TodoDeadline : new Date(),
            TodoCompleted : false,
            NewCategoryId : 1
        }
    ]
}

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>This is Todo!</Text>
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
