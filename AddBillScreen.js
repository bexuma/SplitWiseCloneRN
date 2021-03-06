import React from 'react';
import { View, StyleSheet, Button, Text, ScrollView, FlatList, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

class AddBillScreen extends React.Component {
  state = {
    involvedFriends: [],
    paidFriends: ['You'],
    payer: '',
    totalAmount: '',
    description: ''
  };

  addToInvolvedFriends = (friend) => {
    this.state.involvedFriends.includes(friend)
      ? this.setState({
        involvedFriends: this.state.involvedFriends.filter(involvedFriend => involvedFriend !== friend),
        paidFriends: this.state.paidFriends.filter(paidFriend => paidFriend !== friend)
      })
      : this.setState({
        involvedFriends: [friend, ...this.state.involvedFriends],
        paidFriends: [friend, ...this.state.paidFriends]
      });
  }

  addPayer = (friend) => {

    this.setState({
      payer: friend
    })
  }

  InvolvedFriendCheck = (friend) => {
    return (this.state.involvedFriends.includes(friend))
      ? (<Icon name="check" size={20} color="#c23135" />)
      : ( <View></View> )
  }

  PayerCheck = (friend) => {
    return (friend === this.state.payer)
      ? (<Icon name="check" size={20} color="#c23135" />)
      : ( <View></View> )
  }

  focusNextField(nextField) {
    this.refs[nextField].focus();
  }

  render() {
    const { navigation } = this.props
    const friends = navigation.getParam('friends', 'nope')
    disabled = true

    if (this.state.involvedFriends.length > 0
     && this.state.totalAmount !== ""
     && !isNaN(this.state.totalAmount)
     && this.state.description !== ""
    ) { disabled = false }

    return (
      <KeyboardAvoidingView
            behavior="position"
            contentContainerStyle={{ flex: 1 }}
            style={{ flex: 1 }}
            keyboardVerticalOffset={80}
            enabled>

        <ScrollView keyboardShouldPersistTaps={true} style={{flex: 1, backgroundColor: 'white', padding: 15}}>

          <Text style={styles.title}>Involved friends</Text>

          <View style={{marginBottom: 10}}>
            <FlatList
              data={friends}
              extraData={this.InvolvedFriendCheck()}
              renderItem={({item}) =>
                <TouchableOpacity style={styles.item} onPress={()=> { this.addToInvolvedFriends(item.name) }}>
                  <Text style={styles.friendName}>{item.name}</Text>
                  {this.InvolvedFriendCheck(item.name)}
                  
                </TouchableOpacity>
              }
            />
          </View>

          <Text style={styles.title}>Who paid?</Text>

          <View>
            <FlatList
              data={this.state.paidFriends}
              extraData={this.addPayer, this.PayerCheck, this.state.payer}
              renderItem={({item}) =>
                <TouchableOpacity style={styles.item} onPress={()=> { this.addPayer(item) }}>
                  <Text style={styles.friendName}>{item}</Text>
                  {this.PayerCheck(item)}
                  
                </TouchableOpacity>
              }
            />
          </View>

          <TextInput
            ref="1"
            returnKeyType="next"
            label='Amount'
            keyboardType="numeric"
            blurOnSubmit={false}
            onSubmitEditing={() => this.focusNextField('2')}
            value={this.state.totalAmount}
            onChangeText={totalAmount => this.setState({ totalAmount })}
            underlineColor='#159688'
          />

          <TextInput
            ref="2"
            returnKeyType="done"
            label='Description'          
            value={this.state.description}
            onChangeText={description => this.setState({ description })}
            underlineColor='#159688'
          />

          <TouchableOpacity
            style={{marginTop: 12, marginBottom: 13, height: 50}}
          >
            <Button
              title="Save"
              color="#1aa898"
              disabled={disabled}
              onPress={() => {
                this.props.navigation.state.params.split(
                    this.state.involvedFriends,
                    this.state.payer,
                    this.state.totalAmount,
                    this.state.description)
                this.props.navigation.goBack()
              }}
            />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

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
}

const styles = StyleSheet.create({
  title: {
    color: "gray",
    fontSize: 16
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    height: 42,
    alignItems: 'center'
  },
  friendName: {
    flex: 1,
    fontSize: 18
  },
  status: {
    flex: 1,
    fontSize: 14,
    // position: 'absolute', right: 20,
    textAlign: 'right',  
  }
});

export default AddBillScreen;

