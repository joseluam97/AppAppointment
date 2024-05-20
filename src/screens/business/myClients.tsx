import { View, Text, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";

export default function MyClients({ navigation }: any) {

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Text>MyClients</Text>
    </View>
  );
}