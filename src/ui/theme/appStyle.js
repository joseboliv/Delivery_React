import { StyleSheet } from 'react-native';
import colors from './colors';
import texts from './texts';
import icons from './icons';
import metrics from './metrics';

export const nav = {
	headerStyle: {
		backgroundColor: colors.primaryColor,
		elevation: 0,
		shadowOpacity: 0,
		borderBottomWidth: 0,
	},
	headerTitle: {
		...texts.screenTitle,
	},
	iconContainer: {
		marginRight: metrics.regular,
	},
	headerIcon: {
		size: icons.large,
		color: colors.white,
	},
	headerButtonContainer: {
		justifyContents: 'center',
		marginRight: metrics.large,
		paddingHorizontal: metrics.regular,
		paddingVertical: metrics.small,
		borderColor: colors.white,
		borderWidth: metrics.xsmall,
		borderRadius: metrics.large,
		backgroundColor: colors.transparent,
	},
	headerButtonText: {
		...texts.navButton,
		color: colors.white,
	}
};

export const body = {
	statusBarColor: {
		backgroundColor: colors.statusBar,
	},
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
	content: {
		flex: 1,
		backgroundColor: colors.background,
		paddingTop: metrics.regular,
	},
};

export const loginScreen = {
	scrollViewContainer: {
		flexGrow: 1,
		backgroundColor: colors.background,
		justifyContent: 'center',
	},
	container: {
		flexShrink: 1,
	},
	title: {
		...texts.tabName,
		textAlign: 'center',
		marginTop: metrics.medium,
		color: colors.bodyText,
	},
	formWrapper: {
		flex: 1,
		alignItems: 'center',
		marginHorizontal: metrics.xlarge,
		marginVertical: metrics.xlarge,
		paddingHorizontal: metrics.regular,
		paddingVertical: metrics.regular,
		backgroundColor: colors.white,
		borderRadius: metrics.medium,
		shadowColor: colors.shadow,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	fieldContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
		marginHorizontal: metrics.regular,
		marginBottom: metrics.small,
	},
	fieldIcon: {
		size: icons.small,
		color: colors.profileIcon
	},
	textInput: {
		flex: 1,
		maxWidth: 300,
		marginLeft: metrics.regular,
		color: colors.bodyText,
	},
	textInputPlaceholder: {
		color: colors.bodyText,
	},
	buttonWrap: {
		flex: 1,
		flexDirection: 'row',
		marginHorizontal: metrics.regular,
		marginTop: metrics.xlarge,
		marginBottom: metrics.medium,
	},
	button: {
		flex: 1,
		maxWidth: 300,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.primaryColor,
		paddingHorizontal: metrics.regular,
		paddingVertical: metrics.small,
		borderRadius: metrics.xlarge,
	},
	disabledButton: {
		backgroundColor: colors.background,
		borderColor: colors.border,
		borderWidth: metrics.xsmall,
	},
	buttonText: {
		flex: 1,
		textAlign: 'center',
		...texts.tabName,
		color: colors.button,
	},
	disabledButtonText: {
		color: colors.bodyTextAlt,
	},
	loadingWrapper: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'center',
		alignItems: 'center',
	}
};

export const tabsStyle = {
	tabsContainer: {
		flex: 1,
	},
	navContainer: {
		flexDirection: 'row',
		marginHorizontal: metrics.xlarge,
		paddingTop: metrics.regular,
	},
	tabContainer: {
		flex: 1,
		paddingVertical: metrics.regular,
	},
	nameText: {
		...texts.tabName,
		textAlign: 'center',
		color: colors.bodyTextAlt,
	},
	activeNameText: {
		...texts.tabName,
		textAlign: 'center',
		color: colors.primaryColor,
	},
	selectionBar: {
		paddingHorizontal: metrics.xlarge,
		borderBottomColor: colors.white,
		borderBottomWidth: StyleSheet.hairlineWidth * 3,
		backgroundColor: colors.border,//#ECF3F5
	},
	selectionIndicator: {
		height: 3,
		backgroundColor: colors.primaryColor,
	}
};

