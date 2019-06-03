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
    // // current logged in user
    // console.log("CURRENT USER: ");
    // console.log(this.props.screenProps.data.currentUser);
    // // duration (hrs)
    // console.log("DURATION: ");
    // console.log(this.props.navigation.state.params.eventDetails.selectedHours + " hrs");
    // // duration (mins already at interval of 30)
    // console.log(this.props.navigation.state.params.eventDetails.selectedMinutes + " mins");
    // // list of invited users and their schedules including current user
    // console.log("INVITED MEMBERS: ");
    // console.log(this.props.navigation.state.params.invited);
    
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
    var days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    var blocksize = 2*parseInt(this.props.navigation.state.params.eventDetails.selectedHours);
    blocksize += this.props.navigation.state.params.eventDetails.selectedMinutes == '00' ? 0:1;
    var bestTimeMap = scheduleBestTime.scheduleBestTime(blocksize,this.props.navigation.state.params.invited);
    var day1 = days[(bestTimeMap[0].startTime.split(":")[0])-1];
    var day2 = days[(bestTimeMap[1].startTime.split(":")[0])-1];
    var day3 = days[(bestTimeMap[2].startTime.split(":")[0])-1];
    var duration1 ="Starting at "+bestTimeMap[0].startTime.split(":")[1] + ":" +bestTimeMap[0].startTime.split(":")[2];
    var duration2 ="Starting at "+bestTimeMap[1].startTime.split(":")[1] + ":" +bestTimeMap[1].startTime.split(":")[2];
    var duration3 ="Starting at "+bestTimeMap[2].startTime.split(":")[1] + ":" +bestTimeMap[2].startTime.split(":")[2];
    var members = [];
    for(var i = 0; i<3; i++){
      members[i] = "Members: ";
      for(var j = 0; j<bestTimeMap[i].people.length; j++){
        if(j!=0){
          members[i] += ", ";
        }
        members[i] += bestTimeMap[i].people[j];
      }
    }
    
    // Start is a string like "12:30"
    // Duration is a string like "1:30"
    function getEndTime(start,duration){
      var durationHours = parseInt(duration.split(":")[0]);
      var durationMinutes = parseInt(duration.split(":")[1]);
      var count = durationHours*2+durationMinutes/30;
      var endHour = parseInt(start.split(":")[0]);
      var endMinute = parseInt(start.split(":")[1]);
      while(count>0){
        if(endMinute == 30){
          endMinute = 0;
          endHour++;
        }
        else{
          endMinute = 30;
        }
        count--;
        console.log(endHour+":"+endMinute);
      }
      return endHour+":"+endMinute;
    }

    return (
      <ScrollView style={styles.container}>
        <Text>Optimal Meeting Times</Text>
        <TouchableOpacity style={styles.meetingContainer} onPress={() => { this.sendInvites( {day: day1, startTime:duration1, endTime: "18:00"} ) }}>
          <Text style={styles.meetingDay}>{day1}</Text>
          <Text style={styles.meetingMembers}>{members[0]}</Text>
          <Text style={styles.meetingTime}>{duration1}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.meetingContainer} onPress={() => { this.sendInvites( {day: day2, startTime:duration2, endTime: "18:00"} ) }}>
          <Text style={styles.meetingDay}>{day2}</Text>
          <Text style={styles.meetingMembers}>{members[1]}</Text>
          <Text style={styles.meetingTime}>{duration2}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.meetingContainer} onPress={() => { this.sendInvites( {day: day3, startTime: duration3, endTime: "18:00"} ) }}>
          <Text style={styles.meetingDay}>{day3}</Text>
          <Text style={styles.meetingMembers}>{members[2]}</Text>
          <Text style={styles.meetingTime}>{duration3}</Text>
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
