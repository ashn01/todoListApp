import {combineReducers} from 'redux';
import navigation from './navigation/reducer';
import category from './category/reducer'
import todo from './todo/reducer'


const rootReducer = combineReducers({
    navigation,
    category,
    todo,
    
})

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;