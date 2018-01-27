import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
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
import { NavigationActions } from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons';

import SearchResultCategory from '../Components/SearchResults/SearchResultCategory';

export default class SearchBarHeader extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.retrieveRecentSearches = this.retrieveRecentSearches.bind(this);
    this.unmountSearchResults = this.unmountSearchResults.bind(this);
    this.handleInboxNavigation = this.handleInboxNavigation.bind(this);
    // this.handleBackNavigation = this.handleBackNavigation.bind(this);
  }

  handleInboxNavigation(navAction) {
    var navAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'inbox' })]
    });
    this.props.navigation.dispatch(navAction);
  }

  // handleBackNavigation(navAction) {
  //   console.log('going back...');
  //   // var navAction = NavigationActions.reset({
  //   //   index: 0,
  //   //   actions: [NavigationActions.navigate({ routeName: 'newsfeed' })]
  //   // });
  //   this.props.navigation.goBack();
  // }

  handleSearch(query) {
    this.props.setSearchQuery(query);
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
    const { goBack } = this.props.navigation;
    // const backAction = NavigationActions.back({
    //   key: null
    // });
    return (
      <Header searchBar>
        <Button
          transparent
          onPress={() =>
            this.props.navigation.dispatch(NavigationActions.back())
          }
          // this.props.navigation.dispatch(backAction);
          style={styles.headerBackButtonIcon}
        >
          <Icon name="ios-arrow-back-outline" size={30} />
        </Button>
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
            value={this.props.searchQuery}
          />
          <TouchableOpacity
            onPress={this.props.handleClearSearch}
            style={styles.searchBarClearIcon}
          >
            <Icon name="ios-close-outline" size={26} />
          </TouchableOpacity>
        </Item>
        <Button
          transparent
          onPress={this.handleInboxNavigation}
          style={styles.headerInboxButtonIcon}
        >
          <Icon name="ios-send-outline" size={30} />
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
  searchBarSearchIcon: { marginLeft: 10, marginTop: 3 },
  searchBarClearIcon: { marginRight: 10, marginTop: 2 },
  headerBackButtonIcon: { paddingLeft: 5, paddingTop: 9, paddingRight: 7 },
  headerInboxButtonIcon: { paddingRight: 3, paddingTop: 9, paddingLeft: 4 }
});
