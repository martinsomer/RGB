import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import { Audio } from 'expo';
import Modal from 'react-native-modal';
import { AsyncStorage } from "react-native"


export default class MainMenuScreen extends React.Component {

  constructor(props) {
    super(props);
    this.audioPlayer = new Audio.Sound();
    this.state = {
      score: this.props.navigation.getParam('score', null),
      showModal: false,
      highScore: 0,
    };
  }

  componentDidMount() {
    if(this.state.score !== null) {
      AsyncStorage.getItem('highScore').then(result => {
        this.setState({highScore: parseInt(result) || 0});
        this.save();
        this.setState({ showModal: true});
      }).catch(error => {
        this.save();
        this.setState({ showModal: true});
      })
    }
  }

  save = () => {
    if(this.state.score > this.state.highScore) {
      this.setState({highScore: this.state.score});
      AsyncStorage.setItem('highScore', this.state.highScore.toString());
    }
  }

  playButtonPressed = async () => {
    try {
        await this.audioPlayer.unloadAsync();
        await this.audioPlayer.loadAsync(require("../sounds/pop.mp3"));
        await this.audioPlayer.playAsync();
    } catch (err) {
        console.warn("Couldn't Play audio", err)
    }
    this.props.navigation.navigate('Game');
  }

  renderModalContent = () => (
    <View style={styles.modal}>
      <Text style={styles.modalTitle}>Game over!</Text>
      <Text style={styles.modalContent}>Final score: {this.state.score}</Text>
      <Text style={styles.modalContent}>High score: {this.state.highScore}</Text>
      <TouchableOpacity style={styles.modalButton}
        onPress={() => {this.setState({ showModal: false });}}
      >
        <Text style={styles.modalButtonText}>Continue</Text>
      </TouchableOpacity >
    </View>
  );

  render() {
    return (
      <View style={styles.container}>

        <Modal
          isVisible={this.state.showModal === true}
          backdropColor="#B4B3DB"
          backdropOpacity={0.95}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
        >
          {this.renderModalContent()}
        </Modal>

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
  },
  // Modal container
  modal: {
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 35,
    flex: 1
  },
  // Modal title text
  modalTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 55,
    marginBottom: 10
  },
  // Modal score text
  modalContent: {
    fontWeight: 'bold',
    fontSize: 35,
    marginBottom: 15
  },
  // Button in popup modal
  modalButton: {
    height: 'auto',
    width: 'auto',
    backgroundColor: '#DDDDDD',
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  modalButtonText: {
    fontWeight: 'bold',
    fontSize: 25
  },
});