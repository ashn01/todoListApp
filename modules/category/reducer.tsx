import { Category, initialState } from './types';
import {
    CategoryAction, 
    SELECTED_CATEGORY, 
    SET_CATEGORIES, 
    UPDATE_CATEGORY, 
    ADD_CATEGORY,
    DELETE_CATEGORY
} from './actions';


function navigation(state: Category = initialState, action: CategoryAction) : Category{
    switch(action.type){
        case SELECTED_CATEGORY:
            return {
                ...state,
                categoryId : action.payload
            };
        case SET_CATEGORIES:
            return {
                ...state,
                categories : action.payload
            }
        case UPDATE_CATEGORY:
            return {
                ...state,
                categories : state.categories.map(c => c.id === action.payload.id ? action.payload : c)
            }
        case ADD_CATEGORY:
            return {
                ...state,
                categories: state.categories.concat(action.payload)
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                categoryId:0,
                categories: state.categories.filter(c=>c.id !== action.payload)
            }
        default:
            return state;
    }
}

export default navigation;