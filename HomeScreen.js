import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import ActionButton from 'react-native-action-button';
import FriendsList from './FriendsList';
import TotalBalanceHelper from './utils/totalBalanceHelper.js';

class HomeScreen extends React.Component {

  state = {
    friends: [
       {name: "Жандос"},
       {name: "Аян"},
    ],
    transactions: [
      {name: "Жандос", description: "Кинотеатр", balance: 2000},
      {name: "Аян", description: "Пикник", balance: -500},
      {name: "Жандос", description: "Супермаркет", balance: 3000},
      
    ]
  }

  addFriend = (friend) => {
    this.setState({
      friends: [friend, ...this.state.friends]
    });
  };

  split = (involvedFriendsNames, paidFriendName, totalAmount, description) => {
    const eachShouldPay = totalAmount / (involvedFriendsNames.length + 1)
    let transactions = []

    for(let i = 0; i < involvedFriendsNames.length; i++) {
      transactions = (paidFriendName === "You")
                ? [{description: description, name: involvedFriendsNames[i], balance: eachShouldPay}, ...transactions]
                : [{description: description, name: involvedFriendsNames[i], balance: -eachShouldPay}, ...transactions]
    }

    this.setState({
      transactions: [...transactions, ...this.state.transactions]
    })
    
  }

  render() {
    const buttonText = (!Array.isArray(this.state.friends) || !this.state.friends.length)
                          ? "+ Add friends on splitwise"
                          : "+ Add more friends"

                          console.log('state', this.state)
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>

        <View style={styles.indebtedness}>
          <View style={{flex: 1}}>
            <Text style={styles.textCentered}>
              You owe
            </Text>
            {this.oweView()}

          </View>
          <View style={{flex: 1}}>
            <Text style={styles.textCentered}>
              You are owed
            </Text>
            {this.owedView()}

          </View>
          <View style={{flex: 1}}>
            <Text style={styles.textCentered}>
              Total balance
            </Text>
            {this.balanceView()}

          </View>
        </View>

        <FriendsList friends={this.state.friends} transactions={this.state.transactions} navigation={this.props.navigation} />

        <View style={styles.button}>
          <Button
            title={buttonText}
            color="#1aa898"
            onPress={() =>
              this.props.navigation.navigate('AddFriend', {
                addFriend: this.addFriend
              })
            }
          />
        </View>

        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => {
            this.props.navigation.navigate('AddBill', {
              friends: this.state.friends,
              split: this.split
            })
          }}
        />

      </View>
    )
  }

  oweView = () => {
    return (
      <Text style={this.oweStyle(this.owe())}>
        {this.owe()} ₸
      </Text>
    )
  }

  owedView = () => {
    return (
      <Text style={this.owedStyle(this.owed())}>
        {this.owed()} ₸
      </Text>
    )
  }

  balanceView = () => {
    return (
      <Text style={this.balanceStyle(this.owed() - this.owe())}>
        {this.owed() - this.owe()} ₸
      </Text>
    )
  }

  owe = () => {
    let owe = 0
    for(let i = 0; i < this.state.friends.length; i++) {
      if (TotalBalanceHelper.getAggregateBalance(this.state.friends[i].name, this.state.transactions) < 0) {
        owe += TotalBalanceHelper.getAggregateBalance(this.state.friends[i].name, this.state.transactions)
      }
    }

    return (owe === 0) ? "0" : -owe
  }

  owed = () => {
    let owed = 0
    for(let i = 0; i < this.state.friends.length; i++) {
      if (TotalBalanceHelper.getAggregateBalance(this.state.friends[i].name, this.state.transactions) > 0) {
        owed += TotalBalanceHelper.getAggregateBalance(this.state.friends[i].name, this.state.transactions)
      }
    }
    return owed
  }

  oweStyle = (owe) => {
    return (owe !== 0)
    ? {
      textAlign: 'center',
      color: "red",
    }
    : {
      textAlign: 'center',
    }
  }

  owedStyle = (owed) => {
    return (owed !== 0)
    ? {
      textAlign: 'center',
      color: "green",
    }
    : {
      textAlign: 'center',
    }
  }

  balanceStyle = (balance) => {
    if (balance < 0) {
      return {
        textAlign: 'center',
        color: "red",
      }
    } else if (balance > 0) {
      return {
        textAlign: 'center',
        color: "green",
      }
    } else {
      return {
        textAlign: 'center',
      }
    }
  
  }

  static navigationOptions = {
    title: 'Splitwise',
    headerStyle: {
      backgroundColor: '#159688',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indebtedness: {
    flexDirection: 'row',
    height: 50,
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,
    paddingTop: 8
  },
  button: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10
  },
  textCentered: {
    textAlign: 'center',
  }
});

export default HomeScreen