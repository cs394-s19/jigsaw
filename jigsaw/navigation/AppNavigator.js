import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';

const MainNav = createSwitchNavigator({
  Main: MainTabNavigator,
});

export default class AppNavigator extends React.Component {
  render() {
    return (<MainNav screenProps={{data: this.props.data}} />)
  }
}
