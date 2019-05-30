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
import firebase from 'firebase';


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
  componentDidMount() {
    // current logged in user
    console.log("CURRENT USER: ");
    console.log(this.props.screenProps.data.currentUser);
    // duration (hrs)
    console.log("DURATION: ");
    console.log(this.props.navigation.state.params.eventDetails.selectedHours + " hrs");
    // duration (mins already at interval of 30)
    console.log(this.props.navigation.state.params.eventDetails.selectedMinutes + " mins");
    // list of invited users and their schedules including current user
    console.log("INVITED MEMBERS: ");
    console.log(this.props.navigation.state.params.invited);
  }

  sendInvites = (meetingInfo) => {
    var members = this.props.navigation.state.params.invited.map(i => {
      return {
        email: i["Email"],
        status: (i["Email"] == this.props.screenProps.data.currentUser) ? 2 : 1, // 0: declined, 1: invited, 2: accepted
        isOwner: (i["Email"] == this.props.screenProps.data.currentUser) ? true : false,
        uid: i["uid"]
      }
    });

    const newMeeting = {
      title: this.props.navigation.state.params.eventDetails["eventName"],
      duration_hour: this.props.navigation.state.params.eventDetails["selectedHours"],
      duration_minute: this.props.navigation.state.params.eventDetails["selectedMinutes"],
      members: members,
      day: meetingInfo.day,
      startTime: meetingInfo.startTime,
      endTime: meetingInfo.endTime
    }

    firebase.app().database().ref('Meetings/').push({
      ...newMeeting
    }).then((data) => {
      console.log('data ' , data)
    }).catch((error) => {
      console.log('error ' , error)
    });

    alert('Successfully Invited Members!');
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Optimal Meeting Times</Text>
        <TouchableOpacity style={styles.meetingContainer} onPress={() => { this.sendInvites( {day: "Monday", startTime: "16:00", endTime: "18:00"} ) }}>
          <Text style={styles.meetingDay}>Monday</Text>
          <Text style={styles.meetingMembers}>Members: 4</Text>
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
