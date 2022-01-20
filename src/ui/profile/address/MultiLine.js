import React from 'react';
import { View } from 'react-native';
import { styles, iconStyle } from '../style';
import {MCIcons} from '../../iconsLib';
import {formatAddressML} from '../../../utils/formatAddress';

export default MultiLineAddress = ({ address }) => (
	<View style={styles.content}>
		<MCIcons name='map-marker' {...iconStyle} style={{alignSelf:'flex-start',}}/>
		<View style={{flex: 1,}}>
			{formatAddressML(address)}
		</View>
	</View>
);
