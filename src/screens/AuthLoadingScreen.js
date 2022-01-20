import React, { Component } from 'react';
import {
	ActivityIndicator,
	StatusBar,
	View,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import OneSignal from 'react-native-onesignal';
import authReq from '../services/authRequests';

export default class AuthLoadingScreen extends Component {
	constructor(props) {
		super(props);
		this.switchScreenAsync();
	}

	// Fetch the token from storage then navigate to our appropriate place
	switchScreenAsync = async () => {
		try {
			let authenticated = false;
			const storedData = await AsyncStorage.getItem('authDetails');
			if (storedData !== null) {
				const authDetails = JSON.parse(storedData);
				if (await authReq.isValid(authDetails.baseurl, authDetails.token)) {
					authenticated = true;
					this.props.navigation.navigate('App', {}, NavigationActions.navigate({routeName: 'Home',params: authDetails}));
				}
			}
			if(!authenticated) {
				OneSignal.setSubscription(false);
				this.props.navigation.navigate('Auth');
			}
		} catch (error) {
			console.log(error);
		}
	};

	// Render any loading content that you like here
	render() {
		return (
			<View>
				<ActivityIndicator />
				<StatusBar barStyle="default" />
			</View>
		);
	}
}