import React from 'react';
import { StyleSheet, View } from 'react-native';
import {body} from '../theme/appStyle';

export default Tab = ({ item } = props) => (
	<View style={body.content}>{item}</View>
);