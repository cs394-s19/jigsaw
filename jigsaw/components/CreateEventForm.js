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
import TimePicker from "react-native-24h-timepicker";
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

    onCancel() {
      this.TimePicker.close();
    }

    onConfirm(hour, minute) {
      this.setState({ selectedHours: hour, selectedMinutes: minute });
      this.TimePicker.close();
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
                        </Text>
                    </View>
                    {/*
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
                    */}
                    <Button style={styles.chooseTimeButton} title="Choose Meeting Duration" onPress={() => this.TimePicker.open()}/>
                    <TimePicker
                      ref={ref => {
                        this.TimePicker = ref;
                      }}
                      selectedHour={"00"}
                      selectedMinute={"00"}
                      onCancel={() => this.onCancel()}
                      onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
                      minuteInterval={30}
                    />
                </View>

                <Button buttonStyle={styles.addButton} title='Create Meeting' onPress={() => {this.props.submitEvent({...this.state})}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    chooseTimeButton: {
        margin: 10,
        marginBottom: 20,
    },
    container: {
      paddingTop: "10%"
    },
    meetingName: {

    },
    timeField: {
        flex: 1,
        width: '100%',
        paddingTop: "10%",
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
        marginBottom: 20
    },
    addButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputLabel: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'normal',
    }
});
