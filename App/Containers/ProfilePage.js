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
  constructor(props) {
    super(props);

    this.state = {
      spotifyUser: null
    };

    this.spotifyLogoutButtonWasPressed = this.spotifyLogoutButtonWasPressed.bind(
      this
    );
    this.goToPlayerPage = this.goToPlayerPage.bind(this);
    this.goToInitialScreen = this.goToInitialScreen.bind(this);
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

  goToPlayerPage() {
    const navAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'player' })]
    });
    this.props.navigation.dispatch(navAction);
  }

  goToInitialScreen() {
    const navAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'initial' })]
    });
    this.props.navigation.dispatch(navAction);
  }

  spotifyLogoutButtonWasPressed() {
    Spotify.logout(error => {
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        this.goToInitialScreen();
      }
    });
  }

  render() {
    return (
      <View>
        <Button block success onPress={this.goToPlayerPage}>
          <Text>Home</Text>
        </Button>
        <Button block info onPress={this.spotifyLogoutButtonWasPressed}>
          <Text>Log out</Text>
        </Button>
      </View>
    );
  }
}
