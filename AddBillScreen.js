import React from 'react';
import { View, StyleSheet, Button, Text, FlatList, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';

class AddBillScreen extends React.Component {
	static navigationOptions = {
    title: 'Add a bill',
    headerStyle: {
      backgroundColor: '#159688',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  };

  state = {
    involvedFriends: [],
    paidFriends: [],
    totalAmount: '',
    description: ''
  };

  addToInvolvedFriends = (friend) => {
    this.state.involvedFriends.includes(friend)
      ? this.setState({
        involvedFriends: this.state.involvedFriends.filter(involvedFriend => involvedFriend !== friend)
      })
      : this.setState({
        involvedFriends: [friend, ...this.state.involvedFriends]
      });
  }

  addToPaidFriends = (friend) => {
    this.state.paidFriends.includes(friend)
      ? this.setState({
        paidFriends: this.state.paidFriends.filter(paidFriend => paidFriend !== friend)
      })
      : this.setState({
        paidFriends: [friend, ...this.state.paidFriends]
      });
  }

  InvolvedFriendCheck = (friend) => {
    const checked = (this.state.involvedFriends.includes(friend)) ? "checked" : ""

    return (
      <Text>{checked}</Text>
    )
  }

  PaidFriendCheck = (friend) => {
    const checked = (this.state.paidFriends.includes(friend)) ? "checked" : ""

    return (
      <Text>{checked}</Text>
    )
  }

  render() {
    const { navigation } = this.props
    const friends = navigation.getParam('friends', 'nope')
    const who_paid = friends.slice()
    who_paid.unshift('You')

    return (
      <View style={{ flex: 1, backgroundColor: 'white', padding: 15 }}>
      	<Text style={styles.title}>Involved friends</Text>

        <View style={{height: 36, marginBottom: 10}}>
          <FlatList
            data={friends}
            extraData={this.InvolvedFriendCheck()}
            renderItem={({item}) =>
              <TouchableOpacity style={styles.item} onPress={()=> { this.addToInvolvedFriends(item) }}>
                <Text style={styles.friendName}>{item}</Text>
                {this.InvolvedFriendCheck(item)}
                
              </TouchableOpacity>
            }
          />
        </View>

        <Text style={styles.title}>Who paid?</Text>

        <View style={{height: 72}}>
          <FlatList
            data={who_paid}
            extraData={this.PaidFriendCheck()}
            renderItem={({item}) =>
              <TouchableOpacity style={styles.item} onPress={()=> { this.addToPaidFriends(item) }}>
                <Text style={styles.friendName}>{item}</Text>
                {this.PaidFriendCheck(item)}
                
              </TouchableOpacity>
            }
          />
        </View>

        <TextInput
          label='Amount'
          value={this.state.totalAmount}
          onChangeText={totalAmount => this.setState({ totalAmount })}
          underlineColor='#159688'
        />

        <TextInput
          label='Description'
          value={this.state.description}
          onChangeText={description => this.setState({ description })}
          underlineColor='#159688'
        />

        <Button
          title="Save"
          color="#1aa898"
          onPress={() => {
            this.props.navigation.state.params.split(
                this.state.involvedFriends,
                this.state.paidFriends,
                this.state.totalAmount,
                this.state.description)
            this.props.navigation.goBack()
          }}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: "gray",
    fontSize: 16
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    height: 36,
    alignItems: 'center'
  },
  friendName: {
    flex: 1,
    fontSize: 20
  },
  status: {
    flex: 1,
    fontSize: 14,
    // position: 'absolute', right: 20,
    textAlign: 'right',  
  }
});

export default AddBillScreen;

