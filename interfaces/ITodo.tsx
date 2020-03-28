
export default interface ITodo {
    key:string,
    ID : number | null,
    TodoName : string,
    TodoDescription : string,
    TodoDeadline : Date,
    TodoCompleted : boolean,
    NewCategoryId : number
}