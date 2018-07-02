import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

class AddFriendScreen extends React.Component {
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

  state = {
    friend: {
      name: ""
    },
  };

  render() {
  	const { navigation } = this.props;

    disabled = true

    if (this.state.friend.name !== "") {
      disabled = false
    }

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
      	<View style={{ paddingHorizontal: 15, marginBottom: 15, paddingTop: 2}}>
		      <TextInput
			      label='Name'
		        value={this.state.friend.name}
		        onChangeText={inputName => this.setState({ friend: {
              ...this.state.friend,
              name: inputName,
            } })}
		        underlineColor='#159688'

	          placeholder="Type your friend's name..."
	        />
        </View>

        <View style={styles.button}>
          <Button
            title="Save"
            color="#1aa898"
            disabled={disabled}
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

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15
  }
});

export default AddFriendScreen

