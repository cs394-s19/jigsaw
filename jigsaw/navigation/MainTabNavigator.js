import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

import CalendarScreen from '../screens/CalendarScreen';
import CreateEventScreen from '../screens/CreateEventScreen';
import InviteMembersScreen from '../screens/InviteMembersScreen';
import EventsScreen from '../screens/EventsScreen';
import RequestsScreen from '../screens/RequestsScreen';
import AccountScreen from '../screens/AccountScreen';

const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen,
});
CalendarStack.navigationOptions = {
  tabBarLabel: 'Calendar',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-calendar`
          : 'md-calendar'
      }
    />
  ),
}

const CreateEventStack = createStackNavigator({
  CreateEvent: CreateEventScreen,
  InviteMembers: InviteMembersScreen
});
CreateEventStack.navigationOptions = {
  tabBarLabel: 'Create Event',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-create`
          : 'md-create'
      }
    />
  ),
}

const EventsStack = createStackNavigator({
  Events: EventsScreen,
});
EventsStack.navigationOptions = {
  tabBarLabel: 'Events',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-list`
          : 'md-list'
      }
    />
  ),
}

const RequestsStack = createStackNavigator({
  Requests: RequestsScreen,
});
RequestsStack.navigationOptions = {
  tabBarLabel: 'Requests',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-notifications`
          : 'md-notifications'
      }
    />
  ),
}

const AccountStack = createStackNavigator({
  Requests: AccountScreen,
});
AccountStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-contact`
          : 'md-contact'
      }
    />
  ),
}

const MainBtmTabNav = createBottomTabNavigator({
  CalendarStack,
  CreateEventStack,
  EventsStack,
  RequestsStack,
  AccountStack,
});

export default class MainTabNavigator extends React.Component {
  render() {
    console.log('inside main tab navigator');
    console.log(this.props);
    return(<MainBtmTabNav screenProps={this.props.screenProps}/>)
  }
}
