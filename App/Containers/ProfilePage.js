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

export default class ProfilePage extends Component {
  static navigationOptions = {
    header: null,
    headerMode: 'none'
  };

  constructor(props) {
    super(props);
    this.state = {
      spotifyUser: null
    };
    this.spotifyLogout = this.spotifyLogout.bind(this);
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

  spotifyLogout() {
    Spotify.logout(error => {
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        const navAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'initial' })]
        });
        this.props.navigation.dispatch(navAction);
      }
    });
  }

  render() {
    return (
      <View>
        <Button block info onPress={this.spotifyLogout}>
          <Text>Log out</Text>
        </Button>
      </View>
    );
  }
}
