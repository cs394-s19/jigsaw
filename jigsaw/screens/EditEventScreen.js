import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import EditDescriptionForm from '../components/EditDescriptionForm';
import firebase from 'firebase';

export default class EditEvent extends React.Component {
  static navigationOptions = {
    title: 'Events',
  };

  deleteMeeting = (meeting) => {
    console.log("DELETE", meeting);
    /*
    firebase.database().ref('Meetings/' + meeting.uid).remove().then((data) => {
      alert(meeting.title + " deleted!");
      this.reloadMeetings();
    });
    */
  }

  noResponse = (event) => {
        return event["members"].filter(mem => { return mem.status == 1 && !mem.isOwner });
  }

  meetAccepted = (event) => {
        return event["members"].filter(mem => { return(mem.status == 2 && !mem.isOwner) });
  }

  meetDeclined = (event) => {
        return event["members"].filter(mem => { return(mem.status == 0 && !mem.isOwner) });
  }

  returnNames = (members) => {
      var names = members.map(mem => { return mem.uid });
      if (names.length > 0) {
        return names.join(', ');
      }

      return "None"
      // return members.forEach(mem => {return(Object.values(mem).filter(val => { return(val.toString().includes('@'))})) })
  }

  submitDesc = (description) => {
    firebase.database().ref('Meetings/' + this.props.navigation.state.params.m.uid + "/description").set(description.description).then((data) => {
      alert(description.description + " saved!");
      this.props.navigation.navigate('Events');
    });
  }

  render() {
    const m = this.props.navigation.state.params.m;
    return (
      <View style={styles.container}>
        <Text style={styles.meetingTitle}>{m.title}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.meetingDay}>{m.day}</Text>
          <Text style={styles.meetingTime}>{m.startTime + " - " + m.endTime}</Text>
        </View>
        <Text style={styles.meetingSize}>{m.members.length + " Members"}</Text>
        <Text style={styles.meetingNoResponse}>{"No Response: " + this.returnNames(this.noResponse(m))}</Text>
        <Text style={styles.meetingAccepted}>{"Accepted: " + this.returnNames(this.meetAccepted(m))}</Text>
        <Text style={styles.meetingDeclined}>{"Declined: " + this.returnNames(this.meetDeclined(m))}</Text>
        <EditDescriptionForm submitDesc={this.submitDesc} description={m.description}/>
        <TouchableOpacity onPress={() => { this.deleteMeeting(m) }} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10
  },
  meetingContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 10
  },
  meetingTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  meetingDay: {
    fontSize: 20,
  },
  meetingTime: {
    fontSize: 20,
    marginLeft: 10
  },
  meetingNoResponse: {

  },
  meetingAccepted: {
    color: "#4DD682"
  },
  meetingDeclined: {
    color: "#EB6C55"
  },
  deleteButton: {
    backgroundColor: "#EB5A5A",
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: 30,
    marginTop: 10
  },
  buttonText: {
    color: "#ffffff",
  },

});
