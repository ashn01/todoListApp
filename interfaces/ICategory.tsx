import ITodo from './ITodo'

export default interface ICategory {
    key:string|null,
    id : number|null, // unique
    categoryName : string,
    color:string,
    checked:boolean|number, // checked to be shown
    Owner : string | null
}