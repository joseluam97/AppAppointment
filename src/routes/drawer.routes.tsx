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
import { useSelector } from "react-redux";
import { StoreRootState } from "../store/store";
import CustomDrawerContent from "./children.routes";
import Categories from "../screens/appointment/categoriesScreeen";
import MyBusiness from "../screens/business/myBusiness";
import MyProfile from "../screens/user/myProfile";
import MyClients from "../screens/business/myClients";
import { IconButton } from "react-native-paper";

const Drawer = createDrawerNavigator();

export function DrawerRoutes() {
  const loggedin = useSelector((state: StoreRootState) => state?.user?.loggedin ?? undefined);
  const userData = useSelector((state: StoreRootState) => state?.user?.userData ?? undefined);

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
                <IconButton
                  icon="plus"
                  onPress={() => {
                    // Abre un menú o ejecuta una acción
                    navigation.navigate('appointment');
                  }}
                />
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
  );
}
