import { createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import DeliveryListScreen from '../screens/DeliveryListScreen';
import DeliveryDetailsScreen from '../screens/DeliveryDetailsScreen';
import DestinationMapScreen from '../screens/DestinationMapScreen';
import UserSignatureScreen from "../screens/UserSignatureScreen";
import LoginScreen from '../screens/LoginScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import {nav} from '../ui/theme/appStyle';

const AppStack = createStackNavigator(
  {
    Home: DeliveryListScreen,
    Details: DeliveryDetailsScreen,
    Map: DestinationMapScreen,
    Signature: UserSignatureScreen,
  },
  {
    defaultNavigationOptions: {
      initialRouteName: 'Home',
      headerStyle: nav.headerStyle,
      headerTintColor: '#FFFFFF', //back button and Title text color
      headerTitleStyle: nav.headerTitle,
    },
  }
);

const AuthStack = createStackNavigator({ Login: LoginScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));