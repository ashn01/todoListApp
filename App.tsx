import React from 'react';

import {Root} from 'native-base'
import { StatusBar, Animated } from 'react-native'; // to hide status bar

// redux
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './modules';

import Main from './Main'

const store = createStore(rootReducer);

export default function App() {
  React.useEffect(()=>{
    StatusBar.setHidden(true);
    Animated.timing(new Animated.Value(0), {
      toValue: 1,
      duration: 500,
      useNativeDriver: true, // <-- Add this
    }).start();
  })
    return (
      <Provider store={store}>
        <Root>
          <Main/>
        </Root>
      </Provider>
    );
}