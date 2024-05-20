import { GET_APPOINTMENT_WITH_FILTERS, POST_APPOINTMENT, GET_ALL_APPOINTMENT, GET_ALL_TYPES_APPOINTMENT, GET_ALL_BREED, GET_TYPES_APPOINTMENT_BY_BREED, GET_TIME_AVAILABLE_APPOINTMENT } from "./types";

import axios from "axios";
import { createAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppointmentDataType, BusinessDataType } from "../../screens/types";

const urlCategory = "http://192.168.1.142:3100/category";
const urlAppointment = "http://192.168.1.142:3100/appointment";
const urlSubCategory = "http://192.168.1.142:3100/subCategory";

export const initialStateAPIAction = createAction("initialState/set");

//APOINTMENT
export const getApointmentsWithFiltersAPIAction = createAsyncThunk(GET_APPOINTMENT_WITH_FILTERS, async ({business_appointment, date_selected}: {business_appointment: BusinessDataType, date_selected: any}) => {
  try {
    console.log("-getApointmentsWithFiltersAPIAction-")
    console.log(business_appointment?._id)
    console.log(date_selected)
    console.log("-getApointmentsWithFiltersAPIAction-")
    // Realiza una solicitud POST a la ruta de inicio de sesión en tu servidor
      const urlTimeAvailableAppointment = `${urlAppointment}/filters/`;
    const response = await axios.post(urlTimeAvailableAppointment, {
      business_appointment: business_appointment._id,
      date_appointment: date_selected
    });


    // Devuelve los datos del usuario si la solicitud es exitosa
    return response.data;
  } catch (error) {
    // Maneja cualquier error que ocurra durante la solicitud
    console.error("Error during login:", error);
    throw error;
  }
});

export const getAllApointmentAPIAction = createAsyncThunk(GET_ALL_APPOINTMENT, async () => {
  try {
    // Realiza una solicitud POST a la ruta de inicio de sesión en tu servidor
    const response = await axios.get(urlAppointment);

    // Devuelve los datos del usuario si la solicitud es exitosa
    return response.data;
  } catch (error) {
    // Maneja cualquier error que ocurra durante la solicitud
    console.error("Error during login:", error);
    throw error;
  }
});

export const getTimeAvailableAppointmentAPIAction = createAsyncThunk(
  GET_TIME_AVAILABLE_APPOINTMENT,
  async ({ date_appointment_selected, id_type_appointment }: { date_appointment_selected: any; id_type_appointment: any }) => {
    try {
      // Realiza una solicitud POST a la ruta de inicio de sesión en tu servidor
      const urlTimeAvailableAppointment = `${urlAppointment}/timeAvailable/`;
      const response = await axios.post(urlTimeAvailableAppointment, {
        date_appointment: date_appointment_selected,
        type_appointment: id_type_appointment,
      });

      // Devuelve los datos del usuario si la solicitud es exitosa
      return response.data;
    } catch (error) {
      // Maneja cualquier error que ocurra durante la solicitud
      console.error("Error during login:", error);
      throw error;
    }
  }
);

export const postAppointmentAPIAction = createAsyncThunk(
  POST_APPOINTMENT,
  async (data_appointment: AppointmentDataType) => {
    try {
      // Realiza una solicitud POST a la ruta de inicio de sesión en tu servidor
      const response = await axios.post(urlAppointment, data_appointment);

      // Devuelve los datos del usuario si la solicitud es exitosa
      return response.data;
    } catch (error) {
      // Maneja cualquier error que ocurra durante la solicitud
      console.error("Error during login:", error);
      throw error;
    }
  }
);

// TYPE APPOINTMENT
export const getAllTypesApointmentAPIAction = createAsyncThunk(GET_ALL_TYPES_APPOINTMENT, async () => {
  try {
    // Realiza una solicitud POST a la ruta de inicio de sesión en tu servidor
    const response = await axios.get(urlSubCategory);

    // Devuelve los datos del usuario si la solicitud es exitosa
    return response.data;
  } catch (error) {
    // Maneja cualquier error que ocurra durante la solicitud
    console.error("Error during login:", error);
    throw error;
  }
});

export const getTypesApointmentByCategoryAPIAction = createAsyncThunk(GET_TYPES_APPOINTMENT_BY_BREED, async (idCategory: any) => {
  try {
    // Realiza una solicitud POST a la ruta de inicio de sesión en tu servidor
    const urlTypesAppointmentByCategory = `${urlSubCategory}/byCategory/${idCategory}`;
    const response = await axios.get(urlTypesAppointmentByCategory);

    // Devuelve los datos del usuario si la solicitud es exitosa
    return response.data;
  } catch (error) {
    // Maneja cualquier error que ocurra durante la solicitud
    console.error("Error during login:", error);
    throw error;
  }
});

// BREED
export const getAllCategoryAPIAction = createAsyncThunk(GET_ALL_BREED, async () => {
  try {
    // Realiza una solicitud POST a la ruta de inicio de sesión en tu servidor
    const response = await axios.get(urlCategory);

    // Devuelve los datos del usuario si la solicitud es exitosa
    return response.data;
  } catch (error) {
    // Maneja cualquier error que ocurra durante la solicitud
    console.error("Error during login:", error);
    throw error;
  }
});
