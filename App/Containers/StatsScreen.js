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

export default class StatsScreen extends Component {
  static navigationOptions = {
    header: null,
    headerMode: 'none'
  };

  constructor(props) {
    super(props);
    this.state = { spotifyUser: null };
    this.goToNewsfeed = this.goToNewsfeed.bind(this);
  }

  goToNewsfeed() {
    var navAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'newsfeed' })]
    });
    this.props.navigation.dispatch(navAction);
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
        <Text>Hello from StatsScreen.js</Text>
        {/* <Button onPress={this.goToNewsfeed}>
          <Text>Go to Newsfeed</Text>
        </Button> */}
      </View>
    );
  }
}
