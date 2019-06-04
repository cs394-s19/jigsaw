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
        description: this.props.description,
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
                <TouchableOpacity style={styles.saveButton} onPress={() => {this.props.submitDesc({...this.state})}}>
                  <Text style={styles.saveButtonText}>Save Description</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      paddingTop: "10%",
      width: "100%",
    },
    saveButtonText: {
      color: '#FFFFFF',
    },
    saveButton: {
      backgroundColor: "#007BFF",
      width: "100%",
      justifyContent: 'center',
      alignItems: 'center',
      height: 30,
      marginTop: 10
    },
    inputLabel: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'normal',
    }
});
