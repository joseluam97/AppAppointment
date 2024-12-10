import * as React from "react";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Dialog, Portal, PaperProvider, Text, Paragraph } from "react-native-paper";
import { DateFormatter, format_time_appointment } from "../textFormatter";
import { StoreRootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { modalViewDetailsAppointmentVisibleAPIAction } from "../../store/modals/actions";
import { AppointmentDataType, BusinessDataType, CategoryDataType } from "../../screens/types";

const DetailsAppointment = () => {
  const dispatch = useDispatch<any>();

  const [appointmentSelected, setAppointmentSelected] = useState<AppointmentDataType[]>();
  const [listCategory, setListCategory] = useState<CategoryDataType[]>();

  const modalViewDetailsAppointmentAPI = useSelector((state: StoreRootState) => state?.modals?.modalViewDetailsAppointment ?? false);
  const modeViewDetailsAppointmentAPI = useSelector((state: StoreRootState) => state?.modals?.modeViewDetailsAppointment ?? false);
  const appointmentSelectedAPI = useSelector((state: StoreRootState) => state?.modals?.appointmentSelected ?? false);

  const listCategoryAPI = useSelector((state: StoreRootState) => state?.appointment?.listCategoryAPI ?? []);

  const hideDialog = () => {
    dispatch(modalViewDetailsAppointmentVisibleAPIAction({ isVisible: false}));
  };

  useEffect(() => {
    if(appointmentSelectedAPI != undefined){
      setAppointmentSelected(appointmentSelectedAPI);
    }
  }, [appointmentSelectedAPI]);
  
  useEffect(() => {
    if (listCategoryAPI != undefined && listCategoryAPI.length != 0) {
      const categoryArray: CategoryDataType[] = Object.values(listCategoryAPI);
      setListCategory(categoryArray);
    }
  }, [listCategoryAPI]);

  const formatIdCategoryToObject = (idCategory: string) => {
    if (listCategory != undefined) {
      let listCategoryAPI: CategoryDataType[] = listCategory;
      let categorySelected: CategoryDataType = listCategoryAPI.filter((elemento) => elemento._id == idCategory)[0];
      return categorySelected;
    }
  };
  
  return (
    <Dialog visible={modalViewDetailsAppointmentAPI == true} onDismiss={() => hideDialog} style={styles.container}>
      <Dialog.Title>Appointment details</Dialog.Title>
      <Dialog.Content>
        <Paragraph><Text style={styles.label}>Business:</Text> {appointmentSelected?.business?.name}</Paragraph>
        <Paragraph><Text style={styles.label}>Type:</Text> {appointmentSelected?.type?.title}</Paragraph>
        <Paragraph><Text style={styles.label}>Date:</Text> {DateFormatter(appointmentSelected?.date_appointment)}</Paragraph>
        <Paragraph><Text style={styles.label}>Time:</Text> {format_time_appointment(appointmentSelected)}</Paragraph>
        <Paragraph><Text style={styles.label}>Category:</Text> {formatIdCategoryToObject(appointmentSelected?.type?.category)?.name} </Paragraph>
        <Paragraph><Text style={styles.label}>Price:</Text> {appointmentSelected?.type?.price} €</Paragraph>
        <Paragraph><Text style={styles.label}>Completed:</Text> {appointmentSelected?.complete == true ? "Yes" : "No"}</Paragraph>
        <Paragraph><Text style={styles.label}>Approved:</Text> {appointmentSelected?.approved == true ? "Yes" : "No"}</Paragraph>
        <Paragraph><Text style={styles.label}>Description:</Text> {appointmentSelected?.description}</Paragraph>
        
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={hideDialog}>Cerrar</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    alignSelf: "center",
    padding: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  }
});

export default DetailsAppointment;
