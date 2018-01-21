import React, { Component } from 'react';
import { Linking, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Spotify from 'react-native-spotify';

var { InitialScreen } = require('./InitialScreen.js');
var { PlayerScreen } = require('./PlayerScreen.js');
var { ProfilePage } = require('./ProfilePage.js');

export default (App = StackNavigator(
  {
    initial: { screen: InitialScreen },
    player: { screen: PlayerScreen },
    profile: { screen: ProfilePage }
  },
  {
    headerMode: 'none'
  }
));

App.handleOpenURL = event => {
  Spotify.handleAuthURLAsync(event.url, handled => {
    return handled;
  });
};
Linking.addEventListener('url', App.handleOpenURL);
