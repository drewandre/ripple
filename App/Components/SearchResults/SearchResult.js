import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../Themes';

import setPlayingState from '../../Redux/PlayingState';
import { connect } from 'react-redux';

export class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(event) {
    // this.props.onPress(this.props.item);
    this.props.setPlayingState(true);
  }

  getSubtitle() {
    var subtitleText = '';
    switch (this.props.item.type) {
      case 'track':
        for (var i = 0; i < this.props.item.artists.length; i++) {
          subtitleText += this.props.item.artists[i].name + ', ';
        }
        break;
      case 'artist':
        break;
      case 'album':
        break;
      case 'playlist':
        break;
      default:
        subtitleText = '';
    }
    return subtitleText;
  }

  render() {
    return (
      <TouchableOpacity
        key={this.props.id}
        style={styles.searchResultContainer}
        onPress={this.handlePress}
      >
        <Text style={styles.searchResultTextTitle}>{this.props.item.name}</Text>
        <Text style={styles.searchResultTextSubtitle}>
          {this.getSubtitle()}
        </Text>
      </TouchableOpacity>
    );
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  setPlayingState: () => dispatch(setPlayingState)
});

const mapStateToProps = state => ({
  playerState: state.playingState
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);

// SearchResult.propTypes = {
//   onPress: PropTypes.func,
//   item: PropTypes.object.isRequired,
//   navigator: PropTypes.object
// };

const styles = StyleSheet.create({
  searchResultContainer: {
    borderRadius: 2,
    margin: 2,
    backgroundColor: Colors.instagramMenuBar
  },
  searchResultTextTitle: {
    ...Fonts.style.input,
    margin: 2,
    color: '#000'
  },
  searchResultTextSubtitle: {
    ...Fonts.style.medium,
    margin: 2,
    color: '#000'
  }
});
