import { Todo, initialState } from './types';
import {
    TodoAction, 
    SELECTED_TODO, 
    SET_TODOS, 
    UPDATE_TODO, 
    ADD_TODO,
    DELETE_TODO
} from './actions';


function navigation(state: Todo = initialState, action: TodoAction) : Todo{
    switch(action.type){
        case SELECTED_TODO:
            return {
                ...state,
                todoId : action.payload
            };
        case SET_TODOS:
            return {
                ...state,
                todos : action.payload
            }
        case UPDATE_TODO:
            return {
                ...state,
                todos : state.todos.map(c => c.id === action.payload.id ? action.payload : c)
            }
        case ADD_TODO:
            return {
                ...state,
                todos: state.todos.concat(action.payload)
            }
        case DELETE_TODO:
            return {
                ...state,
                todoId:0,
                todos: state.todos.filter(c=>c.id !== action.payload)
            }
        default:
            return state;
    }
}

export default navigation;