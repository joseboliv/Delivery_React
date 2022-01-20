import React, { Component } from 'react';
import { ScrollView, View, Text, StatusBar } from 'react-native';
import Logo from '../ui/logo';
import LoginForm from '../component/loginForm';
import { body, loginScreen } from '../ui/theme/appStyle';

export default class SignInScreen extends Component {
	static navigationOptions = { header: null };
	render() {
		return (
			<ScrollView contentContainerStyle={loginScreen.scrollViewContainer}>
				<StatusBar
						barStyle='light-content'
						{...body.statusBarColor}
				/>
				<View style={loginScreen.container}>
					<Logo size='small' />
					<Text style={loginScreen.title}>Please sign in</Text>
					<LoginForm />
				</View>
			</ScrollView>
		);
	}
}