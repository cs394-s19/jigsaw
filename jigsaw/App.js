import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import LoginScreen from './screens/LoginScreen';
import firebase from './firebaseConfig';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    fetchDataComplete: false,
    currentUser: "", // adelinerohrbach2020@u.northwestern.edu
    data: {},
  };

  componentDidMount() {
    this.readUserData();
  }

  readUserData() {
    firebase.database().ref('Users/').once('value', (snapshot) => {
      const pulledData = snapshot.val();
      if (pulledData) {
        const data = Object.keys(pulledData).map(key => ({
          ...pulledData[key],
          uid: key
        }))

        this.setState({
          fetchDataComplete: true,
          data
        });
      }
    });
  }

  logInUser = (userEmail) => {
    this.setState({currentUser: userEmail});
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen && !this.state.fetchDataComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else if (this.state.currentUser == "") {
      return (
        <LoginScreen logInUser={this.logInUser} />
      )
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator data={this.state} />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
