import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar } from '@valdio/react-native-scrollable-tabview';

export default class WeeklyCalendarView extends Component {
  state = {
    schedule: [],
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

  renderEventDay(day) {
    return this.state.schedule.map((event, index) => {
      if (event["Day"] == day) {
        return (
          <TouchableOpacity key={index} style={styles.eventContainer}>
            <Text style={styles.eventDay}>{event["Day"]}</Text>
            <Text style={styles.eventTitle}>{event["Name"]}</Text>
            <Text style={styles.eventTime}>{event["Start"]} - {event["End"]}</Text>
          </TouchableOpacity>
        )
      } else {
        return null;
      }
    });
  }

  render() {
    return (
      <View>
        <ScrollableTabView renderTabBar={() => <DefaultTabBar />} ref={(tabView) => { this.tabView = tabView; }}>
          <TouchableOpacity tabLabel='MON'>
            <ScrollView>
              {this.renderEventDay("Monday")}
            </ScrollView>
          </TouchableOpacity>
          <TouchableOpacity tabLabel='TUE'>
            <ScrollView>
              {this.renderEventDay("Tuesday")}
            </ScrollView>
          </TouchableOpacity>
          <TouchableOpacity tabLabel='WED'>
            <ScrollView>
              {this.renderEventDay("Wednesday")}
            </ScrollView>
          </TouchableOpacity>
          <TouchableOpacity tabLabel='THU'>
            <ScrollView>
              {this.renderEventDay("Thursday")}
            </ScrollView>
          </TouchableOpacity>
          <TouchableOpacity tabLabel='FRI'>
            <ScrollView>
              {this.renderEventDay("Friday")}
            </ScrollView>
          </TouchableOpacity>
          <TouchableOpacity tabLabel='SAT'>
            <ScrollView>
              {this.renderEventDay("Saturday")}
            </ScrollView>
          </TouchableOpacity>
          <TouchableOpacity tabLabel='SUN'>
            <ScrollView>
              {this.renderEventDay("Sunday")}
            </ScrollView>
          </TouchableOpacity>
        </ScrollableTabView>
      </View>
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
  },
});
