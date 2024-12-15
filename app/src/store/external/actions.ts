import { INIT_VALUE_EXTERNAL, GET_INFO_BY_ZIP_CODE } from "./types";

import axios from "axios";
import { createAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createToast } from "../../components/utils";

const urlZipCodeGalore = "http://api.zippopotam.us/ES";

export const initialStateAPIAction = createAction("initialState/set");

// SER INIT VALUE 
export const initValueExternalData = createAction(INIT_VALUE_EXTERNAL);

// GET INFO
export const getInfoByZipCodeAPIAction = createAsyncThunk(GET_INFO_BY_ZIP_CODE, async (zip_code: string) => {
  try {
    // Realiza una solicitud POST a la ruta de inicio de sesión en tu servidor
    const urlZipCodeGaloreNumber = `${urlZipCodeGalore}/${zip_code}`;
    const response = await axios.get(urlZipCodeGaloreNumber);

    // Devuelve los datos del usuario si la solicitud es exitosa
    return response.data;
  } catch (error) {
    // Maneja cualquier error que ocurra durante la solicitud
    console.error("Error during login:", error);
    createToast("The provided postcode is not found.")
    throw error;
  }
});
