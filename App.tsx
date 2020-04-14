import React from 'react';

import {Root} from 'native-base'
import { StatusBar } from 'react-native'; // to hide status bar

// redux
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './modules';

import Main from './Main'

const store = createStore(rootReducer);

export default function App() {
  React.useEffect(()=>{
    StatusBar.setHidden(true);
  })
    return (
      <Provider store={store}>
        <Root>
        <Main/>

        </Root>
      </Provider>
    );
}

/*

app opening => load all categories and todos

running => {
	add category => save and load from DB and set state
	delete category => save and load from DB and set state
	edit category => save and load from DB and set state
	
	add todo => save and load from DB and set state
	delete todo => save and load from DB and set state
  edit todo => save and load from DB and set state
  
} if any performance issues, save DB and set state

*/