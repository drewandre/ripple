import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Colors, Fonts } from '../Themes';
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
    let options = { limit: '10' };
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
        if (
          resultsState.hasOwnProperty(category) &&
          resultsState[category].length > 0
        ) {
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
        <Header searchBar>
          <Button transparent>
            <Icon name="ios-people" style={styles.menuIcons} />
          </Button>
          <Item style={styles.searchBarContainer}>
            <Icon name="ios-search" style={styles.searchBarSearchIcon} />
            <Input
              placeholder="Search"
              style={styles.searchBar}
              onChangeText={this.handleSearch}
              onFocus={this.retrieveRecentSearches}
            />
          </Item>
          <Button transparent>
            <Icon name="ios-people" style={styles.menuIcons} />
          </Button>
        </Header>
        <ScrollView>{searchResultsCategoryContainer}</ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  searchBarContainer: {
    marginLeft: 7,
    marginRight: 7,
    borderRadius: 3
  },
  searchBar: {
    fontSize: 16,
    borderRadius: 10
  },
  searchBarSearchIcon: { fontSize: 16, paddingRight: 1 },
  menuIcons: {
    color: Colors.menuBar,
    marginLeft: 3,
    marginRight: 3,
    paddingLeft: 0
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  searchResults: {}
});
