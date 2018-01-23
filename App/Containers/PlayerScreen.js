import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  View,
  Platform
} from 'react-native';
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text
} from 'native-base';
import { Colors, Fonts } from '../Themes';
import { NavigationActions } from 'react-navigation';
import Spotify from 'react-native-spotify';

import styles from '../Navigation/Styles/NavigationStyles';

export default class PlayerScreen extends Component {
  static navigationOptions = {
    header: null,
    headerMode: 'none'
  };

  constructor(props) {
    super(props);
    this.state = { spotifyUser: null };
  }

  componentDidMount() {
    Spotify.getMe((result, error) => {
      if (error) {
        Alert.alert('Error Sending getMe request', error.message);
      } else {
        this.setState(state => {
          state.spotifyUser = result;
          return state;
        });
      }
    });
  }

  render() {
    return (
      <View>
        <Text>Hello from PlayerScreen.js</Text>
      </View>
    );
  }
}
