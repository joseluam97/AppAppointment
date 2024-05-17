import { useEffect, useState, useRef } from "react";
import { View, Text, Button } from "react-native";
import { FormProvider, useController, useForm } from "react-hook-form";
import { Icons, RHFTextField, RHFPicker } from "../../components";

import React from "react";
import { StyleSheet } from "react-native";
import { AppointmentDataType, BreedDataType, TimeAvailableForAppointment, TypeAppointmentDataType } from "../types";
import globalStyles from "../../constants/globalStyles";
//import {userLogin} from '@app/redux/actions';
import { PickerModes, PickerValue, TextField, DateTimePicker } from "react-native-ui-lib";
import { Picker } from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";
import { PickerItemType } from "../../components/ui/types";
import { StoreRootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";

import { useIsFocused } from '@react-navigation/native';
import { unwrapResult } from "@reduxjs/toolkit";
import {
  getAllApointmentAPIAction,
  getAllTypesApointmentAPIAction,
  getAllBreedAPIAction,
  getTypesApointmentByBreedAPIAction,
  getTimeAvailableAppointmentAPIAction,
  postAppointmentAPIAction
} from "../../store/appointment/actions";
import MyPicker from "../../components/ui/picker";
import DatePicker from "../../components/ui/datepicker";

export default function Dates({ navigation }: any): JSX.Element {
  const dispatch = useDispatch<any>();
  const isFocused = useIsFocused();

  const [valorCadena, setValorCadena] = useState<any>("ferfe");
  const form = useForm<AppointmentDataType>();
  const { register, setValue, getValues } = useForm();

  // Breed
  const [breedSelected, setBreedSelected] = useState<BreedDataType>();
  const [listBreed, setListBreed] = useState<BreedDataType[]>();

  // Type
  const [typeServiceSelected, seTypeServiceSelected] = useState<TypeAppointmentDataType>();
  const [listTypeAppointment, setListTypeAppointment] = useState<TypeAppointmentDataType[]>();

  // Date
  const [dateAppointmentSelected, setDateAppointmentSelected] = useState<Date | undefined>(new Date());

  // Time
  const [seeTime, setSeeTime] = useState<boolean>(false);
  const [timeAppointmentSelected, setTimeAppointmentSelected] = useState<string | undefined>();
  const [listTimesAvailable, setListTimesAvailable] = useState<TimeAvailableForAppointment[]>([]);

  // Selector
  const listBreedAPI = useSelector((state: StoreRootState) => state?.appointment?.listBreedAPI ?? []);
  const listTypeAppointmentAPI = useSelector((state: StoreRootState) => state?.appointment?.listTypeAppointmentAPI ?? []);
  const listTimeAppointmentAvailable = useSelector((state: StoreRootState) => state?.appointment?.listTimeAppointmentAvailable ?? []);

  const onLoginPress = (formData: AppointmentDataType) => {
    console.log("FROM SENT - INI");

    if (typeServiceSelected != undefined && dateAppointmentSelected != undefined && timeAppointmentSelected != undefined) {
      let date_appointment: Date = new Date(dateAppointmentSelected);

      if (listTimesAvailable != undefined) {
        let elementoSelected: TimeAvailableForAppointment = listTimesAvailable?.filter((elemento) => elemento._id == timeAppointmentSelected)[0];
        if (elementoSelected != undefined) {
          date_appointment.setHours(new Date(elementoSelected?.time_available).getHours());
          date_appointment.setMinutes(new Date(elementoSelected?.time_available).getMinutes());
        }
      }

      // Create new appointment
      dispatch(
        postAppointmentAPIAction({
          user: "66321510acbe27394c1d7d61",
          type: typeServiceSelected,
          date_appointment: date_appointment,
          description: "Creada desde APP",
        })
      );

      // Redit to list appointment
      navigation.navigate('listAppointment')
      
    }

    console.log("FROM SENT - END");
  };

  useEffect(() => {
    dispatch(getAllBreedAPIAction());
  }, []);

  useEffect(() => {
    if (isFocused) {
      // Clear form
      setBreedSelected(undefined);
      seTypeServiceSelected(undefined);
      setDateAppointmentSelected(new Date());
      setTimeAppointmentSelected(undefined);

      // Get all Breed
      dispatch(getAllBreedAPIAction());
    }
  }, [isFocused]);

  // Set services in combo box
  useEffect(() => {
    if (listTypeAppointmentAPI != undefined && listTypeAppointmentAPI.length != 0) {
      const appointmentTypeArray: TypeAppointmentDataType[] = Object.values(listTypeAppointmentAPI);
      setListTypeAppointment(appointmentTypeArray);
    }
  }, [listTypeAppointmentAPI]);

  // Set services in combo box
  useEffect(() => {
    if (listBreedAPI != undefined && listBreedAPI.length != 0) {
      const breedArray: BreedDataType[] = Object.values(listBreedAPI);
      setListBreed(breedArray);
    }
  }, [listBreedAPI]);

  // Set times in combo box
  useEffect(() => {
    if (listTimeAppointmentAvailable != undefined && listTimeAppointmentAvailable.length != 0) {
      try {
        const listTimesAppointment: TimeAvailableForAppointment[] = Object.values(listTimeAppointmentAvailable);
        setListTimesAvailable(listTimesAppointment);
      } catch (error) {
        let itemTimeAppointment: TimeAvailableForAppointment = Object.values(listTimeAppointmentAvailable);
        let listTimesAppointment: TimeAvailableForAppointment[];
        listTimesAppointment.push(itemTimeAppointment);
        setListTimesAvailable(listTimesAppointment);
      }
    }
  }, [listTimeAppointmentAvailable]);

  useEffect(() => {
    if (breedSelected != undefined && typeServiceSelected != undefined && dateAppointmentSelected != undefined) {
      setSeeTime(true);
      dispatch(
        getTimeAvailableAppointmentAPIAction({
          date_appointment_selected: dateAppointmentSelected?.toISOString(),
          id_type_appointment: typeServiceSelected,
        })
      );
    } else {
      setSeeTime(false);
    }
  }, [breedSelected, typeServiceSelected, dateAppointmentSelected]);

  const typeIcon = <Icons iconSet="Feather" name="list" color="#000000" size={16} style={styles.inputLeftIcon} />;
  const dateIcon = <Icons iconSet="AntDesign" name="calendar" color="#000000" size={16} style={styles.inputLeftIcon} />;
  const hourIcon = <Icons iconSet="Ionicons" name="time-outline" color="#000000" size={16} style={styles.inputLeftIcon} />;
  const dollarIcon = <Icons iconSet="MaterialIcons" name="attach-money" color="#000000" size={16} style={styles.inputLeftIcon} />;

  const changeBreed = (idSelected: any | undefined) => {
    console.log("changeBreed - INI");
    console.log(idSelected);
    if (listBreed != undefined) {
      let elementoSelected: BreedDataType = listBreed?.filter((elemento) => elemento._id == idSelected)[0];
      if (elementoSelected != undefined) {
        setBreedSelected(idSelected);
        dispatch(getTypesApointmentByBreedAPIAction(idSelected));
      }
    }
    console.log("changeBreed - END");
  };

  const changeTypeDog = (idSelected: any | undefined) => {
    console.log("changeTypeDog - INI");
    console.log(idSelected);
    if (listTypeAppointment != undefined) {
      let elementoSelected: TypeAppointmentDataType = listTypeAppointment?.filter((elemento) => elemento._id == idSelected)[0];
      if (elementoSelected != undefined) {
        seTypeServiceSelected(idSelected);
      }
    }
    console.log("changeTypeDog - END");
  };

  const changeDateAppointment = (selectedItem: Date) => {
    console.log("changeDateAppointment - INI");
    console.log(selectedItem);
    setDateAppointmentSelected(new Date(selectedItem));
    console.log("changeDateAppointment - END");
  };

  const changeTimeAppointment = (selectedItem: string) => {
    setTimeAppointmentSelected(selectedItem);
  };

  const formatTime = (dateInt: any) => {
    const fecha = new Date(dateInt);

    // Obtener la hora y los minutos
    const horas = fecha.getHours().toString().padStart(2, "0");
    const minutos = fecha.getMinutes().toString().padStart(2, "0");

    // Formatear la hora y los minutos como una cadena
    const horaFormateada = `${horas}:${minutos}`;

    return horaFormateada;
  };

  return (
    <View style={styles?.containerBase}>
      <FormProvider {...form}>
        <MyPicker
          label="Select your dog's breed:"
          selectedValue={breedSelected}
          onValueChange={(value) => changeBreed(value)}
          options={listBreed != undefined ? listBreed : []}
          getValue={(option) => option?._id?.toString()}
          getLabel={(option) => option?.name}
        />

        {breedSelected != undefined ? (
          <MyPicker
            label="Select your type of appointment:"
            selectedValue={typeServiceSelected}
            onValueChange={(value) => changeTypeDog(value)}
            options={listTypeAppointment != undefined ? listTypeAppointment : []}
            getValue={(option) => option?._id?.toString()}
            getLabel={(option) => option?.title + " - " + option?.price + " €"}
          />
        ) : null}

        <DatePicker
          name="dateAppointment"
          placeholder="Select the date of the appointment"
          label="Select the date of the appointment"
          rules={{ required: "Enter date please!" }}
          value={dateAppointmentSelected}
          onChange={changeDateAppointment}
          mode="date"
        />

        {seeTime == true ? (
          <MyPicker
            label="Select appointment time:"
            selectedValue={timeAppointmentSelected}
            onValueChange={(value) => changeTimeAppointment(value)}
            options={listTimesAvailable != undefined && listTimesAvailable?.length != 0 ? listTimesAvailable : []}
            getValue={(option) => option?._id}
            getLabel={(option) => formatTime(option?.time_available)}
          />
        ) : null}

      </FormProvider>

      <Button title="SAVE" onPress={() => form?.handleSubmit(onLoginPress)()} />
    </View>
  );
}

const styles: any = StyleSheet.flatten([
  globalStyles,
  StyleSheet.create({
    inputLeftIcon: {
      marginRight: 8,
    },
  }),
]);
