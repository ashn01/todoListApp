import { NativeModules } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

// interface
import ISettings from '../interfaces/ISettings'

// widget
const SharedStorage = NativeModules.SharedStorage;

const NOTIFICATIONOPTIONS = "NOTIFICATIONOPTIONS"
const TODOOPTIONS = "TODOOPTIONS"

export async function SetCategoryOnWidget(category:string, delayed:boolean) {
    SharedStorage.set(
        JSON.stringify({selectedCategory:category, showDelayed:delayed})
    );
}

export async function SetNotificationOptions(noticeable:boolean, time:number){
    AsyncStorage.setItem(NOTIFICATIONOPTIONS, JSON.stringify({noticeable:noticeable, time:time}));
}

export async function SetTodoOptions(defaultDeadlineTime:number){
    AsyncStorage.setItem(TODOOPTIONS, JSON.stringify({defaultDeadlineTime:defaultDeadlineTime}));
}


export async function GetAllOptions():Promise<ISettings> {
    // get Widget Options
    const sCate = await SharedStorage.getSelectedCategory();
    const sDelay = await SharedStorage.getShowDelayed();

    // get Notification Options
    var notificationOptions:{noticeable:boolean, time:number} = {noticeable:false, time:5};
    await AsyncStorage.getItem(NOTIFICATIONOPTIONS,(err,value)=>{
        if(err == null){
            notificationOptions = JSON.parse(value);
        }
    })

    // get Todo Options
    var todoOptions:{defaultDeadlineTime:number} = {defaultDeadlineTime:60};
    await AsyncStorage.getItem(TODOOPTIONS,(err,value)=>{
        if(err == null){
            todoOptions = JSON.parse(value);
        }
    })

    const s:ISettings = {
        selectedCategory : sCate,
        showDelayed : sDelay,
        noticeable: notificationOptions === null ? false:notificationOptions.noticeable,
        time:notificationOptions === null ? 5 : notificationOptions.time,
        defaultDeadlineTime:todoOptions===null ? 60 : todoOptions.defaultDeadlineTime,
    }
    return s;
}
