import { Toast } from 'native-base'


export function validationName(name:string):boolean{
    const trimName = name.trim();
    return trimName.length !== 0;
}

export function isDelayed(date:Date):boolean{
    return date < new Date();
}

export function makeToast(text:string, type:"danger"|"success"|"warning", duration:number){
    Toast.show({
        text:text,
        buttonText:'Close',
        type:type,
        duration:duration,
        style:{bottom:'50%'}
    })
}