import {StyleSheet} from 'react-native'
import {Platform} from 'react-native';

const styles = StyleSheet.create({
    headerBackground : {
        backgroundColor:'#B7BABB'
    },
    headerHeight : {
        height: Platform.OS === 'ios' ? 64 : 52,
    }
})

export default styles