import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Button
} from 'react-native';
import InviteMembersForm from '../components/InviteMembersForm';
import firebase from 'firebase';

export default class CreateEventScreen extends React.Component {
  componentDidMount () {
    this.props.navigation.setParams({ sendInvites: this.sendInvites });
  }

  state = {
      eventDetails: this.props.navigation.state.params.eventdetails,
      invited: []
  };

  updateInvited = (invited) => {
    this.setState({invited});
  }
  
  invitedPlusOrganizer = (invitees) => {
      let newInvites = invitees;
      newInvites.push({email: this.props.screenProps.data.currentUser, status: 2, isOwner: true});
      return newInvites
  }

  sendInvites = () => {
    alert('Successfully Invited Members!');

    // PUSH NEW MEETING TO FIREBASE DATABASE (commented out for testing purposes)

    var members = this.state.invited.map(i => {
      return {
        email: i["Email"],
        status: (i["Email"] == this.props.screenProps.data.currentUser) ? 2 : 1, // 0: declined, 1: invited, 2: accepted
        isOwner: (i["Email"] == this.props.screenProps.data.currentUser) ? true : false
      }
    });

    const newMeeting = {
      title: this.state.eventDetails["eventName"],
      duration_hour: this.state.eventDetails["selectedHours"],
      duration_minute: this.state.eventDetails["selectedMinutes"],
      members: this.invitedPlusOrganizer(members)
    }

    firebase.app().database().ref('Meetings/').push({
      ...newMeeting
    }).then((data) => {
      console.log('data ' , data)
      // do scheduling here maybe?
    }).catch((error) => {
      console.log('error ' , error)
    });

    this.props.navigation.navigate('MeetingTimes', {...this.state});
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <InviteMembersForm updateInvited={this.updateInvited} data={this.props.screenProps.data}/>
        <Button title={"Invite"} onPress={this.sendInvites} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%'
  }
});
