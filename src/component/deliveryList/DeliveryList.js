import React, { Component } from 'react';
import { StatusBar, FlatList, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation';
import Toast from 'react-native-simple-toast';
import OneSignal from 'react-native-onesignal';

import Tabs from '../../ui/tabs';
import DeliveryItem from '../deliveryItem/DeliveryItem';
import dataRequest from '../../services/dataRequests';
import { Txt } from '../../ui/core';
import {body} from '../../ui/theme/appStyle';

class DeliveryList extends Component {
	state = {
		loading: false,
		data: [],
		page: 1,
		error: null,
		deliveryStatus: 'pending',
		refreshing: false,
		endReached: false,
	};

	componentDidMount() {
		this.makeRemoteRequest();
	}

	makeRemoteRequest = async () => {
		const { token = '', baseurl = '', displayName = '' } = this.props.navigation.state.params || {};
		const { page, deliveryStatus = '', endReached } = this.state;
		const perPage = 10;
		if (!endReached && token && baseurl) {
			this.setState({ loading: true });
			const queryParams = { page, per_page: perPage, orderby: 'delivery_id', order: 'desc' };
			if (deliveryStatus && (deliveryStatus == 'delivered' || deliveryStatus == 'pending')) {
				queryParams['delivery_status'] = deliveryStatus;
			}
			try {
				const response = await dataRequest.getDeliveries(baseurl, token, queryParams);
				this.setState({
					data: page === 1 ? [...response] : [...this.state.data, ...response],
					endReached: response.length < perPage,
					loading: false,
					refreshing: false,
				});
			} catch (error) {
				if (error instanceof Error) {
					try {
						const reason = JSON.parse(error.message);
						if (Boolean(reason) && reason.constructor === Object && reason.action === 'clear_token') {
							await AsyncStorage.removeItem('authDetails');
      				OneSignal.setSubscription(false);
							Toast.show('You have been logged out!');
							this.props.navigation.navigate('Auth');
						}
					} catch (e) {
						console.log(e);
						this.setState({ error: error.message, loading: false, refreshing: false });
					}
				} else {
					this.setState({ error, loading: false, refreshing: false });
				}
			}
		}
	};

	handleRefresh = () => {
		this.setState(
			{
				page: 1,
				refreshing: true,
				endReached: false,
			},
			() => this.makeRemoteRequest()
		);
	};

	handleLoadMore = () => {
		if (!this.state.loading && !this.state.endReached) {
			this.setState(
				{
					page: this.state.page + 1
				},
				() => this.makeRemoteRequest()
			);
		}
	};

	changeDeliveryStatus = deliveryStatus => {
		this.setState(
			{ deliveryStatus, page: 1, endReached: false },
			() => this.makeRemoteRequest()
		);
	};

	updateListData = (item, index) => {
		const newList = this.state.data;
		if(this.state.deliveryStatus && this.state.deliveryStatus!==item.status) {
			newList.splice(index,1);
		} else {
			newList[index] = item;
		}
		
		this.setState({
			data: newList
		})
	};

	renderFooter = () => {
		if (!this.state.loading || !this.state.endReached) return null;
		return (
			<View
				style={{
					paddingVertical: 20,
					borderTopWidth: 1,
					borderColor: "#CED0CE"
				}}
			>
				<ActivityIndicator animating size="large" color="#0BA7DA"/>
			</View>
		);
	};

	emptyList = () => {
		if (this.state.loading) {
			return (<ActivityIndicator animating size="large" color="#0BA7DA"/>);
		} else {
			return (
				<View style={{paddingTop: 60, alignItems:'center',}}>
					<Txt type='big'>No items here.</Txt>
				</View>
			);
		}
	};

	render() {
		const { token = '', baseurl = '', displayName = '' } = this.props.navigation.state.params || {};
		const nav = [
			{ title: 'Pending', status: 'pending' },
			{ title: 'Delivered', status: 'delivered' },
			{ title: 'Show All' },
		];
		return (
			<View style={body.container}>
				<StatusBar
						barStyle='light-content'
						{...body.statusBarColor}
				/>
				<Tabs navItems={nav} onClick={this.changeDeliveryStatus}>
					<FlatList
						data={this.state.data}
						extraData={this.state}
						renderItem={({ item, index }) => (
							<DeliveryItem data={item} authData={{token,baseurl,id:item.id,index}} onStatusChange={this.updateListData}/>
						)}
						keyExtractor={item => item.id.toString()}
						ListEmptyComponent={this.emptyList}
						ListFooterComponent={this.renderFooter}
						onRefresh={this.handleRefresh}
						refreshing={this.state.refreshing}
						onEndReached={this.handleLoadMore}
						onEndReachedThreshold={0.1}
					/>
				</Tabs>
			</View>
		);
	}
};

export default withNavigation(DeliveryList);