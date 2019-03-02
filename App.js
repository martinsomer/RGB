import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import {createSwitchNavigator, createAppContainer} from 'react-navigation'

import MainMenuScreen from './screens/MainMenuScreen';
import GameScreen from './screens/GameScreen';


class App extends React.Component {
  render() {
    return <AppContainer/>;
  }
}

export default App;

const AppSwitchNavigator = createSwitchNavigator({
  MainMenu: {screen: MainMenuScreen},
  Game: {screen: GameScreen}
});

const AppContainer = createAppContainer(AppSwitchNavigator);
