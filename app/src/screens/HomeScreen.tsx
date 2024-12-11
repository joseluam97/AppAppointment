import { View, Text, Button, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "../store/store";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import io from 'socket.io-client';
import { URL_API } from "../constants/constant";

const socket = io(URL_API);

export default function HomeScreen({ navigation }: any) {
  const loggedin = useSelector((state: StoreRootState) => state?.user?.loggedin ?? undefined);
  const userData = useSelector((state: StoreRootState) => state?.user?.userData ?? undefined);
  const isFocused = useIsFocused();

  function navToGallery() {
    navigation.navigate("gallery");
  }

  function navToListAppointment() {
    navigation.navigate("listAppointment");
  }

  function navToAddAppointment() {
    navigation.navigate("appointment");
  }

  useEffect(() => {
    if (loggedin == undefined || loggedin == false || userData == undefined) {
      navigation.navigate("login");
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      if (loggedin == undefined || loggedin == false || userData == undefined) {
        navigation.navigate("login");
      }
    }
  }, [isFocused]);

  // EVENTOS DE EMISION Y RECEPCION
  useEffect(() => {
    // Escuchar mensajes del servidor
    socket.on('serverMessage', (message) => {
        console.log('Mensaje recibido del servidor:', message);
    });

    // Limpiar listeners al desmontar
    return () => {
        socket.off('serverMessage');
    };
}, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {userData?.first_name != null ?
        <>
          <Text> Inicio de Sesion de:</Text>
          <Text> Nombre: {userData?.first_name} {userData?.last_name}</Text>
          <Text> Email: {userData?.email}</Text>
        </> :
        <Text>
          Inicio de sesion no realizado
        </Text>}
      <Button title="List Appointment" onPress={navToListAppointment} />
      <Button title="Go Add Appointment" onPress={navToAddAppointment} />
      <StatusBar style="auto" />
    </View>
  );
}
