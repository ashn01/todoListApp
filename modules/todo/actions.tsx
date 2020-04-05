import ITodo from "../../interfaces/ITodo";

// action type
export const SELECTED_TODO = 'todo/SELECTED_TODO' as const;
export const SET_TODOS = 'todo/SET_TODOS'  as const
export const UPDATE_TODO = 'todo/UPDATE_TODO'  as const
export const ADD_TODO = 'todo/ADD_TODO'  as const
export const DELETE_TODO = 'todo/DELETE_TODO'  as const

// action function
export const selectedTodo = (todoId : number) =>({
    type:SELECTED_TODO,
    payload:todoId
});

export const setTodos = (todos : ITodo[]) =>({
    type:SET_TODOS,
    payload:todos
})

export const updateTodo = (todo:ITodo) => ({
    type:UPDATE_TODO,
    payload:todo
})

export const addTodo = (todo:ITodo) => ({
    type:ADD_TODO,
    payload:todo
})

export const deleteTodo = (id:number) => ({
    type:DELETE_TODO,
    payload:id
})

export type TodoAction = 
| ReturnType<typeof selectedTodo>
| ReturnType<typeof setTodos>
| ReturnType<typeof updateTodo>
| ReturnType<typeof addTodo>
| ReturnType<typeof deleteTodo>;