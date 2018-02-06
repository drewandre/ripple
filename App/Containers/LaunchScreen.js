import React, { Component } from 'react';
import { Linking, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Spotify from 'react-native-spotify';

import InitialScreen from './InitialScreen.js';
import StatsScreen from './StatsScreen.js';
import ProfilePage from './ProfilePage.js';
import Newsfeed from './Newsfeed.js';
import Discover from './Discover.js';
import ConcertsPage from './ConcertsPage.js';
import Inbox from './Inbox.js';

export default (App = StackNavigator(
  {
    initial: { screen: InitialScreen },
    stats: { screen: StatsScreen },
    profile: { screen: ProfilePage },
    newsfeed: { screen: Newsfeed },
    discover: { screen: Discover },
    concerts: { screen: ConcertsPage },
    inbox: { screen: Inbox }
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
