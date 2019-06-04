import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import GroupMembersForm from '../components/GroupMembersForm';

import firebase from 'firebase';

export default class AccountScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Account',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf:'center',
      flex:1
    }
  };

  makeGroup = (name, included) => {
      const newGroup = {
      name: name,
      included: included
        }

    firebase.app().database().ref('Groups/').push({
      ...newGroup
    }).then((data) => {
      console.log('data ' , data)
    }).catch((error) => {
      console.log('error ' , error)
    });

    alert('Successfully Created Group!');
      return
  } 
  
  render() {
    return (
      <ScrollView style={styles.container}>
        <GroupMembersForm makeGroup={this.makeGroup} data={this.props.screenProps.data}/>
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
    groupButton: {
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      backgroundColor: '#4E2A84',
    }
});
