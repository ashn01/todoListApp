import ICategory from "../../interfaces/ICategory";

// action type
export const SELECTED_CATEGORY = 'category/SELECTED_CATEGORY' as const;
export const SET_CATEGORIES = 'category/SET_CATEGORIES'  as const
export const UPDATE_CATEGORY = 'category/UPDATE_CATEGORY'  as const
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

export const updateCategory = (category:ICategory) => ({
    type:UPDATE_CATEGORY,
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
| ReturnType<typeof updateCategory>
| ReturnType<typeof addCategory>
| ReturnType<typeof deleteCategory>;