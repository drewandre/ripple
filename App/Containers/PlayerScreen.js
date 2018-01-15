import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
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

import SearchBar from './SearchBar';

export class PlayerScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();

    this.state = {
      spotifyUserName: null
      // searchQuery: ''
    };

    this.spotifyLogoutButtonWasPressed = this.spotifyLogoutButtonWasPressed.bind(
      this
    );
    // this.handleSpotifySearch = this.handleSpotifySearch.bind(this);
  }

  componentDidMount() {
    // console.log('sending getMe request');
    Spotify.getMe((result, error) => {
      // console.log('got getMe result');
      if (error) {
        // Alert.alert('Error Sending getMe request', error.message);
      } else {
        this.setState(state => {
          state.spotifyUserName = result.display_name;
          return state;
        });
      }
    });
  }

  // handleSpotifySearch(query) {
  //   // console.log(query);
  //   let options = {};
  //   Spotify.search(
  //     query,
  //     ['album', 'artist', 'playlist', 'track'],
  //     options,
  //     (result, error) => {
  //       if (error) {
  //         console.log('could not complete search');
  //       }
  //       if (result) {
  //         console.log(result);
  //         // console.log('search successful');
  //         // this.setState({ searchQuery: result });
  //       }
  //     }
  //   );
  // }

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
        // Alert.alert('Error', error.message);
      } else {
        this.goToInitialScreen();
      }
    });
  }

  render() {
    return (
      <Container>
        <SearchBar />
      </Container>
    );
    // return (
    //   <View style={styles.container}>
    //     {this.state.spotifyUserName != null ? (
    //       <Text style={styles.greeting}>
    //         You are logged in as {this.state.spotifyUserName}
    //       </Text>
    //     ) : (
    //       <Text style={styles.greeting}>Getting user info...</Text>
    //     )}
    //     <TouchableHighlight onPress={this.spotifyLogoutButtonWasPressed}>
    //       <Text>Logout</Text>
    //     </TouchableHighlight>
    //   </View>
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  greeting: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  playerHeader: {
    // backgroundColor: 'blue'
  },
  searchResults: {
    // position: 'relative',
    // height: 'fit-content',
    backgroundColor: 'grey'
  }
});
