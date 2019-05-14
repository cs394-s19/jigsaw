import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

export default class InviteMembersForm extends Component {

    state = {
        invited: [],
    }

    handleTapMember = (user) => {
        let invited = [...this.state.invited];

        if (invited.includes(user.Email)) {
            this.removeMember(user.Email);
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
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Invited members:</Text>
                <View style={styles.invitedlist}>
                    {
                        this.state.invited.map((username, index) => {
                            return (
                                <View key={index} style={styles.inviteduser}>
                                    <TouchableOpacity onPress={() => {this.removeMember(username.Email)}}>
                                        <Text>{username.uid}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                </View>
                <ScrollView style={styles.userlist}>
                    {
                        this.props.data.data.map((userdata, index) => {
                            return (
                                <View key={index}>
                                    <TouchableOpacity onPress={() => {this.handleTapMember(userdata)}} >
                                        <View style={this.state.invited.includes(userdata.Email) ? styles.greenInfo : styles.noInfo}>
                                            <Text style={styles.userid}>{userdata.uid}</Text>
                                            <Text style={styles.useremail}>{userdata.Email}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                </ScrollView>
                <TouchableOpacity>

                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        width: '100%',
        height: '100%'
    },
    header: {
        flex: 4,
        fontSize: 20
    },
    invitedlist: {
        flex: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        position: 'absolute',
        top: 20,
        height: 50,
        fontSize: 30,
        color: 'red',
    },
    inviteduser: {
        height: 20,
        width: 50,
        fontSize: 20,
    },
    userlist: {
        flex: 8,
        width: '100%',
        position: 'absolute',
        top: 100,
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
        backgroundColor: 'green',
    },
    userid: {
        height: '70%',
        width: '100%',
        flexWrap: 'wrap',
        alignSelf: 'stretch',
        left: 10,
        color: 'black',
        fontSize: 30,
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



});
