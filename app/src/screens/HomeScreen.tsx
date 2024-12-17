import { View, Button, TextInput, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "../store/store";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import { Avatar, Text } from 'react-native-paper';
import io from 'socket.io-client';
import { URL_API } from "../constants/constant";
import { getFullName, getLabelName } from "../components/utils";

const socket = io(URL_API);

export default function HomeScreen({ navigation }: any) {
  const loggedin = useSelector((state: StoreRootState) => state?.user?.loggedin ?? undefined);
  const userData = useSelector((state: StoreRootState) => state?.user?.userData ?? undefined);
  const isFocused = useIsFocused();

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
      <StatusBar style="auto" />
    </View>
  );
}

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
