import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';


const MainNav = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
});

export default class AppNavigator extends React.Component {
  render() {
    console.log('inside appnavigator');
    console.log(this.props);
    return(<MainNav screenProps={{data: this.props.data}} />)
  }
}