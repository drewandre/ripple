import '../Config';
import DebugConfig from '../Config/DebugConfig';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import RootContainer from './RootContainer';
import createStore from '../Redux';

const store = createStore();

import firebase from 'react-native-firebase';

class App extends Component {
  componentDidMount() {
    firebase
      .auth()
      .signInAnonymously()
      .then(user => {
        console.log('user return: ' + user.isAnonymous);
      });
  }
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}

// allow reactotron overlay for fast design in dev mode
export default (DebugConfig.useReactotron ? console.tron.overlay(App) : App);
