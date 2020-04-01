import ITodo from './ITodo'

export default interface ICategory {
    key:string,
    id : number, // unique
    categoryName : string,
    color:string,
    checked:boolean|number, // checked to be shown
    Owner : string | null
}