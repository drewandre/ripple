import React from 'react';
import { StackNavigator } from 'react-navigation';
import LaunchScreen from '../Containers/LaunchScreen';
import InitialScreen from '../Containers/InitialScreen';
import PlayerScreen from '../Containers/PlayerScreen';
import ProfilePage from '../Containers/ProfilePage';

import styles from './Styles/NavigationStyles';

// import SearchBar from '../Containers/SearchBar';

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
