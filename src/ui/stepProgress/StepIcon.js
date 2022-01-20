import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Txt} from '../core'

export default StepProgress = ({ index, label, length, activeIndex } = props) => {
	const isActive = activeIndex === index,
		isCompleted = activeIndex > index,
		isLastStep = index === length - 1,
		currentState = isActive ? 'active' : isCompleted ? 'completed' : 'disabled';

	const styles = StyleSheet.create(generateStyle(currentState));

	return (
		<View style={styles.container}>
			<View style={styles.circleStyle}>
				<Txt style={styles.circleText}>
					{isCompleted ? '\u2713' : (index + 1)}
				</Txt>
			</View>
			<Txt style={styles.labelText}>{label}</Txt>
			{!isLastStep && <View style={styles.bar} />}
		</View>
	);
};

const generateStyle = (state = 'disabled') => {
	const variation = {
		active: {
			size: 40,
			barTop: 15,
			color: '#4BB543',
			barColor: '#EBEBE4',
			backgroundColor: '#FFF',
			numColor: '#000',
		},
		completed: {
			size: 36,
			barTop: 15, // circle origin (18) - bar height origin (3)
			color: '#4BB543',
			barColor: '#4BB543',
			backgroundColor: '#4BB543',
			numColor: '#FFF',
		},
	};

	const {
		size = 36,
		barTop = 15,
		color = '#EBEBE4',
		barColor = '#EBEBE4',
		backgroundColor = '#EBEBE4',
		numColor = '#FFF'
	} = variation[state] || {};

	const defaultStyles = {
		container: {
			flex: 1,
			alignItems: 'center',
		},
		circleStyle: {
			width: size,
			height: size,
			borderRadius: size / 2,
			backgroundColor,
			justifyContent: 'center',
			alignItems: 'center',
		},
		circleText: {
			color: numColor,
		},
		labelText: {
			textAlign: 'center',
			flexWrap: 'wrap',
			maxWidth: '80%',
			marginTop: 4,
			paddingTop: 2,
			color,
		},
		bar: {
			position: 'absolute',
			width: '100%',
			top: barTop,
			left: '50%',
			right: 0,
			borderTopWidth: 6,
			borderTopColor: barColor,
			zIndex: -1,
		},
	};
	const activeStyles = {
		circleStyle: {
			...defaultStyles.circleStyle,
			borderColor: color,
			borderWidth: 4,
			bottom: 2,
		},
		labelText: {
			...defaultStyles.labelText,
			marginTop: 0,
		}
	}

	return state === 'active' ? { ...defaultStyles, ...activeStyles } : defaultStyles;
}