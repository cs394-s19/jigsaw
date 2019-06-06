import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

import CalendarScreen from '../screens/CalendarScreen';
import CreateEventScreen from '../screens/CreateEventScreen';
import InviteMembersScreen from '../screens/InviteMembersScreen';
import MeetingTimesScreen from '../screens/MeetingTimesScreen';
import EventsScreen from '../screens/EventsScreen';
import EditEventScreen from '../screens/EditEventScreen';
import RequestsScreen from '../screens/RequestsScreen';
import AccountScreen from '../screens/AccountScreen';
import CreateCalendarEventScreen from '../screens/CreateCalendarScreen'

const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen,
  CreateCalendarEvent: CreateCalendarEventScreen
});
CalendarStack.navigationOptions = {
  tabBarLabel: ({ focused }) => ( <Text style={{ fontSize: 10, color: focused ? '#6767ff' : '#8E8E8E', textAlign: "center"}}>Calendar</Text>),
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
  InviteMembers: InviteMembersScreen,
  MeetingTimes: MeetingTimesScreen
});
CreateEventStack.navigationOptions = {
  tabBarLabel: ({ focused }) => ( <Text style={{ fontSize: 10, color: focused ? '#6767ff' : '#8E8E8E', textAlign: "center"}}>Create Meeting</Text>),
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
  EditEvent: EditEventScreen
});
EventsStack.navigationOptions = {
  tabBarLabel: ({ focused }) => ( <Text style={{ fontSize: 10, color: focused ? '#6767ff' : '#8E8E8E', textAlign: "center"}}>Meetings</Text>),
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
  tabBarLabel: ({ focused }) => ( <Text style={{ fontSize: 10, color: focused ? '#6767ff' : '#8E8E8E', textAlign: "center"}}>Requests</Text>),
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
  tabBarLabel: ({ focused }) => ( <Text style={{ fontSize: 10, color: focused ? '#6767ff' : '#8E8E8E', textAlign: "center"}}>Account</Text>),
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

export default createBottomTabNavigator({
  CalendarStack,
  CreateEventStack,
  EventsStack,
  RequestsStack,
  AccountStack,
});
