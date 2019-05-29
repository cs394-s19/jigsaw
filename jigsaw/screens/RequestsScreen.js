import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
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
    firebase.database().ref('Meetings/' + meeting.uid + "/members/" + member_index.toString()).update(updatedMemberInfo).then((data) => {
      alert(meeting.title + " declined!");
      this.reloadMeetings();
    });
  }

  viewMeeting = (meeting) => {
    console.log(meeting);
    var updatedMemberInfo;
    var member_index = -1;
    for (var i = 0; i < meeting.members.length; i++) {
      if (meeting.members[i].email == this.props.screenProps.data.currentUser) {
        member_index = i;
        updatedMemberInfo = meeting.members[i];
        updatedMemberInfo.status = 0; // DECLINE
      }
    }
    this.props.navigation.navigate('ViewMeeting', {...this.state});
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
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity onPress={() => { this.viewMeeting(m) }}  style={styles.viewButton}>
                    <Text style={styles.buttonText}>View</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { this.acceptMeeting(m) }} style={styles.acceptButton}>
                    <Text style={styles.buttonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { this.declineMeeting(m) }}  style={styles.declineButton}>
                    <Text style={styles.buttonText}>Decline</Text>
                  </TouchableOpacity>
                </View>
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
    height: 30,
    flex: 1
  },
  declineButton: {
    backgroundColor: "#EB5A5A",
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    flex: 1
  },
  viewButton: {
    backgroundColor: "#E3D6D6",
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    flex: 1
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
