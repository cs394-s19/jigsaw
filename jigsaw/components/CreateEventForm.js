import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import TimePicker from 'react-native-simple-time-picker';

export default class CreateEventForm extends Component {
    state = {
        eventName: '',
        selectedHours: 0,
        selectedMinutes: 0
    };

    render() {
        return (
            <View style={styles.eventform}>
                <Text style={styles.header}>Create new event</Text>

                <View style={styles.formbody}>
                    <TextInput style={styles.textinput}
                        placeholder="Event name"
                        underlineColorAndroid={'transparent'} 
                        onChangeText={(text) => this.setState({
                                            eventName: text
                                        })}
                        value = {this.state.eventName}
                    />

                    <Text>{this.state.selectedHours}hr:{this.state.selectedMinutes}min</Text>
                    <TimePicker
                        selectedHours={this.state.selectedHours}
                        selectedMinutes={this.state.selectedMinutes}
                        onChange={(hours, minutes) =>
                            this.setState({ selectedHours: hours, selectedMinutes: minutes })
                        }
                    />
                </View>

                <View style={styles.formbutton}>
                    <TouchableOpacity style={styles.addButton} onPress={() => {this.props.switchPage('createEventPage')}}>
                        <Text style={styles.addButtonText}>Create Event</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    eventform: {
        alignSelf: 'stretch',
        position: 'absolute',
    },
    header:{
        position: 'absolute',
        fontSize: 24,
        color: '#fff',
        top: 20,
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomColor: '#199187',
        borderBottomWidth: 1,
        alignSelf: 'stretch',
    },
    formbody: {
        position: 'absolute',
        top: 40,
        paddingBottom: 10
    },
    textinput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        color: '#fff', 
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1
    },
    addButton: {
      zIndex: 11,
      backgroundColor: '#dcdcdc',
      width: 200,
      height: 70,
      alignItems: 'center', 
      justifyContent: 'center',
      elevation: 8
    },
    addButtonText: {
      color: 'blue',
      fontSize: 24
    },
    formbuttom: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10,
    },
});