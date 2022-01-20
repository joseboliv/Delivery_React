import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { LineIcons } from '../../iconsLib';
import callNumber from '../../../utils/callNumber';
import { cards, callBtn } from '../../theme/appStyle';

export default Contact = ({ contact } = props) => {
	if (Boolean(contact[0])) {
		return (
			<TouchableOpacity
				style={callBtn.container}
				onPress={() => callNumber(contact[0])}>
				<LineIcons name='phone' {...cards.fieldIcon} />
				<Text style={callBtn.text}>Call Now</Text>
			</TouchableOpacity>
		);
	}
	return (
		<View style={cards.fieldContainer}>
			<LineIcons name='phone' {...cards.fieldIcon} />
			<Text style={cards.fieldText}>Not specified!</Text>
		</View>
	);
};