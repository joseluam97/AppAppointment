import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { StoreRootState } from '../store/store';

const CustomDrawerContent = (props) => {

  const loggedin = useSelector((state: StoreRootState) => state?.user?.loggedin ?? undefined);
  const userData = useSelector((state: StoreRootState) => state?.user?.userData ?? undefined);

  const [showSettingsOptions, setShowSettingsOptions] = useState(false);
  const [exitsLogin, setExitsLogin] = React.useState<boolean>(false);
  const [exitsBussines, setExitsBussines] = React.useState<boolean>(false);

  const checkDataUser = () => {
    if (userData != undefined) {
      if (userData?.my_business == undefined) {
        setExitsBussines(false);
      } else {
        setExitsBussines(true);
      }
    } else {
      setExitsBussines(false);
    }
  };
  
  React.useEffect(() => {
    if (loggedin != undefined) {
      setExitsLogin(true);
      checkDataUser();
    } else {
      setExitsLogin(false);
    }
  }, [loggedin]);

  React.useEffect(() => {
    if (loggedin != undefined) {
      setExitsLogin(true);
      checkDataUser();
    } else {
      setExitsLogin(false);
    }
  }, []);
  
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
          
          {!exitsBussines && (<DrawerItem
            label="Add your business"
            onPress={() => props.navigation.navigate('createBusiness')}
          />
          )}

          {exitsBussines && (<DrawerItem
            label="My Business"
            onPress={() => props.navigation.navigate('myBusiness')}
          />
          )}
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
