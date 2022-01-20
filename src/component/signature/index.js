import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableHighlight } from "react-native";
import {Txt} from '../../ui/core';
import SignatureCapture from 'react-native-signature-capture';
import { body, mapScreen } from '../../ui/theme/appStyle';


export default class CustomComponent extends Component {
	_onSaveEvent = (result) => {
		//result.encoded - for the base64 encoded png
		//result.pathName - for the file path name
		console.log(result);
	};
	render() {
		return (
			<View style={{ flex: 1, flexDirection: "column", margin: 30, }}>
				<StatusBar
						barStyle='light-content'
						{...body.statusBarColor}
				/>
				<Txt style={{ alignItems: "center", justifyContent: "center" }}>Sign below to confirm delivery</Txt>
				<View style={{ flex: 1, borderColor: '#000033', borderWidth: 1, }}>
					<SignatureCapture
						style={styles.signature}
						ref={ref => { this.sign = ref; }}
						onSaveEvent={this._onSaveEvent}
						saveImageFileInExtStorage={false}
						showNativeButtons={false}
						showTitleLabel={false}
						viewMode={"portrait"} />
				</View>
				<View style={{ flex: 1, flexDirection: "row" }}>
					<TouchableHighlight style={styles.buttonStyle}
						onPress={() => { this.sign.saveImage() }} >
						<Txt>Save</Txt>
					</TouchableHighlight>

					<TouchableHighlight style={styles.buttonStyle}
						onPress={() => { this.sign.resetImage() }} >
						<Txt>Reset</Txt>
					</TouchableHighlight>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	signature: {
		flex: 1,
	},
	buttonStyle: {
		flex: 1, justifyContent: "center", alignItems: "center", height: 50,
		backgroundColor: "#eeeeee",
		margin: 10
	}
});