import React from 'react';
import { Text, View } from 'react-native';
import Pending from './pending';
import { cards } from '../../../ui/theme/appStyle';

export default showDetails = ({ data } = props) => {
	const { shop, customer } = data;
	const status = data.status === 'assigned' ? data.status : 'pickedup';
	const attr = {
		assigned: {
			key: 'Shop',
			data: shop,
		},
		pickedup: {
			key: 'Customer',
			data: customer,
		},
		// delivered: {
		// 	key: 'Delivery',
		// 	data: schedule,
		// },
	};
		return (
			<View style={cards.profileContainer}>
				<Text style={cards.title}>{`${attr[status].key} details:`}</Text>
				<View style={cards.profileContent}>
					<Pending type={attr[status].key} data={attr[status].data} />
				</View>
			</View>
		);
};