import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import GroupMembersForm from '../components/GroupMembersForm';

import firebase from 'firebase';

export default class AccountScreen extends React.Component {
  static navigationOptions = {
    title: 'Account',
  };

  state = {
      included: [],
  }

  //onPress={() => {this.makeGroup()}}
  //onPress={() => {this.handleTapMember(userdata)}} onClick={((e) => this.handleClick(e))} 
  // style={this.inInvited(userdata.Email) ? styles.greenInfo : styles.noInfo}
  // style={styles.userContainer}
  // style={styles.userid}
  // style={styles.useremail}


  updateGroup = (included) => {
    this.setState({included: included});
  }
  
  makeGroup = (name) => {
      const newGroup = {
      name: name,
      included: this.state.included
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

//  sendInvites = () => {
//    this.props.navigation.navigate('MeetingTimes', {...this.state});
//  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <GroupMembersForm makeGroup={this.makeGroup} updateGroup={this.updateGroup} data={this.props.screenProps.data}/>
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
