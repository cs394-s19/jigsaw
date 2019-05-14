import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Button
} from 'react-native';
import InviteMembersForm from '../components/InviteMembersForm';

export default class CreateEventScreen extends React.Component {
  componentDidMount () {
    this.props.navigation.setParams({ sendInvites: this.sendInvites });
  }

  state = {
      eventDetails: this.props.navigation.state.params.eventdetails,
      invited: []
  };

  // static navigationOptions = {
  //     header: ({ state }) => ({
  //         right: <Button title={"Send"} onPress={state.params.sendInvites} />
  //     })
  // };

  updateInvited = (invited) => {
    this.setState({invited});
  }

  sendInvites = () => {
    this.props.navigation.navigate('MeetingTimes');
    // this.props.navigation.navigate('MeetingTimes', {state});
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Button title={"Invite"} onPress={this.sendInvites} />
        <InviteMembersForm updateInvited={this.updateInvited} data={this.props.screenProps.data}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%'
  }
});
