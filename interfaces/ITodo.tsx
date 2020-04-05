
export default interface ITodo {
    key:string | null,
    id : number | null,
    todoName : string,
    todoDescription : string,
    todoDeadline : Date,
    todoCompleted : boolean | number,
    color: string | null,
    categoryId : number
}