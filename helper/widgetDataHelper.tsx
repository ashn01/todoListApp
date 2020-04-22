import { NativeModules } from 'react-native';
import {getAllTodosName} from './sqlite'

// widget
const SharedStorage = NativeModules.SharedStorage;

export default async function SendAllTodos() {
    const todos = await getAllTodosName();
    console.log(todos)
    SharedStorage.set(
        JSON.stringify({text: todos})
    );
}