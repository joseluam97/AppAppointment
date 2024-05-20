import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getAllApointmentAPIAction, getApointmentsWithFiltersAPIAction } from "../../store/appointment/actions";
import AppointmentItem from "../../components/ui/appointment_item";
import DatePicker from "../../components/ui/datepicker";
import { StoreRootState } from "../../store/store";
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
  const userData = useSelector((state: StoreRootState) => state?.user?.userData ?? undefined);

  useEffect(() => {
    //dispatch(getAllApointmentAPIAction());
  }, []);

  useEffect(() => {
    if (isFocused) {
      dispatch(getApointmentsWithFiltersAPIAction({
        business_appointment: userData?.my_business, 
        date_selected: new Date().toISOString()
      }));
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
    console.log(userData?.my_business)
    console.log(new Date(selectedItem)?.toISOString())

    dispatch(getApointmentsWithFiltersAPIAction({
      business_appointment: userData?.my_business, 
      date_selected: new Date(selectedItem)?.toISOString()
    }));
  };

  const previusDay = () => {
    let date_previus: Date = dateAppointmentSelected;
    date_previus.setDate(date_previus.getDate() - 1);

    changeDateAppointment(new Date(date_previus));
  };
  
  const nextDay = () => {
    let date_previus: Date = dateAppointmentSelected;
    date_previus.setDate(date_previus.getDate() + 1);

    changeDateAppointment(new Date(date_previus));
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
        <FormProvider {...form}>
          <View style={styles.content}>
            <TouchableOpacity onPress={previusDay} style={styles.widthIcons}>
              <Icons iconSet="AntDesign" name="caretleft" color="#000000" size={16} />
            </TouchableOpacity>
            <View style={styles.widthSelector}>
              <DatePicker
                name="dateAppointment"
                placeholder="Select the date to view appointments"
                label="Select the date to view appointments"
                value={dateAppointmentSelected}
                onChange={changeDateAppointment}
                mode="date"
              />
            </View>
            <TouchableOpacity onPress={nextDay} style={styles.widthIcons}>
              <Icons iconSet="AntDesign" name="caretright" color="#000000" size={16} />
            </TouchableOpacity>
          </View>
        </FormProvider>
      </View>

      {listAppointment?.length != 0 ? (
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
      ) : (
        <View style={styles.containerWarning}>
          <Text>No appointments were found for this day.</Text>
        </View>
      )}
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
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  widthIcons: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center", // Centrar verticalmente
    padding: 20
  },
  widthSelector: {
    width: "50%",
    alignItems: "center",
  },
  containerWarning: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default Dates;
