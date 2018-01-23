import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native';
import { Colors, Fonts } from '../../Themes';

import { Container, Text } from 'native-base';

import SearchResult from './SearchResult';

export default class SearchResultCategory extends Component {
  constructor(props) {
    super(props);
    this.handleSearchResultPress = this.handleSearchResultPress.bind(this);
  }

  handleSearchResultPress(event) {
    Spotify.playURI(event.uri, 0, 0, error => {
      if (error) {
        console.log(error);
      }
    });
  }

  render() {
    var searchResultsObjects = this.props.categoryItems.map(item => {
      return (
        <SearchResult
          key={item.id}
          id={item.id}
          item={item}
          onPress={this.handleSearchResultPress}
        />
      );
    });
    return (
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryContainerTitle}>
          {this.props.categoryType}
        </Text>
        {searchResultsObjects}
      </View>
    );
  }
}

SearchResultCategory.propTypes = {
  categoryType: PropTypes.string.isRequired,
  categoryItems: PropTypes.array.isRequired,
  navigator: PropTypes.object
};

const styles = StyleSheet.create({
  categoryContainerTitle: {
    ...Fonts.style.h5,
    textAlign: 'center',
    color: '#000'
  },
  categoryContainer: {
    borderRadius: 4,
    margin: 5
  }
});
