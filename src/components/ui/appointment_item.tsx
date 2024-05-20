import React from "react";
import { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DurationFormatter, TimeFormatter } from "../textFormatter";
import { MaterialIcons } from "@expo/vector-icons";
import { AppointmentDataType, BreedDataType } from "../../screens/types";

const AppointmentItem = ({ appointment, type, user, listBreed, valueOpenAll }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const formatIdBreedToObject = (idBreed: string) => {
    if (listBreed != undefined) {
      let listBreedAPI: BreedDataType[] = listBreed;
      let breedSelected: BreedDataType = listBreedAPI.filter((elemento) => elemento._id == idBreed)[0];
      return breedSelected;
    }
  };

  const getTimeFinishAppointment = (start_date: Date, increment: number) => {
    let end_date: Date = new Date(start_date);
    end_date.setMinutes(end_date.getMinutes() + increment);

    return TimeFormatter(end_date?.toISOString());
  };

  const format_title_appointment = (appointment: AppointmentDataType) =>{
    let date_appointment: string = "";
    if(appointment?.date_appointment != undefined){
      date_appointment = TimeFormatter(appointment.date_appointment).toString() + " - " + getTimeFinishAppointment(appointment.date_appointment, type?.time).toString();
    }
    return date_appointment + " (" + appointment?.type?.title + ")";
  }

  const format_time_appointment = (appointment: AppointmentDataType) =>{
    let date_appointment: string = "";
    if(appointment?.date_appointment != undefined){
      date_appointment = TimeFormatter(appointment.date_appointment).toString() + " - " + getTimeFinishAppointment(appointment.date_appointment, type?.time).toString();
    }
    return date_appointment + " (" + type?.time + " minutes)";
  }

  useEffect(() => {
    if(valueOpenAll == true){
      setShowDetails(true);
    }
    if(valueOpenAll == false){
      setShowDetails(false);
    }
  }, [valueOpenAll]);

  return (
    <>
      <TouchableOpacity onPress={toggleDetails} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{format_title_appointment(appointment)}</Text>
          <MaterialIcons name={showDetails ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="#888" />
        </View>
        {showDetails && (
          <View style={styles.details}>
            <View style={styles.row}>
              <MaterialIcons name="pets" size={20} color="#888" />
              <Text style={styles.text}> {formatIdBreedToObject(type?.breed)?.name} ({formatIdBreedToObject(type?.breed)?.weight} Kg)</Text>
            </View>
            <View style={styles.row}>
              <MaterialIcons name="schedule" size={20} color="#888" />
              <Text style={styles.text}>
                {" "}
                {format_time_appointment(appointment)}
              </Text>
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
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    //borderBottomWidth: 0,
    //borderBottomColor: "#ccc",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "flex-start",
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
});

export default AppointmentItem;
