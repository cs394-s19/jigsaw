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
import RegisterScreen from './RegisterScreen';

export default class LoginScreen extends Component {
  state = {
    email: "",
    isRegistering: false,
  }

  goToRegisterScreen = () => {
    this.setState({
      isRegistering: true
    })
  }

  returnToLogin = () => {
    this.setState({
      isRegistering: false
    })
  }

  render() {
    if (!(this.state.isRegistering)){
      return (
        <View style={styles.container}>
          <Image source={require('../data/images/wave.png')} style={styles.logo} />
          <Text style={styles.headerMessage}>Welcome to Jigsaw!</Text>
          <Input labelStyle={styles.inputLabel} containerStyle={styles.email} label='Email:' onChangeText={val => this.setState({email: val})} value={this.state.email}/>
          <TouchableOpacity>
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goToRegisterScreen}>
            <Text>Register</Text>
          </TouchableOpacity>
        </View>
      )
    }

    else if (this.state.isRegistering) {
      return (
        <RegisterScreen email={this.state.email} submitUserData={this.props.submitUserData} returnToLogin={this.returnToLogin}/>
      )
    }

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
