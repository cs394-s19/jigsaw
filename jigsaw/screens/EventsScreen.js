import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class EventsScreen extends React.Component {
  static navigationOptions = {
    title: 'Events',
  };

state = {
    myEvents: []
  }

  componentDidMount() {
    var myEvents = this.props.screenProps.data.meetings.filter(m => {
      return m["members"].filter(mem => { return( mem.email == this.props.screenProps.data.currentUser && mem.isOwner)}).length > 0;
    });
    this.setState({myEvents: myEvents});
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {
          this.state.myEvents.map((m, index) => {
            return (
              <TouchableOpacity key={index} style={styles.meetingContainer}>
                <Text style={styles.meetingTitle}>{m.title}</Text>
                <Text style={styles.meetingSize}>{"Members Invited: " + m.members.length}</Text>
                <Text style={styles.meetingTime}>{m.duration_hour + "hrs " + m.duration_minute + "mins" }</Text>

              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  meetingContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: 100,
    borderColor: '#000000',
    borderWidth: 2,
  },
  meetingTitle: {
    fontSize: 20
  },
  meetingTime: {
    fontSize: 15
  }
});