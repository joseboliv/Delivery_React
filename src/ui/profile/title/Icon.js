import React from 'react';
import { LineIcons } from '../../iconsLib';
import { cards } from '../../theme/appStyle';

export default TitleIcon = ({ type } = props) => {
	if (type.toLowerCase() === 'shop')
		return <LineIcons name='briefcase' {...cards.fieldIcon} />;
	return <LineIcons name='user' {...cards.fieldIcon} />;
};