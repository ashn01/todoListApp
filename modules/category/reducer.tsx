import { Category, initialState } from './types';
import {CategoryAction, SELECTED_CATEGORY, SET_CATEGORIES, SET_CATEGORY} from './actions';


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
        case SET_CATEGORY:
            var list = state.categories
            list.map(c=>c.id === action.payload.id ? c = action.payload : c)
            return {
                ...state,
                [action.payload.id] : action.payload
            }
        default:
            return state;
    }
}

export default navigation;