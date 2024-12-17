import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import { StoreRootState } from "../../store/store";
import { getFullName, getLabelName } from "../../components/utils";
import UpcomingAppointment from "./upcoming_appointment";
import { ScrollView, View, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Text, SegmentedButtons, BottomNavigation, Title, Paragraph } from "react-native-paper";
import { DateFormatter } from "../../components/textFormatter";
import DetailsAppointment from "../../components/modal/appointment/detailsAppointment";
import { AppointmentDataType } from "../../models/appointment";
import { UserDataType } from "../../models/user";

export default function MyProfile({ navigation, route }: any) {
  const { userRouter } = route.params || {};
  
  const [numAppointmentCompleted, setNumAppointmentCompleted] = useState<number>(0);
  const listAppointmentByUserAPI = useSelector((state: StoreRootState) => state?.appointment?.listAppointmentByUserAPI ?? []);
  
  /*
    NAME: useEffect[listAppointmentByUserAPI]
    DESCRIPTION: When the vector is updated the method is executed
  */
  useEffect(() => {
    if (listAppointmentByUserAPI != undefined) {
      const appointmentList: AppointmentDataType[] = Object.values(listAppointmentByUserAPI);
      let numAppointmentCompleted = appointmentList?.filter(element => element.complete == true).length;
      setNumAppointmentCompleted(numAppointmentCompleted);
    }
  }, [listAppointmentByUserAPI]);

  /*
    NAME: getBirthday
    DESCRIPTION: From a date you get a string
    IMPUT: date_birth: Date
    OUTPUT: None
  */
  const getBirthday = (date_birth: Date) => {
    if(userRouter != undefined && date_birth != undefined && date_birth != null){
      const let_day_birth: Date = new Date(userRouter?.date_birth);
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
              <Avatar.Text size={50} label={getLabelName(userRouter)} />
              <View style={styles.info}>
                <Title>{getFullName(userRouter)}</Title>
                <Text style={styles.email}>{userRouter?.email}</Text>
              </View>
            </View>
            <View style={styles.details}>
              <Paragraph><Text style={styles.label}>Birthdate: </Text> {getBirthday(userRouter?.date_birth)}</Paragraph>
              <Paragraph><Text style={styles.label}>Address: </Text> {userRouter?.address}</Paragraph>
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
