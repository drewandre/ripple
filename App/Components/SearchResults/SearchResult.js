import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../Themes';

export default class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(event) {
    this.props.onPress(this.props.item);
  }

  getSubtitle() {
    var subtitleText = '';
    switch (this.props.item.type) {
      case 'track':
        for (var i = 0; i < this.props.item.artists.length; i++) {
          subtitleText += this.props.item.artists[i].name + ', ';
        }
        break;
      case 'artist':
        break;
      case 'album':
        break;
      case 'playlist':
        break;
      default:
        subtitleText = '';
    }
    return subtitleText;
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.searchResultContainer}
        onPress={this.handlePress}
      >
        <Text style={styles.searchResultTextTitle}>{this.props.item.name}</Text>
        <Text style={styles.searchResultTextSubtitle}>
          {this.getSubtitle()}
        </Text>
      </TouchableOpacity>
    );
  }
}

SearchResult.propTypes = {
  onPress: PropTypes.func,
  item: PropTypes.object.isRequired,
  navigator: PropTypes.object
};

const styles = StyleSheet.create({
  searchResultContainer: {
    borderRadius: 4,
    margin: 5,
    backgroundColor: Colors.windowTint,
    flex: 1
  },
  searchResultTextTitle: {
    ...Fonts.style.input,
    margin: 2,
    color: Colors.silver
  },
  searchResultTextSubtitle: {
    ...Fonts.style.medium,
    margin: 2,
    color: Colors.steel
  }
});
