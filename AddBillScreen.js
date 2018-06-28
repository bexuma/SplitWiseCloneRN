import React from 'react';
import { View, StyleSheet, Button, Text, FlatList } from 'react-native';
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
    amount: '',
    description: ''
  };

  render() {
    const { navigation } = this.props
    const friends = navigation.getParam('friends', 'nope')
    const who_paid = friends.slice()
    who_paid.unshift('You')

    return (
      <View style={{ flex: 1, backgroundColor: 'white', padding: 15 }}>
      	<Text style={styles.title}>Involved friends</Text>

        <View style={{height: 72, marginBottom: 10}}>
          <FlatList
            data={friends}
            renderItem={({item}) =>
              <View style={styles.item}>
                <Text style={styles.friendName}>{item}</Text>
                
              </View>
            }
          />
        </View>

        <Text style={styles.title}>Who paid?</Text>

        <View style={{height: 108, marginBottom: 10}}>
        <FlatList
            data={who_paid}
            renderItem={({item}) =>
              <View style={styles.item}>
                <Text style={styles.friendName}>{item}</Text>
                
              </View>
            }
          />
        </View>

        <TextInput
          label='Amount'
          value={this.state.amount}
          onChangeText={amount => this.setState({ amount })}
          underlineColor='#159688'
        />

        <TextInput
          label='Description'
          value={this.state.description}
          onChangeText={description => this.setState({ description })}
          underlineColor='#159688'
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

