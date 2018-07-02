import React from 'react';
import { View, StyleSheet, Text, FlatList} from 'react-native';

class BillHistoryScreen extends React.Component {
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
    const transactions = navigation.getParam('transactions', '')

    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <FlatList
          data={transactions}
          renderItem={({item}) =>
            <View style={styles.item}>
              <Text style={styles.description}>{item.description}</Text>
              {this.friendBalance(item.balance)}
            </View>
          }
        />
      </View>
    );
  }

  friendBalance = balance => {
    const message = (balance < 0)
      ? "you borrowed"
      : "you lent"

    const color = (balance < 0)
      ? "red"
      : "green"

    return (
      <View style={styles.status}>
        <Text style={[styles.statusMessage, {color: color}]}>
          {message}
        </Text>
        <Text style={[styles.statusMessage, {color: color}]}>
          {balance} ₸
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  description: {
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

export default BillHistoryScreen

