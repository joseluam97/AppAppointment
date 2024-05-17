import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from '../screens/HomeScreen'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const { Navigator, Screen } = createBottomTabNavigator()

export function BottomTabsRoutes() {
  return (
    <Navigator>
      <Screen
        name='home'
        component={HomeScreen}
        options={{
          title: 'Main',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='home'
              color='red'
              size={size}
            />
          )
        }}
      />
    </Navigator>
  )
}