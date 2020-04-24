import { NativeModules } from 'react-native';

// widget
const SharedStorage = NativeModules.SharedStorage;

export async function SetCategoryOnWidget(category:string) {
    SharedStorage.set(
        JSON.stringify({value:category})
    );
}

export async function GetCategoryOnWidget():string {
    const ret = await SharedStorage.get();
    console.log(ret);
    return ret
}
