import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { StoreRootState } from "../../store/store";
import { PaperProvider, SegmentedButtons } from "react-native-paper";
import AppointmentItem from "../../components/ui/appointment_item";
import { useIsFocused } from "@react-navigation/native";
import { getAllCategoryAPIAction } from "../../store/appointment/actions";
import AppointmentTable from "../../components/ui/appointment_table";
import { AppointmentDataType } from "../../models/appointment";
import { CategoryDataType } from "../../models/category";
import React from "react";

export default function UpcomingAppointment({ navigation }: any) {
  const dispatch = useDispatch<any>();
  const isFocused = useIsFocused();

  const [valueSelectorView, setValueSelectorView] = useState("table");
  const [listAppointment, setListAppointment] = useState<AppointmentDataType[]>();
  const [listCategory, setListCategory] = useState<CategoryDataType[]>();

  const listAppointmentByUserAPI = useSelector((state: StoreRootState) => state?.appointment?.listAppointmentByUserAPI ?? []);
  const listCategoryAPI = useSelector((state: StoreRootState) => state?.appointment?.listCategoryAPI ?? []);

  /*
    NAME: useEffect[isFocused]
    DESCRIPTION: When the screen loads
  */
  useEffect(() => {
    if(isFocused){
      dispatch(getAllCategoryAPIAction());
    }
  }, [isFocused]);

  /*
    NAME: useEffect[listAppointmentByUserAPI]
    DESCRIPTION: When the vector is updated the method is executed
  */
  useEffect(() => {
    if (listAppointmentByUserAPI != undefined && listAppointmentByUserAPI.length != 0) {
      const appointmentList: AppointmentDataType[] = Object.values(listAppointmentByUserAPI);
      setListAppointment(appointmentList);
    }
  }, [listAppointmentByUserAPI]);

  /*
    NAME: useEffect[listCategoryAPI]
    DESCRIPTION: When the vector is updated the method is executed
  */
  useEffect(() => {
    if (listCategoryAPI != undefined && listCategoryAPI.length != 0) {
      const categoryArray: CategoryDataType[] = Object.values(listCategoryAPI);
      setListCategory(categoryArray);
    }
  }, [listCategoryAPI]);

  return (
    <PaperProvider>
      <View style={styles.container}>
        {listAppointment?.length != 0 ?
          <>
            <SafeAreaView style={styles.container}>
              <SegmentedButtons
                value={valueSelectorView}
                onValueChange={setValueSelectorView}
                buttons={[
                  { value: "table", label: "Table" },
                  { value: "details", label: "Details" },
                ]}
              />
            </SafeAreaView>

            {valueSelectorView == "table" ? (
              <AppointmentTable listAppointment={listAppointment} listCategory={listCategory} />
            ) : null}

            {valueSelectorView == "details" ?
              <FlatList
                data={listAppointment}
                renderItem={({ item }) => (
                  <View style={styles.appointmentItemContainer}>
                    <AppointmentItem key={item._id} appointment={item} type={item.type} user={item.user} listCategory={listCategory} valueOpenAll={true} enableActions={false} />
                  </View>
                )}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.flatListContent}
              />
            : null}
          </>
          :
          <View style={styles.containerWarning}>
            <Text>No appointments found for this user.</Text>
          </View>}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
  flatListContent: {
    backgroundColor: "#ffffff", // Color de fondo blanco
  },
  containerWarning: {
    marginTop: 20,
    alignItems: "center",
  },
});
