import React from 'react';
import { View, Text } from 'react-native';
import { LineIcons } from '../../../../ui/iconsLib';
import { cards } from '../../../../ui/theme/appStyle';

export default showDeliveryDetails = ({ data } = props) => {
	const { assigned, picked, delivered } = data;
	const date = delivered.split(' | ');
	return (
		<View style={cards.addressContainer}>
			<View style={cards.addressContent}>
				<View style={cards.fieldContainer}>
					<LineIcons name='clock' {...cards.fieldIcon} />
					<Text style={cards.fieldText}>
						{`Delivered on: ${date[0]} | `}
						<Text style={cards.fieldTextAlt}>{date[1]||''}</Text>
					</Text>
				</View>
			</View>
		</View>
	);
};