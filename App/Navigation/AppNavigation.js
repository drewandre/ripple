import React from 'react';
import { StackNavigator } from 'react-navigation';
import LaunchScreen from '../Containers/LaunchScreen';
import InitialScreen from '../Containers/InitialScreen';
import { PlayerScreen } from '../Containers/PlayerScreen';
import ProfilePage from '../Containers/ProfilePage';
import Newsfeed from '../Containers/Newsfeed';
import Discover from '../Containers/Discover';

import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const PrimaryNav = StackNavigator(
  {
    LaunchScreen: {
      screen: LaunchScreen
    }
  },
  {
    InitialScreen: {
      screen: InitialScreen
    }
  },
  {
    Newsfeed: {
      screen: Newsfeed
    }
  },
  {
    Discover: {
      screen: Discover
    }
  },
  {
    PlayerScreen: {
      screen: PlayerScreen
    }
  },
  {
    ProfilePage: {
      screen: ProfilePage
    }
  },
  {
    //   // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LaunchScreen',
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

export default PrimaryNav;
