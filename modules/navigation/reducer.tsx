import { Navigation, initialState } from './types';
import {NavigationAction} from './actions';
import {CURRENT_ROUTE} from './actions';


function navigation(state: Navigation = initialState, action: NavigationAction) : Navigation{
    switch(action.type){
        case CURRENT_ROUTE:
            return {
                route : action.payload
            };
        default:
            return state;
    }
}

export default navigation;