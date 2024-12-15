import { POST_BUSINESS, INIT_VALUE_BUSINESS, GET_ALL_BUSINESS } from "./types";

import axios from "axios";
import { createAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL_API } from "../../constants/constant";

const urlBusiness = URL_API + "/business";

// SER INIT VALUE 
export const initValueBusiness = createAction(INIT_VALUE_BUSINESS);

// GET ALL BUSSINESS
export const getAllBusinessAPIAction = createAsyncThunk(GET_ALL_BUSINESS, async () => {
  try {
    // Realiza una solicitud POST a la ruta de inicio de sesión en tu servidor
    const response = await axios.get(urlBusiness);

    // Devuelve los datos del usuario si la solicitud es exitosa
    return response.data;
  } catch (error) {
    // Maneja cualquier error que ocurra durante la solicitud
    console.error("Error during login:", error);
    throw error;
  }
});

// POST BUSINESS
export const postBussinesAPIAction = createAsyncThunk(
  POST_BUSINESS,
  async (data_appointment: any) => {
    try {
      // Realiza una solicitud POST a la ruta de inicio de sesión en tu servidor
      const response = await axios.post(urlBusiness, data_appointment);

      // Devuelve los datos del usuario si la solicitud es exitosa
      return response.data;
    } catch (error) {
      // Maneja cualquier error que ocurra durante la solicitud
      console.error("Error during login:", error);
      throw error;
    }
  }
);
