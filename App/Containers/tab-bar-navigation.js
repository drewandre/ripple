/**
 * Created by ggoma on 12/23/16.
 */
import React, { Component } from 'react';
import {
  Animated,
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';

import { Metrics as D, Colors, Fonts } from '../Themes';
import Icon from 'react-native-vector-icons/Ionicons';

import { NavigationActions } from 'react-navigation';

export default class tabBarNavigation extends Component {
  constructor(props) {
    super(props);
    this.handleNavigation = this.handleNavigation.bind(this);
  }
  state = {
    selected: 0,
    translateY: new Animated.Value(0)
  };

  details = ['Newsfeed', 'Profile', 'Pulse', 'Inbox', 'Library'];
  icons = [
    'ios-home-outline',
    'ios-contact-outline',
    'ios-disc-outline',
    'ios-chatbubbles-outline',
    'ios-musical-notes-outline'
  ];

  handleNavigation(footerPageIndex) {
    this.setState({ selected: footerPageIndex });
    var screenName = this.details[footerPageIndex].toLowerCase();
    var navAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: screenName })]
    });
    this.props.navigation.dispatch(navAction);
  }

  renderIcons() {
    return this.details.map((item, i) => {
      const color = this.state.selected == i ? '#6A95EB' : '#bdbec2';
      return (
        <TouchableWithoutFeedback
          onPress={() => this.handleNavigation(i)}
          key={i}
        >
          <View style={styles.tab_item}>
            <Icon name={this.icons[i]} color={color} size={24} />
            <Text style={[styles.text, { color }]}>{item}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    });
  }

  setHeight(h) {
    this.state.translateY.setValue(Math.abs(h / 10 - 56));
  }

  hide() {
    Animated.timing(this.state.translateY, { toValue: 56 }).start();
  }

  show() {
    Animated.timing(this.state.translateY, { toValue: 0 }).start();
  }

  render() {
    const { translateY } = this.state;
    return (
      <Animated.View
        style={[styles.container, { transform: [{ translateY }] }]}
      >
        {this.renderIcons()}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderTopColor: '#D4D4D4',
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: D.screenWidth,
    bottom: 0,
    height: 50,
    backgroundColor: Colors.instagramMenuBar
  },

  tab_item: {
    alignItems: 'center'
  },

  text: {
    fontSize: 10
  }
});
