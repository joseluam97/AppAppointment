import {
  GET_APPOINTMENT,
  GET_APPOINTMENT_EXITO,
  GET_APPOINTMENT_ERROR,
} from "./types";

import axios from "axios";
import { createAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppointmentDataType } from "../../screens/dates/types";

const urlAppointment = "http://192.168.1.142:3100/appointment";
const urlTypeAppointment = "http://192.168.1.142:3100/typeAppointment";

export const getAllApointmentAPIAction = createAsyncThunk(
  'appointment/getAll',
  async () => {
    try {
      // Realiza una solicitud POST a la ruta de inicio de sesión en tu servidor
      const response = await axios.get(urlAppointment);

      // Devuelve los datos del usuario si la solicitud es exitosa
      return response.data;
    } catch (error) {
      // Maneja cualquier error que ocurra durante la solicitud
      console.error('Error during login:', error);
      throw error;
    }
  }
);

export const getAllTypesApointmentAPIAction = createAsyncThunk(
  'typeAppointment/getAll',
  async () => {
    try {
      // Realiza una solicitud POST a la ruta de inicio de sesión en tu servidor
      const response = await axios.get(urlTypeAppointment);

      // Devuelve los datos del usuario si la solicitud es exitosa
      return response.data;
    } catch (error) {
      // Maneja cualquier error que ocurra durante la solicitud
      console.error('Error during login:', error);
      throw error;
    }
  }
);



