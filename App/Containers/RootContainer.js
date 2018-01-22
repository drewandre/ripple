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

  render() {
    return (
      <Container style={styles.applicationView}>
        <StatusBar barStyle="light-content" />
        <SearchBar
          passSearchResults={this.passSearchResults}
          handleSearching={this.handleSearching}
          showSearchContainer={this.state.showSearchContainer}
        />
        <Content>
          {this.state.searchResults ? (
            <ScrollView style={tempStyles.searchResultsContainer}>
              {this.state.searchResults}
            </ScrollView>
          ) : null}
          {/* <BlurView
            style={tempStyles.absolute}
            blurType="light"
            blurAmount={10}
          /> */}
          <ReduxNavigation />
        </Content>
        <FooterNavigation />
      </Container>
    );
  }
}

const tempStyles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
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
    zIndex: 999,
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    width: Metrics.screenWidth
  }
});

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup())
});

export default connect(null, mapDispatchToProps)(RootContainer);
