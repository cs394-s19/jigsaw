import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CalendarView from '../components/CalendarView'

export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendar',
  };

  render() {
    if (this.props.screenProps.data.fetchDataComplete) {
      return (
        <ScrollView style={styles.container}>
          <CalendarView data={this.props.screenProps.data} />
        </ScrollView>
      );
    } else {
      return (
        <ScrollView style={styles.container}>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
