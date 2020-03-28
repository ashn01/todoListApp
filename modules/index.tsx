import {combineReducers} from 'redux';
import navigation from './navigation/reducer';
import category from './category/reducer'


const rootReducer = combineReducers({
    navigation,
    category,
    
})

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;