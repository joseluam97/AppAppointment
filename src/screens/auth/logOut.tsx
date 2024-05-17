import { View, Text, Button, ActivityIndicator, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import { StoreRootState } from "../../store/store";
import { logUserAPIAction } from "../../store/user/actions";

export default function LogOut({ navigation }: any): JSX.Element {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const loggedin = useSelector((state: StoreRootState) => state?.user?.loggedin ?? undefined);

  useEffect(() => {
    if (isFocused) {
      dispatch(logUserAPIAction());
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      if (loggedin == undefined) {
        reditToLogin();
      }
    }
  }, [loggedin]);

  const reditToLogin = () => {
    const delay = 2000; // 2 segundos en milisegundos

    const timer = setTimeout(() => {
      // Esta función se ejecutará después de 2 segundos
      navigation.navigate('login')
    }, delay);

    // Es importante limpiar el temporizador para evitar fugas de memoria
    return () => clearTimeout(timer);
  };

  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size={60} color="#0000ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
