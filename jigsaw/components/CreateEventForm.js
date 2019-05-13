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

    onChangeText = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    submitEvent = () => {
        console.log(this.state);
        const eventDetails = {...this.state};
        this.setState({
            eventName: '',
            selectedHours: 0,
            selectedMinutes: 0
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.eventfield}>
                    <Text style={styles.fieldlabel}>Event Name: </Text>
                    <TextInput style={styles.fieldinput}
                        placeholder="Event name"
                        onChangeText={val => this.setState({
                            eventName: val
                        })}
                        value = {this.state.eventName}

                    />
                </View>
                <View style={styles.timefield}>
                    <Text style={styles.timelabel}>Duration:</Text>
                    <Text style={styles.timeinput}> {this.state.selectedHours}hr:{this.state.selectedMinutes}min</Text>
                    <View style={styles.timepicker}>
                        <TimePicker
                            selectedHours={this.state.selectedHours}
                            selectedMinutes={this.state.selectedMinutes}
                            onChange={(hours, minutes) =>
                                this.setState({ selectedHours: hours, selectedMinutes: minutes })
                            }
                        />
                    </View>
                </View>

                <View style={styles.formbutton}>
                    <TouchableOpacity style={styles.addButton} onPress={this.submitEvent}>
                        <Text style={styles.addButtonText}>Create Event</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
    },
    eventfield: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        top: 30,
        width: '100%',
        height: 50,
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 2
    },
    fieldlabel: {
        flex: 4,
        justifyContent: 'center',
        left: 10
    },
    fieldinput: {
        flex: 6,
        color: 'black',
        justifyContent: 'center',
        left: 10
    },
    timefield: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        top: 120,
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 2
    },
    timelabel: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    timeinput: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    timepicker: {
        width: '100%',
        height: '70%',
        justifyContent: 'center'
    },
    formbutton: {
        position: 'absolute',
        top: 450,
        alignItems: 'center',
        width: '100%'
    },
    addButton: {
      backgroundColor: 'blue',
      width: 200,
      height: 70,
      alignItems: 'center', 
      justifyContent: 'center'
    },
    addButtonText: {
      color: 'white',
      fontSize: 24
    }
});