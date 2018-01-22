import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
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
          item={item}
          onPress={this.handleSearchResultPress}
        />
      );
    });
    return (
      <ScrollView style={styles.categoryContainer}>
        <Text style={styles.categoryContainerTitle}>
          {this.props.categoryType}
        </Text>
        {searchResultsObjects}
      </ScrollView>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...Fonts.style.h5,
    margin: 10,
    textAlign: 'center',
    color: Colors.steel
  },
  categoryContainer: {
    // borderRadius: 4,
    // margin: 10,
    backgroundColor: Colors.windowTint,
    // backgroundColor: 'red',
    flex: 1
  }
});
