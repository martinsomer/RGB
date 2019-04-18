import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo';

export default class MainMenuScreen extends React.Component {

  constructor(props) {
    super(props);
    this.audioPlayer = new Audio.Sound();
  }

  playButtonPressed = async () => {
    try {
        await this.audioPlayer.unloadAsync()
        await this.audioPlayer.loadAsync(require("../sounds/pop.mp3"));
        await this.audioPlayer.playAsync();
    } catch (err) {
        console.warn("Couldn't Play audio", err)
    }
    this.props.navigation.navigate('Game');
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.imageSide}>
          <Image style={styles.image} source={require('../images/RGBlogo.png')} />
          <View style={styles.gameNameContainer}>
            <Text style={styles.gameName}>RGB Game</Text>
          </View>
        </View>

        <View style={styles.buttonSide}>
          <TouchableOpacity style={styles.button} onPress={() => this.playButtonPressed()}>
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5eefc',
    paddingTop: 15,
  },
  // Contains image and container with gameName
  imageSide: {
      alignSelf: 'stretch', 
      justifyContent: 'center', 
      alignItems: 'center',
      flex: 0.6,
      flexDirection: 'column'
  },
  // Contains TouchableOpacity with text
  buttonSide: {
    alignSelf: 'stretch', 
    justifyContent: 'center', 
    alignItems: 'center',
    flex: 0.4,
    flexDirection: 'column'
  },
  // Image from imageSide
  image: {
    resizeMode: 'contain',
    flex: .8,
  },
  // Container with game name from imageSide
  gameNameContainer: {
    flex: .2,
    justifyContent: 'flex-end',
  },
  // Game's name in gameNameContainer
  gameName: {
    flex: .6,
    fontWeight: 'bold',
    fontSize: 45,
  },
  // Touchableopacity containing text
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    justifyContent: 'center',
    width: '25%',
    height: '25%',
    borderRadius: 5
  },
  // Play text in TouchableOpacity
  buttonText: {
    fontWeight: 'bold',
    fontSize: 35
  }
});