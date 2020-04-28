import { Toast } from 'native-base'


export function validationName(name:string):boolean{
    const trimName = name.trim();
    return trimName.length !== 0;
}

export function isDelayed(date:Date):boolean{
    return new Date(date) < new Date();
}