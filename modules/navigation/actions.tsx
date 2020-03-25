// action type
export const CURRENT_ROUTE = 'navigation/CURRENT_ROUTE';

// action function
export const currentRoute = (route : string) =>({
    type:CURRENT_ROUTE,
    payload:route
});

export type NavigationAction = | ReturnType<typeof currentRoute>;