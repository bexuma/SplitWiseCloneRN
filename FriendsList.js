import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import TotalBalanceHelper from './utils/totalBalanceHelper.js';

class FriendsList extends Component {
  render() {
    const friends = this.props.friends
    return (!Array.isArray(friends) || !friends.length)
      ? this.noFriends()
      : this.renderFriends(friends)
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

  renderFriends = (friends) => {
    return (
      <View style={{height: 360}}>
        <FlatList
          data={friends}
          extraData={this.props.transactions}
          renderItem={this.renderItem}
        />
      </View>
    )
  }

  renderItem = ({ item }) => {
    const { transactions, navigation } = this.props;

    return (
      <TouchableOpacity style={styles.item} onPress={() =>
          navigation.navigate('BillHistory', {
            friend: item,
            transactions: transactions.filter(transaction => transaction.name === item.name)
          })
        }>
        <Text style={styles.friendName}>{item.name}</Text>
        {this.friendExpenses(item.name)}
      </TouchableOpacity>
    )
  }


  friendExpenses = (friendName) => {
    const aggregate_balance = TotalBalanceHelper.getAggregateBalance(friendName, this.props.transactions)

    return (aggregate_balance === 0)
        ? this.noExpenses()
        : this.expenses(aggregate_balance)
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

  expenses = (aggregate_balance) => {
    const message = (aggregate_balance < 0)
      ? "you owe"
      : "you are owed"

    const color = (aggregate_balance < 0)
      ? "red"
      : "green"

    return (
      <View style={styles.status}>
        <Text style={[styles.statusMessage, {color: color}]}>
          {message}
        </Text>
        <Text style={[styles.statusMessage, {color: color}]}>
          {Math.abs(aggregate_balance.toFixed(2))} ₸
        </Text>
      </View>
    )
  }
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