import React, { Component } from 'react';
let scheduleBestTime = require('../constants/Scheduler.js');
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Button
} from 'react-native';


/*
flow of data.
1. From user database data and event preferences, send it to scheduleBestTime.
2. From return of scheduleBestTime, display the best times from first to last using a for loop.
3. Each best time slot (maybe look like blocks) should be able to be clickable and action is schedule meeting.
*/

// We have access to.
// user database -> this.props.screenProps.CurrentUser
// block size -> this.props.naviagation.state.params.eventDetails
export default class MeetingTimesScreen extends React.Component {
  render() {

    return (
      <ScrollView style={styles.container}>
        <Text>Optimal Meeting Times</Text>
        <TouchableOpacity style={styles.meetingContainer}>
          <Text style={styles.meetingDay}>Monday</Text>
          <Text style={styles.meetingMembers}>Members: 4</Text>
          <Text style={styles.meetingTime}>4:00pm - 6:00pm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.meetingContainer}>
          <Text style={styles.meetingDay}>Tuesday</Text>
          <Text style={styles.meetingMembers}>Members: 4</Text>
          <Text style={styles.meetingTime}>5:00pm - 7:00pm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.meetingContainer}>
          <Text style={styles.meetingDay}>Friday</Text>
          <Text style={styles.meetingMembers}>Members: 3</Text>
          <Text style={styles.meetingTime}>4:00pm - 6:00pm</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%'
  },
  meetingContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: 100,
    borderColor: '#000000',
    borderWidth: 2,
  },
  meetingDay: {
    fontSize: 20
  },
  meetingMembers: {
    fontSize: 15
  },
  meetingTime: {
    fontSize: 20
  }
});
