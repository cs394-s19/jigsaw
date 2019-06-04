import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Button } from 'react-native-elements';

export default class InviteMembersForm extends Component {
    state = {
        invited: this.props.data.data.filter((user) => {return user.Email == this.props.data.currentUser}),
        invited_groups: []
    }

    handleTapMember = (user) => {
        let invited = [...this.state.invited];

        if (invited.includes(user)) {
            this.removeMember(user);
            return
        }

        invited.push(user);
        this.setState({
            invited
        })

        this.props.updateInvited(invited);

    }

    removeMember = (toDelete) => {
        let invited = [...this.state.invited].filter((username) => {
            return username !== toDelete;
        })
        this.setState({
            invited
        })
        this.props.updateInvited(invited);
    }

    handleTapGroup = (group) => {
      let invited_groups = [...this.state.invited_groups];
      if (invited_groups.includes(group)) {
          this.removeGroup(group);
          return;
      }

      invited_groups.push(group);
      this.setState({
          invited_groups
      })

      this.props.updateInvited(this.state.invited);
      this.props.updateInvitedGroups(invited_groups);
    }

    removeGroup = (toDelete) => {
      let invited_groups = [...this.state.invited_groups].filter((group) => {
          return group !== toDelete;
      })
      this.setState({
          invited_groups
      })
      this.props.updateInvitedGroups(invited_groups);
    }

    inInvited = (email) => {
      for (var i = 0; i < this.state.invited.length; i++) {
        if (this.state.invited[i]["Email"] == email) {
          return true;
        }
      }
      return false;
    }

    inInvitedGroups = (group) => {
      for (var i = 0; i < this.state.invited_groups.length; i++) {
        if (this.state.invited_groups[i].name == group.name) {
          return true;
        }
      }
      return false;
    }

    render() {
        handleClick = (e, user) => {
            let invited = [...this.state.invited];

            if (invited.includes(user)) {
                e.style = styles.noInfo;
            } else {
                e.style = styles.greenInfo;
            }
        }


        let invitelist = this.props.data.data.filter((user) => {return user.Email !== this.props.data.currentUser})
        // console.log(invitelist)
        return (
            <View style={styles.container}>
                <Button buttonStyle={styles.inviteButton} title='Send Invites' onPress={() => {this.props.sendInvites()}}/>
                <Text style={styles.headerText}>Users</Text>
                <View style={{height: 1, backgroundColor: "#3e3e3e", marginTop: 10}} />
                <ScrollView style={styles.userlist}>
                    {
                        this.props.data.data.map((userdata, index) => {
                            if (userdata.Email != this.props.data.currentUser) {
                            return (
                                <View key={index} style={styles.userContainer}>
                                    <TouchableOpacity onPress={() => {this.handleTapMember(userdata)}} onClick={((e) => this.handleClick(e))}>
                                    <View style={this.inInvited(userdata.Email) ? styles.greenInfo : styles.noInfo}>
                                        <Text style={styles.userid}>{userdata.uid}</Text>
                                        <Text style={styles.useremail}>{userdata.Email}</Text>
                                    </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        })
                    }
                </ScrollView>
                <Text style={styles.headerText}>Groups</Text>
                <View style={{height: 1, backgroundColor: "#3e3e3e", marginTop: 10}} />
                <ScrollView style={styles.userlist}>
                    {
                        this.props.data.groups.map((group, index) => {
                          return (
                              <View key={index} style={styles.userContainer}>
                                  <TouchableOpacity onPress={() => {this.handleTapGroup(group)}} onClick={((e) => this.handleClick(e))}>
                                  <View style={this.inInvitedGroups(group) ? styles.greenInfo : styles.noInfo}>
                                      <Text style={styles.userid}>{group.name}</Text>
                                      <View style={{flexDirection: 'row', marginLeft: 10}}>
                                        {
                                          group.included.map((user, idx) => {
                                            if (idx == group.included.length - 1) {
                                              return (
                                                <Text style={{color:"rgba(0, 0, 0, 0.3)" }} key={idx}>{user.uid + ""}</Text>
                                              )
                                            } else {
                                              return (
                                                <Text style={{color:"rgba(0, 0, 0, 0.3)" }} key={idx}>{user.uid + ", "}</Text>
                                              )
                                            }
                                          })
                                        }
                                      </View>
                                  </View>
                                  </TouchableOpacity>
                              </View>
                          )
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
    invitedlist: {
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
    inviteduser: {
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
    inviteButton: {
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    headerText: {
      textAlign: 'center',
      fontSize: 20
    }
});
