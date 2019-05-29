import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import WeeklyCalendarView from '../components/WeeklyCalendarView';
import { Button } from 'react-native';
import ViewProposedMeeting from '../components/ViewProposedMeeting';

export default class ViewMeetingScreen extends React.Component {
  state = {
    
  }

  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      headerTitle: 'Viewing new meeting',
    };
  };

  render() {
      return ( 
        <ViewProposedMeeting eventDetails={this.props.navigation.state.params} data={this.props.screenProps.data}/>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});