import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getAllApointmentAPIAction, getApointmentsWithFiltersAPIAction } from "../../store/appointment/actions";
import AppointmentItem from "../../components/ui/appointment_item";
import DatePicker from "../../components/ui/datepicker";
import { StoreRootState } from "../../store/store";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AppointmentDataType, BreedDataType } from "../types";
import { Icons } from "../../components";

const Dates = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const isFocused = useIsFocused();

  const form = useForm<any>();

  const [appointmentSelected, setAppointmentSelected] = useState<AppointmentDataType>();
  const [listAppointment, setListAppointment] = useState<AppointmentDataType[]>();
  const [listBreed, setListBreed] = useState<BreedDataType[]>();
  const [openAll, setOpenAll] = useState<boolean | undefined>(undefined);
  const [dateAppointmentSelected, setDateAppointmentSelected] = useState<Date | undefined>(new Date());

  const listBreedAPI = useSelector((state: StoreRootState) => state?.appointment?.listBreedAPI ?? []);
  const listAppointmentAPI = useSelector((state: StoreRootState) => state?.appointment?.listAppointmentAPI ?? []);

  useEffect(() => {
    //dispatch(getAllApointmentAPIAction());
  }, []);

  useEffect(() => {
    if (isFocused) {
      //dispatch(getAllApointmentAPIAction());
      dispatch(getApointmentsWithFiltersAPIAction(new Date().toISOString()));
      setDateAppointmentSelected(new Date());
    }
  }, [isFocused]);

  useEffect(() => {
    if (listAppointmentAPI != undefined && listAppointmentAPI.length != 0) {
      const appointmentList: AppointmentDataType[] = Object.values(listAppointmentAPI);
      setListAppointment(appointmentList);
    }
  }, [listAppointmentAPI]);

  useEffect(() => {
    if (listBreedAPI != undefined && listBreedAPI.length != 0) {
      const breedArray: BreedDataType[] = Object.values(listBreedAPI);
      setListBreed(breedArray);
    }
  }, [listBreedAPI]);

  const createNewAppointment = () => {
    navigation.navigate("appointment");
  };

  const expandAllAppointment = () => {
    setOpenAll(openAll === undefined || !openAll);
  };

  const changeDateAppointment = (selectedItem: Date) => {
    setDateAppointmentSelected(new Date(selectedItem));
    dispatch(getApointmentsWithFiltersAPIAction(new Date(selectedItem)?.toISOString()));
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <View style={styles.buttonContainer}>
          <Button title="CREATE NEW APPOINTMENT" onPress={createNewAppointment} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title={openAll ? "CLOSE ALL" : "OPEN ALL"} onPress={expandAllAppointment} />
        </View>
      </View>

      <View style={styles.centeredContainer}>
        <View style={styles.datePickerContainer}>
          <FormProvider {...form}>
            <Icons iconSet="AntDesign" name="caretleft" color="#000000" size={16} />
            <DatePicker
              name="dateAppointment"
              placeholder="Select the date to view appointments"
              label="Select the date to view appointments"
              value={dateAppointmentSelected}
              onChange={changeDateAppointment}
              mode="date"
            />
            <Icons iconSet="AntDesign" name="caretright" color="#000000" size={16} />
          </FormProvider>
        </View>
      </View>

      <FlatList
        data={listAppointment}
        renderItem={({ item }) => (
          <View style={styles.appointmentItemContainer}>
            <AppointmentItem appointment={item} type={item.type} user={item.user} listBreed={listBreed} valueOpenAll={openAll} />
          </View>
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 0.48,
  },
  centeredContainer: {
    alignItems: "center",
  },
  datePickerContainer: {
    marginBottom: 10,
    width: "50%",
  },
  flatListContent: {
    backgroundColor: "#ffffff", // Color de fondo blanco
  },
  appointmentItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 5,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#ffffff",
  },
});

export default Dates;
