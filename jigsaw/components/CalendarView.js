import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

export default class CalendarView extends Component {
  state = {
    schedule: []
  };

  componentDidMount() {
    var userObject = this.props.data.data.filter((userdata) => { return userdata.Email == this.props.data.currentUser })[0];
    var schedule = [];
    var schedule_obj = userObject["Schedule"];
    for (var property in schedule_obj) {
        if (schedule_obj.hasOwnProperty(property)) {
          schedule.push(schedule_obj[property]);
        }
    }
    this.setState({schedule: schedule});
  }

  render() {
    return (
      <ScrollView>
        {
            this.state.schedule.map((event, index) => {
              return (
                <TouchableOpacity key={index} style={styles.eventContainer}>
                  <Text style={styles.eventDay}>{event["Day"]}</Text>
                  <Text style={styles.eventTitle}>{event["Name"]}</Text>
                  <Text style={styles.eventTime}>{event["Start"]} - {event["End"]}</Text>
                </TouchableOpacity>
              )
            })
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  eventContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: 100,
    borderColor: '#000000',
    borderWidth: 2,
  },
  eventDay: {
    fontSize: 20
  },
  eventTitle: {
    fontSize: 15
  },
  meetingTime: {
    fontSize: 20
  }
});
