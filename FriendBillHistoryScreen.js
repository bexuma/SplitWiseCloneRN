import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';

class FriendBillHistoryScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.friend.name,
    headerStyle: {
      backgroundColor: '#159688',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  });


  render() {
    const { navigation } = this.props;
    const friend = navigation.getParam('friend', '')

    return (
      <Text>{friend.name}</Text>
    );
  }
}

export default FriendBillHistoryScreen

