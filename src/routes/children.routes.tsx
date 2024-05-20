import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

const CustomDrawerContent = (props) => {
  const [showSettingsOptions, setShowSettingsOptions] = useState(false);

  return (
    <DrawerContentScrollView {...props}>

      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate('home')}
      />

      <DrawerItem
        label="Settings"
        onPress={() => setShowSettingsOptions(!showSettingsOptions)}
      />
      {showSettingsOptions && (
        <View style={styles.subMenu}>
          <DrawerItem
            label="Categories"
            onPress={() => props.navigation.navigate('categories')}
          />
          <DrawerItem
            label="My clients"
            onPress={() => props.navigation.navigate('myClients')}
          />
          <DrawerItem
            label="My Business"
            onPress={() => props.navigation.navigate('myBusiness')}
          />
        </View>
      )}

      <DrawerItem
        label="Appointments"
        onPress={() => props.navigation.navigate('listAppointment')}
      />
      <DrawerItem
        label="Search Business"
        onPress={() => props.navigation.navigate('searchBusiness')}
      />
      <DrawerItem
        label="Log Out"
        onPress={() => props.navigation.navigate('logOut')}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  subMenu: {
    paddingLeft: 20,
  },
});

export default CustomDrawerContent;
