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
    initial: { screen: InitialScreen, headerMode: 'none', header: null },
    player: { screen: PlayerScreen, headerMode: 'none' },
    profile: { screen: ProfilePage, headerMode: 'none' },
    newsfeed: { screen: Newsfeed, headerMode: 'none' },
    discover: { screen: Discover, headerMode: 'none' }
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
