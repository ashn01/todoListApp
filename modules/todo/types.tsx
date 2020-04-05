import * as actions from './actions'
import ITodo from '../../interfaces/ITodo'

export type Todo = {
    todoId : number;
    todos : ITodo[];
}

export const initialState: Todo = {
    todoId:0,
    todos: []
}