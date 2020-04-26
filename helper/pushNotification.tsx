import PushNotification from 'react-native-push-notification'
import ITodo from '../interfaces/ITodo'


const _registerLocalNotification = (todo:ITodo) =>{
    //PushNotification.setApplicationIconBadgeNumber(0);
    //PushNotification.cancelAllLocalNotifications();

    var date = new Date(todo.todoDeadline)
    date.setSeconds(0);

    PushNotification.localNotificationSchedule({
        message:todo.todoName, // required
        id:todo.id.toString(),
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
        date:date,
    })
}

export default{
    register:async()=>{
        PushNotification.configure({
            onNotification:(notification)=>{
                // required on IOS only
                // notification.finish(PushNotificationIOS.FetchResult.NoData);
                if (notification.action == 'Open') {
                    //console.log(notification.action)
                }
                
                PushNotification.clearLocalNotification(parseInt(notification.id,10))
            },
            onRegister:function(token){
                console.log("TOKEN:", token);

            },
            popInitialNotification:true,
        });
    },
    addNotification:(todo:ITodo)=>{
        console.log("Added push",todo.todoName)
        _registerLocalNotification(todo);
    },
    reset:()=>{
        PushNotification.cancelAllLocalNotifications();
    },

    unregister:()=>{

    }
}
