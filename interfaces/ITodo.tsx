
export default interface ITodo {
    ID : number | null,
    TodoName : string,
    TodoDescription : string,
    TodoDeadline : Date,
    TodoCompleted : boolean,
    NewCategoryId : number
}