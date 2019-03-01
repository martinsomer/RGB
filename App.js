import React from 'react';
import { StyleSheet, Text, View, StatusBar, Button } from 'react-native';
import { Accelerometer, Audio } from 'expo';
import DeviceMotionData from './components/DeviceMotionData';

export default class App extends React.Component {
    
    // State for holding the values of random and current color
    constructor(props) {
        super(props);
        this.audioPlayer = new Audio.Sound();
        this.state = {
            randomColor: null,
            currentColor: null,
            percent: null,
        };
    }
    
    // Get random color on app start
    componentDidMount() {
        this.getRandomColor();
    }
    
    // Generate random color and save it in the state
    getRandomColor() {
        let randomColorR = Math.floor(Math.random() * (255 + 1))
        let randomColorG = Math.floor(Math.random() * (255 + 1))
        let randomColorB = Math.floor(Math.random() * (255 + 1))
        let randomColorRGB = "rgb(" + randomColorR + "," + randomColorG + "," + randomColorB + ")";
        
        this.setState({
            randomColor: randomColorRGB,
            randomColorR: randomColorR,
            randomColorG: randomColorG,
            randomColorB: randomColorB,
        });
    }
    
    // Inspired by https://stackoverflow.com/questions/50292035
    playScoreSound = async () => {
        try {
            await this.audioPlayer.unloadAsync()
            await this.audioPlayer.loadAsync(require("./sounds/score.wav"));
            await this.audioPlayer.playAsync();
        } catch (err) {
            console.warn("Couldn't Play audio", err)
        }
    }
    
    // Get percentage value from DeviceMotionData component
    handlePercentageChange = (value) => {
        if (value > 99) {
            value -= 1;
            this.playScoreSound();
            this.getRandomColor();
        }
        
        // Save to state
        this.setState({
           percent: value,
        });
    }
    
    // Render the app
    render() {
        return (
            // This is the main view, put elements inside this
            <View style={styles.container}>
            
                <StatusBar hidden />
            
                <View style={[styles.generatedColor, {backgroundColor: this.state.randomColor}]}>
                    <Text>R: {this.state.randomColorR}</Text>
                    <Text>G: {this.state.randomColorG}</Text>
                    <Text>B: {this.state.randomColorB}</Text>
                </View>
                
                <DeviceMotionData
                    randomColorR={this.state.randomColorR}
                    randomColorG={this.state.randomColorG}
                    randomColorB={this.state.randomColorB}
                    onPercentageChange= {this.handlePercentageChange}>
                </DeviceMotionData>
                
            
                <View style={styles.percentageLayer}>
                    <View style={styles.percentageBox}>
                        <Text style={styles.percentageText}>
                            {this.state.percent}%
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

// Stylesheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // Box for generated color
    generatedColor: {
        flex: 1,
        borderColor: 'white',
        borderWidth: 6,
        borderBottomWidth: 3,
    },
    // Box for current color
    currentColor: {
        flex: 1,
       
        borderColor: 'white',
        borderWidth: 6,
        borderTopWidth: 3,
    },
    // Full-screen transparent layer containing percentage box 
    // This layer sits on top of both color Views
    percentageLayer: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        
        // Center the percentage box
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Box that contains the percentage text
    percentageBox: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Text inside the percentage box
    percentageText: {
        fontSize: 45,
    },
});
