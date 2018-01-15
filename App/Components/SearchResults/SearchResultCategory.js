import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Text } from 'native-base';

import SearchResult from './SearchResult';

export default class SearchResultCategory extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  static propTypes = {
    categoryType: PropTypes.string.isRequired,
    categoryItems: PropTypes.array.isRequired,
    navigator: PropTypes.object
  };

  // componentWillMount() {}

  // getText() {
  //   const buttonText = this.props.text || this.props.children || '';
  //   return buttonText.toUpperCase();
  // }

  handlePress(event) {
    console.log('pressed from SearchResultCategory!');
  }

  render() {
    var searchResultsObjects = this.props.categoryItems.map(item => {
      return (
        <SearchResult key={item.id} item={item} onPress={this.handlePress} />
      );
    });
    return (
      <Container style={styles.categoryContainer}>
        {searchResultsObjects}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  categoryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#292929'
  }
});
