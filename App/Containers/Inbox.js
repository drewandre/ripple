import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, Alert, View } from 'react-native';
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import Spotify from 'react-native-spotify';

export default class Inbox extends Component {
  static navigationOptions = {
    header: null,
    headerMode: 'none'
  };

  render() {
    return (
      <View>
        <Text>Hello from Inbox.js</Text>
      </View>
    );
  }
}
