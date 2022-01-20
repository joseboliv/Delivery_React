/**
 * WCFM Delivery App
 **/

import React, {Component} from 'react';
import OneSignal from 'react-native-onesignal';

import AppNavigator from './src/router';

export default class App extends Component {
  constructor(properties) {
    super(properties);
  }

  componentDidMount() {
    OneSignal.init("6fc23bb9-ad88-48ee-afd0-d2af425e466c");
    OneSignal.inFocusDisplaying(2);
  }

  render() {
    return <AppNavigator/>;
  }
}
