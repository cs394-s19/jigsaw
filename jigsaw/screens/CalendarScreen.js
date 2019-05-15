import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import WeeklyCalendarView from '../components/WeeklyCalendarView';
import FullCalendarView from '../components/FullCalendarView';
import { Button } from 'react-native';

export default class CalendarScreen extends React.Component {
  componentDidMount() {
    this.props.navigation.setParams({ changeView: this.changeView });
  }

  state = {
    fullView: false
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Calendar',
      headerRight: (
        <Button
          onPress={() => { navigation.navigate('CreateCalendarEvent'); }}
          title="Add Event"
          color="#007AFF"
        />
      ),
      headerLeft: (
        <Button
          onPress={() => {navigation.getParam("changeView")()}}
          title="Change View"
          color="#007AFF"
        />
      ),
    };
  };

  changeView = () => {
    this.setState({ fullView: !this.state.fullView });
  }

  render() {
    if (this.props.screenProps.data.fetchDataComplete) {
      return (
        <ScrollView style={styles.container}>
          {
            !this.state.fullView ? (
              <WeeklyCalendarView data={this.props.screenProps.data} />
            ) : (
              <FullCalendarView data={this.props.screenProps.data} />
            )
          }
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
