import React, { Component } from 'react';
import { View, Animated, Easing, TouchableOpacity, Text } from 'react-native';
import {tabsStyle} from '../../ui/theme/appStyle';
export default class Nav extends Component {
	state = {
		pos: [0],
		translateX: new Animated.Value(0),
	};

	componentDidMount() {
		this.animateActiveTab();
	}

	animateActiveTab = () => {
		const { activeTab } = this.props;
		const { pos, translateX } = this.state;
		Animated.timing(                // Animate over time
			translateX,            				// The animated value to drive
			{
				toValue: pos[activeTab],    // Animate to opacity: 1 (opaque)
				duration: 300,              // Make it take a while
				useNativeDriver: true,
				easing: Easing.elastic(2),
			}
		).start();                      // Starts the animation
	};

	setTabPos = (event, index) => {
		const { pos } = this.state;
		if (!pos[index]) {
			pos[index] = event.nativeEvent.layout.x;
			this.setState({ pos });
		}
	};

	render({ items, onTabChange } = this.props) {
		const indicatorStyle = {
			width: this.state.pos[1],
			transform: [{
				translateX: this.state.translateX,
			}],
		};
		return (
			<>
				<View style={tabsStyle.navContainer}>
					{items.map(({title='', status=''}, index) =>
						<TouchableOpacity
							style={tabsStyle.tabContainer}
							onLayout={(e) => this.setTabPos(e, index)}
							onPress={() => onTabChange(index, status, this.animateActiveTab)}
							key={index}
						>
							<Text style={
								index === this.props.activeTab ? tabsStyle.activeNameText : tabsStyle.nameText
							}>
								{title}
							</Text>
						</TouchableOpacity>
					)}
				</View>
				<View style={tabsStyle.selectionBar}>
					<Animated.View style={[tabsStyle.selectionIndicator, indicatorStyle]}></Animated.View>
				</View>
			</>
		);
	}
};