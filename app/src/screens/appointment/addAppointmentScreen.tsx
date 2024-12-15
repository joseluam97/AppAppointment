import { useEffect, useState, useRef } from "react";
import { View, Text, Button } from "react-native";
import { FormProvider, useForm } from "react-hook-form";

import React from "react";
import { StyleSheet } from "react-native";
import globalStyles from "../../constants/globalStyles";
import { StoreRootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";

import { useIsFocused } from "@react-navigation/native";
import {
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
import { AppointmentDataType } from "../../models/appointment";
import { BusinessDataType } from "../../models/business";
import { CategoryDataType, SubCategoryDataType, TimeAvailableForAppointment } from "../../models/category";
import { UserDataType } from "../../models/user";

export default function Dates({ navigation, route }: any): JSX.Element {
  const { fromRouter } = route.params || {};
  const { userRouter } = route.params || {};

  const dispatch = useDispatch<any>();
  const isFocused = useIsFocused();

  const form = useForm<AppointmentDataType>();

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
  const [clientBlocked, setClientBlocked] = useState<boolean>(false);
  // List Bussiness
  const [listBusiness, setListBusiness] = useState<BusinessDataType[]>();
  const [businessSelected, setBusinessSelected] = useState<BusinessDataType>();
  // Type user
  const [exitsBussines, setExitsBussines] = React.useState<boolean>(false);
  // Selector
  const listTimeAppointmentAvailable = useSelector((state: StoreRootState) => state?.appointment?.listTimeAppointmentAvailable ?? []);
  const userData = useSelector((state: StoreRootState) => state?.user?.userData ?? undefined);

  /*
    NAME: useEffect[isFocused]
    DESCRIPTION: When the screen loads, all the data necessary to manage this window is obtained.
  */
  useEffect(() => {
    if (isFocused) {
      // Clear form
      setCategorySelected(undefined);
      seTypeServiceSelected(undefined);
      setDateAppointmentSelected(new Date());
      setTimeAppointmentSelected(undefined);

      // Get data
      getAllCategory();
      getAllBusiness();
      getMyClientsByBussines();

      // Check user
      checkDataUser();

      // Get from previous tab
      if (fromRouter) {
        if (fromRouter == "MyClients") {
          setClientBlocked(true);
          setClientSelected(userRouter._id);
        } else {
          setClientBlocked(false);
        }
      } else {
        setClientBlocked(false);
      }
    }
  }, [isFocused]);
  
  /*
    NAME: useEffect[categorySelected, typeServiceSelected, dateAppointmentSelected]
    DESCRIPTION: When you select the category, appointment type and date, the available slots for this appointment are searched for.
  */
  useEffect(() => {
    if (categorySelected != undefined && typeServiceSelected != undefined && dateAppointmentSelected != undefined) {
      setSeeTime(true);
      getTimeAvailableAppointment();
    } else {
      setSeeTime(false);
    }
  }, [categorySelected, typeServiceSelected, dateAppointmentSelected]);
  
  /*
    NAME: getTimeAvailableAppointment
    DESCRIPTION: When you select the category, appointment type and date, the available slots for this appointment are searched for.
    IMPUT: None
    OUTPUT: None
  */
  const getTimeAvailableAppointment = async () => {
    const resultAction = await dispatch(
      getTimeAvailableAppointmentAPIAction({
        date_appointment_selected: dateAppointmentSelected?.toISOString(),
        id_type_appointment: typeServiceSelected,
      })
    );

    if (getTimeAvailableAppointmentAPIAction.fulfilled.match(resultAction)) {
      if (resultAction.payload != undefined && resultAction.payload.length != 0) {
        try {
          const listTimesAppointment: TimeAvailableForAppointment[] = Object.values(resultAction.payload);
          setListTimesAvailable(listTimesAppointment);
        } catch (error) {
          let itemTimeAppointment: TimeAvailableForAppointment = Object(resultAction.payload);
          let listTimesAppointment: TimeAvailableForAppointment[];
          listTimesAppointment.push(itemTimeAppointment);
          setListTimesAvailable(listTimesAppointment);
        }
      }
    }
  };

  /*
    NAME: getAllCategory
    DESCRIPTION: Get all categories
    IMPUT: None
    OUTPUT: None
  */
  const getAllCategory = async () => {
    const resultAction = await dispatch(getAllCategoryAPIAction());

    if (getAllCategoryAPIAction.fulfilled.match(resultAction)) {
      if (resultAction.payload != undefined) {
        const categoryArray: CategoryDataType[] = Object.values(resultAction.payload);
        setListCategory(categoryArray);
      }
    }
  };

  /*
    NAME: getAllBusiness
    DESCRIPTION: Get all bussines
    IMPUT: None
    OUTPUT: None
  */
  const getAllBusiness = async () => {
    const resultAction = await dispatch(getAllBusinessAPIAction());

    if (getAllBusinessAPIAction.fulfilled.match(resultAction)) {
      if (resultAction.payload != undefined) {
        const bussinesArray: BusinessDataType[] = Object.values(resultAction.payload);
        setListBusiness(bussinesArray);
      }
    }
  };

  /*
    NAME: getMyClientsByBussines
    DESCRIPTION: Get all the clients of my business
    IMPUT: None
    OUTPUT: None
  */
  const getMyClientsByBussines = async () => {
    const resultAction = await dispatch(getMyClientsAPIAction(userData?.my_business?._id));

    if (getMyClientsAPIAction.fulfilled.match(resultAction)) {
      if (resultAction.payload != undefined) {
        const listClients: UserDataType[] = Object.values(resultAction.payload);
        setListMyClients(listClients);
      }
    }
  };

  /*
    NAME: onSaveAppointmentPress
    DESCRIPTION: Save a new appointment
    IMPUT: formData: AppointmentDataType
    OUTPUT: None
  */
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
            complete: false,
            approved: true,
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
            complete: false,
            approved: false,
          })
        );

        // Redit to home
        navigation.navigate("home");
      }
    }
  };

  /*
    NAME: checkDataUser
    DESCRIPTION: Check if the current user has a business
    IMPUT: None
    OUTPUT: None
  */
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

  /*
    SECTION: Interaction with view
    DESCRIPTION: Methods for view logic
    LIST:
      - changeCategory
      - changeTypeDog
  */

  const changeCategory = async (idSelected: any | undefined) => {
    if (listCategory != undefined) {
      let elementoSelected: CategoryDataType = listCategory?.filter((elemento) => elemento._id == idSelected)[0];
      if (elementoSelected != undefined) {
        setCategorySelected(idSelected);
        const resultAction = await dispatch(getTypesApointmentByCategoryAPIAction(idSelected));

        if (getTypesApointmentByCategoryAPIAction.fulfilled.match(resultAction)) {
          if (resultAction.payload != undefined) {
            const appointmentTypeArray: SubCategoryDataType[] = Object.values(resultAction.payload);
            setListSubCategory(appointmentTypeArray);
          }
        }

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
            editable={!clientBlocked}
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
          onChange={(value) => setDateAppointmentSelected(new Date(value))}
          mode="date"
        />

        {seeTime == true ? (
          <MyPicker
            label="Select appointment time:"
            selectedValue={timeAppointmentSelected}
            onValueChange={(value) => setTimeAppointmentSelected(value)}
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
