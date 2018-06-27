import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-paper';

class AddFriendScreen extends React.Component {
	state = {
    text: ''
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

  handleSaveClicked = () => {
  	this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
      	<View style={{ paddingHorizontal: 15, marginBottom: 15, paddingTop: 2}}>
		      <TextInput
			      label='Name'
		        value={this.state.text}
		        onChangeText={text => this.setState({ text })}
		        underlineColor='#159688'

	          placeholder="Type your friend's name..."
	        />
        </View>

        <View style={styles.button}>
          <Button
            title="Save"
            color="#1aa898"
            onPress={() => this.handleSaveClicked()}
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



export default AddFriendScreen;

