import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Card, IconButton, Menu, Provider as PaperProvider } from "react-native-paper";
import { getMyClientsAPIAction, setUserMyProfileAPIAction } from "../../store/user/actions";
import { StoreRootState } from "../../store/store";
import { UserDataType } from "../types";
import { getFullName, getLabelName } from "../../components/utils";
import { getApointmentsByUserAndBussinesAPIAction } from "../../store/appointment/actions";

export default function MyClients({ navigation }: any) {
  const dispatch = useDispatch<any>();
  const [listMyClients, setListMyClients] = useState<UserDataType[]>();
  const [visibleMenuIndex, setVisibleMenuIndex] = useState<number | null>(null);

  const userData = useSelector((state: StoreRootState) => state?.user?.userData ?? undefined);
  const listMyClientsAPI = useSelector((state: StoreRootState) => state?.user?.listMyClients ?? undefined);

  useEffect(() => {
    dispatch(getMyClientsAPIAction(userData?.my_business?._id));
  }, []);

  useEffect(() => {
    if (listMyClientsAPI != undefined) {
      let listClients: UserDataType[] = Object.values(listMyClientsAPI);
      setListMyClients(listClients);
    }
  }, [listMyClientsAPI]);

  const openMenu = (index: number) => {
    setVisibleMenuIndex(index);
  };

  const closeMenu = () => {
    setVisibleMenuIndex(null);
  };

  const selectedSubMenu = (clientSelected: UserDataType) => {
    setVisibleMenuIndex(null);
  }

  const addNewAppointment = (clientSelected: UserDataType) => {
    navigation.navigate("appointment", { fromRouter: 'MyClients', userRouter: clientSelected});
  }
  
  const seeHistoryCliente = (clientSelected: UserDataType) => {
    setVisibleMenuIndex(null);
    dispatch(setUserMyProfileAPIAction(clientSelected));

    dispatch(
      getApointmentsByUserAndBussinesAPIAction({
        user_appointment: clientSelected,
        business_appointment: clientSelected?.my_business,
      })
    );

    navigation.navigate('myProfile');
  }

  return (
    <PaperProvider>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {listMyClients?.map((client, index) => (
          <Card key={index} style={styles.containerCard} onPress={() => seeHistoryCliente(client)}>
            <Card.Title
              title={getFullName(client)}
              subtitle={client.email}
              left={(props) => <Avatar.Text size={40} label={getLabelName(client)} />}
              right={(props) => (
                <View>
                  <Menu
                    visible={visibleMenuIndex === index}
                    onDismiss={closeMenu}
                    anchor={
                      <IconButton
                        {...props}
                        icon="dots-vertical"
                        onPress={() => openMenu(index)}
                      />
                    }
                    style={{ marginTop: -40 }} // Ajuste de la posición vertical
                  >
                    <Menu.Item onPress={() => {addNewAppointment(client)}} title="Add new appointment" />
                    <Menu.Item onPress={() => {selectedSubMenu(client)}} title="Check your next appointment" />
                    <Menu.Item onPress={() => {seeHistoryCliente(client)}} title="Ver historial" />
                    <Menu.Item onPress={() => {selectedSubMenu(client)}} title="Delete client" />
                  </Menu>
                </View>
              )}
            />
          </Card>
        ))}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    marginBottom: 10,
  },
});
