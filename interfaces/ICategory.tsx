import ITodo from './ITodo'

export default interface ICategory {
    ID : number,
    CategoryName : string,
    Owner : string | null,
    todos : [ITodo] | null
}