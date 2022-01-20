import React from 'react';
import { View, Text } from 'react-native';
import Icon from './Icon';
import {cards} from '../../theme/appStyle';

export default Title = ({ name, type }) => (
	<View style={cards.fieldContainer}>
		<Icon type={type} />
		<Text style={cards.fieldText}>{name}</Text>
	</View>
);