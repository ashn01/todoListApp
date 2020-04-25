import { NativeModules } from 'react-native';

interface Settings{
    selectedCategory:string,
    showDelayed:boolean
}

// widget
const SharedStorage = NativeModules.SharedStorage;

export async function SetCategoryOnWidget(category:string, delayed:boolean) {
    SharedStorage.set(
        JSON.stringify({selectedCategory:category, showDelayed:delayed})
    );
}

export async function GetCategoryOnWidget():Promise<Settings> {
    const sCate = await SharedStorage.getSelectedCategory();
    const sDelay = await SharedStorage.getShowDelayed();



    const s:Settings = {
        selectedCategory : sCate,
        showDelayed : sDelay
    }
    return s;
}
