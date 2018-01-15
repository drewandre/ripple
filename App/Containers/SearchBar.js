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
import Spotify from 'react-native-spotify';

import SearchResultCategory from '../Components/SearchResults/SearchResultCategory';

export default class SearchBar extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      searchResults: {},
      showRecentSearches: false
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.retrieveRecentSearches = this.retrieveRecentSearches.bind(this);
  }

  handleSearch(query) {
    let options = { limit: '2' };
    Spotify.search(
      query,
      ['album', 'artist', 'playlist', 'track'],
      options,
      (result, error) => {
        if (error) {
          this.setState({ searchResults: {} });
        } else if (result) {
          var organizedResults = {
            tracks: result.tracks.items,
            albums: result.albums.items,
            artists: result.artists.items,
            playlists: result.playlists.items
          };
          this.setState({ searchResults: organizedResults });
        }
      }
    );
  }

  retrieveRecentSearches(press) {
    this.setState({ showRecentSearches: !this.state.showRecentSearches });
  }

  render() {
    var searchResultsCategoryContainer = null;
    var searchResultsCategoryObjectArray = [];
    if (Object.keys(this.state.searchResults).length === 0) {
      searchResultsContainer = (
        <Container style={styles.searchResults}>
          <Text>Recent Searches</Text>
        </Container>
      );
    } else {
      var resultsState = this.state.searchResults;
      for (var category in resultsState) {
        if (resultsState.hasOwnProperty(category)) {
          searchResultsCategoryObjectArray.push(
            <SearchResultCategory
              key={Date.now + Math.random() * 100}
              categoryType={category}
              categoryItems={resultsState[category]}
            />
          );
        }
      }
      searchResultsCategoryContainer = searchResultsCategoryObjectArray;
    }
    return (
      <Container>
        <Header searchBar rounded style={styles.playerHeader}>
          <Button transparent>
            <Icon name="ios-people" />
          </Button>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Search"
              onChangeText={this.handleSearch}
              onFocus={this.retrieveRecentSearches}
            />
          </Item>
          <Button transparent>
            <Icon name="ios-people" />
          </Button>
        </Header>
        {searchResultsCategoryContainer}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  searchResults: {
    // backgroundColor: 'red'
  }
});
