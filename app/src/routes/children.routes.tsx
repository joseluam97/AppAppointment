import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { StoreRootState } from '../store/store';
import { getFullName, getLabelName } from '../components/utils';
import { Avatar, Text } from 'react-native-paper';

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

<View style={styles.container}>
        {/* Avatar con iniciales */}
        <Avatar.Text
          size={64}
          label={userData?.first_name != null ? getLabelName(userData) : ""}
          style={styles.avatar}
        />
        {/* Nombre del usuario */}
        <Text variant="titleMedium" style={styles.name}>
          {userData?.first_name != null ? getFullName(userData) : "Login not completed"}
        </Text>
        {/* Email del usuario */}
        <Text variant="bodyMedium" style={styles.email}>
          {userData?.first_name != null ? userData?.email : ""}
        </Text>
      </View>

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

      {exitsBussines == true && (<DrawerItem
        label="Appointments"
        onPress={() => props.navigation.navigate('listAppointment')}
      />)}

      {exitsBussines == false && (<DrawerItem
        label="New Appointment"
        onPress={() => props.navigation.navigate('appointment')}
      />)}

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
  container: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f5f5f5', // Fondo claro para resaltar el cuadro
  },
  avatar: {
    marginBottom: 10,
    backgroundColor: '#6200ee', // Color de fondo del avatar (personalizable)
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  email: {
    color: '#666',
  },
});

export default CustomDrawerContent;
