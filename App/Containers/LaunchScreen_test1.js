import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Linking
} from 'react-native';
// import { NavigationActions } from 'react-navigation';
import Spotify from 'react-native-spotify';

export default class LaunchScreen extends Component {
  // static navigationOptions = {
  //   header: null
  // };

  constructor() {
    super();
    this.state = { spotifyInitialized: false };
    this.spotifyLoginButtonWasPressed = this.spotifyLoginButtonWasPressed.bind(
      this
    );
  }

  // goToPlayer() {
  //   const navAction = NavigationActions.reset({
  //     index: 0,
  //     actions: [NavigationActions.navigate({ routeName: 'player' })]
  //   });
  //   this.props.navigation.dispatch(navAction);
  // }

  componentDidMount() {
    console.log('componentDid-mounting');
    if (!Spotify.isInitialized()) {
      console.log('spotify is NOT initialized');
      var spotifyOptions = {
        clientID: '08652068ed8d4c72a4e527ef1abcf944',
        sessionUserDefaultsKey: 'SpotifySession',
        redirectURL: 'spotify-auth://callback',
        scopes: [
          'user-read-private',
          'playlist-read',
          'playlist-read-private',
          'streaming'
        ]
      };
      Spotify.initialize(spotifyOptions, (loggedIn, error) => {
        console.log('inside Spotify.initialize');
        if (error != null) {
          console.log('error on Spotify.initialize');
          Alert.alert('Error', error.message);
        }
        //update UI state
        this.setState(state => {
          state.spotifyInitialized = true;
          return state;
        });
        //handle initialization
        if (loggedIn) {
          console.log('logged in....?');
          // this.goToPlayer();
        }
      });
    } else {
      console.log('spotify IS initialized');
      //update UI state
      this.setState(state => {
        state.spotifyInitialized = true;
        return state;
      });
      //handle logged in
      if (Spotify.isLoggedIn()) {
        // this.goToPlayer();
      }
    }
  }

  spotifyLoginButtonWasPressed() {
    console.log('made it to the button press');
    Spotify.login((loggedIn, error) => {
      if (error) {
        console.log('error on spotifyLoginButtonWasPressed');
        Alert.alert('Error', error.message);
      }
      if (loggedIn) {
        console.log('another good log in sign...?');
        // this.goToPlayer();
      }
    });
  }

  render() {
    if (!this.state.spotifyInitialized) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={true} style={styles.loadIndicator} />
          <Text style={styles.loadMessage}>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.greeting}>Hey! You! Log into your spotify</Text>
          <TouchableHighlight
            onPress={this.spotifyLoginButtonWasPressed}
            style={styles.spotifyLoginButton}
          >
            <Text style={styles.spotifyLoginButtonText}>Log into Spotify</Text>
          </TouchableHighlight>
        </View>
      );
    }
  }
}

LaunchScreen.handleOpenURL = event => {
  console.log('incredibly, inside handleOpenURL');
  if (Spotify.handleAuthURL(event.url)) {
    return true;
  }
  return false;
};
Linking.addEventListener('url', LaunchScreen.handleOpenURL);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },

  loadIndicator: {
    //
  },
  loadMessage: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },

  spotifyLoginButton: {
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: 'green',
    overflow: 'hidden',
    width: 200,
    height: 40,
    margin: 20
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
