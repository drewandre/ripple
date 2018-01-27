import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Metrics, Colors, Fonts } from '../Themes';

import {
  Container,
  Header,
  Item,
  Input,
  Button,
  Text,
  Content
} from 'native-base';
import Spotify from 'react-native-spotify';

import Icon from 'react-native-vector-icons/Ionicons';

import SearchResultCategory from '../Components/SearchResults/SearchResultCategory';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
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
  }

  unmountSearchResults() {
    console.log('would unmount search results');
  }

  render() {
    return (
      <Header searchBar>
        {/* <Button transparent>
          <Icon name="ios-people" style={styles.menuIcons} />
        </Button> */}
        <Item style={styles.searchBarContainer}>
          <Icon
            name="ios-search"
            size={16}
            style={styles.searchBarSearchIcon}
          />
          <Input
            placeholder="Search"
            style={styles.searchBar}
            onChangeText={this.handleSearch}
            onFocus={this.retrieveRecentSearches}
            onBlur={this.unmountSearchResults}
          />
          <Icon
            name="ios-close-outline"
            size={21}
            style={styles.searchBarClearIcon}
            onPress={this.props.handleClearSearch}
          />
        </Item>
        {/* <Button transparent>
          <Icon name="ios-send-outline" size={30} style={styles.menuIcons} />
        </Button> */}
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
  searchBarSearchIcon: { paddingLeft: 10, paddingTop: 3 },
  searchBarClearIcon: { paddingRight: 10, paddingTop: 4 },
  menuIcons: {
    color: Colors.menuBar,
    marginRight: 3,
    paddingTop: 3
  }
});
