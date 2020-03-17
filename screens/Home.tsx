import React from 'react';
import { StyleSheet, View} from 'react-native';
import {Layout, Tab, TabView, Text,} from '@ui-kitten/components';

import Header from '../components/header/Header'

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

const dummy : category[] =[
    {
        ID:1,
        CategoryName:"Category1",
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
    },
    {
        ID:2,
        CategoryName:"Category2",
        Owner:null,
        todos :[
            {
                ID : 2,
                TodoName: "Something to do",
                TodoDescription : "",
                TodoDeadline : new Date(),
                TodoCompleted : false,
                NewCategoryId : 2
            }
        ]
    }
]

export default function Home() {

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    return (
        <View>
            <Header/>
            <TabView
                selectedIndex={selectedIndex}
                onSelect={setSelectedIndex}>
                {
                    dummy.map((v, i) => {
                        return (
                            <Tab title={v.CategoryName} key={i}>
                                <Layout style={styles.container}>
                                    <Text>Helloworld</Text>
                                </Layout>
                            </Tab>
                        )
                    })
                }
            </TabView>
        </View>

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
