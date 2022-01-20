import { Linking, Alert, Platform } from 'react-native';

export default callNumber = phone => {
	if (phone) {
		const phoneNumber = Platform.OS === 'ios' ? `telprompt:${phone}` : `tel:${phone}`;
		Linking.canOpenURL(phoneNumber)
			.then(supported => {
				if (!supported) {
					Alert.alert('Phone number is not available');
				} else {
					return Linking.openURL(phoneNumber);
				}
			})
			.catch(err => console.log(err));
	} else {
		Alert.alert('Phone number is not available');
	}
};