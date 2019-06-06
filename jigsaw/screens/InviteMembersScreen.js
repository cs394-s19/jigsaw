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
  // componentDidMount () {
  //   this.props.navigation.setParams({ sendInvites: this.sendInvites });
  // }

  state = {
      eventDetails: this.props.navigation.state.params.eventdetails,
      invited: [],
      invited_groups: [],
  };

  updateInvited = (invited) => {
    this.setState({invited});
  }

  updateInvitedGroups = (invited_groups) => {
    this.setState({invited_groups});
  }

  invitedPlusOrganizer = (invitees) => {
      let newInvites = invitees;
      newInvites.push({email: this.props.screenProps.data.currentUser, status: 2, isOwner: true});
      return newInvites
  }

  sendInvites = () => {
    var addedGroupMembers = Array.from(this.state.invited);
    for (var i = 0; i < this.state.invited_groups.length; i++) {
      for (var j = 0; j < this.state.invited_groups[i].included.length; j++) {
        var user = this.state.invited_groups[i].included[j];
        var userAlreadyAdded = addedGroupMembers.filter((mem) => { return mem["Email"] == user["Email"] }).length > 0;
        if (!userAlreadyAdded && user["Email"] != this.props.screenProps.data.currentUser) {
          addedGroupMembers.push({
            Email: user["Email"],
            Schedule: user["Schedule"],
            uid: user["uid"]
          });
        }
      }
    }

    this.props.navigation.navigate('MeetingTimes', {...this.state, ...{allinvited: addedGroupMembers}});
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <InviteMembersForm sendInvites={this.sendInvites} updateInvitedGroups={this.updateInvitedGroups} updateInvited={this.updateInvited} data={this.props.screenProps.data}/>
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
