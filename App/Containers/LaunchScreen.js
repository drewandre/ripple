import React, { Component } from 'react';
import { ScrollView, Text, Image, View, Linking } from 'react-native';
// import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js';
import RoundedButton from '../../App/Components/RoundedButton';

import Spotify from 'react-native-spotify';
import { Images } from '../Themes';

// Styles
import styles from './Styles/LaunchScreenStyles';

export default class LaunchScreen extends Component {
  constructor(props) {
    super(props);
    this.handleOpenURL = this.handleOpenURL.bind(this);
  }

  handleOpenURL = event => {
    console.log('here at least');
    if (Spotify.handleAuthURL(event.url)) {
      console.log('true!');
      return true;
    }
    console.log('false!');
    return false;
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <Image
          source={Images.background}
          style={styles.backgroundImage}
          resizeMode="stretch"
        />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>

          <View style={styles.section}>
            <Image source={Images.ready} />
            <Text style={styles.sectionText}>
              This probably isn't what your app is going to look like. Unless
              your designer handed you this screen and, in that case, congrats!
              You're ready to ship. For everyone else, this is where you'll see
              a live preview of your fully functioning app using Ignite.
            </Text>
          </View>

          <RoundedButton onPress={this.handleOpenURL}>
            Connect to Spotify
          </RoundedButton>
          {/* <DevscreensButton /> */}
        </ScrollView>
      </View>
    );
  }
}

Linking.addEventListener('url', LaunchScreen.handleOpenURL);
