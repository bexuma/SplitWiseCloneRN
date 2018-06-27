import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';

class FriendsList extends Component {
  render() {
    const friends = this.props.friends
    if (!Array.isArray(friends) || !friends.length) {
      return (
        noFriends()
      )
      
    } else {
      return (
        renderFriends(friends)
      )
    }

  }
}

noFriends = () => {
  return (
    <View style={{height: 100}}> 
      <Text style={[styles.textCentered, {paddingTop: 40, fontSize: 18 }]}>
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
        renderItem={({item}) =>
          <View style={styles.item}>
            <Text style={styles.friendName}>{item}</Text>
            <Text style={styles.status}>no expenses</Text>
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textCentered: {
    textAlign: 'center' 
  },
  item: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    paddingLeft: 20,
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,
  },
  friendName: {
    fontSize: 20
  },
  status: {
    fontSize: 14,
    position: 'absolute', right: 20,
    // alignSelf: 'flex-end',  
  }
});

export default FriendsList