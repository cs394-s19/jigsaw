import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';
import TimePicker from "react-native-24h-timepicker";
import firebase from 'firebase';

export default class CreateCalendarEventScreen extends Component {
  state = {
    name: "",
    selectedDate: null,
    startTime: "11:00",
    endTime: "11:00",
    busy: 1
  }

  onDateChange = (date) => {
    this.setState({selectedDate: new Date(date)})
  }

  onCancel(period) {
    if (period == "start") {
      this.StartTimePicker.close();
    } else {
      this.EndTimePicker.close();
    }
  }

  onConfirm(hour, minute, period) {
    if (period == "start") {
       this.setState({ startTime: `${hour}:${minute}` });
       this.setState({ endTime: `${hour}:${minute}` });
       this.StartTimePicker.close();
    } else {
      this.setState({ endTime: `${hour}:${minute}` });
      this.EndTimePicker.close();
    }
  }

  createEvent = () => {
    if (this.state.selectedDate != null && this.state.name != "") {
      var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      var day = weekdays[this.state.selectedDate.getDay()]; // CHANGE THIS EVENTUALLY

      const newEvent = {
        name: this.state.name,
        end: this.state.endTime,
        start: this.state.startTime,
        day: day,
        busy: this.state.busy
      }

      // firebase.app().database().ref('Users/').child(this.props.navigation.state.params.data.currentUser).push({
      //   ...newEvent
      // }).then((data) => {
      //   console.log('data ' , data)
      //   // do scheduling here maybe?
      // }).catch((error) => {
      //   console.log('error ' , error)
      // });
    } else {
      alert("Please select a date and name.");
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <View style={styles.container}>
          <CalendarPicker onDateChange={this.onDateChange}/>
          <Input labelStyle={styles.inputLabel} containerStyle={styles.inputName} label='Event Name:' onChangeText={val => this.setState({name: val})} value={this.state.name}/>

          <View style={styles.timeContainer}>
            <View>
              <Text style={styles.timeLabel}>Start Time</Text>
              <Button onPress={() => this.StartTimePicker.open()} style={styles.timeButton} title={this.state.startTime}></Button>
            </View>

            <View>
              <Text style={styles.timeLabel}>End Time</Text>
              <Button onPress={() => this.EndTimePicker.open()} style={styles.timeButton} title={this.state.endTime}></Button>
            </View>
          </View>

          <TimePicker
            ref={ref => {
              this.StartTimePicker = ref;
            }}
            selectedHour={this.state.startTime.split(":")[0]}
            selectedMinute={this.state.startTime.split(":")[1]}
            onCancel={() => this.onCancel("start")}
            onConfirm={(hour, minute) => this.onConfirm(hour, minute, "start")}
          />

          <TimePicker
            ref={ref => {
              this.EndTimePicker = ref;
            }}
            selectedHour={this.state.endTime.split(":")[0]}
            selectedMinute={this.state.endTime.split(":")[1]}
            onCancel={() => this.onCancel("end")}
            onConfirm={(hour, minute) => this.onConfirm(hour, minute, "end")}
          />

          <Button style={styles.createButton} title={"Create Event"} onPress={() => this.createEvent()}></Button>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  inputLabel: {
    fontSize: 18,
    color: 'gray',
  },
  inputName: {
      marginTop: 5,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10
  },
  timeLabel: {
    fontSize: 18,
    marginLeft: 10
  },
  createButton: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
