import React from 'react';
import { View } from 'react-native';
import Item from './Item';

export default OrderItems = ({ items }) => (
	<View>
		{items.map((item, index) => <Item key={index} data={item} />)}
	</View>
);
