import React from 'react';
import { StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Txt from './Txt';
import MCIcons from '../iconsLib';

export const Btn = ({ title, style = {}, isLoading = false, children, ...rest }) => {
	const buttonText = title || children || '';
	const { backgroundColor = 'steelblue', ...btnStyles } = style;
	return (
		<TouchableOpacity style={[styles.wrapper, { backgroundColor }]} {...rest}>
			{!isLoading && <Txt style={[styles.button, btnStyles]}>{buttonText}</Txt>}
			{!!isLoading && <View style={styles.ActivityIndicator}><ActivityIndicator animating size='large' color="#0BA7DA"/></View>}
		</TouchableOpacity>
	)
}

export const IconBtn = ({ icon, title, style = {}, isLoading = false, children, ...rest }) => {
	if (!icon) return (null);
	const buttonText = title || children || '';
	const { backgroundColor = 'steelblue', ...btnStyles } = style;
	const iconColor = btnStyles.color || '#fff';
	const iconSize = Number(btnStyles.fontSize) * 1.5 || 25;
	return (
		<TouchableOpacity style={[styles.wrapper, { backgroundColor }]} {...rest}>
			{!isLoading && <View><MCIcons name={icon} color={iconColor} size={iconSize} /><Txt style={[styles.button, btnStyles]}>{buttonText}</Txt></View>}
			{!!isLoading && <View style={styles.ActivityIndicator}><ActivityIndicator animating size='large' color="#0BA7DA"/></View>}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		maxWidth: 300,
		flexGrow: 1,
		flexDirection: 'row',
		alignSelf: 'center',
		justifyContent: 'center',
		backgroundColor: 'steelblue',
		marginVertical: 10,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 20,
	},
	button: {
		color: '#fff',
		textAlign: 'center',
		fontWeight: 'bold',
	},
	ActivityIndicator: {
		paddingVertical: 20,
		borderTopWidth: 1,
		borderColor: "#CED0CE"
	}
});