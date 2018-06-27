import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import AddFriendScreen from './AddFriendScreen';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>

        <View style={styles.indebtedness}>
          <View style={{flex: 1}}>
            <Text style={styles.textCentered}>
              You owef
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

        <View style={{height: 100}}>
          <Text style={[styles.textCentered, {paddingTop: 40, fontSize: 18 }]}>
            You have not added any friends yet
          </Text>

        </View>


        <View style={{flex: 1}}>
          <View style={styles.button}>
            <Button
              title="+ Add friends on splitwise"
              onPress={() => this.props.navigation.navigate('AddFriend')}
            />
          </View>
        </View>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    AddFriend: AddFriendScreen,
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
  }
});



export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

