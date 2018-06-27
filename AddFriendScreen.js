import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15
  }
});

class AddFriendScreen extends React.Component {
	state = {
    friend: ''
  };

	static navigationOptions = {
    title: 'Add a friend',
    headerStyle: {
      backgroundColor: '#159688',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  };

  handleSaveClicked = (friend) => {
  	//this.props.navigation.navigate('Home')
  	this.props.navigation.goBack()
    this.props.navigation.state.params.addFriend(friend)
  }

  render() {
  	const { navigation } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
      	<View style={{ paddingHorizontal: 15, marginBottom: 15, paddingTop: 2}}>
		      <TextInput
			      label='Name'
		        value={this.state.friend}
		        onChangeText={friend => this.setState({ friend })}
		        underlineColor='#159688'

	          placeholder="Type your friend's name..."
	        />
        </View>

        <View style={styles.button}>
          <Button
            title="Save"
            color="#1aa898"
            onPress={() => {
            	this.props.navigation.state.params.addFriend(this.state.friend)
            	this.props.navigation.goBack()
            }}
           //    this.props.navigation.navigate('Home',
           //      {
    							// this.props.navigation.state.params.addFriend(this.state.friend)
           //      }
           //    )
          />
        </View>

      </View>
    );
  }
}

export default AddFriendScreen;

