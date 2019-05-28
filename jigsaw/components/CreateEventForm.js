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
import DateTimePicker from "react-native-modal-datetime-picker";

import DateTimePicker from "react-native-modal-datetime-picker";

export default class CreateEventForm extends Component {
    state = {
        eventName: '',
        selectedHours: 0,
        selectedMinutes: 0,
        isDateTimePickerVisible: false,
    };

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        this.setState({ selectedHours: date.getHours(), selectedMinutes: date.getMinutes() });
        this.hideDateTimePicker();
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
                        <Text style={styles.timeInput}>
                            {this.state.selectedHours !== 0 ? (this.state.selectedHours > 12 ? (this.state.selectedHours - 12) : this.state.selectedHours) : '00'}
                            :
                            {this.state.selectedMinutes === 0 ? '00' : this.state.selectedMinutes}
                            {this.state.selectedHours >= 12 ? 'PM' : 'AM'}
                        </Text>
                    </View>
                    <Button style={styles.chooseTimeButton} title="Choose Meeting Duration" onPress={this.showDateTimePicker}/>
                    <View style={styles.timePicker}>
                        <DateTimePicker
                            mode='time'
                            isVisible={ this.state.isDateTimePickerVisible }
                            onConfirm={ this.handleDatePicked }
                            onCancel={ this.hideDateTimePicker }
                            minuteInterval={30}
                            date={new Date(String(this.state.selectedHours) + ":" + String(this.state.selectedMinutes))}
                        />
                    </View>
                </View>

                <Button buttonStyle={styles.addButton} title='Create Event' onPress={() => {this.props.submitEvent({...this.state})}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    chooseTimeButton: {
        margin: 10
    },
    container: {
        flexDirection: 'column',
    },
    meetingName: {
        position: 'absolute',
        top: 40,
    },
    timeField: {
        flex: 1,
        width: '100%',
        top: 125,
        alignItems: 'stretch',
    },
    timeLabel: {
        flex: 4,
        fontSize: 20,
        marginLeft: 10,
        color: 'black',
        paddingTop: 30
    },
    timeInput: {
        flex: 6,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: '40%',
        justifyContent: 'center',
        alignContent: 'center',
        color: 'steelblue',
        paddingTop: 20,
        paddingBottom: 20,
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
        margin: 10,
    },
    inputLabel: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'normal',
    }
});
