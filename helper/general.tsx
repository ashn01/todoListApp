export function validationName(name:string):boolean{
    const trimName = name.trim();

    return trimName.length !== 0;
}