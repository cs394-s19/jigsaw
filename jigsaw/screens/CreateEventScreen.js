import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import CreateEventForm from '../components/CreateEventForm';

export default class CreateEventScreen extends Component {    
    render() {
        return (
            <View style={styles.container}>
                <CreateEventForm />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#36458f',
        paddingLeft: 60,
        paddingRight: 60
    },
});