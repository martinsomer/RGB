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
            deviceMotionData: {},
            
        };
    }
    newRandColor=()=>{
        if(percentage(this.props.randomColorR,this.props.randomColorG,this.props.randomColorB,getRed(gamma),getGreen(beta),getBlue(alpha))>75
        ){
            this.props.getRandomColor();
        }
    }
    // Subscribe to sensor data on component load
    componentDidMount() {
        this._subscribe();
        
    }
    
    // Add listener to sensor and save the values in the state
    _subscribe() {
        DangerZone.DeviceMotion.addListener((deviceMotionData) => {
            this.setState({
                deviceMotionData: deviceMotionData.rotation,
            });
        });
    }
    
    // Get values from the state, calculate RGB and
    // pass to parent component as a View
    // TO-DO: PASS VALUES AS INT, NOT VIEW
    render() {
        let { alpha, beta, gamma } = this.state.deviceMotionData;
        let currentColor = "rgb("+getRed(gamma)+","+getGreen(beta)+","+getBlue(alpha)+")";
        
        return (
            
            <View style={[styles.currentColor, {backgroundColor: currentColor}]}>
                    
                
                <Text>R: {getRed(gamma)}</Text>
                <Text>G: {getGreen(beta)}</Text>
                <Text>B: {getBlue(alpha)}</Text>
                {/* <Text>R: {this.props.randomColorR}</Text>
                <Text>G: {this.props.randomColorG}</Text>
                <Text>B: {this.props.randomColorB}</Text> */}
                 <Text style={styles.percent }> {
                     percentage(this.props.randomColorR,this.props.randomColorG,this.props.randomColorB,getRed(gamma),getGreen(beta),getBlue(alpha)) }%</Text> 
            </View> 
        );
        this.newRandColor();
    }
} /* calculates percent */
function percentage (red, green, blue, R, G, B , getRandomcolor){
    let percent;
    let redP = red-R ;
    redP = redP < 0 ?redP * -1 : redP;
    let greenP = green-G ;
    greenP = greenP < 0 ?greenP * -1 : greenP;
    let blueP = blue-B;
    blueP = blueP < 0 ?blueP * -1 : blueP;
    percent = Math.floor(((100 - ((redP * (100/360)) + (greenP * (100/360)) + (blueP * (100/360))) / 3) - 29) / 71 * 102);
   
    return(percent)

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
    return normalisedAngle = Math.floor(((angle - min) / (max - min)) * 255);
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
    
    // Check if the initial rotation is not saved
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
    percent: {
        fontSize: 180,
       
        color: 'rgba(153,153,153,0.54)',
        
    },
    
});