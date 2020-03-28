// action type
export const SELECTED_CATEGORY = 'category/SELECTED_CATEGORY';

// action function
export const selectedCategory = (categoryId : number) =>({
    type:SELECTED_CATEGORY,
    payload:categoryId
});

export type CategoryAction = | ReturnType<typeof selectedCategory>;