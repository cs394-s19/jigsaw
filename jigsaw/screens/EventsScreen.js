import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import firebase from '../firebaseConfig';

export default class EventsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Meetings',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf:'center',
      flex:1
    }
  };

  state = {
    myEvents: []
  }

  deleteMeeting = (meeting) => {
    firebase.database().ref('Meetings/' + meeting.uid).remove().then((data) => {
      alert(meeting.title + " deleted!");
      this.reloadMeetings();
    });
  }

  reloadMeetings = () => {
    var myEvents = this.props.screenProps.data.meetings.filter(m => {
      return m["members"].filter(mem => { return( mem.email == this.props.screenProps.data.currentUser && mem.isOwner)}).length > 0;
    });
    this.setState({myEvents: myEvents});
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

  componentDidMount() {
    this.reloadMeetings();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {
          this.state.myEvents.map((m, index) => {
            return (
              <View key={index} >
                <TouchableOpacity style={styles.meetingContainer}>
                  <Text style={styles.meetingTitle}>{m.title}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.meetingDay}>{m.day}</Text>
                    <Text style={styles.meetingTime}>{m.startTime + " - " + m.endTime}</Text>
                  </View>
                  <Text style={styles.meetingSize}>{m.members.length + " Members"}</Text>
                  <Text style={styles.meetingNoResponse}>{"No Response: " + this.returnNames(this.noResponse(m))}</Text>
                  <Text style={styles.meetingAccepted}>{"Accepted: " + this.returnNames(this.meetAccepted(m))}</Text>
                  <Text style={styles.meetingDeclined}>{"Declined: " + this.returnNames(this.meetDeclined(m))}</Text>
                  <TouchableOpacity onPress={() => { this.deleteMeeting(m) }} style={styles.deleteButton}>
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
                <View style={{marginTop: 10, backgroundColor: "#000000", height: 1}}></View>
              </View>
            )
          })
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  meetingContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 10
  },
  meetingTitle: {
    fontSize: 25,
    fontWeight: 'bold'
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
