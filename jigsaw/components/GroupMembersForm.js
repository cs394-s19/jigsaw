import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Input, Button } from 'react-native-elements';

export default class GroupMembersForm extends Component {
    state = {
        included: [],
        groupName: '',
    }

    handleTapMember = (user) => {
        let included = [...this.state.included];

        if (included.includes(user)) {
            this.removeMember(user);
            return
        }

        included.push(user);
        this.setState({
            included: included
        });

        this.props.updateGroup(included);
    }

    removeMember = (toDelete) => {
        let included = [...this.state.included].filter((username) => {
            return username !== toDelete;
        })
        this.setState({
            included: included
        });
        this.props.updateGroup(included);
    }

    inIncluded = (email) => {
      for (var i = 0; i < this.state.included.length; i++) {
        if (this.state.included[i]["Email"] == email) {
          return true;
        }
      }
      return false;
    }
    
    createGroup = () => {
        let included = [];
        if (this.state.included === undefined || this.state.included.length == 0 || this.state.groupName === '') {
            alert('Please specify a name and members for your group')
            return;
        } else {
            this.props.makeGroup(this.state.groupName);
            this.setState({
                included: included,
                groupName: '',
            });
        }
    }
    

    render() {
        handleClick = (e, user) => {
            let included = [...this.state.included];

            if (included.includes(user)) {
                e.style = styles.noInfo;
            } else {
                e.style = styles.greenInfo;
            }
        }
        
//        setStyles = () => {
//            if (this.state.included === undefined || this.state.included.length == 0) {
//                console.log(emptyButton);
//                return styles.emptyButton;
//            } else {
//                console.log(includeButton);
//                return styles.includeButton;
//            }
//        }
                
        let includelist = this.props.data.data.filter((user) => {return user.Email !== this.props.data.currentUser})
        // console.log(includelist)
        return (
            <View style={styles.container}>
            <Input labelStyle={styles.inputLabel} containerStyle={styles.meetingName} label='Group Name:' onChangeText={val => this.setState({groupName: val})} value={this.state.groupName}/>
            <Button buttonStyle={styles.includeButton} title='Make Group' onPress={() => {this.createGroup()}}/> 
                <ScrollView style={styles.userlist}>
                    {
                        this.props.data.data.map((userdata, index) => {
                            if (userdata.Email != this.props.data.currentUser) {
                            return (
                                <View key={index} style={styles.userContainer}>
                                    <TouchableOpacity onPress={() => {this.handleTapMember(userdata)}} onClick={((e) => this.handleClick(e))}>
                                    <View style={this.inIncluded(userdata.Email) ? styles.greenInfo : styles.noInfo}>
                                        <Text style={styles.userid}>{userdata.uid}</Text>
                                        <Text style={styles.useremail}>{userdata.Email}</Text>
                                    </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'flex-start',
        width: '100%',
        height: '100%'
    },
    header: {
        paddingLeft: 10,
        fontSize: 20,
        paddingTop: 10,
    },
    includedlist: {
        flex: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        // position: 'absolute',
        // top: 20,
        height: 50,
        fontSize: 30,
        color: 'red',
    },
    includeduser: {
        height: 20,
        fontSize: 20,
    },
    userlist: {
        flex: 1, //8
        width: '100%',
        //position: 'absolute',
        // top: 100,
    },
    noInfo: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: 100,
    },
    greenInfo: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: 100,
        backgroundColor: '#2EE879',
    },
    userid: {
        height: '70%',
        width: '100%',
        flexWrap: 'wrap',
        alignSelf: 'stretch',
        left: 10,
        color: 'black',
        fontSize: 25,
        paddingTop: 20,
    },
    useremail: {
        height: '30%',
        width: '100%',
        flexWrap: 'wrap',
        left: 10,
        alignSelf: 'stretch',
        fontSize: 15,
        color: 'rgba(0, 0, 0, 0.3)',
        paddingBottom: 30,
    },
    userContainer: {
      marginBottom: 20
    },
    includeButton: {
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      backgroundColor: '#4E2A84',
    },
    emptyButton: {
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      backgroundColor: '#d1d1d1',
    },
});
