import React from "react";
import { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DurationFormatter, TimeFormatter } from "../textFormatter";
import { MaterialIcons } from "@expo/vector-icons";
import { AppointmentDataType, CategoryDataType } from "../../screens/types";
import { putAppointmentAPIAction, resetPutAppointment } from "../../store/appointment/actions";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "../../store/store";
import { createToast } from "../utils";
import { Button } from 'react-native-paper';

const AppointmentItem = ({ appointment, type, user, listCategory, valueOpenAll }) => {
  const dispatch = useDispatch<any>();
  const [showDetails, setShowDetails] = useState(false);
  
  const resultPutAppointment = useSelector((state: StoreRootState) => state?.appointment?.resultPut ?? undefined);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const formatIdCategoryToObject = (idCategory: string) => {
    if (listCategory != undefined) {
      let listCategoryAPI: CategoryDataType[] = listCategory;
      let categorySelected: CategoryDataType = listCategoryAPI.filter((elemento) => elemento._id == idCategory)[0];
      return categorySelected;
    }
  };

  const getTimeFinishAppointment = (start_date: Date, increment: number) => {
    let end_date: Date = new Date(start_date);
    end_date.setMinutes(end_date.getMinutes() + increment);

    return TimeFormatter(end_date?.toISOString());
  };

  const format_title_appointment = (appointment: AppointmentDataType) => {
    let date_appointment: string = "";
    if (appointment?.date_appointment != undefined) {
      date_appointment = TimeFormatter(appointment.date_appointment).toString() + " - " + getTimeFinishAppointment(appointment.date_appointment, type?.time).toString();
    }
    return date_appointment + " (" + appointment?.type?.title + ")";
  };

  const format_time_appointment = (appointment: AppointmentDataType) => {
    let date_appointment: string = "";
    if (appointment?.date_appointment != undefined) {
      date_appointment = TimeFormatter(appointment.date_appointment).toString() + " - " + getTimeFinishAppointment(appointment.date_appointment, type?.time).toString();
    }
    return date_appointment + " (" + type?.time + " minutes)";
  };

  useEffect(() => {
    console.log()
  }, [appointment, resultPutAppointment]);

  useEffect(() => {
    if (valueOpenAll == true) {
      setShowDetails(true);
    }
    if (valueOpenAll == false) {
      setShowDetails(false);
    }
  }, [valueOpenAll]);

  const changeStateAppointment = () => {
    updateAppointment(!appointment?.complete, appointment?.approved)
  };

  const changeApprovedAppointment = () => {
    updateAppointment(appointment?.complete, !appointment?.approved)
  };

  const updateAppointment = (complete: boolean, approved: boolean) => {
    dispatch(
      putAppointmentAPIAction({
        _id: appointment?._id,
        business: appointment?.business,
        user: appointment?.user._id,
        type: appointment?.type._id,
        date_appointment: appointment?.date_appointment,
        description: appointment?.description,
        complete: complete,
        approved: approved,
      })
    );
  };

  useEffect(() => {
    if (resultPutAppointment != undefined && resultPutAppointment == true) {
      // Create toast
      createToast("The appointment has successfully changed its status.");
    }
  }, [resultPutAppointment]);

  return (
    <>
      <TouchableOpacity onPress={toggleDetails} style={styles.container}>
        <TouchableOpacity onPress={toggleDetails} style={styles.header}>
          <Text style={styles.title}>{format_title_appointment(appointment)}</Text>
        </TouchableOpacity>
        {showDetails && (
          <View style={styles.details}>
            <View style={styles.row}>
              <MaterialIcons name="pets" size={20} color="#888" />
              <Text style={styles.text}>
                {" "}
                {formatIdCategoryToObject(type?.category)?.name} ({formatIdCategoryToObject(type?.category)?.weight} Kg)
              </Text>
            </View>
            <View style={styles.row}>
              <MaterialIcons name="schedule" size={20} color="#888" />
              <Text style={styles.text}> {format_time_appointment(appointment)}</Text>
            </View>
            <View style={styles.row}>
              <MaterialIcons name="euro" size={20} color="#888" />
              <Text style={styles.text}> {type?.price} €</Text>
            </View>
            <View style={styles.row}>
              <MaterialIcons name="description" size={20} color="#888" />
              <Text style={styles.text}> {appointment?.description}</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleDetails} style={styles.container}>
        <View style={styles.headerRight}>
          <MaterialIcons name="person" size={20} color="#888" />
          <Text style={styles.text}>
            {" "}
            {user?.first_name} {user?.last_name}
          </Text>
          <MaterialIcons name={showDetails ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="#888" />
        </View>

        <View style={styles.listActions}>
        {appointment.complete == true && <Button style={styles.buttonStyle} buttonColor="red" textColor="white" icon="check" mode="contained-tonal" onPress={changeStateAppointment}>
            Mark As Pending
          </Button>}

          {appointment.complete == false && <Button style={styles.buttonStyle} buttonColor="green" textColor="white" icon="check" mode="contained-tonal" onPress={changeStateAppointment}>
            Mark As Completed
          </Button>}

          {appointment.approved == false && <Button style={styles.buttonStyle} buttonColor="blue" textColor="white" icon="check" mode="contained-tonal" onPress={changeApprovedAppointment}>
            Approved
          </Button>}
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: "50%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    marginBottom: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginLeft: 5,
    color: "#444",
  },
  listActions: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  buttonStyle: {
    margin: "1%",
    width: "70%"
  },
});

export default AppointmentItem;
