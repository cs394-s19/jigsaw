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
    headerTitle: 'Create Meeting',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf:'center',
      flex:1
    }
  };

  submitEvent = (eventdetails) => {
    if (eventdetails["eventName"] == '' || (eventdetails["selectedHours"] === 0 && eventdetails["selectedMinutes"] === 0)) {
      alert("Please add meeting title and duration.");
      return;
    }

    console.log(eventdetails);
    this.props.navigation.navigate('InviteMembers', {eventdetails});
  }

  render() {
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
