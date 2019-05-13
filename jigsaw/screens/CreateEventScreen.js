import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import CreateEventForm from '../components/CreateEventForm';

export default class CreateEventScreen extends React.Component {
  static navigationOptions = {
    title: 'Create Event',
  };

  submitEvent = ({eventdetails}) => {
    console.log('in submitEvent')
    console.log(eventdetails);
    this.props.navigation.navigate('InviteMembers', {eventdetails});
  }

  render() {
    console.log('inside createeventscreen')
    console.log(this.props);
    return (
      <ScrollView style={styles.container}>
        <CreateEventForm submitEvent={this.submitEvent}/>
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
