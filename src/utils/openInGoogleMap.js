import { Linking, Alert } from 'react-native';

export default openGMap = (destination) => {
	if (destination) {
		const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
		Linking.canOpenURL(url)
			.then(supported => {
				if (!supported) {
					Alert.alert('Could not connect to Google Map app');
				} else {
					return Linking.openURL(url);
				}
			})
			.catch(err => console.log(err));
	} else {
		Alert.alert('There seems to be a problem with the locations');
	}
};