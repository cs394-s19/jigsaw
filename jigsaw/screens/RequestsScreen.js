import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';

export default class RequestsScreen extends React.Component {
  static navigationOptions = {
    title: 'Requests',
  };

  state = {
    my_meetings: []
  }

  acceptMeeting = (meeting) => {
    var updatedMemberInfo;
    var member_index = -1;
    for (var i = 0; i < meeting.members.length; i++) {
      if (meeting.members[i] == this.props.screenProps.data.currentUser) {
        member_index = i;
        updatedMemberInfo = newMeeting.members[i];
        updatedMemberInfo.status = 2; // ACCEPT
      }
    }
    console.log(updatedMemberInfo);
    firebase.ref('Meetings/' + meeting.uid + "/members/" + member_index.toString()).update(updatedMemberInfo);
  }

  declineMeeting = (meeting) => {

  }

  componentDidMount() {
    var my_meetings = this.props.screenProps.data.meetings.filter(m => {
      return m["members"].filter(mem => { return(mem.email == this.props.screenProps.data.currentUser && mem.isOwner != true )}).length > 0;
    });

    this.setState({my_meetings: my_meetings});
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {
          this.state.my_meetings.map((m, index) => {
            return (
              <TouchableOpacity key={index} style={styles.meetingContainer}>
                <Text style={styles.meetingTitle}>{m.title}</Text>
                <Text style={styles.meetingSize}>{"Members Invited: " + m.members.length}</Text>
                {
                  m.members.map((mem, index) => {
                    if (mem.isOwner) {
                      return (
                        <Text key={index} style={styles.meetingOwner}>{"Owner: " + mem.email}</Text>
                      )
                    }
                  })
                }
                <Text style={styles.meetingTime}>{m.duration_hour + "hrs " + m.duration_minute + "mins" }</Text>
                <TouchableOpacity onClick={() => { this.acceptMeeting(m) }} style={styles.acceptButton}>
                  <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity onClick={() => { this.declineMeeting(m) }}  style={styles.declineButton}>
                  <Text style={styles.buttonText}>Decline</Text>
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
  },
  meetingTitle: {
    fontSize: 20
  },
  meetingTime: {
    fontSize: 15
  },
  meetingOwner: {
    fontSize: 15
  },
  acceptButton: {
    backgroundColor: "#56E87F",
    justifyContent: 'center',
    alignItems: 'center',
    width: "45%"
  },
  declineButton: {
    backgroundColor: "#EB5A5A",
    justifyContent: 'center',
    alignItems: 'center',
    width: "45%"
  },
  buttonText: {
    color: "#ffffff",
  }
});
