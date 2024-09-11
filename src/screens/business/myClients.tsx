import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import { StoreRootState } from "../../store/store";
import { getMyClientsAPIAction } from "../../store/user/actions";
import { Avatar, Button, Card, IconButton, Text } from "react-native-paper";
import { UserDataType } from "../types";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function MyClients({ navigation }: any) {
  const dispatch = useDispatch<any>();
  const isFocused = useIsFocused();

  const [listMyClients, setListMyClients] = useState<UserDataType[]>();

  const userData = useSelector((state: StoreRootState) => state?.user?.userData ?? undefined);
  const listMyClientsAPI = useSelector((state: StoreRootState) => state?.user?.listMyClients ?? undefined);

  useEffect(() => {
    if (isFocused) {
      dispatch(getMyClientsAPIAction(userData?.my_business?._id));
    }
  }, [isFocused]);

  useEffect(() => {
    if(listMyClientsAPI != undefined){
      let listClients: UserDataType[] = Object.values(listMyClientsAPI);
      setListMyClients(listClients)
    }
  }, [listMyClientsAPI]);

  const getFullName = (client: UserDataType) => {
    return client.first_name + " " + client.last_name;
  }

  const getLabelName = (client: UserDataType) => {
    if(client.first_name.indexOf(" ") == -1){
      return client.first_name[0] + "" + client.last_name[0];
    }
    else{
      let array_name = client.first_name.split(" ");
      if(array_name.length == 2){
        return array_name[0][0] + "" + array_name[1][0];
      }
      else{
        return client.first_name[0];
      }
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {listMyClients?.map((client, index) => (
        <Card key={index} style={styles.containerCard}>
          <Card.Title
            title={getFullName(client)}
            subtitle={client.email}
            left={(props) => <Avatar.Text size={40} label={getLabelName(client)} />}
            right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
          />
        </Card>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    marginBottom: 10,
  },
  
});