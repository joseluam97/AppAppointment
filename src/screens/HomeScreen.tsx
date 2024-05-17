import { View, Text, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "../store/store";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";

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
    if(loggedin == undefined || loggedin == false || userData == undefined){
      navigation.navigate("login");
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      if(loggedin == undefined || loggedin == false || userData == undefined){
        navigation.navigate("login");
      }
    }
  }, [isFocused]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Button title="List Appointment" onPress={navToListAppointment} />
      <Button title="Go Add Appointment" onPress={navToAddAppointment} />
      <StatusBar style="auto" />
    </View>
  );
}
