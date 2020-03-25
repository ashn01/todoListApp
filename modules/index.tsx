import {combineReducers} from 'redux';
import navigation from './navigation/reducer';


const rootReducer = combineReducers({
    navigation,
})

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;