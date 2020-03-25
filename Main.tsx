import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import 'react-native-gesture-handler';
import {NavigationContainer, NavigationState} from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack';

// redux
import { currentRoute } from './modules/navigation/actions';

// main navigation
import MainNavigation from './MainNavigation'

// modal screens
import AddTodo from './screens/AddTodo';


/*
 *  createStackNavigator is a function that returns an object containing 2 properties: Screen and Navigator. 
 *  Both of them are React components used for configuring the navigator. 
 *  The Navigator should contain Screen elements as its children to define the configuration for routes.
*/
const Stack = createStackNavigator();

//const Tab = createBottomTabNavigator();

/*
 *  NavigationContainer is a component which manages our navigation tree and contains the navigation state. 
 *  This component must wrap all navigators structure.
 *  Usually, we'd render this component at the root of our app, which is usually the component exported from App.js.
*/
export default function Main() {
    const dispatch = useDispatch();

    const ActiveRoute = (navigationState: NavigationState) => {
        if (!navigationState)
            return null;

        const route = navigationState.routes[navigationState.index];
        if (route.state) // if nested, dive in
            ActiveRoute(route.state as NavigationState)
        else // print current navigation
        {
            dispatch(currentRoute(route.name))
        }
    }

    return (
        <NavigationContainer onStateChange={(state) => ActiveRoute(state)}>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="Main" component={MainNavigation} options={{ title: 'Todo' }} />
                <Stack.Screen name="AddTodo" component={AddTodo} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
