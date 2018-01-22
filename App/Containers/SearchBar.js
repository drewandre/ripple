import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Metrics, Colors, Fonts } from '../Themes';

import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text,
  Content
} from 'native-base';
import Spotify from 'react-native-spotify';

import SearchResultCategory from '../Components/SearchResults/SearchResultCategory';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   searchResults: {},
    //   showRecentSearches: false
    // };
    this.handleSearch = this.handleSearch.bind(this);
    this.retrieveRecentSearches = this.retrieveRecentSearches.bind(this);
    this.unmountSearchResults = this.unmountSearchResults.bind(this);
  }

  handleSearch(query) {
    var organizedResults = {};
    var searchResultsCategoryObjectArray = [];
    let options = { limit: '5' };
    Spotify.search(
      query,
      ['album', 'artist', 'playlist', 'track'],
      options,
      (result, error) => {
        if (error) {
          // console.log('error in search: ' + error);
        } else {
          organizedResults = {
            tracks: result.tracks.items,
            albums: result.albums.items,
            artists: result.artists.items,
            playlists: result.playlists.items
          };
        }
        if (Object.keys(organizedResults).length === 0) {
          searchResultsCategoryObjectArray.push(
            <ScrollView
              key={Date.now + Math.random() * 100}
              style={styles.searchResults}
            >
              <Text>~~~ Recent searches here ~~~</Text>
            </ScrollView>
          );
        } else {
          for (var category in organizedResults) {
            if (
              organizedResults.hasOwnProperty(category) &&
              organizedResults[category].length > 0
            ) {
              var key = Date.now() + Math.random() * 100;
              searchResultsCategoryObjectArray.push(
                <SearchResultCategory
                  key={key}
                  id={key}
                  categoryType={category}
                  categoryItems={organizedResults[category]}
                />
              );
            }
          }
        }
        this.props.passSearchResults(searchResultsCategoryObjectArray);
      }
    );
  }

  retrieveRecentSearches() {
    console.log('would retrieve recent rearches here');
    // this.props.handleSearching();
  }

  unmountSearchResults() {
    console.log('would unmount search results');
  }

  render() {
    return (
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
            onBlur={this.unmountSearchResults}
          />
        </Item>
        <Button transparent>
          <Icon name="ios-people" style={styles.menuIcons} />
        </Button>
      </Header>
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
  searchResultsContainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 64,
    opacity: 0.5,
    backgroundColor: 'orange',
    width: Metrics.screenWidth
  }
});
