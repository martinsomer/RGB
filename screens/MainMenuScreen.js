import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default class MainMenuScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={{width: 200, height: 200,resizeMode : 'stretch' }} source={require('../images/RGBlogo.png')} /> 
        <Text>RGB Game</Text>
        <Button title="Play" onPress={() => this.props.navigation.navigate('Game')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});