import React, { Component } from 'react';
import { Platform, View, KeyboardAvoidingView, TextInput, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { NavigationActions, withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import OneSignal from 'react-native-onesignal';

// import { Btn } from '../../ui/core';
import authReq from '../../services/authRequests';
import { LineIcons } from '../../ui/iconsLib';
import { loginScreen } from '../../ui/theme/appStyle';

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			siteUrl: '',
			userName: '',
			password: '',
			isLoggingIn: false,
		};
	}
	handlePressLogin = async () => {
		const { userName, password, siteUrl } = this.state;
		this.setState({ isLoggingIn: true });
		this.requestLogin(userName, password, siteUrl)
			.catch(err => {
				console.log(err);
				this.setState({ isLoggingIn: false });
			});
	};
	requestLogin = async (username, password, siteUrl) => {
		try {
			const response = await authReq.login(username, password, siteUrl);
			if (this.validResponse(response)) {
				const authDetails = {
					token: response.token,
					baseurl: siteUrl,
					userEmail: response.user_email,
					displayName: response.user_display_name,
					storeName: response.store_name,
				};
				await AsyncStorage.setItem('authDetails', JSON.stringify(authDetails));
				Toast.show('Logged in successfully!');
				OneSignal.setExternalUserId(response.user_email);
				OneSignal.setSubscription(true);
				this.props.navigation.navigate('App', {}, NavigationActions.navigate({ routeName: 'Home', params: authDetails }));
			} else {
				this.setState({ isLoggingIn: false });
				Toast.show('Please login as a delivery agent.');
			}
		} catch (e) {
			let err;
			try {
				err = JSON.parse(e.message);
			} catch(k) {
				err = e;
			}
			console.log(err);
			this.setState({ isLoggingIn: false });
			Toast.show(err.message, err.message.length > 29 ? Toast.LONG : Toast.SHORT);
		}
	};
	validResponse = (response) => {
		const { token = false, roles = [] } = response;
		return (Boolean(token) && Array.isArray(roles) && roles.includes('wcfm_delivery_boy'));
	};
	render() {
		const { userName, password, siteUrl, isLoggingIn = false } = this.state;
		const disabled = !userName || !password || !siteUrl || isLoggingIn;
		let loginBtnStyle = loginScreen.button,
			loginbtnText = loginScreen.buttonText;
		if (disabled) {
			loginBtnStyle = [loginScreen.button, loginScreen.disabledButton];
			loginbtnText = [loginScreen.buttonText, loginScreen.disabledButtonText];
		}

		return (
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : null}
				keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}>
				<View style={loginScreen.formWrapper}>
					<View style={loginScreen.fieldContainer}>
						<LineIcons name='globe' {...loginScreen.fieldIcon} />
						<TextInput
							style={loginScreen.textInput}
							ref='siteurl'
							keyboardType='default'
							returnKeyType='next'
							autoCapitalize='none'
							autoCorrect={false}
							onChangeText={siteUrl => this.setState({ siteUrl })}
							value={siteUrl}
							underlineColorAndroid='transparent'
							onSubmitEditing={() => this.refs.username.focus()}
							placeholder='Site Url' />
					</View>
					<View style={loginScreen.fieldContainer}>
						<LineIcons name='user' {...loginScreen.fieldIcon} />
						<TextInput
							style={loginScreen.textInput}
							ref='username'
							keyboardType='email-address'
							returnKeyType='next'
							autoCapitalize='none'
							autoCorrect={false}
							value={userName}
							onChangeText={userName => this.setState({ userName })}
							underlineColorAndroid='transparent'
							onSubmitEditing={() => this.refs.password.focus()}
							placeholder='Username/Email' />
					</View>
					<View style={loginScreen.fieldContainer}>
						<LineIcons name='lock' {...loginScreen.fieldIcon} />
						<TextInput
							ref='password'
							style={loginScreen.textInput}
							keyboardType='default'
							returnKeyType='go'
							autoCapitalize='none'
							autoCorrect={false}
							secureTextEntry
							value={password}
							onChangeText={password => this.setState({ password })}
							underlineColorAndroid='transparent'
							onSubmitEditing={this.handlePressLogin}
							placeholder='Password' />
					</View>
					<View style={loginScreen.buttonWrap}>
						<TouchableOpacity
							disabled={disabled}
							style={loginBtnStyle}
							onPress={this.handlePressLogin}>
							{isLoggingIn && <View style={loginScreen.loadingWrapper}><ActivityIndicator animating={disabled} size="large" color="#0BA7DA" /></View>}
							<Text style={loginbtnText}>Login</Text>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView >
		);
	}
}

export default withNavigation(LoginForm);