import ICategory from "../../interfaces/ICategory";

// action type
export const SELECTED_CATEGORY = 'category/SELECTED_CATEGORY' as const;
export const SET_CATEGORIES = 'category/SET_CATEGORIES'  as const
export const SET_CATEGORY = 'category/SET_CATEGORY'  as const
export const ADD_CATEGORY = 'category/ADD_CATEGORY'  as const
export const DELETE_CATEGORY = 'category/DELETE_CATEGORY'  as const

// action function
export const selectedCategory = (categoryId : number) =>({
    type:SELECTED_CATEGORY,
    payload:categoryId
});

export const setCategories = (categories : ICategory[]) =>({
    type:SET_CATEGORIES,
    payload:categories
})

export const setCategory = (category:ICategory) => ({
    type:SET_CATEGORY,
    payload:category
})

export const addCategory = (category:ICategory) => ({
    type:ADD_CATEGORY,
    payload:category
})

export const deleteCategory = (id:number) => ({
    type:DELETE_CATEGORY,
    payload:id
})

export type CategoryAction = 
| ReturnType<typeof selectedCategory>
| ReturnType<typeof setCategories>
| ReturnType<typeof setCategory>
| ReturnType<typeof addCategory>
| ReturnType<typeof deleteCategory>;