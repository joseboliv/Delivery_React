import React, { Component } from 'react';
import UserSignature from '../component/signature';

export default class UserSignatureScreen extends Component {
	static navigationOptions = {
		title: 'Delivery Confirmation',
	};
	render() {
		return <UserSignature />;
	}
}