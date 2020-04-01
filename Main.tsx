import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack';

// load font
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { StatusBar } from 'react-native'; // to hide status bar

// redux
import {useDispatch} from 'react-redux';
import { setCategories } from './modules/category/actions';


// sqlite
import {createTables, getCategories} from './helper/sqlite'

// modal screens
import EditTodo from './screens/EditTodo';
import EditCategory from './screens/EditCategory';
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
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
  
    React.useEffect(()=>{
      StatusBar.setHidden(true);
      async function load(){
        console.log("load font")
        await Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
  
        console.log("initialize DB")
        const tableReady = await createTables();
        if(tableReady)
        {
          console.log("Table loaded")
          // get categories and store to redux
          const categories = await getCategories();
          dispatch(setCategories(categories));
        }
  
        setIsLoading(true);
      };
      load();
    }, [])
  
    if(!isLoading)
      return <AppLoading/>
    else
        return (
            <NavigationContainer >
                <Root.Navigator headerMode="none">
                    <Root.Screen name="Main" component={DrawerNavigation} options={{ title: 'Todo' }} />
                    <Root.Screen name="EditTodo" component={EditTodo} />
                    <Root.Screen name="EditCategory" component={EditCategory} /> 
                </Root.Navigator>
            </NavigationContainer>
        );
}
