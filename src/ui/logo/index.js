import React from 'react';
import { View, Image } from 'react-native'
import styles from './style'

const logoVariations = {
	'x-small': {
		style: 'logoStyleXSm',
		source: require('../../images/wcfmmp.png'),
	},
	'small': {
		style: 'logoStyleSm',
		source: require('../../images/wcfmmp.png'),
	},
	'medium': {
		style: 'logoStyleMd',
		source: require('../../images/wcfmmp.png'),
	},
	'large': {
		style: 'logoStyleLg',
		source: require('../../images/wcfmmp.png'),
	},
	'x-large': {
		style: 'logoStyleXLg',
		source: require('../../images/wcfmmp.png'),
	},
};

export default Logo = ({ size = 'large' }) => {
	const {style, source} = logoVariations[size] || logoVariations.large;
	return (
		<View style={styles.container}>
			<Image style={styles[style]} source={source} />
		</View>
	);
}