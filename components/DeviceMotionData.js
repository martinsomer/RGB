import React from 'react';
import { StyleSheet ,Text, View } from 'react-native';
import { DangerZone } from 'expo';

// Save the initial device rotation
let offset = null;
let thresholdL = null;
let thresholdR = null;

export default class DeviceMotionData extends React.Component {
    
    // State for holding device rotation values
    constructor(props) {
        super(props);
        this.state = {
            red: null,
            green: null,
            blue: null,
            percent: null,
        };
    }
    
    // Subscribe to sensor data on component load
    componentDidMount() {
        this._subscribe();
    }
    
    // Add listener to sensor and save the values in the state
    _subscribe() {
        DangerZone.DeviceMotion.addListener((deviceMotionData) => {
            let { alpha, beta, gamma } = deviceMotionData.rotation;
            
            // Calculate colors and percentage
            let red = getRed(gamma);
            let green = getGreen(beta);
            let blue = getBlue(alpha);
            let percentage = getPercentage(this.props.randomColorR, this.props.randomColorG, this.props.randomColorB, red, green, blue);
            
            // Save the values
            this.setState({
                red: red,
                green: green,
                blue: blue,
                percent: percentage,
            });
            
            // Send the percentage value back to parent component
            this.props.onPercentageChange(percentage);
        });
    }
    
    // Get values from the state and pass to parent component as View
    render() {
        let currentColor = "rgb(" + this.state.red + "," + this.state.green + "," + this.state.blue + ")";
        
        return (
            <View style={[styles.currentColor, {backgroundColor: currentColor}]}>
                <Text>R: {this.state.red}</Text>
                <Text>G: {this.state.green}</Text>
                <Text>B: {this.state.blue}</Text>
            </View>
        );
    }
}

// Calculates percent
function getPercentage (red, green, blue, R, G, B, getRandomcolor) {
    let redP = red-R;
    redP = redP < 0 ? redP * -1 : redP;
    let greenP = green-G ;
    greenP = greenP < 0 ? greenP * -1 : greenP;
    let blueP = blue-B;
    blueP = blueP < 0 ? blueP * -1 : blueP;
    
    return Math.floor(((100 - ((redP * (100/360)) + (greenP * (100/360)) + (blueP * (100/360))) / 3) - 29) / 71 * 102);
}

// Inspired by official Expo documentation
function round(n) {
    if (!n) {
        return 0;
    }
    return Math.floor(n * 100);
}

// Normalization formula ispired by
// https://docs.tibco.com/pub/spotfire/7.0.0/doc/html/norm/norm_scale_between_0_and_1.htm
function normalize(min, max, angle) {
    return Math.floor(((angle - min) / (max - min)) * 255);
}

// Calculate the value of RED
function getRed(angle) {
    let threshold = 50;
    angle = round(angle);
    
    let colorRed = (
        (threshold*-1) <= angle && angle <= threshold
        ? normalize(threshold * -1, threshold, angle)
        : (
            colorRed =
            angle <= (threshold * -1)
            ? 0
            : 255
        )
    )
    
    return colorRed;
}

// Calculate the value of GREEN
function getGreen(angle) {
    let threshold = 45;
    angle = round(angle);
    
    let colorGreen = (
        (threshold * -1) <= angle && angle <= threshold
        ? normalize(threshold * -1, threshold, angle)
        : (
            colorGreen =
            angle <= (threshold * -1)
            ? 0
            : 255
        )
    )
    
    return colorGreen;
}

// Calculate the value of BLUE
function getBlue(angle) {
    let threshold = 35;
    
    // Reverse the axis to go from negative to positive
    angle = round(angle) * -1;
    
    // Check if the initial rotation is not yet saved
    // and sensors are initalized
    // If not, save initial, minimum and maximum values of Gamma
    if (offset === null && angle != 0) {
        offset = angle;
        thresholdL = angle - threshold;
        thresholdR = angle + threshold;
    }
    
    // If alpha is less than -315, it starts counting down from 315 again
    // Check if aplha is less than -315 and adjust the value accordingly
    if (offset - 105 < -315 && angle > 0) {
        angle = (315 + (315 - angle)) * -1;
    }
    
    // If alpha is more than 315, it starts counting up from -315 again
    // Check if aplha is more than 315 and adjust the value accordingly
    if (offset + 105 > 315 && angle < 0) {
        angle = 315 + (315 - Math.abs(angle));
    }
    
    let colorBlue = (
        thresholdL <= angle && angle <= thresholdR
        ? normalize(thresholdL, thresholdR, angle)
        : (
            colorBlue =
            angle <= thresholdL
            ? 0
            : 255
        )
    )
    
    return colorBlue;
}

// Stylesheet
const styles = StyleSheet.create({
    // Box for current color
    currentColor: {
        flex: 1,
        borderColor: 'white',
        borderWidth: 6,
        borderTopWidth: 3,
    },
});