import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getApointmentsWithFiltersAPIAction } from "../../store/appointment/actions";
import AppointmentItem from "../../components/ui/appointment_item";
import DatePicker from "../../components/ui/datepicker";
import { StoreRootState } from "../../store/store";
import { Icons } from "../../components";
import { Button, FAB, PaperProvider } from "react-native-paper";
import SumaryAppointment from "../../components/modal/appointment/sumaryAppointment";
import { URL_API } from "../../constants/constant";
import io from 'socket.io-client';
import { EVENT_DELETE_APPOINTMENT, EVENT_POST_APPOINTMENT, EVENT_PUT_APPOINTMENT } from "../../constants/list_events";
import { getCategoryByBusinessAPIAction } from "../../store/category/actions";
import { CategoryDataType } from "../../models/category";
import { AppointmentDataType } from "../../models/appointment";

const socket = io(URL_API);

const ListAppointment = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const isFocused = useIsFocused();

  const form = useForm<any>();

  const [listAppointment, setListAppointment] = useState<AppointmentDataType[]>();
  const [listCategory, setListCategory] = useState<CategoryDataType[]>();
  const [openAll, setOpenAll] = useState<boolean | undefined>(undefined);
  const [dateAppointmentSelected, setDateAppointmentSelected] = useState<Date | undefined>(new Date());
  const [seeAppointmentByFilters, setSeeAppointmentByFilters] = useState<boolean | undefined>(false);
  const [seeAppointmentByPendingApproved, setSeeAppointmentByPendingApproved] = useState<boolean | undefined>(false);

  const listAppointmentAPI = useSelector((state: StoreRootState) => state?.appointment?.listAppointmentAPI ?? []);
  const userData = useSelector((state: StoreRootState) => state?.user?.userData ?? undefined);

  /*
    NAME: useEffect[isFocused]
    DESCRIPTION: When the screen loads
  */
  useEffect(() => {
    if (isFocused) {
      getAppointmentToDisplay();
      getCategorysByBussines();
    }
  }, [isFocused]);

  /*
    NAME: useEffect[]
    DESCRIPTION: Event management with the backend
  */
  useEffect(() => {
    let dateToUpdate: Date = dateAppointmentSelected != undefined ? dateAppointmentSelected : new Date();
    // Suscribirse al evento de actualización de la base de datos
    socket.on(EVENT_POST_APPOINTMENT, (appointment) => {
      console.log('New post appointment:', appointment);
      getAppointmentsByDate(dateToUpdate);
    });

    socket.on(EVENT_PUT_APPOINTMENT, (appointment) => {
      console.log('New put appointment:', appointment);
      getAppointmentsByDate(dateToUpdate);
    });

    socket.on(EVENT_DELETE_APPOINTMENT, (appointment) => {
      console.log('New delete appointment:', appointment);
      getAppointmentsByDate(dateToUpdate);
    });

    // Limpiar listeners al desmontar
    return () => {
      socket.off(EVENT_POST_APPOINTMENT);
      socket.off(EVENT_PUT_APPOINTMENT);
      socket.off(EVENT_DELETE_APPOINTMENT);
    };
  }, []);

  /*
    NAME: getCategorysByBussines
    DESCRIPTION: Get the user's business categories
    IMPUT: None
    OUTPUT: None
  */
  const getCategorysByBussines = async () => {
    console.log("-getCategorysByBussines-")
    const resultAction = await dispatch(getCategoryByBusinessAPIAction(userData?.my_business?._id));

    if (getCategoryByBusinessAPIAction.fulfilled.match(resultAction)) {
      if (resultAction.payload != undefined && resultAction.payload.length != 0) {
        const categoryArray: CategoryDataType[] = Object.values(resultAction.payload);
        setListCategory(categoryArray);
      }
    }
  };

  /*
    NAME: getAppointmentToDisplay
    DESCRIPTION: Get information about appointments for the current day
    IMPUT: None
    OUTPUT: None
  */
  const getAppointmentToDisplay = async () => {
    console.log("-getAppointmentToDisplay-")
    const resultAction = await dispatch(
      getApointmentsWithFiltersAPIAction({
        business_appointment: userData?.my_business,
        date_selected: new Date().toISOString(),
      })
    );

    if (getApointmentsWithFiltersAPIAction.fulfilled.match(resultAction)) {
      setResultToAppointment(resultAction.payload);
    }
    setDateAppointmentSelected(new Date());
  };

  /*
    NAME: getAppointmentsByDate
    DESCRIPTION: Get information about appointments for a specific day 
    IMPUT: selectedItem: Date
    OUTPUT: None
  */
  const getAppointmentsByDate = async (selectedItem: Date) => {
    setDateAppointmentSelected(new Date(selectedItem));

    const resultAction = await dispatch(
      getApointmentsWithFiltersAPIAction({
        business_appointment: userData?.my_business,
        date_selected: new Date(selectedItem)?.toISOString(),
      })
    );

    if (getApointmentsWithFiltersAPIAction.fulfilled.match(resultAction)) {
      setResultToAppointment(resultAction.payload);
    }
  };

  /*
    NAME: setResultToAppointment
    DESCRIPTION: Assign the value obtained from the database query to our local variable for display
    IMPUT: payload: any
    OUTPUT: None
  */
  const setResultToAppointment = async (payload: any) => {
    if (payload != undefined && payload.length != 0) {
      const appointmentList: AppointmentDataType[] = Object.values(payload);
      setListAppointment(appointmentList);
    }
    else {
      setListAppointment([]);
    }
  }

  /*
    SECTION: Interaction with view
    DESCRIPTION: Methods for view logic
    LIST:
      - expandAllAppointment
      - filterByCompleteOrNot
      - filterByPendingApproved
      - previusDay
      - nextDay
  */
  const expandAllAppointment = () => {
    setOpenAll(openAll === undefined || !openAll);
  };

  const filterByCompleteOrNot = () => {
    if (!seeAppointmentByFilters == true) {
      const appointmentList: AppointmentDataType[] = Object.values(listAppointmentAPI);
      const listAppointmentFilter: AppointmentDataType[] = appointmentList?.filter((element) => element.complete != true);
      setListAppointment(listAppointmentFilter);
    } else {
      const appointmentList: AppointmentDataType[] = Object.values(listAppointmentAPI);
      setListAppointment(appointmentList);
    }
    setSeeAppointmentByFilters(!seeAppointmentByFilters);
    setSeeAppointmentByPendingApproved(false);
  };

  const filterByPendingApproved = () => {
    if (!seeAppointmentByPendingApproved == true) {
      const appointmentList: AppointmentDataType[] = Object.values(listAppointmentAPI);
      const listAppointmentFilter: AppointmentDataType[] = appointmentList?.filter((element) => element.approved != true);
      setListAppointment(listAppointmentFilter);
    } else {
      const appointmentList: AppointmentDataType[] = Object.values(listAppointmentAPI);
      setListAppointment(appointmentList);
    }
    setSeeAppointmentByPendingApproved(!seeAppointmentByPendingApproved);
    setSeeAppointmentByFilters(false);
  };

  const previusDay = () => {
    let date_previus: Date = dateAppointmentSelected;
    date_previus.setDate(date_previus.getDate() - 1);

    getAppointmentsByDate(new Date(date_previus));
  };

  const nextDay = () => {
    let date_previus: Date = dateAppointmentSelected;
    date_previus.setDate(date_previus.getDate() + 1);

    getAppointmentsByDate(new Date(date_previus));
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.buttonRow}>
          <View style={styles.buttonContainer1}>
            <Button mode="outlined" onPress={expandAllAppointment}>
              {openAll ? "CONTRACT ALL" : "EXPAND ALL"}
            </Button>
          </View>
        </View>
        <View style={styles.buttonRow}>
          <View style={styles.buttonContainer2}>
            <Button mode="outlined" onPress={filterByCompleteOrNot}>
              Completed: {seeAppointmentByFilters ? "YES" : "NO"}
            </Button>
          </View>
          <View style={styles.buttonContainer2}>
            <Button mode="outlined" onPress={filterByPendingApproved}>
              Approved: {seeAppointmentByPendingApproved ? "YES" : "NO"}
            </Button>

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
                  onChange={getAppointmentsByDate}
                  mode="date"
                />
              </View>
              <TouchableOpacity onPress={nextDay} style={styles.widthIcons}>
                <Icons iconSet="AntDesign" name="caretright" color="#000000" size={16} />
              </TouchableOpacity>
            </View>
          </FormProvider>
        </View>

        {listAppointment?.length != 0 ?
          <Text>Total appointment: {listAppointment?.length}</Text> : undefined}

        {listAppointment?.length != 0 ? (
          <FlatList
            data={listAppointment}
            renderItem={({ item }) => (
              <View style={styles.appointmentItemContainer}>
                <AppointmentItem appointment={item} type={item.type} user={item.user} listCategory={listCategory} valueOpenAll={openAll} />
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

        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => {
            navigation.navigate("appointment", { fromRouter: 'ListAppointment' });
          }}
        />
        <SumaryAppointment dateAppointmentSelected={dateAppointmentSelected} listAppointment={listAppointment} />
      </View>
    </PaperProvider>
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
  buttonContainer1: {
    flex: 1,
  },
  buttonContainer2: {
    flex: 0.5,
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
    padding: 20,
  },
  widthSelector: {
    width: "50%",
    alignItems: "center",
  },
  containerWarning: {
    marginTop: 20,
    alignItems: "center",
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 100,
  },
});

export default ListAppointment;
