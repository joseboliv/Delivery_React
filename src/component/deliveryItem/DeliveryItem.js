import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';

import StatusIcon from './statusIcon';
import Details from './details';
import Payment from './payment';
import Delivered from './details/delivered';
import Address from './address';
import { cards } from '../../ui/theme/appStyle';

const DeliveryItem = (props) => {
	const { authData, data, onStatusChange } = props;
	const status = data.status.toLowerCase();
	const addr = status === 'assigned' ? data.shop : data.customer;
	const footerSection = status === 'delivered' ? (<Delivered data={data.schedule} />) : (<Address data={addr} />);
	return (
		<TouchableWithoutFeedback onPress={() => props.navigation.navigate('Details', { authData, data, onStatusChange })} underlayColor="white">
			<View style={cards.container}>
				<View style={styles.wrapper}>
					<View style={styles.topbar}>
						<View style={styles.content}>
							<StatusIcon status={data.status} />
							<Details data={data} />
						</View>
						{status !== 'delivered' && <Payment hasPaid={(data.payment.status === 'paid')} status={status} amount={data.payment.amount} currency={data.payment.currency} />}
					</View>
					{footerSection}
				</View>
			</View>
		</TouchableWithoutFeedback >
	);
};

export default withNavigation(DeliveryItem);

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
	topbar: {
		flex: 1,
		flexDirection: 'row',
	},
	content: {
		flex: 1,
		flexDirection: 'row',
	},
});