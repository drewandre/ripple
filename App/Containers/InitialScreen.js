import React, { Component } from 'react';

import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { Button, Text, Content, Container } from 'native-base';
import { Metrics, Colors, Fonts } from '../Themes';

import Spotify from 'react-native-spotify';

import * as ReactNavigation from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

export default class InitialScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = { spotifyInitialized: false };
    this.goToNewsfeed = this.goToNewsfeed.bind(this);
    this.initializeSpotify = this.initializeSpotify.bind(this);
    this.spotifyLoginButtonWasPressed = this.spotifyLoginButtonWasPressed.bind(
      this
    );
  }

  goToNewsfeed() {
    var navAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'newsfeed' })]
    });
    this.props.navigation.dispatch(navAction);
  }

  initializeSpotify() {
    var spotifyOptions = {
      clientID: '08652068ed8d4c72a4e527ef1abcf944',
      sessionUserDefaultsKey: 'SpotifySession',
      redirectURL: 'spotify-auth://callback',
      scopes: [
        'playlist-read-private',
        'playlist-read-collaborative',
        'playlist-modify-public',
        'playlist-modify-private',
        'streaming',
        'ugc-image-upload',
        'user-follow-modify',
        'user-follow-read',
        'user-library-read',
        'user-library-modify',
        'user-read-private',
        'user-read-birthdate',
        'user-read-email',
        'user-top-read',
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-read-currently-playing',
        'user-read-recently-played'
      ]
    };

    Spotify.isInitializedAsync(initialized => {
      if (initialized === false) {
        Spotify.initialize(spotifyOptions, (loggedIn, error) => {
          this.setState({ spotifyInitialized: true });
          if (error != null) {
            Alert.alert('Error', error.message);
          }
          if (loggedIn) {
            this.goToNewsfeed();
          }
        });
      } else {
        this.setState({ spotifyInitialized: true });
        Spotify.isLoggedInAsync(loggedIn => {
          if (loggedIn) {
            this.goToNewsfeed();
          }
        });
      }
    });
  }

  componentWillMount() {
    this.initializeSpotify();
  }

  spotifyLoginButtonWasPressed() {
    Spotify.login((loggedIn, error) => {
      if (error) {
        Alert.alert('Error', error.message);
      }
      if (loggedIn) {
        this.goToNewsfeed();
      }
    });
  }

  render() {
    if (!this.state.spotifyInitialized) {
      return (
        <Container style={styles.container}>
          <ActivityIndicator
            animating={true}
            color="#BDB76B"
            style={styles.loadIndicator}
          />
        </Container>
      );
    } else {
      return (
        <Container style={styles.container}>
          <Text style={styles.greeting}>Ripple</Text>
          <Button
            onPress={this.spotifyLoginButtonWasPressed}
            style={styles.spotifyLoginButton}
          >
            <Text style={styles.spotifyLoginButtonText}>
              Connect to Spotify
            </Text>
          </Button>
        </Container>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'red'
  },
  loadIndicator: {},
  spotifyLoginButton: {
    borderRadius: 50,
    backgroundColor: '#6A95EB',
    alignSelf: 'center'
  },
  spotifyLoginButtonText: {
    fontSize: 20,
    paddingTop: 3,
    color: 'white'
  },
  greeting: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});
