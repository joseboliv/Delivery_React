import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
// import { Txt } from '../../ui/core';
import { cards } from '../../ui/theme/appStyle';
// import formatPrice from '../../utils/formatPrice';

export default Item = (props) => {
	const { name, price, currency, formattedPrice, quantity } = props.data;
	const total = Number(price) * Number(quantity);
	return (
		<View style={cards.profileContent}>
			<Text style={cards.fieldText}>{name}</Text>
		</View>
		// <View style={cards.fieldContainer}>
		// 	<View style={styles.item}>
		// 		<Txt type='h4' style={styles.headerText}>{name}</Txt>
		// 		<Txt type="small" style={styles.quantityText}>{`${formatPrice(currency,price)} X ${quantity}`}</Txt>
		// 	</View>
		// 	<View style={styles.price}>
		// 		<Txt type='h3'>{formatPrice(currency, total)}</Txt>
		// 	</View>
		// </View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexGrow: 1,
		justifyContent: 'space-between',
		marginBottom: 15,
	},
	item: {
		flex: 2.5,
	},
	headerText: {
		marginBottom: 5,
	},
	quantityText: {
		color: '#666',
		letterSpacing: 0.5,
	},
	price: {
		flex: 1,
		alignItems: 'flex-end',
	}
});