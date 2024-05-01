import { useEffect, useState, useRef } from "react";
import { View, Text, Button } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { Icons, RHFTextField, RHFPicker } from "../../components";

import React from "react";
import { StyleSheet } from "react-native";
import { AppointmentDataType, TypeAppointmentDataType } from "./types";
import globalStyles from "../../constants/globalStyles";
//import {userLogin} from '@app/redux/actions';
import { Picker, PickerModes, TextField } from "react-native-ui-lib";
import { PickerItemType } from "../../components/ui/types";
import { StoreRootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";

import { unwrapResult } from "@reduxjs/toolkit";
import {
  getAllApointmentAPIAction,
  getAllTypesApointmentAPIAction,
} from "../../store/appointment/actions";

const getListDateAppontment = () => {
  let listDate = [
    { id: "1", label: "01/05/2024" },
    { id: "2", label: "02/05/2024" },
    { id: "3", label: "03/05/2024" },
    { id: "4", label: "04/05/2024" },
    { id: "5", label: "05/05/2024" },
    { id: "6", label: "06/05/2024" },
  ];

  return listDate;
};

const getListTimeAppontment = () => {
  let listTime = [
    { id: "1", label: "10:00" },
    { id: "2", label: "11:00" },
    { id: "3", label: "12:00" },
    { id: "4", label: "13:00" },
    { id: "5", label: "14:00" },
    { id: "6", label: "15:00" },
  ];

  return listTime;
};

export default function Dates(): JSX.Element {
  const dispatch = useDispatch<any>();

  const [typesDogSelected, setTypesDogSelected] = useState<
    PickerItemType | undefined
  >();
  const [dateAppointmentSelected, setDateAppointmentSelected] = useState<
    PickerItemType | undefined
  >();
  const [timeAppointmentSelected, setTimeAppointmentSelected] = useState<
    PickerItemType | undefined
  >();

  const listAppointment = useSelector(
    (state: StoreRootState) => state?.appointment?.listAppointment ?? []
  );
  const listTypeAppointment = useSelector(
    (state: StoreRootState) => state?.appointment?.listTypeAppointment ?? []
  );

  const getListTypesDogs = () => {
    let listTypesDogs = [
      { id: "1", label: "Tipo 1", time: "10" },
      { id: "2", label: "Tipo 2", time: "15" },
      { id: "3", label: "Tipo 3", time: "20" },
      { id: "4", label: "Tipo 4", time: "25" },
      { id: "5", label: "Tipo 5", time: "30" },
      { id: "6", label: "Tipo 6", time: "35" },
    ];

    return listTypesDogs;
  };

  //const [listTypesDogs, setListTypesDogs] = useState<{ id: string; label: string; }[]>([]);
  const [listTypesDogs, setListTypesDogs] =
    useState<{ id: string; label: string }[]>(getListTypesDogs());
  const [listDayAvailable, setListDayAvailable] = useState<
    { id: string; label: string }[]
  >(getListDateAppontment());
  const [listTimesAvailable, setListTimesAvailable] = useState<
    { id: string; label: string }[]
  >(getListTimeAppontment());

  /*const getAllApointmentAPI = async () => {
    const action = getAllApointmentAPIAction();
    await dispatch(action);
  }*/

  const getAllApointmentAPI = async () => {
    try {
      const action = getAllApointmentAPIAction();
      const resultAction = dispatch(action);
      const result = unwrapResult(resultAction);
      console.log("- Resultado:", result);
    } catch (error) {
      console.error("Error durante la llamada a la API de citas:", error);
    }
  };

  const form = useForm<AppointmentDataType>();

  const onLoginPress = (formData: AppointmentDataType) => {
    /*console.log('FROM DATA');
    console.log('typesDogSelected:', typesDogSelected);
    console.log('dateAppointmentSelected:', dateAppointmentSelected);
    console.log('timeAppointmentSelected:', timeAppointmentSelected);
*/
    getAllApointmentAPI();
  };

  useEffect(() => {
    const action = getAllTypesApointmentAPIAction();
    const resultAction = dispatch(action);
    const result = unwrapResult(resultAction);
    console.log("- Type:", result);
  }, []);

  useEffect(() => {
    console.log("-listAppointment-");
    console.log(listAppointment);
    console.log("----------------");
  }, [listAppointment]);

  useEffect(() => {
    console.log("-listTypeAppointment-");
    console.log(listTypeAppointment);
    console.log("----------------");
        
    const appointmentArray: TypeAppointmentDataType[] = Object.values(listTypeAppointment);
    console.log(appointmentArray);

    for(let itemX of appointmentArray){
      console.log("----------------");
      console.log(itemX);
    }

  }, [listTypeAppointment]);

  const typeIcon = (
    <Icons
      iconSet="Feather"
      name="list"
      color="#000000"
      size={16}
      style={styles.inputLeftIcon}
    />
  );

  const dateIcon = (
    <Icons
      iconSet="AntDesign"
      name="calendar"
      color="#000000"
      size={16}
      style={styles.inputLeftIcon}
    />
  );

  const hourIcon = (
    <Icons
      iconSet="Ionicons"
      name="time-outline"
      color="#000000"
      size={16}
      style={styles.inputLeftIcon}
    />
  );

  const changeTypeDog = (selectedItem: PickerItemType) => {
    setTypesDogSelected(selectedItem);
  };

  const changeDateAppointment = (selectedItem: PickerItemType) => {
    setDateAppointmentSelected(selectedItem);
  };

  const changeTimeAppointment = (selectedItem: PickerItemType) => {
    setTimeAppointmentSelected(selectedItem);
  };

  return (
    <View style={styles?.containerBase}>
      <FormProvider {...form}>
        <RHFPicker
          name="selectTypeDog"
          placeholder="Select the type of dog"
          rules={{ required: "This field is required" }}
          optionList={listTypesDogs}
          value={typesDogSelected ? typesDogSelected.id : undefined} // Utilizar el valor seleccionado como el valor del campo
          onChange={(e: PickerItemType) => {
            changeTypeDog(e); // Actualizar el estado con el elemento seleccionado
          }}
          leadingAccessory={typeIcon}
        />

        {typesDogSelected ? (
          <Text>Tiempo estimado para esta cita: {typesDogSelected.time}</Text>
        ) : null}

        {typesDogSelected ? (
          <RHFPicker
            name="selectDateAppointment"
            placeholder="Select the date of the appointment"
            rules={{ required: "This field is required" }}
            optionList={listDayAvailable}
            value={
              dateAppointmentSelected ? dateAppointmentSelected.id : undefined
            } // Utilizar el valor seleccionado como el valor del campo
            onChange={(e: PickerItemType) => {
              changeDateAppointment(e); // Actualizar el estado con el elemento seleccionado
            }}
            leadingAccessory={dateIcon}
          />
        ) : null}

        {typesDogSelected && dateAppointmentSelected ? (
          <RHFPicker
            name="selectTimeAppointment"
            placeholder="Select appointment time"
            rules={{ required: "This field is required" }}
            optionList={listTimesAvailable}
            value={
              timeAppointmentSelected ? timeAppointmentSelected.id : undefined
            } // Utilizar el valor seleccionado como el valor del campo
            onChange={(e: PickerItemType) => {
              changeTimeAppointment(e); // Actualizar el estado con el elemento seleccionado
            }}
            leadingAccessory={hourIcon}
          />
        ) : null}
      </FormProvider>

      <Button
        title="Login"
        onPress={() => form?.handleSubmit(onLoginPress)()}
      />
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
