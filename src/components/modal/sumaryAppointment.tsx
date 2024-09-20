import * as React from "react";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Dialog, Portal, PaperProvider, Text } from "react-native-paper";
import { DateFormatter } from "../textFormatter";
import { StoreRootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { modalViewSumaryAppointmentVisibleAPIAction } from "../../store/modals/actions";

const SumaryAppointment = ({dateAppointmentSelected, listAppointment}) => {
  const dispatch = useDispatch<any>();

    const [total_appointment, setTotal_appointment] = React.useState(0);
    const [total_pending_appointment, setTotal_pending_appointment] = React.useState(0);
    const [total_complete_appointment, setTotal_complete_appointment] = React.useState(0);
    const [total_pending_approved_appointment, setTotal_pending_approved_appointment] = React.useState(0);

    
  const modalViewSumaryAppointmentAPI = useSelector((state: StoreRootState) => state?.modals?.modalViewSumaryAppointment ?? undefined);

  const hideDialog = () => {
    dispatch(modalViewSumaryAppointmentVisibleAPIAction(false));
  }

  useEffect(() => {
    if (listAppointment != undefined && listAppointment.length != 0) {
        let total_appointment = listAppointment.length;
        setTotal_appointment(total_appointment);
        
        let total_pending_appointment: Number = listAppointment?.filter(element => element.complete == false).length;
        setTotal_pending_appointment(total_pending_appointment);
        
        let total_complete_appointment: Number = listAppointment?.filter(element => element.complete == true).length;
        setTotal_complete_appointment(total_complete_appointment);
        
        let total_pending_approved_appointment: Number = listAppointment?.filter(element => element.approved == false).length;
        setTotal_pending_approved_appointment(total_pending_approved_appointment);
    }
  }, [modalViewSumaryAppointmentAPI]);

  return (
    <Dialog visible={modalViewSumaryAppointmentAPI==true} onDismiss={hideDialog} style={styles.container}>
      <Dialog.Title>Summary of data for today's quotes: {DateFormatter(dateAppointmentSelected.toISOString())}</Dialog.Title>
      <Dialog.Content>
        <Text variant="titleMedium">Total number of appointments: {total_appointment}</Text>
        <Text variant="titleMedium">Pending appointments: {total_pending_appointment}</Text>
        <Text variant="titleMedium">Completed appointments: {total_complete_appointment}</Text>
        <Text variant="titleMedium">Appointments pending approval: {total_pending_approved_appointment}</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={hideDialog}>Cerrar</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
    container: {
        width: "60%",
        alignSelf: "center",
        padding: 10,
    }
  });

export default SumaryAppointment;
