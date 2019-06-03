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
    items: {}
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
    return this.state.schedule.map((event) => {
      if (event["Day"] == this.myGetDay(day)) { 
      
        return event;
      }
      else{
        return null;
        }
      }
    );
  }

  createItems(day, events){
    var allEvents = events.filter(function (el) {
      return el != null;
    });
    itemList = [];
    
    for(i=0; i<allEvents.length; i++){
      if (allEvents[i] != null){
      itemList.push(allEvents[i]);
      }
    }
    return this.state.items[day.dateString] = itemList;
  }*/

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

    date = new Date(day);
    return days[date.getDay()];
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={new Date().toISOString().slice(0, 10)}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
      let events = [];
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);

        events = this.state.schedule.map((event) => {
          if (event["Day"] == this.myGetDay(strTime)) {           
            return event;
          }
          else{
            return null;
            }
          });

        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          var allEvents = events.filter(function (el) {
            return el != null;
          });
          itemList = [];
          
          for(i=0; i<allEvents.length; i++){
            if (allEvents[i] != null){
              this.state.items[strTime].push(allEvents[i]);
            }
          }
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
  }

  renderItem(item) {
    return (
      <View style={[styles.item]}>            
        <Text style={styles.eventTitle}>{item.Name}</Text>
        <Text style={styles.eventTime}>{item.Start} - {item.End}</Text>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>Nothing planned for today!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    height: 100
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});