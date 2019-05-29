import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar } from '@valdio/react-native-scrollable-tabview';

export default class ViewProposedMeeting extends Component {
  state = {
    schedule: [],
  };

  meetingTime = [
    {
      startTime: '7:22:30',
      people: [ 'Andres', 'Justin', 'Matthew' ]
    }
  ]

  week = ["Null","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  dayOfWeek = week[meetingTime[startTime].split(':')[0]]
  startTime = meetingTime[startTime].split(':').slice(1,2) 
  people = meetingTime[people]
  eventDetail = this.props.navigation.state.params.eventdetails 
  
  getEndTime = () => { 
    let hour = parseInt(startTime[0]) + parseInt(eventdetails["selectedHours"]);
    let min = parseInt(startTime[1]) + parseInt(eventdetails["selectedMinutes"]); 
    return (hour.toString() + ":" + min.toString())
  }
  
  componentDidMount() {
    console.log(dayOfWeek);
    console.log(this.getEndTime());

    var userObject = this.props.data.data.filter((userdata) => { return userdata.Email == this.props.data.currentUser })[0];
    var schedule = [];
    var schedule_obj = {
      ...userObject["Schedule"],
      ...{ 
        "newEvent": { 
          "Busy": 1,
          "Day": dayOfWeek,
          "End": this.getEndTime(),
          "Name": "New Event",
          "Start": startTime
        }
      }
    };
    
    for (var property in schedule_obj) {
        if (schedule_obj.hasOwnProperty(property)) {
          schedule.push(schedule_obj[property]);
        }
    }
    this.setState({schedule: schedule});
  }

  renderEventDay(day) {
    return this.state.schedule.map((event, index) => {
      if (event["Day"] == day && event == "newEvent") {
        return (
          <TouchableOpacity key={index} style={styles.eventContainer}>
            <Text style={styles.newEventTitle}>{event["Name"]}</Text>
            <Text style={styles.newEventTime}>{event["Start"]} - {event["End"]}</Text>
          </TouchableOpacity>
        )
      }
      else if (event["Day"] == day) {
        return (
          <TouchableOpacity key={index} style={styles.eventContainer}>
            <Text style={styles.eventTitle}>{event["Name"]}</Text>
            <Text style={styles.eventTime}>{event["Start"]} - {event["End"]}</Text>
          </TouchableOpacity>
        )
      }
      else {
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    height: 100,
    paddingTop: 40,
    paddingLeft: 40,
    paddingRight: 40
  },
  eventDay: {
    fontSize: 20
  },
  eventTitle: {
    fontSize: 15,
  },
  eventTime: {
    fontSize: 20,
    marginLeft: 'auto'
  },
  newEventTitle: {
    color: red,
    fontWeight: 'bold',
    fontSize: 15,
  },
  newEventTime: {
    color: red,
    fontSize: 20,
    marginLeft: 'auto'
  },
});
