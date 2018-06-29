import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';

class FriendsList extends Component {
  render() {
    const friends = this.props.friends

    return (!Array.isArray(friends) || !friends.length)
      ? noFriends()
      : renderFriends(friends)
  }
}

noFriends = () => {
  return (
    <View style={{height: 100}}> 
      <Text style={[ styles.textCentered, styles.noFriendsAdded ]}>
        You have not added any friends yet
      </Text>
    </View>
  )
}

renderFriends = friends => {
  return (
    <View style={{height: 360}}>
      <FlatList
        data={friends}
        extraData={this.friendExpenses()}
        renderItem={({item}) =>
          <View style={styles.item}>
            <Text style={styles.friendName}>{item.name}</Text>
            {this.friendExpenses(item.relation)}
          </View>
        }
      />
    </View>
  )
}

friendExpenses = relation => {
  return (relation === 0)
      ? noExpenses()
      : expenses(relation)
}

noExpenses = () => {
  return (
    <View style={styles.status}>
      <Text style={styles.statusMessage}>
        no expenses
      </Text>
    </View>
  )
}

expenses = (relation) => {
  const message = (relation < 0)
    ? "you owe"
    : "you are owed"

  return (
    <View style={styles.status}>
      <Text style={styles.statusMessage}>
        {message}
      </Text>
      <Text style={styles.statusMessage}>
        {relation} ₸
      </Text>
    </View>
  )
  
}

const styles = StyleSheet.create({
  textCentered: {
    textAlign: 'center' 
  },
  noFriendsAdded: {
    paddingTop: 40,
    fontSize: 18
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,
  },
  friendName: {
    flex: 1,
    fontSize: 20
  },
  status: {
    flex: 1,
  },
  statusMessage: {
    fontSize: 14,
    // position: 'absolute', right: 20,
    textAlign: 'right', 
  }
});

export default FriendsList