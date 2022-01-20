import { PermissionsAndroid } from 'react-native';
import Polyline from '@mapbox/polyline';

export const requestLocationPermission = async (callback) => {
	try {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			{
				'title': 'Location Access Required',
				'message': 'This App needs to Access your location',
			},
		);
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			callback();
		} else {
			alert("Permission Denied");
		}
	} catch (err) {
		alert("err", err);
		console.warn(err)
	}
}

export const getDirections = async (startLoc, destinationLoc) => {
	const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=AIzaSyC2kCi_O0w5GuqTWgxaZNNlzFcsp0a9ySM`;
	try {
		const response = await fetch(url);
		const responseJson = await response.json();
		if(responseJson.routes.length){
			const points = Polyline.decode(responseJson.routes[0].overview_polyline.points);
			return points.map((point, index) => {
				return {
					latitude: point[0],
					longitude: point[1]
				}
			});
		}
		return [];
	} catch (error) {
		return { error }
	}
}

export const getLatLng = async (address) => {
	const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyC2kCi_O0w5GuqTWgxaZNNlzFcsp0a9ySM`;
	try {
		const response = await fetch(url);
		const responseJson = await response.json();
		if(responseJson.status === 'OK')
			return responseJson.results[0].geometry.location;
		return { error: responseJson.status };
	} catch (error) {
		return { error }
	}
}