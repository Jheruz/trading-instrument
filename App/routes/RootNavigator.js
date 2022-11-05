import { createStackNavigator } from '@react-navigation/stack'

// import ConsentForm from '../screens/consent-form'
import TradingHome from '../screens/trading-home'
import TradingDetails from '../screens/trading-details'

// import BottomTabNavigator from './BottomTabNavigator'
import routeList from './list'

const Stack = createStackNavigator()

export default function () {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routeList.HOME} component={TradingHome} />
      <Stack.Screen name={routeList.TRADING_DETAILS} component={TradingDetails} />
      {/* <Stack.Screen name={routeList.HOME} component={BottomTabNavigator} />
      <Stack.Screen name={routeList.CONSENT_FORM} component={ConsentForm} /> */}
    </Stack.Navigator>
  )
}
