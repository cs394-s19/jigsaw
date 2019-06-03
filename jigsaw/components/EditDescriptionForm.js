import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';

export default class EditDescriptionForm extends Component {
    state = {
        description: '',
    };

    onChangeText = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Input labelStyle={styles.inputLabel} label='Description: ' onChangeText={val => this.setState({description: val})} value={this.state.description}/>
                <TouchableOpacity style={styles.saveButton} onPress={() => {this.props.submitEvent({...this.state})}}>
                  <Text style={styles.saveButtonText}>Save Description</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: "10%"
    },
    saveButtonText: {
      color: '#FFFFFF',
      fontSize: 20,
      textAlign: 'center'
    },
    saveButton: {
      backgroundColor: "#007BFF",
      justifyContent: 'center',
      alignItems: 'center',
      width: "100%",
      height: 30,
      marginTop: 10
    },
    inputLabel: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'normal',
    }
});
