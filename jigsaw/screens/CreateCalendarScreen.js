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

export default class CreateCalendarEventScreen extends Component {
  state = {
    name: "",
    day: "",
    selectedDate: null,
    startTime: "",
    endTime: "",
    busy: 0
  }

  onDateChange = (date) => {
    this.setState({selectedDate: date})
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <View style={styles.container}>
          <CalendarPicker onDateChange={this.onDateChange}/>
          <Input labelStyle={styles.inputLabel} containerStyle={styles.inputName} label='Event Name:' onChangeText={val => this.setState({name: val})} value={this.state.name}/>
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
      marginTop: 25,
  },
});
