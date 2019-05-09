import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from 'react-native';
import { Audio, Svg } from 'expo';
import DeviceMotionData from '../components/DeviceMotionData';
import ProgressCircle from 'react-native-progress-circle'


export default class App extends React.Component {
    
    // State for holding the values of random and current color
    constructor(props) {
        super(props);
        this.audioPlayer = new Audio.Sound();
        this.state = {
            randomColor: null,
            currentColor: null,
            percent: null,
            score : 0,
            time : 60,
            visibleModal : false,

        };
    }

    // Get random color on app start
    componentDidMount() {
        this.getRandomColor();
        this.interval = setInterval(
            () => this.setState((prevState)=> ({ time: prevState.time - 1 })),
            1000
        );
    }

    // End game on timer end
    componentDidUpdate(){
        if (this.state.time === 0) {
            clearInterval(this.interval);

            this.props.navigation.navigate('MainMenu', {
                score: this.state.score
            });
        }
    }

    componentWillUnmount(){
        clearInterval(this.interval);
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
            await this.audioPlayer.loadAsync(require("../sounds/score.wav"));
            await this.audioPlayer.playAsync();
        } catch (err) {
            console.warn("Couldn't Play audio", err)
        }
    }
    
    // Get percentage value from DeviceMotionData component
    handlePercentageChange = (value) => {
        if (value > 90) {
            value -= 1;
            /* this.setState({
                score: + 1,
                
             }); */
            this.state.score += 1
            if (this.state.time >= 55) {
                this.state.time = 60;
            } else {
                this.state.time += 5;
            }
            this.playScoreSound();
            this.getRandomColor();
            
        }
        
        // Save to state
        this.setState({
           percent: value,
           
        });
    }

    backButtonPressed = async () => {
        try {
            await this.audioPlayer.unloadAsync()
            await this.audioPlayer.loadAsync(require("../sounds/pop.mp3"));
            await this.audioPlayer.playAsync();
        } catch (err) {
            console.warn("Couldn't Play audio", err)
        }
        this.props.navigation.navigate('MainMenu');
    }

    timerStyle = function(options) {
        let color;
        if (this.state.time <= 60) color = "#339900"
        if (this.state.time <= 48) color = "#99cc33"
        if (this.state.time <= 36) color = "#ffcc00"
        if (this.state.time <= 24) color = "#ff9966"
        if (this.state.time <= 12) color = "#cc3300"
        return color;
     }


    // Render the app
    render() {
        return (
            // This is the main view, put elements inside this
            <View style={styles.container}>
            
                <StatusBar hidden />

                <View style={styles.topRow}>
                    <TouchableOpacity style={styles.topRowButton} onPress={() => this.backButtonPressed()}>
                        <Image style={styles.topRowButtonImage} source={require('../images/back96.png')} />
                    </TouchableOpacity>
                    <Text style={styles.topRowScore}>SCORE: {this.state.score}</Text>
                </View>
            
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
                    <ProgressCircle
                        percent={this.state.time*(100/60)}
                        radius={50}
                        borderWidth={6}
                        color={this.timerStyle()}
                        shadowColor="#fff"
                        bgColor="#fff"
                    >
                        <Text style={styles.percentageText}>{ this.state.percent}%</Text>
                    </ProgressCircle>
                </View>

                <View style={styles.bottomRow}>
                    
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
        //top: '42%',
        //left: '37%',
        position: 'absolute',
        
        // Center the percentage box
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Text inside the percentage box
    percentageText: {
        fontSize: 42,
    },
    // Containing button to menu and score
    topRow: {
        flex: .1,
        flexDirection: 'row',
        borderColor: 'white',
        borderWidth: 6,
        borderBottomWidth: 0,
    },
    // Containing time left for game
    bottomRow: {
        flex: .1,
        justifyContent: 'center',
        borderColor: 'white',
        borderWidth: 6,
        borderTopWidth: 0,
    },
    topRowScore: {
        flex: 1, 
        textAlign: 'right', 
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    // TouchableOpacity with image
    topRowButton: {
        flex: 1, 
        alignItems: 'flex-start',
        borderRadius: 10
    },
    topRowButtonImage: {
        resizeMode: 'contain',
        flex: 1,
        width: '20%',
        backgroundColor: '#efefef',
        borderRadius: 7, //works only on iOS
        // Shadows work only on iOS
        // shadowOffset: { width: 5, height: 5 },
        // shadowColor: '#BDBDBD',
        // shadowOpacity: 1,
        // shadowRadius: 1,
    }
});
