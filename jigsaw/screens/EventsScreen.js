import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class EventsScreen extends React.Component {
  static navigationOptions = {
    title: 'Events',
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
              <TouchableOpacity key={index} style={styles.meetingContainer}>
                <Text style={styles.meetingTitle}>{m.title}</Text>
                <Text style={styles.meetingSize}>{"Members Invited: " + m.members.length}</Text>
                <Text style={styles.meetingSize}>{"No Response: " + this.returnNames(this.noResponse(m))}</Text>
                <Text style={styles.meetingSize}>{"Accepted: " + this.returnNames(this.meetAccepted(m))}</Text>
                <Text style={styles.meetingSize}>{"Declined: " + this.returnNames(this.meetDeclined(m))}</Text>
                <Text style={styles.meetingTime}>{m.duration_hour + "hrs " + m.duration_minute + "mins" }</Text>
                <TouchableOpacity onPress={() => { this.deleteMeeting(m) }} style={styles.deleteButton}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </TouchableOpacity>
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
    width: '100%',
    borderColor: '#000000',
    borderWidth: 2,
    marginBottom: 10
  },
  meetingTitle: {
    fontSize: 20
  },
  meetingTime: {
    fontSize: 15
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
  }
});
