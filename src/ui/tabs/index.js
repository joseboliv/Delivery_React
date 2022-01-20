import React, { Component } from 'react';
import { View } from 'react-native';
import Nav from './Nav';
import Tab from './Tab';
import {tabsStyle} from '../theme/appStyle';

export default class Tabs extends Component {
	state = {
		activeTab: 0, // First tab is active by default
	};

	onTabChange = (activeTab, status='', callback) => {
		const { onClick } = this.props;
			this.setState(
				{ activeTab },
				() => {
					callback();
					onClick(status);
				}
				);
	};

	render({ navItems, children } = this.props) {
		return (
			<View style={tabsStyle.tabsContainer}>
				<Nav items={navItems} activeTab={this.state.activeTab} onTabChange={this.onTabChange} />
				<Tab item={children} />
			</View>
		);
	}
}