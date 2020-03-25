import React, { useState } from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons'; // use Icons
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { StatusBar } from 'react-native'; // to hide status bar

// screens
import Todo from './screens/Todo';
import Settings from './screens/Settings';


/*
 *  createStackNavigator is a function that returns an object containing 2 properties: Screen and Navigator. 
 *  Both of them are React components used for configuring the navigator. 
 *  The Navigator should contain Screen elements as its children to define the configuration for routes.
*/
// const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

/*
 *  NavigationContainer is a component which manages our navigation tree and contains the navigation state. 
 *  This component must wrap all navigators structure. 
 *  Usually, we'd render this component at the root of our app, which is usually the component exported from App.js.
*/
export default function MainNavigation() {
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(()=>{
    StatusBar.setHidden(true);
    async function loadFont(){
      console.log("async")
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
      });
      setIsLoading(true);
    };
    loadFont();
  }, [])

  if(!isLoading)
    return <AppLoading/>
  else
    return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Todo') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
              } else if (route.name === 'Completed') {
                iconName = focused ? 'ios-list-box' : 'ios-list';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Todo" component={Todo} options={{ title: 'Todo' }} />
          <Tab.Screen name="Completed" component={Todo} />
        </Tab.Navigator>
    );
}
