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
    week: ["Null","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    meetingTime: {
        startTime: '7:22:30',
        people: [ 'Andres', 'Justin', 'Matthew' ]
    },
    dayOfWeek: '',
    startTime: '',
    people:  [ 'Andres', 'Justin', 'Matthew' ],
    eventDetail: this.props.eventDetails, 
  };
  
  getEndTime = () => { 
    let hour = parseInt(this.state.startTime[0]) + parseInt(this.props.eventDetails["duration_hour"]);
    let min = parseInt(this.state.startTime[1]) + parseInt(this.props.eventDetails["duration_minute"]); 
    return (hour.toString() + ":" + min.toString())
  }
  
  componentDidMount() {
    // console.log('eventDetails', this.props.eventDetails);

    this.setState({
      dayOfWeek: this.state.week[this.state.meetingTime.startTime.split(':')[0]],
      startTime: this.state.meetingTime['startTime'].split(':').slice(1,2)
    })

    let userObject = this.props.data.data.filter((userdata) => { return userdata.Email == this.props.data.currentUser })[0];
    let currentSchedule = userObject.Schedule;
    let newEvent = {
        "newEvent": { 
          "Busy": 1,
          "Day": "Sunday", //this.state.dayOfWeek,
          "End": this.getEndTime(),
          "Name": "New Event",
          "Start": "22:30" //this.state.startTime
        }
    }

    let newSchedule = {...currentSchedule, newEvent};
    let schedule_obj = newSchedule;
    let schedule = [];
    console.log(schedule_obj);
    for (var property in schedule_obj) {
      if (schedule_obj.hasOwnProperty(property)) {
        schedule.push(schedule_obj[property]);
      }
    }
    this.setState({schedule: schedule});
    console.log(schedule);
  }

  renderEventDay(day) {
    return this.state.schedule.map((event, index) => {
      console.log(event["Day"] === day);
      // if (event["Day"] == day && event == "newEvent") {
      //   return (
      //     <TouchableOpacity key={index} style={styles.eventContainer}>
      //       <Text style={styles.newEventTitle}>{event["Name"]}</Text>
      //       <Text style={styles.newEventTime}>{event["Start"]} - {event["End"]}</Text>
      //     </TouchableOpacity>
      //   )
      // }
      if (event["Day"] === day) {
        console.log('successs!')
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

  createTab = (tabLabel, day) => { 
    return (
      <TouchableOpacity tabLabel={tabLabel}>
        <ScrollView>
          {this.renderEventDay(day)}
        </ScrollView>
      </TouchableOpacity>
    )
  }


  render() {
    return (
      <View>
        <ScrollableTabView renderTabBar={() => <DefaultTabBar />} ref={(tabView) => { this.tabView = tabView; }}>
          {this.createTab('MON', "Monday")}
          {this.createTab('TUE', "Tuesday")}
          {this.createTab('WED', "Wednesday")}
          {this.createTab('THU', "Thursday")}
          {this.createTab('FRI', "Friday")}
          {this.createTab('SAT', "Saturday")}
          {this.createTab('SUN', "Sunday")}
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
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
  },
  newEventTime: {
    color: 'red',
    fontSize: 20,
    marginLeft: 'auto'
  },
});
