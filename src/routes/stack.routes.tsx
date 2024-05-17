import { createStackNavigator } from '@react-navigation/stack'

const { Screen, Navigator } = createStackNavigator()

import HomeScreen from '../screens/HomeScreen'
import AppointmentScreen from '../screens/appointment/addAppointmentScreen'
import ListAppointmentScreen from '../screens/listAppointmentScreen'

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
        name='appointment'
        component={AppointmentScreen}
      />
      <Screen
        name='listAppointment'
        component={ListAppointmentScreen}
      />
    </Navigator>
  )
}