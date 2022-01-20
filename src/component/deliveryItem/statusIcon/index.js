import React from 'react';
import { View, Text } from 'react-native';
import { LineIcons, Feather } from '../../../ui/iconsLib';
import { cards } from '../../../ui/theme/appStyle';

export default StatusIcon = ({ status } = props) => {
	const statusLabel = status === 'pickedup' ? 'In Transit' : status;
	const iconList = {
		assigned: (<Feather name='package' {...cards.statusIcon} />),
		pickedup: (<Feather name='truck' {...cards.statusIcon} />),
		delivered: (<LineIcons name='home' {...cards.statusIcon} />),
		start: (<LineIcons name='basket-loaded' {...cards.statusIcon} />),
		finish: (<LineIcons name='basket' {...cards.statusIcon} />),
	};
	return (
		<View style={cards.statusIconContainer}>
			{iconList[status]}
			<Text style={cards.statusText}>{statusLabel}</Text>
		</View>
	);
}