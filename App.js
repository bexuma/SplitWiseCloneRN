import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import AddFriendScreen from './AddFriendScreen';
import AddBillScreen from './AddBillScreen';
import BillHistoryScreen from './BillHistoryScreen';

console.disableYellowBox = true;

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    AddFriend: AddFriendScreen,
    AddBill: AddBillScreen,
    BillHistory: BillHistoryScreen
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

