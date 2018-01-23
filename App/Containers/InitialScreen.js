import React, { Component } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { Button, Text } from 'native-base';

import { NavigationActions } from 'react-navigation';
import Spotify from 'react-native-spotify';
import { Colors, Fonts } from '../Themes';

export default class InitialScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = { spotifyInitialized: false };
    this.goToPlayer = this.goToPlayer.bind(this);
    this.initializeSpotify = this.initializeSpotify.bind(this);
    this.spotifyLoginButtonWasPressed = this.spotifyLoginButtonWasPressed.bind(
      this
    );
  }

  goToPlayer() {
    const navAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'player' })]
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
            this.goToPlayer();
          }
        });
      } else {
        this.setState({ spotifyInitialized: true });
        Spotify.isLoggedInAsync(loggedIn => {
          if (loggedIn) {
            this.goToPlayer();
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
        this.goToPlayer();
      }
    });
  }

  render() {
    if (!this.state.spotifyInitialized) {
      return (
        <View style={styles.container}>
          {/* <ActivityIndicator animating={true} style={styles.loadIndicator} /> */}
          {/* <Text style={styles.loadMessage}>Initializing Spotify</Text> */}
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.greeting}>Ripple</Text>
          <Button
            full
            block
            onPress={this.spotifyLoginButtonWasPressed}
            style={styles.spotifyLoginButton}
          >
            <Text style={styles.spotifyLoginButtonText}>Log into Spotify</Text>
          </Button>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  loadIndicator: {},
  loadMessage: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },

  spotifyLoginButton: {
    justifyContent: 'center',
    backgroundColor: 'green'
  },
  spotifyLoginButtonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
  },
  greeting: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});
