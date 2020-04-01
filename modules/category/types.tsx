import * as actions from './actions'
import ICategory from '../../interfaces/ICategory'

export type Category = {
    categoryId : number;
    categories : ICategory[];
}

export const initialState: Category = {
    categoryId:0,
    categories: []
}