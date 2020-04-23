import { NativeModules } from 'react-native';
import {getAllTodosName} from './sqlite'

// widget
const SharedStorage = NativeModules.SharedStorage;

export default async function SendAllTodos() {
    const todos = await getAllTodosName();
    
    SharedStorage.set(
        JSON.stringify({text: todos})
    );
}