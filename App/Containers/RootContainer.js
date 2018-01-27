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

import SearchBar from './SearchBar';
import InitialScreen from './InitialScreen';
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

export class RootContainer extends Component {
  constructor(props) {
    super(props);
    const { nav, dispatch } = props;
    this.navigation = ReactNavigation.addNavigationHelpers({
      dispatch,
      state: nav
    });
    this.state = {
      searching: false,
      showSearchContainer: false,
      searchResults: [],
      nowPlaying: false
      // sessionActive: false
    };
    this.handleSearching = this.handleSearching.bind(this);
    this.passSearchResults = this.passSearchResults.bind(this);
    this.handleClearSearch = this.handleClearSearch.bind(this);
    // this.handleSession = this.handleSession.bind(this);
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
        <StatusBar barStyle="dark-content" />
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
            <AppNavigation navigation={this.navigation} />
          )}
        </Content>
        <GGomaFooter
          ref="footer"
          hide={() => this.refs.tab.hide()}
          show={() => this.refs.tab.show()}
          hideTabBarNavigation={v => this.refs.tab.setHeight(v)}
        />
        <TabBarNavigation ref="tab" navigation={this.navigation} />
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
