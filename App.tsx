import React, { useState } from 'react';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { StatusBar } from 'react-native'; // to hide status bar

// redux
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './modules';

import Main from './Main'

const store = createStore(rootReducer);

export default function App() {
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
      <Provider store={store}>
        <Main/>
      </Provider>
    );
}
