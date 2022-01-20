import React from 'react';
import { StyleSheet, Text } from 'react-native';

const styleMerger = (...styles) => styles.reduce((combined, current) => {
	if (Boolean(current) && current.constructor === Object && Object.keys(current).length) {
		combined.push(current);
	} else if (Array.isArray(current)) {
		combined.push(Object.assign({}, ...current));
	}
	return combined;
}, []);

export default Txt = (props) => {
	const { type, style, children } = props;
	const color = '#333';
	const dfStyle = labelStyles[(type || 'normal')];
	const newStyle = styleMerger({ color }, dfStyle, style);
	return <Text style={newStyle}>{children}</Text>;
};

const labelStyles = StyleSheet.create({
	h2: {
		fontSize: 20,
		textTransform: 'capitalize',
	},
	h3: {
		fontSize: 18,
		fontWeight: '600',
		textTransform: 'capitalize',
	},
	h4: {
		fontSize: 16,
		textTransform: 'capitalize',
	},
	big: {
		fontSize: 18,
	},
	normal: {
		fontSize: 14,
	},
	small: {
		fontSize: 12,
	}
});