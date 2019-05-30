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
    this.props.navigation.navigate('MeetingTimes', {...this.state});
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <InviteMembersForm sendInvites={this.sendInvites} updateInvited={this.updateInvited} data={this.props.screenProps.data}/>
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
