import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
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

    render() {
        return (
            <View style={styles.container}>
                <Input labelStyle={styles.inputLabel} containerStyle={styles.meetingName} label='Event Name:' onChangeText={val => this.setState({eventName: val})} value={this.state.eventName}/>

                <View style={styles.timeField}>
                    <Text style={styles.timeLabel}>Duration:</Text>
                    <View style={styles.time}>
                        <Text style={styles.timeInput}> {this.state.selectedHours}hr {this.state.selectedMinutes}min</Text>
                    </View>
                    <View style={styles.timePicker}>
                        <TimePicker
                            selectedHours={this.state.selectedHours}
                            selectedMinutes={this.state.selectedMinutes}
                            onChange={(hours, minutes) =>
                                this.setState({ selectedHours: hours, selectedMinutes: minutes })
                            }
                        />
                    </View>
                </View>
                <Button style={styles.addButton} title='Create Event' onPress={() => {this.props.submitEvent({...this.state})}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    meetingName: {
        //position: 'absolute',
        top: 25,
    },
    timeField: {
        flex: 1,
        width: '100%',
        //top: 125,
        alignItems: 'stretch',
    },
    timeLabel: {
        flex: 4,
        fontSize: 18,
        marginLeft: 10,
        color: 'gray',
        fontWeight: 'bold',
    },
    timeInput: {
        flex: 6,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: '40%',
        justifyContent: 'center',
        alignContent: 'center',
        color: 'steelblue',
    },
    time: {
        justifyContent: 'center',
        alignContent: 'center',
    },
    timePicker: {
        width: '100%',
        height: '70%',
        justifyContent: 'center',
    },
    addButton: {
        alignItems: 'center',
        justifyContent: 'center',
        top: 200,
    },
    inputLabel: {
        fontSize: 18,
        color: 'gray',
    }
});
