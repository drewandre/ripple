import React, { Component } from 'react';
import { Linking, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Spotify from 'react-native-spotify';

import InitialScreen from './InitialScreen.js';
import PlayerScreen from './PlayerScreen.js';
import ProfilePage from './ProfilePage.js';
import Newsfeed from './Newsfeed.js';
import Discover from './Discover.js';

export default (App = StackNavigator(
  {
    initial: { screen: InitialScreen },
    player: { screen: PlayerScreen },
    profile: { screen: ProfilePage },
    newsfeed: { screen: Newsfeed },
    discover: { screen: Discover }
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
