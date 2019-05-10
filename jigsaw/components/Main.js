
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Button
} from 'react-native';
import Note from './Note'

export default class Main extends Component {
    state = {
        noteArray: [],
        noteText: ''
    }

    addNote = () => {
        if (this.state.noteText) { 
            let d = new Date();
            let newArray = [...this.state.noteArray];
            newArray.push({
                'date': d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(),
                'note': this.state.noteText
            });
            this.setState({
                noteArray: newArray, 
                noteText: ''
            });
        }
    }

    deleteNote = (key) => {
        console.log(this.state.noteArray);
        let newArray = this.state.noteArray.splice(key,1);
        this.setState({
            noteArray: newArray
        })
        console.log(this.state.noteArray);
    }

    render() {
        let notes = this.state.noteArray.map((val, key) => {
            return <Note key={key} keyval={key} val={val}
                deleteMethod = {() => {this.deleteNote(key)}} />
        })

        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.headerText}> - JIGSAW - </Text>
                </View>

                <ScrollView style={styles.scrollContainer}>
                    {notes}
                </ScrollView>

                <View style={styles.footer}>
                    {/* <TextInput
                        style={styles.textInput}
                        onChangeText={(noteText) => this.setState({noteText})}
                        value = {this.state.noteText}
                        placeholder="Add note"
                        placeholderTextColor='white'
                        underlineColorAndroid='transparent'>
                    </TextInput> */}

                    <TouchableOpacity style={styles.addButton} onPress={() => {this.props.switchPage('createEventPage')}}>
                        <Text style={styles.addButtonText}>Create Event</Text>
                    </TouchableOpacity>

                </View>

            </View> 
        )

    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    header: {
      backgroundColor: '#E91E63',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 10,
      borderBottomColor: '#ddd',
    },
    headerText: {
      color: 'white',
      fontSize: 18,
      padding: 26,
    },
    scrollContainer: {
      flex: 1,
      marginBottom: 100,
    },
    footer: {
      position: 'absolute',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10
    },
    textInput: {
      alignSelf: 'stretch',
      color: '#fff', 
      padding: 20,
      backgroundColor: '#252525',
      borderTopWidth: 2,
      borderTopColor: '#ededed'
    },
    addButton: {
      position: 'absolute',
      zIndex: 11,
      bottom: 20,
      backgroundColor: '#dcdcdc',
      width: 200,
      height: 70,
      alignItems: 'center', 
      justifyContent: 'center',
      elevation: 8
    },
    addButtonText: {
      color: 'blue',
      fontSize: 24
    }
  });