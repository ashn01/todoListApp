
export default interface ITodo {
    ID : number | null,
    TodoName : string,
    TodoDescription : string,
    TodoDeadline : Date,
    TodoCompleted : boolean,
    color:string,
    NewCategoryId : number
}