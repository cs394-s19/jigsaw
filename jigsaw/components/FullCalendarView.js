import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

export default class FullCalendarView extends Component {
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

  /*renderEventDay(day) {
    console.log
    var todaysEvents = [];
    //const sched = JSON.parse(this.state.schedule);
    for (event in this.state.schedule){
        if (event.Day == this.myGetDay(day)){
          todaysEvents.push(event);
        }
      }
    for (e in todaysEvents){
      /*return(
        <TouchableOpacity style={styles.eventContainer}>
          <Text style={styles.eventTitle}>{e["Name"]}</Text>
          <Text style={styles.eventTime}>{e["Start"]} - {e["End"]}</Text>
        </TouchableOpacity>

      );
      console.log(e);
    }
    if (todaysEvents == []){
      return null;
    }
  }*/

  renderEventDay(day) {
    var allEvents = [];
    return this.state.schedule.map((event) => {
      if (event["Day"] == this.myGetDay(day)) {
        return (day.dateString + " : [{text: " + event["Name"] + "}]");
      }
      else{
        return null;
      }
        //'2019-05-22': [{text: 'item 1 - any js object'}],
        /*return (
          <TouchableOpacity key={index} style={styles.eventContainer}>
            <Text style={styles.eventTitle}>{event["Name"]}</Text>
            <Text style={styles.eventTime}>{event["Start"]} - {event["End"]}</Text>
          </TouchableOpacity>*/
        
      }
    );
    //console.log(allEvents);
  }

  myGetDay(day) {
    var days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ];

    date = new Date(day.dateString);
    return days[date.getDay()];
  }
  
  
  
  render() {
    return (
      <Agenda
  // the list of items that have to be displayed in agenda. If you want to render item as empty date
  // the value of date key kas to be an empty array []. If there exists no value for date key it is
  // considered that the date in question is not yet loaded
  items={{
    '2019-05-22': [{text: 'item 1 - any js object'}],
    '2019-05-23': [{text: 'item 2 - any js object'}],
    '2019-05-24': [],
    '2019-05-25': [{text: 'item 3 - any js object'},{text: 'any js object'}]
  }}
  // callback that gets called when items for a certain month should be loaded (month became visible)
  loadItemsForMonth={(month) => {console.log('trigger items loading')}}
  // callback that fires when the calendar is opened or closed
  onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
  // callback that gets called on day press
  onDayPress={(day)=>{console.log(this.renderEventDay(day));}}
  // callback that gets called when day changes while scrolling agenda list
  onDayChange={(day)=>{console.log('day changed')}}
  // initially selected day
  selected={new Date().toISOString().slice(0, 10)}
  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  minDate={'2018-05-10'}
  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
  maxDate={'2025-05-30'}
  // Max amount of months allowed to scroll to the past. Default = 50
  pastScrollRange={50}
  // Max amount of months allowed to scroll to the future. Default = 50
  futureScrollRange={50}
  // specify how each item should be rendered in agenda
  renderItem={(item, firstItemInDay) => {return (<View />);}}
  // specify how each date should be rendered. day can be undefined if the item is not first in that day.
  renderDay={(day, item) => {return this.renderEventDay(day);}}
  // specify how empty date content with no items should be rendered
  renderEmptyDate={() => {return (<View />);}}
  // specify how agenda knob should look like
  renderKnob={() => {return (<Ionicons name="ios-arrow-down" size={32} color="goldenrod" />);}}
  // specify what should be rendered instead of ActivityIndicator
  renderEmptyData = {() => {return (<View />);}}
  // specify your item comparison function for increased performance
  rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
  // Hide knob button. Default = false
  hideKnob={false}
  // By default, agenda dates are marked if they have at least one item, but you can override this if needed
  markedDates={{
    '2019-05-16': {selected: true, marked: true},
    '2019-05-17': {marked: true},
    '2019-05-18': {disabled: true}
  }}
  // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
  onRefresh={() => console.log('refreshing...')}
  // Set this true while waiting for new data from a refresh
  refreshing={false}
  // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
  refreshControl={null}
  // agenda theme
  theme={{
    //...calendarTheme,
    agendaDayTextColor: 'yellow',
    agendaDayNumColor: 'green',
    agendaTodayColor: 'red',
    agendaKnobColor: 'blue'
  }}

  // agenda container style
  style={{}}
/>
    );
  }
}
      


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
