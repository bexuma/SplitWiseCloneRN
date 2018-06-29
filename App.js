import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import AddFriendScreen from './AddFriendScreen';
import AddBillScreen from './AddBillScreen';
import FriendsList from './FriendsList';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Splitwise',
    headerStyle: {
      backgroundColor: '#159688',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  };

  state = {
    friends: [
      {name: "Жандос", relation: 200},
      {name: "Аян", relation: 0},
    ],
    owe: 0,
    owed: 0,
    balance: 0
  }

  addFriend = (friend) => {
    this.setState({
      friends: [friend, ...this.state.friends]
    });
  };

  split = (involvedFriends, paidFriends, totalAmount, description) => {
    const eachShouldPay = totalAmount / (involvedFriends.length + 1)

    if (paidFriends.includes("You")) {
      
      const youAreOwed = totalAmount - eachShouldPay
      const eachOwes = youAreOwed / involvedFriends.length

      this.setState({
        owed: youAreOwed,
        balance: youAreOwed - this.state.owe
      })
    } else {
      const youOwe = eachShouldPay
      if ((this.state.owed - youOwe) > 0) {
        this.setState({
          owe: 0,
          balance: this.state.owed - youOwe,
          owed: this.state.owed - youOwe
        })
      } else {
        this.setState({
          owe: youOwe - this.state.owed,
          balance: this.state.owed - youOwe,
          owed: this.state.owed - youOwe
        })
      }

      
    }

  }

  oweStyle = () => {
    return (this.state.owe !== 0)
    ? {
      textAlign: 'center',
      color: "red",
    }
    : {
      textAlign: 'center',
    }
  }

  owedStyle = () => {
    return (this.state.owed !== 0)
    ? {
      textAlign: 'center',
      color: "green",
    }
    : {
      textAlign: 'center',
    }
  }

  balanceStyle = () => {
    if (this.state.balance < 0) {
      return {
        textAlign: 'center',
        color: "red",
      }
    } else if (this.state.balance > 0) {
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

  render() {
    const buttonText = (!Array.isArray(this.state.friends) || !this.state.friends.length)
                          ? "+ Add friends on splitwise"
                          : "+ Add more friends"

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>

        <View style={styles.indebtedness}>
          <View style={{flex: 1}}>
            <Text style={styles.textCentered}>
              You owe
            </Text>
            <Text style={this.oweStyle()}>
              {this.state.owe} ₸
            </Text>

          </View>
          <View style={{flex: 1}}>
            <Text style={styles.textCentered}>
              You are owed
            </Text>
            <Text style={this.owedStyle()}>
              {this.state.owed} ₸
            </Text>

          </View>
          <View style={{flex: 1}}>
            <Text style={styles.textCentered}>
              Total balance
            </Text>
            <Text style={this.balanceStyle()}>
              {this.state.balance} ₸
            </Text>

          </View>
        </View>

        <FriendsList friends={this.state.friends} />

        <View style={{flex: 1}}>
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

       

    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    AddFriend: AddFriendScreen,
    AddBill: AddBillScreen
  },
  {
    initialRouteName: 'Home',
  }
);

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
    paddingHorizontal: 20
  },
  textCentered: {
    textAlign: 'center',
  },
   actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

