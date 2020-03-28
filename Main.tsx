import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack';


// modal screens
import AddTodo from './screens/AddTodo';

import DrawerNavigation from './DrawerNavigation'

/*
 *  createStackNavigator is a function that returns an object containing 2 properties: Screen and Navigator. 
 *  Both of them are React components used for configuring the navigator. 
 *  The Navigator should contain Screen elements as its children to define the configuration for routes.
*/
const Root = createStackNavigator();

//const Tab = createBottomTabNavigator();

/*
 *  NavigationContainer is a component which manages our navigation tree and contains the navigation state. 
 *  This component must wrap all navigators structure.
 *  Usually, we'd render this component at the root of our app, which is usually the component exported from App.js.
*/
export default function Main() {
    return (
        <NavigationContainer >
            <Root.Navigator headerMode="none">
                <Root.Screen name="Main" component={DrawerNavigation} options={{ title: 'Todo' }} />
                <Root.Screen name="AddTodo" component={AddTodo} />
            </Root.Navigator>
        </NavigationContainer>
    );
}
