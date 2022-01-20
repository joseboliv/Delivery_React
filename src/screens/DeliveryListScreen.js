import React, { Component } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import OneSignal from 'react-native-onesignal';
import {nav} from '../ui/theme/appStyle';
import DeliveryList from '../component/deliveryList/DeliveryList';
import { LineIcons } from '../ui/iconsLib';

export default class DeliveryListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { displayName = '' } = navigation.state.params || {};
    return {
      title: `Hello ${displayName}!`,
      headerRight: (
        <View style={nav.iconContainer}>
          <LineIcons name='power' {...nav.headerIcon} onPress={() => this.logoutHandler(navigation)} />
        </View>
      ),
    };
  };
  static logoutHandler = async (navigation) => {
    try {
      await AsyncStorage.removeItem('authDetails');
      Toast.show('You have been logged out!');
      OneSignal.setSubscription(false);
      navigation.navigate('Auth');
    } catch(e) {
      console.log(e);
    }
  };
  render() {
    return <DeliveryList />;
  }
}