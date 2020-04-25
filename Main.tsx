import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack';
import SplashScreen  from 'react-native-splash-screen'

// redux
import {useDispatch} from 'react-redux';
import { setCategories } from './modules/category/actions';

// sqlite
import {createTables, getCategories, connect} from './helper/sqlite'

// screens
import Loading from './Loading'
import EditTodo from './screens/EditTodo';
import EditCategory from './screens/EditCategory';
import DrawerNavigation from './DrawerNavigation';
import Setting from './screens/Settings'


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
      async function load(){  
        console.log("initialize DB")
        await connect();
        const tableReady = await createTables();
        if(tableReady)
        {
          console.log("Table loaded")
          // get categories and store to redux
          const categories = await getCategories();
          dispatch(setCategories(categories));

          setIsLoading(true);
          SplashScreen.hide();
        }
      };
      load();
    }, [])
  
    if(!isLoading)
      return <Loading/>
    else
        return (
            <NavigationContainer >
                <Root.Navigator headerMode="none">
                    <Root.Screen name="Main" component={DrawerNavigation} options={{ title: 'Todo' }} />
                    <Root.Screen name="EditTodo" component={EditTodo} />
                    <Root.Screen name="EditCategory" component={EditCategory} /> 
                    <Root.Screen name="Setting" component={Setting}/>
                </Root.Navigator>
            </NavigationContainer>
        );
}
