import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>{"Jigsaw"}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100
  },
  headerText: {
    color: '#fff',
    fontSize: 20
  }
});
