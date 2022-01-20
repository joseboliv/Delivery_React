import React from 'react';
import { View, Text } from 'react-native';
import {LineIcons} from '../../iconsLib';
import {formatAddressSL} from '../../../utils/formatAddress';
import { cards } from '../../theme/appStyle';

export default SingleLineAddress = ({ address }) => (
	<View style={cards.fieldContainer}>
		<LineIcons name='location-pin' {...cards.fieldIcon}/>
		<Text style={cards.fieldText}>{formatAddressSL(address)}</Text>
	</View>
);
