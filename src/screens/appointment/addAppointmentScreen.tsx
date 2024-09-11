import { useEffect, useState, useRef } from "react";
import { View, Text, Button } from "react-native";
import { FormProvider, useController, useForm } from "react-hook-form";
import { Icons, RHFTextField, RHFPicker } from "../../components";

import React from "react";
import { StyleSheet } from "react-native";
import { AppointmentDataType, CategoryDataType, TimeAvailableForAppointment, SubCategoryDataType, UserDataType, BusinessDataType } from "../types";
import globalStyles from "../../constants/globalStyles";
//import {userLogin} from '@app/redux/actions';
import { PickerModes, PickerValue, TextField, DateTimePicker } from "react-native-ui-lib";
import { Picker } from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";
import { PickerItemType } from "../../components/ui/types";
import { StoreRootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";

import { useIsFocused } from "@react-navigation/native";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  getAllApointmentAPIAction,
  getAllTypesApointmentAPIAction,
  getAllCategoryAPIAction,
  getTypesApointmentByCategoryAPIAction,
  getTimeAvailableAppointmentAPIAction,
  postAppointmentAPIAction,
} from "../../store/appointment/actions";
import MyPicker from "../../components/ui/picker";
import DatePicker from "../../components/ui/datepicker";
import { formatTime, getFullName } from "../../components/utils";
import { getAllBusinessAPIAction } from "../../store/business/actions";
import { getMyClientsAPIAction } from "../../store/user/actions";

