import { createStackNavigator } from '@react-navigation/stack'

const { Screen, Navigator } = createStackNavigator()

import HomeScreen from '../screens/HomeScreen'
import GalleryScreen from '../screens/GalleryScreen'
import AppointmentScreen from '../screens/dates/dates'

export function StackRoutes() {
  return (
    <Navigator>
      <Screen
        name='home'
        component={HomeScreen}
        options={{
          title: 'Main Menu',
          headerTintColor: 'blue'
        }}
      />

      <Screen
        name='gallery'
        component={GalleryScreen}
      />

      <Screen
        name='appointment'
        component={AppointmentScreen}
      />
    </Navigator>
  )
}