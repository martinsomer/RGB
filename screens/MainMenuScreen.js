import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default class MainMenuScreen extends React.Component {
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
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Game')}>
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
  imageSide: {
      alignSelf: 'stretch', 
      justifyContent: 'center', 
      alignItems: 'center',
      flex: 0.6,
      flexDirection: 'column'
  },
  buttonSide: {
    alignSelf: 'stretch', 
    justifyContent: 'center', 
    alignItems: 'center',
    flex: 0.4,
    flexDirection: 'column'
  },
  image: {
    resizeMode: 'contain',
    flex: .8,
  },
  gameNameContainer: {
    flex: .2,
    justifyContent: 'flex-end',
  },
  gameName: {
    flex: .6,
    fontWeight: 'bold',
    fontSize: 45,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    justifyContent: 'center',
    width: '25%',
    height: '25%',
    borderRadius: 5
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 35
  }
});