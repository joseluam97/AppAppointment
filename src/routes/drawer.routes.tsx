import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/auth/login";
import AddApointmentScreen from "../screens/appointment/addAppointmentScreen";
import ListAppointmentScreen from "../screens/appointment/listAppointmentScreen";
import LogOut from "../screens/auth/logOut";
import CreateBusiness from "../screens/business/createBusiness";
import ListBusiness from "../screens/business/listBusinessScreen";
import Home1 from "../screens/appointment/listAppointmentScreen";
import Home2 from "../screens/appointment/listAppointmentScreen";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "../store/store";
import CustomDrawerContent from "./children.routes";
import Categories from "../screens/appointment/categoriesScreeen";
import MyBusiness from "../screens/business/myBusiness";
import MyProfile from "../screens/user/myProfile";
import MyClients from "../screens/business/myClients";
import { View, StyleSheet } from "react-native";
import { Avatar, Card, IconButton, Menu, Provider as PaperProvider } from "react-native-paper";
import { modalViewSumaryAppointmentCreateCategoryVisibleAPIAction } from "../store/modals/actions";
import { useNavigation } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

export function DrawerRoutes() {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation();
  
  const loggedin = useSelector((state: StoreRootState) => state?.user?.loggedin ?? undefined);
  const userData = useSelector((state: StoreRootState) => state?.user?.userData ?? undefined);

  const [exitsLogin, setExitsLogin] = React.useState<boolean>(false);
  const [exitsBussines, setExitsBussines] = React.useState<boolean>(false);

  const [visibleMenuIndex, setVisibleMenuIndex] = React.useState<boolean>(false);

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

  const openMenu = () => {
    setVisibleMenuIndex(true);
  };

  const closeMenu = () => {
    setVisibleMenuIndex(false);
  };

  const createNewAppointment = () => {
    setVisibleMenuIndex(false);
    navigation.navigate('appointment');
  }
  const seeDailySummary = () => {
    setVisibleMenuIndex(false);
    dispatch(modalViewSumaryAppointmentCreateCategoryVisibleAPIAction(true));
  }

  return (
    <PaperProvider>
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      {exitsLogin ? (
        <>
          <Drawer.Screen name="appointment" component={AddApointmentScreen} options={{ title: "Appointment" }} />
          <Drawer.Screen name="home" component={HomeScreen} options={{ title: "Home" }} />
          <Drawer.Screen name="settings" component={HomeScreen} options={{ title: "Settings" }} />
          <Drawer.Screen name="categories" component={Categories} options={{ title: "Categories" }} />
          <Drawer.Screen name="myClients" component={MyClients} options={{ title: "My Clients" }} />
          <Drawer.Screen name="myProfile" component={MyProfile} options={{ title: "My Profile" }} />

          <Drawer.Screen 
            name="listAppointment" 
            component={ListAppointmentScreen} 
            options={({ navigation }) => ({
              title: "List Appointment",
              headerRight: () => (
                  <Menu
                    visible={visibleMenuIndex}
                    onDismiss={closeMenu}
                    anchor={
                      <IconButton
                        icon="dots-vertical"
                        onPress={() => openMenu()}
                      />
                    }
                    style={{ marginTop: -40 }} // Ajuste de la posición vertical
                  >
                    <Menu.Item onPress={() => {createNewAppointment()}} title="Create new appointment" />
                    <Menu.Item onPress={() => {seeDailySummary()}} title="See daily summary" />
                  </Menu>
              ),
            })}
          />

          <Drawer.Screen name="createBusiness" component={CreateBusiness} options={{ title: "Create your business" }} />
          <Drawer.Screen name="myBusiness" component={MyBusiness} options={{ title: "my Business" }} />
          <Drawer.Screen name="searchBusiness" component={ListBusiness} options={{ title: "Search Business" }} />
          <Drawer.Screen name="logOut" component={LogOut} options={{ title: "Log Out" }} />
        </>
      ) : (
        <Drawer.Screen name="login" component={LoginScreen} />
      )}
    </Drawer.Navigator>
    </PaperProvider>
  );
}
