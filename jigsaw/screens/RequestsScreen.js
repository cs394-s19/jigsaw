import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';

export default class RequestsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Requests',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf:'center',
      flex:1
    }
  };

  state = {
    my_meetings: []
  }

  acceptMeeting = (meeting) => {
    var updatedMemberInfo;
    var member_index = -1;
    for (var i = 0; i < meeting.members.length; i++) {
      if (meeting.members[i].email == this.props.screenProps.data.currentUser) {
        member_index = i;
        updatedMemberInfo = meeting.members[i];
        updatedMemberInfo.status = 2; // ACCEPT
      }
    }

    firebase.database().ref('Meetings/' + meeting.uid + "/members/" + member_index.toString()).update(updatedMemberInfo).then((data) => {
      alert(meeting.title + " added to your calendar!");
      this.reloadMeetings();
    });
    
  }

  declineMeeting = (meeting) => {
    var updatedMemberInfo;
    var member_index = -1;
    for (var i = 0; i < meeting.members.length; i++) {
      if (meeting.members[i].email == this.props.screenProps.data.currentUser) {
        member_index = i;
        updatedMemberInfo = meeting.members[i];
        updatedMemberInfo.status = 0; // DECLINE
      }
    }

    /*
    firebase.database().ref('Meetings/' + meeting.uid + "/members/" + member_index.toString()).update(updatedMemberInfo).then((data) => {
      alert(meeting.title + " declined!");
      this.reloadMeetings();
    });
    */
  }

  reloadMeetings = () => {
    var my_meetings = this.props.screenProps.data.meetings.filter(m => {
      return m["members"].filter(mem => { return(mem.email == this.props.screenProps.data.currentUser && mem.isOwner != true && mem.status == 1 )}).length > 0;
    });

    this.setState({my_meetings: my_meetings});
  }

  componentDidMount() {
    this.reloadMeetings();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {
          this.state.my_meetings.map((m, index) => {
            return (
              <View key={index} style={styles.meetingContainer}>
                <Text style={styles.meetingTitle}>{m.title}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.meetingDay}>{m.day}</Text>
                  <Text style={styles.meetingTime}>{m.startTime + " - " + m.endTime}</Text>
                </View>
                <Text style={styles.meetingSize}>{m.members.length + " Members"}</Text>
                {
                  m.members.map((mem, index) => {
                    if (mem.isOwner) {
                      return (
                        <Text key={index} style={styles.meetingOwner}>{"Owner: " + mem.uid}</Text>
                      )
                    }
                  })
                }

                <View style={styles.buttonsContainer}>
                  <TouchableOpacity onPress={() => { this.acceptMeeting(m) }} style={styles.acceptButton}>
                    <Text style={styles.buttonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { this.declineMeeting(m) }}  style={styles.declineButton}>
                    <Text style={styles.buttonText}>Decline</Text>
                  </TouchableOpacity>
                </View>
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
  meetingOwner: {
    fontSize: 15
  },
  acceptButton: {
    backgroundColor: "#56E87F",
    justifyContent: 'center',
    alignItems: 'center',
    width: "50%",
    height: 30
  },
  declineButton: {
    backgroundColor: "#EB5A5A",
    justifyContent: 'center',
    alignItems: 'center',
    width: "50%",
    height: 30
  },
  buttonText: {
    color: "#ffffff",
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  }
});
