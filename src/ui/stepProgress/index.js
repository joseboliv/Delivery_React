import React from 'react';
import { StyleSheet, View } from 'react-native';
import StepIcon from './StepIcon';

export default StepProgress = ({ steps, activeIndex }) => {
	const length = steps.length;
	return (
		<View style={styles.container}>
			{
				steps.map((label, i) => {
					const params = {
						key: `step#${i + 1}`,
						index: i,
						label,
						length,
						activeIndex,
					}
					return <StepIcon {...params} />
				})
			}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		alignSelf: 'center',
		margin: 20, 
	}
});