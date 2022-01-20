import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, StatusBar, TouchableOpacity, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
// import { Txt } from '../ui/core';
// import StepProgress from '../ui/stepProgress';
import StatusIcon from '../component/deliveryItem/statusIcon';
import Pending from '../component/deliveryItem/details/pending';
import Address from '../component/deliveryItem/address';
import Payment from '../component/deliveryItem/payment';
import formatPrice from '../utils/formatPrice';
import OrderItems from '../component/order';
import { body, nav, tabsStyle, detailsScreen, cards } from '../ui/theme/appStyle';
import dataReq from '../services/dataRequests';

class DeliveryDetailsScreen extends Component {
	constructor(props) {
		super(props);
		this.state = { isUpdating: false, };
	}
	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Delivery details',
			headerRight: this.getHeaderRight(navigation),
		};
	};
	static getHeaderRight = (navigation) => {
		const { params = {} } = navigation.state;
		const { status } = navigation.getParam('data', {});
		if (status === 'delivered') return;
		const { token, baseurl, id, index } = navigation.getParam('authData', {});
		const onStatusChange = navigation.getParam('onStatusChange', null);
		return (
			<TouchableOpacity
				style={nav.headerButtonContainer}
				onPress={async () => {
					params.updateStart()
					const response = await dataReq.updateDelivery(baseurl, token, id);
					if (response && response.length) {
						navigation.setParams({ data: response[0] });
						onStatusChange(response[0], index);
					}
					params.updateEnd()
				}}>
				<Text style={nav.headerButtonText}>Complete?</Text>
			</TouchableOpacity>
		)
	};
	componentDidMount() {
		this.props.navigation.setParams({
			updateStart: this.loadingStartHandler,
			updateEnd: this.loadingEndHandler
		});
	};
	loadingStartHandler = () => this.setState({ isUpdating: true });
	loadingEndHandler = () => this.setState({ isUpdating: false });
	render() {
		const data = this.props.navigation.getParam('data', {});
		const { order, status, items, shop, customer, payment, schedule } = data;
		// const steps = ['Assigned', 'Picked up', 'Delivered'];
		// const activeIndex = status === 'assigned' ? 1 : status === 'pickedup' ? 2 : 3;
		let statusMsg;
		if (status === 'delivered') {
			const date = schedule.delivered.split(' | ');
			statusMsg = <Text style={[tabsStyle.activeNameText, {textAlign: 'left'}]}>
				{`Delivered on: ${date[0]} | `}
				<Text style={tabsStyle.nameText}>{date[1] || ''}</Text>
			</Text>;
		} else {
			statusMsg = <Text style={[tabsStyle.activeNameText, {textAlign: 'left'}]}>{payment.status === 'paid' ? `No amount to collect.` : `Cash on Delivery: ${formatPrice(payment.currency, payment.amount)}`}</Text>;
		}
		return (
			<View style={{ flex: 1, }}>
				<StatusBar
					barStyle='light-content'
					{...body.statusBarColor}
				/>
				{this.state.isUpdating && <ActivityIndicator size="large" color="#0BA7DA" />}
				<View style={detailsScreen.topbar}>
					<Text style={cards.title}>{`Order: ${order}`}</Text>
					<OrderItems items={items} />
					<View style={detailsScreen.statusContainer}>
						{statusMsg}
					</View>
				</View>
				<View style={styles.container}>
					{/* <View style={styles.statusbar}>
					<StepProgress steps={steps} activeIndex={activeIndex} />
					<View style={{ justifyContent: 'center', marginBottom: 20, }}>
						{Boolean(schedule.assigned) && <Txt style={styles.statusText}>Assigned on: {schedule.assigned}</Txt>}
						{Boolean(schedule.picked) && <Txt style={styles.statusText}>Picked on: {schedule.picked}</Txt>}
						{Boolean(schedule.delivered) && <Txt style={styles.statusText}>Delivered on: {schedule.delivered}</Txt>}
					</View>
				</View> */}
					<ScrollView contentContainerStyle={styles.wrapper}>
						{/* <View style={cards.container}>
							<Text style={cards.title}>{`Order: ${order}`}</Text>
							<View style={cards.profileContent}>
								<OrderItems items={items} />
							</View>
						</View> */}
						<View style={cards.container}>
							<View style={styles.topbar}>
								<View style={styles.content}>
									<StatusIcon status='start' />
									<View style={cards.profileContainer}>
										<Text style={cards.title}>From: Business details</Text>
										<View style={cards.profileContent}>
											<Pending type='shop' data={shop} />
										</View>
									</View>
								</View>
							</View>
							<Address data={shop} />
						</View>
						<View style={cards.container}>
							<View style={styles.topbar}>
								<View style={styles.content}>
									<StatusIcon status='finish' />
									<View style={cards.profileContainer}>
										<Text style={cards.title}>To: Customer details</Text>
										<View style={cards.profileContent}>
											<Pending type='customer' data={customer} />
										</View>
									</View>
								</View>
								{/* {status !== 'delivered' && <Payment hasPaid={(data.payment.status === 'paid')} status={status} amount={data.payment.amount} currency={data.payment.currency} />} */}
							</View>
							<Address data={customer} />
						</View>
						{/* <View style={styles.section}>
						<Txt type='h2' style={styles.headerText}>Pickup: Business details</Txt>
						<View style={styles.content}>
							<Pending type='shop' data={shop} />
							<Address data={shop} />
						</View>
					</View>
					<View style={styles.section}>
						<Txt type='h2' style={styles.headerText}>Delivery: Customer details</Txt>
						<View style={styles.content}>
							<Pending type='customer' data={customer} />
							<Address data={customer} />
						</View>
					</View>
					<View style={styles.section}>
						<Txt type='h2' style={styles.headerText}>{`Order ${order}: details`}</Txt>
						<View style={styles.content}>
							<OrderItems items={items} />
						</View>
					</View> */}
					</ScrollView>
				</View>
			</View>
		);
	}
}

export default withNavigation(DeliveryDetailsScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		backgroundColor: '#F8F8F8',
		paddingTop: 20,
	},
	wrapper: {
		paddingBottom: 20,
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

// const styles2 = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: 'flex-start',
// 		backgroundColor: '#F8F8F8',
// 	},
// 	statusbar: {
// 		alignItems: 'center',
// 		backgroundColor: '#0BA7DA',
// 	},
// 	statusText: {
// 		color: '#fff',
// 	},
// 	scrollableArea: {
// 		// flex: 1,
// 		// justifyContent: 'flex-start'
// 	},
// 	section: {
// 		// flex: 1,
// 		marginBottom: 20,
// 	},
// 	headerText: {
// 		backgroundColor: '#efefef',
// 		borderBottomWidth: StyleSheet.hairlineWidth,
// 		borderBottomColor: '#999',
// 		paddingHorizontal: 20,
// 		paddingVertical: 15,
// 	},
// 	content: {
// 		// flex: 1,
// 		paddingHorizontal: 20,
// 		paddingVertical: 15,
// 	}
// });