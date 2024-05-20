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

const Drawer = createDrawerNavigator();

export function DrawerRoutes() {
  const loggedin = useSelector((state: StoreRootState) => state?.user?.loggedin ?? undefined);
  const userData = useSelector((state: StoreRootState) => state?.user?.userData ?? undefined);

  const [rootFalse, setRootFalse] = React.useState<boolean>(false);
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
      
      <Drawer.Screen 
        name="appointment" 
        component={AddApointmentScreen} 
      />
          
      {exitsLogin ? (
        <>
          <Drawer.Screen 
            name="home" 
            component={HomeScreen} 
          />

          <Drawer.Screen 
            name="settings"
            component={HomeScreen}
          />
          
          <Drawer.Screen 
            name="categories"
            component={Categories}
          />
          
          <Drawer.Screen 
            name="myClients"
            component={MyClients}
          />

          <Drawer.Screen 
            name="myBusiness"
            component={MyBusiness}
          />

          <Drawer.Screen 
            name="myProfile" 
            component={MyProfile} 
          />

          <Drawer.Screen 
            name="listAppointment" 
            component={ListAppointmentScreen} 
          />

          {!exitsBussines ? (
            <Drawer.Screen 
              name="createBusiness" 
              component={CreateBusiness} 
              options={{ title: "Add your business" }} 
            />
          ) : (
            <Drawer.Screen 
              name="createBusiness" 
              component={CreateBusiness} 
              options={{ title: "Modify your business" }}
            />
          )}
          <Drawer.Screen 
            name="searchBusiness" 
            component={ListBusiness} 
          />
          <Drawer.Screen 
            name="logOut" 
            component={LogOut} 
          />
        </>
      ) : (
        <Drawer.Screen 
          name="login" 
          component={LoginScreen} 
        />
      )}
    </Drawer.Navigator>
  );
}