export default function Dates({ navigation }: any): JSX.Element {
  const dispatch = useDispatch<any>();
  const isFocused = useIsFocused();

  const [valorCadena, setValorCadena] = useState<any>("ferfe");
  const form = useForm<AppointmentDataType>();
  const { register, setValue, getValues } = useForm();

  // Category
  const [categorySelected, setCategorySelected] = useState<CategoryDataType>();
  const [listCategory, setListCategory] = useState<CategoryDataType[]>();

  // Type
  const [typeServiceSelected, seTypeServiceSelected] = useState<SubCategoryDataType>();
  const [listSubCategory, setListSubCategory] = useState<SubCategoryDataType[]>();

  // Date
  const [dateAppointmentSelected, setDateAppointmentSelected] = useState<Date | undefined>(new Date());

  // Time
  const [seeTime, setSeeTime] = useState<boolean>(false);
  const [timeAppointmentSelected, setTimeAppointmentSelected] = useState<string | undefined>();
  const [listTimesAvailable, setListTimesAvailable] = useState<TimeAvailableForAppointment[]>([]);

  // List Clients
  const [listMyClients, setListMyClients] = useState<UserDataType[]>();
  const [clientSelected, setClientSelected] = useState<UserDataType>();

  // List Bussiness
  const [listBusiness, setListBusiness] = useState<BusinessDataType[]>();
  const [businessSelected, setBusinessSelected] = useState<BusinessDataType>();

  // Type user
  const [exitsBussines, setExitsBussines] = React.useState<boolean>(false);

  // Selector
  const listCategoryAPI = useSelector((state: StoreRootState) => state?.appointment?.listCategoryAPI ?? []);
  const listSubCategoryAPI = useSelector((state: StoreRootState) => state?.appointment?.listSubCategoryAPI ?? []);
  const listTimeAppointmentAvailable = useSelector((state: StoreRootState) => state?.appointment?.listTimeAppointmentAvailable ?? []);
  const userData = useSelector((state: StoreRootState) => state?.user?.userData ?? undefined);
  const listMyClientsAPI = useSelector((state: StoreRootState) => state?.user?.listMyClients ?? undefined);
  const list_bussinesAPI = useSelector((state: StoreRootState) => state?.business?.list_bussines ?? []);

  const onSaveAppointmentPress = (formData: AppointmentDataType) => {
    if (typeServiceSelected != undefined && dateAppointmentSelected != undefined && timeAppointmentSelected != undefined) {
      let date_appointment: Date = new Date(dateAppointmentSelected);

      if (listTimesAvailable != undefined) {
        let elementoSelected: TimeAvailableForAppointment = listTimesAvailable?.filter((elemento) => elemento._id == timeAppointmentSelected)[0];
        if (elementoSelected != undefined) {
          date_appointment.setHours(new Date(elementoSelected?.time_available).getHours());
          date_appointment.setMinutes(new Date(elementoSelected?.time_available).getMinutes());
        }
      }

      // Create new appointment if you have bussines
      if (exitsBussines == true) {
        dispatch(
          postAppointmentAPIAction({
            business: userData?.my_business,
            user: clientSelected,
            type: typeServiceSelected,
            date_appointment: date_appointment,
            description: "Creada desde APP",
          })
        );

        // Redit to list appointment
        navigation.navigate("listAppointment");

      } else if (exitsBussines == false) {
        dispatch(
          postAppointmentAPIAction({
            business: businessSelected,
            user: userData?._id,
            type: typeServiceSelected,
            date_appointment: date_appointment,
            description: "Creada desde APP",
          })
        );

        // Redit to home
        navigation.navigate("home");
      }
    }
  };

  useEffect(() => {
    dispatch(getAllCategoryAPIAction());
  }, []);

  const checkDataUser = () => {
    if (userData != undefined) {
      if (userData?.my_business == undefined) {
        setExitsBussines(false);
      } else {
        setExitsBussines(true);
      }
    } else {
      setExitsBussines(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      // Clear form
      setCategorySelected(undefined);
      seTypeServiceSelected(undefined);
      setDateAppointmentSelected(new Date());
      setTimeAppointmentSelected(undefined);

      // Get all Category
      dispatch(getAllCategoryAPIAction());

      // Get list my bussines
      dispatch(getAllBusinessAPIAction());

      // Get list my clients if I have bussines
      dispatch(getMyClientsAPIAction(userData?.my_business?._id));

      // Check user
      checkDataUser();
    }
  }, [isFocused]);

  useEffect(() => {
    if (listMyClientsAPI != undefined) {
      let listClients: UserDataType[] = Object.values(listMyClientsAPI);
      setListMyClients(listClients);
    }
  }, [listMyClientsAPI]);

  useEffect(() => {
    if (list_bussinesAPI != undefined && list_bussinesAPI.length != 0) {
      const categoryArray: BusinessDataType[] = Object.values(list_bussinesAPI);
      setListBusiness(categoryArray);
    }
  }, [list_bussinesAPI]);

  // Set services in combo box
  useEffect(() => {
    if (listSubCategoryAPI != undefined && listSubCategoryAPI.length != 0) {
      const appointmentTypeArray: SubCategoryDataType[] = Object.values(listSubCategoryAPI);
      setListSubCategory(appointmentTypeArray);
    }
  }, [listSubCategoryAPI]);

  // Set services in combo box
  useEffect(() => {
    if (listCategoryAPI != undefined && listCategoryAPI.length != 0) {
      const categoryArray: CategoryDataType[] = Object.values(listCategoryAPI);
      setListCategory(categoryArray);
    }
  }, [listCategoryAPI]);

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
    if (categorySelected != undefined && typeServiceSelected != undefined && dateAppointmentSelected != undefined) {
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
  }, [categorySelected, typeServiceSelected, dateAppointmentSelected]);

  const changeCategory = (idSelected: any | undefined) => {
    if (listCategory != undefined) {
      let elementoSelected: CategoryDataType = listCategory?.filter((elemento) => elemento._id == idSelected)[0];
      if (elementoSelected != undefined) {
        setCategorySelected(idSelected);
        dispatch(getTypesApointmentByCategoryAPIAction(idSelected));
      }
    }
  };

  const changeTypeDog = (idSelected: any | undefined) => {
    if (listSubCategory != undefined) {
      let elementoSelected: SubCategoryDataType = listSubCategory?.filter((elemento) => elemento._id == idSelected)[0];
      if (elementoSelected != undefined) {
        seTypeServiceSelected(idSelected);
      }
    }
  };

  const changeDateAppointment = (selectedItem: Date) => {
    setDateAppointmentSelected(new Date(selectedItem));
  };

  const changeTimeAppointment = (selectedItem: string) => {
    setTimeAppointmentSelected(selectedItem);
  };

  return (
    <View style={styles?.containerBase}>
      <FormProvider {...form}>
        {exitsBussines == true ? (
          <MyPicker
            label="Select user:"
            selectedValue={clientSelected}
            onValueChange={(value) => setClientSelected(value)}
            options={listMyClients != undefined ? listMyClients : []}
            getValue={(option) => option?._id?.toString()}
            getLabel={(option) => getFullName(option)}
          />
        ) : null}

        {exitsBussines == false ? (
          <MyPicker
            label="Select business:"
            selectedValue={businessSelected}
            onValueChange={(value) => setBusinessSelected(value)}
            options={listBusiness != undefined ? listBusiness : []}
            getValue={(option) => option?._id?.toString()}
            getLabel={(option) => option?.name}
          />
        ) : null}

        <MyPicker
          label="Select your dog's category:"
          selectedValue={categorySelected}
          onValueChange={(value) => changeCategory(value)}
          options={listCategory != undefined ? listCategory : []}
          getValue={(option) => option?._id?.toString()}
          getLabel={(option) => option?.name}
        />

        {categorySelected != undefined ? (
          <MyPicker
            label="Select your type of appointment:"
            selectedValue={typeServiceSelected}
            onValueChange={(value) => changeTypeDog(value)}
            options={listSubCategory != undefined ? listSubCategory : []}
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

      <Button title="SAVE" onPress={() => form?.handleSubmit(onSaveAppointmentPress)()} />
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
