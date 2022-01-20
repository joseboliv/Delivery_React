import React from 'react';
import { View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import { LineIcons } from '../../../ui/iconsLib';
import SingleLineAddress from '../../../ui/profile/address/SingleLine';
import { formatAddressSL } from '../../../utils/formatAddress';
import openViaApp from '../../../utils/openInGoogleMap';
import {cards} from '../../../ui/theme/appStyle';

const Address = (props) => {
	const { name, contact, address } = props.data;
	const addressStr = formatAddressSL(address);
	return (
		<View style={cards.addressContainer}>
			<View style={cards.addressContent}>
				<SingleLineAddress address={address} />
			</View>
			<View style={cards.buttonContainer}>
				<LineIcons.Button
					name="map"
					{...cards.button}
					onPress={() => openViaApp(addressStr)}
				>
					<Text style={cards.buttonText}>Open Map</Text>
					</LineIcons.Button>
			</View>
		</View>
	);
};

export default withNavigation(Address);
