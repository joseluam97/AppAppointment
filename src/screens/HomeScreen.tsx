import { View, Text, Button } from 'react-native'
import { StatusBar } from 'expo-status-bar'

export default function HomeScreen({ navigation }: any) {

  function navToGallery() {
    navigation.navigate('gallery')
  }

  function navToAppointment() {
    navigation.navigate('appointment')
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <Button
        title='Go To Appointment'
        onPress={navToAppointment}
      />
      <StatusBar style='auto' />
    </View>
  )
}