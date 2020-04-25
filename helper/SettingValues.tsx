import { NativeModules } from 'react-native';

// interface
import ISettings from '../interfaces/ISettings'

// widget
const SharedStorage = NativeModules.SharedStorage;

export async function SetCategoryOnWidget(category:string, delayed:boolean) {
    SharedStorage.set(
        JSON.stringify({selectedCategory:category, showDelayed:delayed})
    );
}

export async function GetCategoryOnWidget():Promise<ISettings> {
    const sCate = await SharedStorage.getSelectedCategory();
    const sDelay = await SharedStorage.getShowDelayed();



    const s:ISettings = {
        selectedCategory : sCate,
        showDelayed : sDelay
    }
    return s;
}
