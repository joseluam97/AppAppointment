import { RESET_PUT_APPOINTMENT, PUT_APPOINTMENT, GET_APPOINTMENT_WITH_FILTERS, POST_APPOINTMENT, GET_ALL_APPOINTMENT, GET_ALL_TYPES_APPOINTMENT, GET_ALL_BREED, GET_TYPES_APPOINTMENT_BY_BREED, GET_TIME_AVAILABLE_APPOINTMENT, GET_APPOINTMENT_BY_USER_AND_BUSSINES, GET_NEXT_APPOINTMENT_BY_USER_AND_BUSSINES } from "./types";

import axios from "axios";
import { createAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL_API } from "../../constants/constant";
import { AppointmentDataType } from "../../models/appointment";
import { BusinessDataType } from "../../models/business";
import { UserDataType } from "../../models/user";

const urlCategory = URL_API + "/category";
const urlAppointment = URL_API + "/appointment";
const urlSubCategory = URL_API + "/subCategory";

export const initialStateAPIAction = createAction("initialState/set");
export const resetPutAppointment = createAction(RESET_PUT_APPOINTMENT);

//APOINTMENT
export const getNextApointmentsByUserAndBussinesAPIAction = createAsyncThunk(GET_NEXT_APPOINTMENT_BY_USER_AND_BUSSINES, 
  async ({business_appointment, user_appointment}: {business_appointment: BusinessDataType, user_appointment: UserDataType}) => {
  try {

    // Realiza una solicitud POST a la ruta de inicio de sesión en tu servidor
      const urlUserAndBussinesAppointment = `${urlAppointment}/nextByUser/`;
    const response = await axios.post(urlUserAndBussinesAppointment, {
      user_appointment: user_appointment._id,
      business_appointment: business_appointment,
    });

    // Devuelve los datos del usuario si la solicitud es exitosa
    if(response.data.length >= 1){
      return response.data[0];
    }

    return response.data;
  } catch (error) {
    // Maneja cualquier error que ocurra durante la solicitud
    console.error("Error during login:", error);
    throw error;
  }
});

export const getApointmentsByUserAndBussinesAPIAction = createAsyncThunk(GET_APPOINTMENT_BY_USER_AND_BUSSINES, 
  async ({business_appointment, user_appointment}: {business_appointment: BusinessDataType, user_appointment: UserDataType}) => {
  try {
    // Realiza una solicitud POST a la ruta de inicio de sesión en tu servidor
      const urlUserAndBussinesAppointment = `${urlAppointment}/byUser/`;
    const response = await axios.post(urlUserAndBussinesAppointment, {
      user_appointment: user_appointment._id,
      business_appointment: business_appointment._id,
    });

    // Devuelve los datos del usuario si la solicitud es exitosa
    return response.data;
  } catch (error) {
    // Maneja cualquier error que ocurra durante la solicitud
    console.error("Error during login:", error);
    throw error;
  }
});

export const getApointmentsWithFiltersAPIAction = createAsyncThunk(GET_APPOINTMENT_WITH_FILTERS, async ({business_appointment, date_selected}: {business_appointment: BusinessDataType, date_selected: any}) => {
  try {
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

export const putAppointmentAPIAction = createAsyncThunk(
  PUT_APPOINTMENT,
  async (data_appointment: AppointmentDataType) => {
    try {
      // Realiza una solicitud PUT a la ruta de inicio de sesión en tu servidor
      const urlTypesAppointmentByCategory = `${urlAppointment}/${data_appointment._id}`;
      const response = await axios.put(urlTypesAppointmentByCategory, data_appointment);

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

