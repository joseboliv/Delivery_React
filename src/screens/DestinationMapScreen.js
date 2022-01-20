import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from "react-native";
import { Txt } from '../ui/core';
import Map from '../component/map/Map';
import { formatAddressSL } from '../utils/formatAddress';
import { getLatLng } from '../component/map/helpers';
import {body} from '../ui/theme/appStyle';

export default class DestinationMapScreen extends Component {
	state = {
		lat: null,
		lng: null,
		error: null,
	};
	static navigationOptions = {
		title: 'Delivery Location',
	};
	async componentDidMount() {
		const { address } = this.props.navigation.getParam('data', {});
		const singleLineAddress = formatAddressSL(address);
		try {
			const location = await getLatLng(singleLineAddress);
			this.setState({ ...location });
		} catch (e) {
			console.log(e);
		}
	};

	render() {
		if (this.state.error) {
			return (
				<View style={styles.container}>
					<StatusBar
						barStyle='light-content'
						{...body.statusBarColor}
					/>
					<Txt>Something went wrong. Please go back!</Txt>
				</View>
			)
		} else if (this.state.lat && this.state.lng) {
			const destination = {
				position: {
					latitude: this.state.lat,
					longitude: this.state.lng,
				},
				...this.props.navigation.getParam('data', {}),
			}

			return <Map destination={destination} />;
		}
		return (null);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
});