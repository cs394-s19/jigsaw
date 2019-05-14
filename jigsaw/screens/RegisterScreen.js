import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import { Input, Button } from 'react-native-elements';

export default class RegisterScreen extends Component {
  state = {
    name: "",
    email: "",
  }

  render() {
    let name = this.state.name;
    let email = this.state.email;

    return (
      <View style={styles.container}>
        <Image source={require('../data/images/wave.png')} style={styles.logo} />
        <Text style={styles.headerMessage}>Sign up with Jigsaw!</Text>
        <Input labelStyle={styles.inputLabel} containerStyle={styles.email} label='Name: ' onChangeText={val => this.setState({name: val})} value={this.state.name}/>
        <Input labelStyle={styles.inputLabel} containerStyle={styles.email} label='Email:' onChangeText={val => this.setState({email: val})} value={this.state.email}/>
        <TouchableOpacity onPress={() => {this.props.submitUserData(name,email); this.props.returnToLogin()}}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    )
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
  logo: {
    width: 50,
    height: 50,
    marginBottom: 20
  },
  headerMessage: {
    fontSize: 18
  },
  inputLabel: {
      fontSize: 18,
      color: 'gray',
  },
  email: {
    marginTop: 25,
    marginBottom: 25
  },
});
