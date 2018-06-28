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
    friends: ['Жандос', 'Аян']
  }

  addFriend = (friend) => {
    this.setState({
      friends: [friend, ...this.state.friends]
    });
  };

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
            <Text style={styles.textCentered}>
              0 ₸
            </Text>

          </View>
          <View style={{flex: 1}}>
            <Text style={styles.textCentered}>
              You are owed
            </Text>
            <Text style={styles.textCentered}>
              0 ₸
            </Text>

          </View>
          <View style={{flex: 1}}>
            <Text style={styles.textCentered}>
              Total balance
            </Text>
            <Text style={styles.textCentered}>
              0 ₸
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
              friends: this.state.friends
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
    textAlign: 'center' 
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

