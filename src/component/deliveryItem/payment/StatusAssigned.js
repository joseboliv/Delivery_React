import React from 'react';
import { Text } from 'react-native';
import { Feather } from '../../../ui/iconsLib';
import { cards } from '../../../ui/theme/appStyle';

export default StatusAssigned = () => (
	<>
		<Feather name='check' {...cards.paymentIcon} />
		<Text style={cards.paymentText}>Paid</Text>
	</>
);