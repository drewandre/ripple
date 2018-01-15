import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class SearchResult extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    item: PropTypes.object.isRequired,
    navigator: PropTypes.object
  };

  // componentWillMount() {}

  getTitle() {
    debugger;
    const buttonText = this.props.name || this.props.children || '';
    return buttonText.toUpperCase();
  }

  getSubtitle() {
    const buttonText = this.props.text || this.props.children || '';
    return buttonText.toUpperCase();
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.searchResult}
        onPress={this.props.onPress}
      >
        <Text style={styles.buttonText}>{this.getTitle()}</Text>
        <Text style={styles.buttonText}>{this.getSubtitle()}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  searchResult: {
    borderRadius: 5,
    backgroundColor: '#fff'
  }
});
