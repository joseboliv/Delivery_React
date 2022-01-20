import AsyncStorage from '@react-native-community/async-storage';
import makeRequest from './requests';

const login = (username, password, siteUrl) => {
	const response = await req.login(username, password, siteUrl);
	if (validResponse(response)) {
		const authDetails = {
			token: response.token,
			baseurl: siteUrl,
			displayName: response.user_display_name,
			storeName: response.store_name,
		};
		await AsyncStorage.setItem('authDetails', JSON.stringify(authDetails));
	}

};

const validResponse = (response) => {
	const { token = false, roles = [] } = response;
	return (Boolean(token) && Array.isArray(roles) && roles.includes('wcfm_delivery_boy'));
};



return {
	login,
	logout,
	getDeliveries,
	updateDelivery
}