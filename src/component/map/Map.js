import React, { Component } from "react";
import { TouchableOpacity, Text, View, Platform, Dimensions, StatusBar, ActivityIndicator, Alert } from "react-native";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { requestLocationPermission, getDirections } from './helpers';
import callNumber from '../../utils/callNumber';
import openViaApp from '../../utils/openInGoogleMap';
import { formatAddressSL } from '../../utils/formatAddress';
import { body, mapScreen } from '../../ui/theme/appStyle';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class RouteMap extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentPosition: {
				latitude: null,
				longitude: null,
			},
			coords: [],
			calculatingRoute: true,
			showRoute: false,
			error: null,
		};

		this.calculateRoute = this.calculateRoute.bind(this);
	}

	componentDidMount() {
		if (Platform.OS === 'ios') {
			this.calculateRoute();
		} else {
			this.handleLocationPermission();
		}
	}

	handleLocationPermission = () => {
		RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
			.then(data => {
				requestLocationPermission(this.calculateRoute);
			}).catch(err => {
				this.setState({
					calculatingRoute: false,
				});
				alert("Location permission denied");
			});
	}

	calculateRoute = () => {
		const positionOptions = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };
		this.getCurrentPosition(positionOptions);
		this.watchCurrentPosition(positionOptions);
	};

	getCurrentPosition = (positionOptions) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.findRouteFromHere(position.coords);
			},
			(error) => this.setState({ error: error.message }),
			positionOptions,
		);
	};

	watchCurrentPosition = (positionOptions) => {
		this.watchID = navigator.geolocation.watchPosition(
			(position) => {
				const lastPosition = this.state.currentPosition;
				const newPosition = position.coords;
				if (newPosition.latitude !== lastPosition.latitude || newPosition.longitude !== lastPosition.longitude) {
					this.findRouteFromHere(newPosition);
				}
			},
			(error) => this.setState({ error: error.message }),
			positionOptions,
		);
	};

	findRouteFromHere = async (currentPosition) => {
		const { position } = this.props.destination;
		const response = await getDirections(`${currentPosition.latitude},${currentPosition.longitude}`, `${position.latitude},${position.longitude}`);
		if (response.error) {
			this.setState({ error: response.error });
		} else {
			if (response.length) {
				this.setState({
					currentPosition,
					coords: response,
					calculatingRoute: false,
					error: null,
				});
			} else {
				this.setState({
					currentPosition,
					coords: response,
					calculatingRoute: false,
					error: null,
				});
				Alert.alert('Could not find a route.');
			}
		}
	}

	componentWillUnmount = () => {
		if (this.watchID) {
			navigator.geolocation.clearWatch(this.watchID);
		}
	};

	showRoute = () => {
		if (!this.state.showRoute) {
			this.setState({ showRoute: true });
		}
		this.mapRef.fitToCoordinates(this.state.coords, { edgePadding: { top: 20, right: 20, bottom: 150, left: 20 }, animated: true });
	};

	renderRoute = () => {
		if (this.state.showRoute && this.state.coords.length > 0) {
			return (
				<>
					<Marker coordinate={this.state.currentPosition} pinColor='seagreen' />
					<Polyline
						coordinates={this.state.coords}
						strokeWidth={4}
						strokeColor="rgba(255,140,0,0.8)" />
				</>
			);
		}
	}

	render() {
		const { position, name, contact, address } = this.props.destination;
		const addressStr = formatAddressSL(address);
		let routeBtnStyle = callBtnStyle = mapScreen.button,
			routeBtnText = callBtnText = mapScreen.buttonText;
		if (this.state.coords.length === 0) {
			routeBtnStyle = [mapScreen.button, mapScreen.buttonDisabled];
			routeBtnText = [mapScreen.buttonText, mapScreen.buttonDisabledText];
		}
		if (!contact[0]) {
			callBtnStyle = [mapScreen.button, mapScreen.buttonDisabled];
			callBtnText = [mapScreen.buttonText, mapScreen.buttonDisabledText];
		}

		return (
			<View style={mapScreen.container}>
				<StatusBar
					barStyle='light-content'
					{...body.statusBarColor}
				/>
				<MapView
					ref={ref => { this.mapRef = ref; }}
					provider={PROVIDER_GOOGLE}
					style={mapScreen.mapContainer}
					initialRegion={{
						...position,
						latitudeDelta: LATITUDE_DELTA,
						longitudeDelta: LONGITUDE_DELTA,
					}}
				>
					<Marker
						title={name}
						description={addressStr}
						coordinate={position}
					/>
					{this.renderRoute()}
				</MapView>
				<View style={mapScreen.buttonContainer}>
					<TouchableOpacity
						disabled={this.state.coords.length === 0}
						style={routeBtnStyle}
						onPress={this.showRoute}>
						{this.state.calculatingRoute && this.state.coords.length === 0 && <View style={mapScreen.loadingWrapper}><ActivityIndicator size="large" color="#0BA7DA" /></View>}
						<Text style={routeBtnText}>Show Route</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={mapScreen.button}
						onPress={() => openViaApp(addressStr)}>
						<Text style={mapScreen.buttonText}>Open via App</Text>
					</TouchableOpacity>
					{
						Boolean(contact[0]) &&
						<TouchableOpacity
							style={callBtnStyle}
							onPress={() => callNumber(contact[0])}>
							<Text style={callBtnText}>Call</Text>
						</TouchableOpacity>
					}
				</View>
			</View>
		);
	}
}