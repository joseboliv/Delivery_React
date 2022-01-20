import React from 'react';
import { StyleSheet, View } from 'react-native';
import StatusAssigned from './StatusAssigned';
import StatusPickedup from './StatusPickedup';

export default paymentStatus = ({ hasPaid, status, amount, currency }) => (
	<View style={styles.container}>
		{hasPaid && <StatusAssigned/> || <StatusPickedup currency={currency} amount={amount}/>}
	</View>
);

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		position: 'absolute',
		top: 0,
		right: 0,
	},
});