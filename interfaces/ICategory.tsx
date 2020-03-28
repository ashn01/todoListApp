import ITodo from './ITodo'

export default interface ICategory {
    key:string,
    ID : number, // unique
    CategoryName : string,
    color:string,
    checked:boolean, // checked to be shown
    Owner : string | null
}