export const detailsScreen = {
	topbar: {
		backgroundColor: colors.white,
		paddingHorizontal: metrics.regular,
		paddingVertical: metrics.large,
	},
	statusContainer: {
		borderTopWidth: StyleSheet.hairlineWidth,
		borderColor: colors.border,
		marginTop: metrics.small,
		paddingTop: metrics.small,
	}
};

export const cards = {
	container: {
		flex: 1,
		marginHorizontal: metrics.large,
		marginBottom: metrics.large,
		paddingHorizontal: metrics.regular,
		paddingVertical: metrics.large,
		backgroundColor: colors.white,
		borderRadius: metrics.medium,
		shadowColor: colors.shadow,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	statusIconContainer: {
		flex: 1,
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: metrics.small,
		paddingVertical: metrics.regular,
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: metrics.small,
		borderColor: colors.border,
		backgroundColor: colors.background,
	},
	statusIcon: {
		size: icons.regular,
		color: colors.cardIcon,
	},
	statusText: {
		...texts.cardLogoText,
		textAlign: 'center',
		color: colors.bodyText,
	},
	profileContainer: {
		flex: 5,
		marginLeft: metrics.regular,
	},
	profileContent: {
		marginTop: metrics.small,
	},
	title: {
		...texts.cardTitle,
		marginBottom: metrics.small,
		color: colors.bodyTitle,
	},
	fieldContainer: {
		flex: 1,
		flexDirection: 'row',
		marginBottom: metrics.small,
	},
	fieldIcon: {
		size: icons.small,
		color: colors.profileIcon
	},
	fieldText: {
		...texts.cardText,
		marginLeft: metrics.medium,
		color: colors.bodyText,
	},
	fieldTextAlt: {
		...texts.cardText,
		color: colors.bodyTextAlt,
	},
	paymentIcon: {
		size: icons.small,
		color: colors.statusSymbol,
	},
	paymentText: {
		...texts.cardStatus,
		textAlign: 'right',
		alignItems: 'flex-end',
		marginLeft: metrics.xsmall,
		color: colors.bodyText,
	},
	addressContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContents: 'space-between',
		marginTop: metrics.regular,
		borderTopWidth: StyleSheet.hairlineWidth,
		borderColor: colors.border,
		paddingTop: metrics.regular,
	},
	addressContent: {
		flex: 1,
		flexWrap: 'wrap',
		marginRight: metrics.medium,
	},
	buttonContainer: {
		textAlign: 'center',
		marginLeft: metrics.medium,
	},
	button: {
		backgroundColor: colors.primaryColor,
		size: icons.small,
		color: colors.button,
		paddingHorizontal: metrics.regular,
		borderRadius: metrics.large,
	},
	buttonText: {
		...texts.cardText,
		color: colors.button,
	}
};

export const callBtn = {
	container: {
		width: 130,
		flexDirection: 'row',
		marginBottom: metrics.small,
	},
	text: {
		...texts.cardStatus,
		marginLeft: metrics.medium,
		color: colors.profileIcon,
	}
}

export const mapScreen = {
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	mapContainer: {
		...StyleSheet.absoluteFillObject,
	},
	buttonContainer: {
		flexShrink: 1,
		flexDirection: 'row',
		justifyContents: 'flex-end',
		marginBottom: metrics.large,
		justifyContent: 'space-evenly',
		backgroundColor: 'transparent',
	},
	button: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: colors.primaryColor,
		paddingHorizontal: metrics.regular,
		paddingVertical: metrics.small,
		borderRadius: metrics.large,
	},
	buttonDisabled: {
		backgroundColor: colors.background,
		borderColor: colors.border,
		borderWidth: metrics.xsmall,
	},
	buttonText: {
		...texts.cardText,
		color: colors.button,
	},
	buttonDisabledText: {
		color: colors.bodyTextAlt,
	},
	loadingWrapper: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'center',
		alignItems: 'center',
	}
};