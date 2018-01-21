import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, Alert } from 'react-native';
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
  // static navigationOptions = ({ navigation, screenProps }) => ({
  //   header: (
  //     <SearchBar
  //     // onNext={() => {
  //     //   emitter.emit('next');
  //     // }}
  //     />
  //   )
  // });

  constructor(props) {
    super(props);
    this.state = { spotifyUser: null };
    this.goToProfilePage = this.goToProfilePage.bind(this);
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

  goToProfilePage() {
    const navAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'profile' })]
    });
    this.props.navigation.dispatch(navAction);
  }

  render() {
    return (
      <Container>
        <Button full success onPress={this.goToProfilePage}>
          <Text>Go to profile</Text>
        </Button>
        <SearchBar />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  greeting: {
    fontSize: 20,
    textAlign: 'center'
    // margin: 10
    // color: 'green'
  },
  playerHeader: {},
  searchResults: {
    backgroundColor: 'grey'
  }
});
