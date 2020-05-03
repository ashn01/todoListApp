import PushNotification from 'react-native-push-notification'
import ITodo from '../interfaces/ITodo'
import ISettings from '../interfaces/ISettings'

import {isDelayed} from './general'
import { getAllTodos } from './sqlite'
import {GetAllOptions} from './SettingValues'


const _registerLocalNotification = async (todo:ITodo) =>{
    //PushNotification.setApplicationIconBadgeNumber(0);
    //PushNotification.cancelAllLocalNotifications();

    PushNotification.localNotificationSchedule({
        message:todo.todoName, // required
        id:todo.id.toString(),
        largeIcon:"doobido_icon",
        smallIcon:"doobido_icon",
        title:"Doobi-do Reminder",
        // android ONLY
        vibrate:true,
        vibration:300,
        priority:'high',
        visibility:'public',
        importance:'high',
        actions:'["Open"]',

        // IOS ONLY
        playSound:false,
        number:'1',        
        // largeIcon:"doobido_icon",

        // production
        //repeatType:"minute",
        date:todo.todoDeadline,
    })
}

export default{
    register:async()=>{
        PushNotification.configure({
            onNotification:(notification)=>{
                // required on IOS only
                // notification.finish(PushNotificationIOS.FetchResult.NoData);
                // if (notification.action == 'Open') {
                //     //console.log(notification.action)
                // }
                PushNotification.clearLocalNotification(parseInt(notification.id,10))
            },
            onRegister:function(token){
                console.log("TOKEN:", token);

            },
            popInitialNotification:true,
        });
    },
    // add Notification for all incompleted todos but not past
    addNotifications: async ()=>{
        const todos = await getAllTodos(false);
        const options:ISettings = await GetAllOptions(); // get options
        for(var todo of todos) {
            // if notification needed to be fired in the past, do not schedule notification
            var date = new Date(todo.todoDeadline)
            date.setMinutes(date.getMinutes()-options.time);
            date.setSeconds(0);
            todo.todoDeadline = date;
            if(!todo.todoCompleted && !isDelayed(todo.todoDeadline)){
                _registerLocalNotification(todo);
            }
        }
    },
    // add Notification for incompleted todo but not past
    addNotification: async (todo: ITodo) => {
        const options: ISettings = await GetAllOptions(); // get options
        var date = new Date(todo.todoDeadline)
        // if notification needed to be fired in the past, do not schedule notification
        date.setMinutes(date.getMinutes() - options.time);
        date.setSeconds(0);
        todo.todoDeadline = date;
        if (!todo.todoCompleted && !isDelayed(todo.todoDeadline)) {
            _registerLocalNotification(todo);
        }
    },
    reset: () => {
        PushNotification.cancelAllLocalNotifications();
    },
    // it should be fired when todo is completed because completed todo doesn't need reminder
    removeNotification: (todoId:number) =>{
        // Android
        PushNotification.cancelLocalNotifications({id:todoId.toString()});
    },
    unregister: () => {

    }
}
