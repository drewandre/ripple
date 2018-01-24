import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import ReduxNavigation from '../Navigation/ReduxNavigation';
import { connect } from 'react-redux';
import StartupActions from '../Redux/StartupRedux';
import ReduxPersist from '../Config/ReduxPersist';
import { BlurView } from 'react-native-blur';

import styles from './Styles/RootContainerStyles';
import { Metrics, Colors, Fonts } from '../Themes';

import SearchBar from './SearchBar';
import FooterNavigation from './FooterNavigation';

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
import { StyleSheet, ScrollView } from 'react-native';

class RootContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      showSearchContainer: false,
      searchResults: []
    };
    this.handleSearching = this.handleSearching.bind(this);
    this.passSearchResults = this.passSearchResults.bind(this);
    this.handleClearSearch = this.handleClearSearch.bind(this);
  }
  componentDidMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup();
    }
  }

  handleSearching() {
    this.setState({ showSearchContainer: !this.state.showSearchContainer });
  }
  passSearchResults(searchResults) {
    this.setState({ searchResults: searchResults });
  }

  handleClearSearch(event) {
    this.setState({ searchResults: [] });
  }

  render() {
    return (
      <Container style={styles.applicationView}>
        <StatusBar barStyle="light-content" />
        <SearchBar
          handleClearSearch={this.handleClearSearch}
          passSearchResults={this.passSearchResults}
          handleSearching={this.handleSearching}
          showSearchContainer={this.state.showSearchContainer}
        />
        <Content>
          {this.state.searchResults.length > 1 ? (
            <ScrollView>{this.state.searchResults}</ScrollView>
          ) : (
            <ReduxNavigation />
          )}
        </Content>
        <FooterNavigation />
      </Container>
    );
  }
}

const tempStyles = StyleSheet.create({
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
  }
});

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup())
});

export default connect(null, mapDispatchToProps)(RootContainer);
