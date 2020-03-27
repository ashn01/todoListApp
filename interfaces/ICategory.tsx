import ITodo from './ITodo'

export default interface ICategory {
    ID : number, // unique
    CategoryName : string,
    color:string,
    checked:boolean, // checked to be shown
    Owner : string | null
}