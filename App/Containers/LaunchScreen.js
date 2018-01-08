import React, { Component } from 'react';
import { Alert, Linking, Platform, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Spotify from 'react-native-spotify';

var { InitialScreen } = require('./InitialScreen.js');
var { PlayerScreen } = require('./PlayerScreen.js');

export default (App = StackNavigator(
  {
    initial: { screen: InitialScreen },
    player: { screen: PlayerScreen }
  },
  {
    headerMode: 'screen'
  }
));

App.handleOpenURL = event => {
  if (Spotify.handleAuthURL(event.url)) {
    console.log('Apps Spotify.handleAuthURL was a success');
    return true;
  }
  console.log('Apps Spotify.handleAuthURL was NOT a success');
  return false;
};
Linking.addEventListener('url', App.handleOpenURL);
