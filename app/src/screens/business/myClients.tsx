import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Card, IconButton, Menu, Provider as PaperProvider } from "react-native-paper";
import { getMyClientsAPIAction, setUserMyProfileAPIAction } from "../../store/user/actions";
import { StoreRootState } from "../../store/store";
import { createToast, getFullName, getLabelName } from "../../components/utils";
import { getApointmentsByUserAndBussinesAPIAction, getNextApointmentsByUserAndBussinesAPIAction } from "../../store/appointment/actions";
import { modalViewDetailsAppointmentVisibleAPIAction } from "../../store/modals/actions";
import DetailsAppointment from "../../components/modal/appointment/detailsAppointment";
import { UserDataType } from "../../models/user";
import { useIsFocused } from "@react-navigation/native";

export default function MyClients({ navigation }: any) {
  const dispatch = useDispatch<any>();
  const isFocused = useIsFocused();

  const [listMyClients, setListMyClients] = useState<UserDataType[]>();
  const [visibleMenuIndex, setVisibleMenuIndex] = useState<number | null>(null);

  const userData = useSelector((state: StoreRootState) => state?.user?.userData ?? undefined);
  const listMyClientsAPI = useSelector((state: StoreRootState) => state?.user?.listMyClients ?? undefined);
  const nextAppointmentByUser = useSelector((state: StoreRootState) => state?.appointment?.nextAppointmentByUserAPI ?? undefined);

  /*
    NAME: useEffect[isFocused]
    DESCRIPTION: When the screen loads
  */
  useEffect(() => {
    if (isFocused) {
      getMyClients();
    }
  }, [isFocused]);

  /*
    NAME: getMyClients
    DESCRIPTION: Get my clients in database
    IMPUT: None
    OUTPUT: None
  */
  const getMyClients = async () => {
    const resultAction = await dispatch(getMyClientsAPIAction(userData?.my_business?._id));

    if (getMyClientsAPIAction.fulfilled.match(resultAction)) {
      if (resultAction.payload != undefined && resultAction.payload.length != 0) {
        const listClients: UserDataType[] = Object.values(resultAction.payload);
        setListMyClients(listClients);
      }
    }
  }

  /*
    NAME: seeNextAppointment
    DESCRIPTION: Get the next appointment about a client
    IMPUT: clientSelected: UserDataType
    OUTPUT: None
  */
  const seeNextAppointment = async (clientSelected: UserDataType) => {
    setVisibleMenuIndex(null);
    const resultAction = await dispatch(
      getNextApointmentsByUserAndBussinesAPIAction({
        user_appointment: clientSelected,
        business_appointment: userData?.my_business._id,
      })
    );

    if (getNextApointmentsByUserAndBussinesAPIAction.fulfilled.match(resultAction)) {
      if (resultAction.payload != undefined) {
        if (resultAction.payload._id != undefined) {
          dispatch(modalViewDetailsAppointmentVisibleAPIAction(
            { isVisible: true, mode: "details", appointment: resultAction.payload }
          ));
        }
        else {
          createToast("No upcoming appointments found.");
        }
      }
    }
  }

  /*
    SECTION: Interaction with view
    DESCRIPTION: Methods for view logic
    LIST:
      - openMenu
      - closeMenu
      - selectedSubMenu
      - addNewAppointment
      - seeHistoryCliente
  */
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
    navigation.navigate("appointment", { fromRouter: 'MyClients', userRouter: clientSelected });
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
                    <Menu.Item onPress={() => { addNewAppointment(client) }} title="Add new appointment" />
                    <Menu.Item onPress={() => { seeNextAppointment(client) }} title="Check your next appointment" />
                    <Menu.Item onPress={() => { seeHistoryCliente(client) }} title="Ver historial" />
                    <Menu.Item onPress={() => { selectedSubMenu(client) }} title="Delete client" />
                  </Menu>
                </View>
              )}
            />
          </Card>
        ))}
        <DetailsAppointment />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    marginBottom: 10,
  },
});
