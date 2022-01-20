import React from 'react';
import { Text } from 'react-native';
import formatPrice from '../../../utils/formatPrice';
import { cards } from '../../../ui/theme/appStyle';

export default StatusAssigned = ({ currency, amount } = props) => (
	<Text style={cards.paymentText}>{formatPrice(currency, amount)}</Text>
);