import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import InviteMembersForm from '../components/InviteMembersForm';

export default class CreateEventScreen extends React.Component {
  static navigationOptions = {
    title: 'Invite Members',
  }; 

  render() {
    console.log(this.props);
    return (
      <ScrollView style={styles.container}>
        <Text>Inside InviteMembersScreen.js</Text>
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