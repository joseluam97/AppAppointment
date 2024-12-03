import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import { StoreRootState } from "../../store/store";
import { AppointmentDataType, UserDataType } from "../types";
import { getFullName, getLabelName } from "../../components/utils";
import Information from "./capabilities/information";
import AppointmentHistory from "./capabilities/appointment_history";
import UpcomingAppointment from "./capabilities/upcoming_appointment";
import Notes from "./capabilities/notes";
import { ScrollView, View, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Text, SegmentedButtons, BottomNavigation, Title, Paragraph } from "react-native-paper";
import { DateFormatter } from "../../components/textFormatter";
import DetailsAppointment from "../../components/modal/detailsAppointment";

export default function MyProfile({ navigation }: any) {
  const dispatch = useDispatch<any>();
  
  const [numAppointmentCompleted, setNumAppointmentCompleted] = useState<number>(0);
  const [userSelected, setUserSelected] = useState<UserDataType>(undefined);

  const userSelectedAPI = useSelector((state: StoreRootState) => state?.user?.userSelected ?? undefined);
  const listAppointmentByUserAPI = useSelector((state: StoreRootState) => state?.appointment?.listAppointmentByUserAPI ?? []);

  useEffect(() => {
    if (userSelectedAPI != undefined) {
      setUserSelected(userSelectedAPI);
    }
  }, [userSelectedAPI]);
  
  useEffect(() => {
    if (listAppointmentByUserAPI != undefined) {
      const appointmentList: AppointmentDataType[] = Object.values(listAppointmentByUserAPI);
      let numAppointmentCompleted = appointmentList?.filter(element => element.complete == true).length;
      setNumAppointmentCompleted(numAppointmentCompleted);
    }
  }, [listAppointmentByUserAPI]);

  const getBirthday = (date_birth: Date) => {
    if(date_birth != undefined && date_birth != null){
      const let_day_birth: Date = new Date(userSelected?.date_birth);
      return DateFormatter(let_day_birth.toISOString());
    }
    else{
      return ""
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Card style={styles.card}>
          <Card.Content>
            <View style={styles.header}>
              <Avatar.Text size={50} label={getLabelName(userSelected)} />
              <View style={styles.info}>
                <Title>{getFullName(userSelected)}</Title>
                <Text style={styles.email}>{userSelected?.email}</Text>
              </View>
            </View>
            <View style={styles.details}>
              <Paragraph><Text style={styles.label}>Birthdate: </Text> {getBirthday(userSelected?.date_birth)}</Paragraph>
              <Paragraph><Text style={styles.label}>Address: </Text> {userSelected?.address}</Paragraph>
              <Paragraph><Text style={styles.label}>Number of Appointments Completed: </Text> {numAppointmentCompleted}</Paragraph>
            </View>
          </Card.Content>
        </Card>

        <UpcomingAppointment />

      <DetailsAppointment />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    marginLeft: 15,
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  details: {
    marginTop: 15,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  }
});
