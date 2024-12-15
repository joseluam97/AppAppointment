import React from "react";
import { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DateFormatter, DurationFormatter, format_time_appointment, TimeFormatter } from "../textFormatter";
import { MaterialIcons } from "@expo/vector-icons";
import { putAppointmentAPIAction, resetPutAppointment } from "../../store/appointment/actions";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "../../store/store";
import { createToast } from "../utils";
import { Button, DataTable, TextInput } from "react-native-paper";
import { modalViewDetailsAppointmentVisibleAPIAction } from "../../store/modals/actions";
import DetailsAppointment from "../modal/appointment/detailsAppointment";
import { AppointmentDataType } from "../../models/appointment";
import { CategoryDataType } from "../../models/category";

const AppointmentTable = ({ listAppointment, listCategory }) => {
  const dispatch = useDispatch<any>();

  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([10, 25, 50]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);

  const [sortDirection, setSortDirection] = useState<"ascending" | "descending" | undefined>(undefined);
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>(""); // Para filtrar por categoría o tipo

  const [filteredAppointments, setFilteredAppointments] = useState<AppointmentDataType[]>();

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, listAppointment?.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const resultPutAppointment = useSelector((state: StoreRootState) => state?.appointment?.resultPut ?? undefined);

  const toggleDetails = (appointmentSelected: CategoryDataType) => {
    dispatch(modalViewDetailsAppointmentVisibleAPIAction({ isVisible: true, mode: "details", appointment: appointmentSelected }));
  };

  const formatIdCategoryToObject = (idCategory: string) => {
    if (listCategory != undefined) {
      let listCategoryAPI: CategoryDataType[] = listCategory;
      let categorySelected: CategoryDataType = listCategoryAPI.filter((elemento) => elemento._id == idCategory)[0];
      return categorySelected;
    }
  };

  useEffect(() => {
    if (listAppointment != undefined) {
      setFilteredAppointments(listAppointment);
    }
  }, [listAppointment]);

  const handleSort = (column: string) => {
    const newSortDirection = sortedColumn === column && sortDirection === "ascending" ? "descending" : "ascending";
    setSortedColumn(column);
    setSortDirection(newSortDirection);

    const sortedList = [...filteredAppointments].sort((a, b) => {
      if (newSortDirection === "ascending") {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });

    setFilteredAppointments(sortedList);
  };

  useEffect(() => {
    if (resultPutAppointment != undefined && resultPutAppointment == true) {
      createToast("The appointment has successfully changed its status.");
    }
  }, [resultPutAppointment]);

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title sortDirection={sortedColumn === "type" ? sortDirection : undefined} onPress={() => handleSort("type")} style={{ flex: 3 }}>
            Type
          </DataTable.Title>
          <DataTable.Title sortDirection={sortedColumn === "date_appointment" ? sortDirection : undefined} onPress={() => handleSort("date_appointment")} style={{ flex: 3 }}>
            Date
          </DataTable.Title>
          <DataTable.Title sortDirection={sortedColumn === "time" ? sortDirection : undefined} onPress={() => handleSort("time")} style={{ flex: 6 }}>
            Time
          </DataTable.Title>
          <DataTable.Title sortDirection={sortedColumn === "category" ? sortDirection : undefined} onPress={() => handleSort("category")} style={{ flex: 2 }}>
            Category
          </DataTable.Title>
          <DataTable.Title sortDirection={sortedColumn === "price" ? sortDirection : undefined} onPress={() => handleSort("price")} numeric style={{ flex: 2 }}>
            Price
          </DataTable.Title>
        </DataTable.Header>

        {filteredAppointments?.slice(from, to).map((item: CategoryDataType) => (
          <DataTable.Row key={item.key} onPress={() => toggleDetails(item)}>
            <DataTable.Cell style={{ flex: 3 }}>{item?.type?.title}</DataTable.Cell>
            <DataTable.Cell style={{ flex: 3 }}>{DateFormatter(item?.date_appointment)}</DataTable.Cell>
            <DataTable.Cell style={{ flex: 6 }}>{format_time_appointment(item)}</DataTable.Cell>
            <DataTable.Cell style={{ flex: 2 }}>{formatIdCategoryToObject(item?.type?.category)?.name}</DataTable.Cell>
            <DataTable.Cell style={{ flex: 2 }} numeric>
              {item?.type?.price} €
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};


export default AppointmentTable;
