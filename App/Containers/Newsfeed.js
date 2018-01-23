import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import { NavigationActions } from 'react-navigation';
import Spotify from 'react-native-spotify';

export default class Newsfeed extends Component {
  static navigationOptions = {
    header: null,
    headerMode: 'none'
  };
  render() {
    return (
      <View>
        <Text>Hello from Newsfeed.js</Text>
      </View>
    );
  }
}
