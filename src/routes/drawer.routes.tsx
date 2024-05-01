import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from '../screens/HomeScreen'
import GalleryScreen from '../screens/GalleryScreen'
import LoginScreen from '../screens/login/login'
import DatesScreen from '../screens/dates/dates'

const { Navigator, Screen } = createDrawerNavigator()

export function DrawerRoutes() {
  return (
    <Navigator>
      <Screen
        name='home1'
        component={HomeScreen}
      />
      <Screen
        name='gallery'
        component={GalleryScreen}
      />
      <Screen
        name='login'
        component={LoginScreen}
      />
      <Screen
        name='appointment'
        component={DatesScreen}
      />
    </Navigator>
  )
}