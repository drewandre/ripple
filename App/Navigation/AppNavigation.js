import React from 'react';
import { StackNavigator } from 'react-navigation';
import LaunchScreen from '../Containers/LaunchScreen';
import InitialScreen from '../Containers/InitialScreen';
import StatsScreen from '../Containers/StatsScreen';
import ProfilePage from '../Containers/ProfilePage';
import Newsfeed from '../Containers/Newsfeed';
import Discover from '../Containers/Discover';
import ConcertsPage from '../Containers/ConcertsPage';
import Inbox from '../Containers/Inbox';

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
    ConcertsPage: {
      screen: ConcertsPage
    }
  },
  {
    Discover: {
      screen: Discover
    }
  },
  {
    Inbox: {
      screen: Inbox
    }
  },
  {
    StatsScreen: {
      screen: StatsScreen
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
