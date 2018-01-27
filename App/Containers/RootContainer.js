import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';

import * as ReactNavigation from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import AppNavigation from '../Navigation/AppNavigation';

import StartupActions from '../Redux/StartupRedux';
import ReduxPersist from '../Config/ReduxPersist';
// import { BlurView } from 'react-native-blur';

import styles from './Styles/RootContainerStyles';
import { Colors, Fonts } from '../Themes';

import SearchBarHeader from './SearchBarHeader';
// import InitialScreen from './InitialScreen';
import FooterNavigation from './FooterNavigation';
import GGomaFooter from './GGomaFooter';
import TabBarNavigation from './tab-bar-navigation';

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

function ReduxNavigation(props) {
  const { dispatch, nav } = props;
  const navigation = ReactNavigation.addNavigationHelpers({
    dispatch,
    state: nav
  });
  return navigation;
}

export class RootContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      showSearchContainer: false,
      searchResults: [],
      nowPlaying: false,
      searchQuery: ''
    };
    this.handleSearching = this.handleSearching.bind(this);
    this.passSearchResults = this.passSearchResults.bind(this);
    this.handleClearSearch = this.handleClearSearch.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
    this.setSearchQuery = this.setSearchQuery.bind(this);
  }
  componentDidMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup();
    }
  }

  handleNavigation(navAction) {
    return ReduxNavigation(navAction);
  }

  handleSearching() {
    this.setState({ showSearchContainer: !this.state.showSearchContainer });
  }
  passSearchResults(searchResults) {
    this.setState({ searchResults: searchResults });
  }

  handleClearSearch(event) {
    this.setState({ searchResults: [], searchQuery: '' });
  }

  setSearchQuery(query) {
    this.setState({ searchQuery: query });
  }

  render() {
    var navigation = this.handleNavigation(this.props);
    return (
      <Container style={styles.applicationView}>
        <SearchBarHeader
          navigation={navigation}
          handleClearSearch={this.handleClearSearch}
          passSearchResults={this.passSearchResults}
          handleSearching={this.handleSearching}
          setSearchQuery={this.setSearchQuery}
          searchQuery={this.state.searchQuery}
          showSearchContainer={this.state.showSearchContainer}
        />
        <Content>
          {this.state.searchResults.length > 1 ? (
            <ScrollView>{this.state.searchResults}</ScrollView>
          ) : (
            <AppNavigation navigation={navigation} />
          )}
        </Content>
        <GGomaFooter
          ref="footer"
          hide={() => this.refs.tab.hide()}
          show={() => this.refs.tab.show()}
          hideTabBarNavigation={v => this.refs.tab.setHeight(v)}
        />
        <TabBarNavigation ref="tab" navigation={navigation} />
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
// const mapDispatchToProps = dispatch => ({
//   startup: () => dispatch(StartupActions.startup())
// });

const mapStateToProps = state => ({ nav: state.nav });
// export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
export default connect(mapStateToProps)(RootContainer);
