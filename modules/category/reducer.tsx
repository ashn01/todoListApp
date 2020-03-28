import { Category, initialState } from './types';
import {SELECTED_CATEGORY, CategoryAction} from './actions';


function navigation(state: Category = initialState, action: CategoryAction) : Category{
    switch(action.type){
        case SELECTED_CATEGORY:
            return {
                categoryId : action.payload
            };
        default:
            return state;
    }
}

export default navigation;