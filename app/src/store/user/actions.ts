import { LOGIN_USER, INIT_VALUE, LOG_OUT_USER, PUT_USER, GET_MY_CLIENTS, SET_USER_MY_PROFILE } from "./types";

import axios from "axios";
import { createAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL_API } from "../../constants/constant";
import { UserDataType } from "../../models/user";

const urlUser = URL_API + "/user";

export const initialStateAPIAction = createAction("initialState/set");

// SER INIT VALUE 
export const initValue = createAction(INIT_VALUE);

// LOG OUT USER
export const logUserAPIAction = createAction(LOG_OUT_USER);

// PUT USER
export const putUserAPIAction = createAsyncThunk(
  PUT_USER,
  async (data_user: UserDataType) => {
    try {
      // Realiza una solicitud POST a la ruta de inicio de sesión en tu servidor
      const urlUserPut = `${urlUser}/${data_user._id}`;
      const response = await axios.put(urlUserPut, data_user);

      // Devuelve los datos del usuario si la solicitud es exitosa
      return response.data;
    } catch (error) {
      // Maneja cualquier error que ocurra durante la solicitud
      console.error("Error during login:", error);
      throw error;
    }
  }
);

// LOGIN USER
export const loginUserAPIAction = createAsyncThunk(
  LOGIN_USER,
  async (userInfo: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // Realiza una solicitud POST al servidor
      const urlUserLogin = `${urlUser}/login/`;
      const response = await axios.post(urlUserLogin, {
        email: userInfo.email,
        password: userInfo.password,
      });

      // Devuelve los datos del usuario si la solicitud es exitosa
      return response.data;
    } catch (error: any) {
      // Maneja los errores específicos del servidor
      if (error.response) {
        console.error("Error during login:", error.response.data.error);
        // Usa rejectWithValue para enviar el error al thunk
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data.error,
        });
      }

      // Maneja errores de red u otros problemas
      console.error("Network or unexpected error:", error.message);
      return rejectWithValue({ status: null, message: "Network error or unexpected issue" });
    }
  }
);


export const getMyClientsAPIAction = createAsyncThunk(GET_MY_CLIENTS, async (idBusiness: string) => {
  try {
    // Realiza una solicitud POST a la ruta de inicio de sesión en tu servidor
    const urlUserByBusiness = `${urlUser}/byBusiness/${idBusiness}`;
    const response = await axios.get(urlUserByBusiness);

    // Devuelve los datos del usuario si la solicitud es exitosa
    return response.data;
  } catch (error) {
    // Maneja cualquier error que ocurra durante la solicitud
    console.error("Error during login:", error);
    throw error;
  }
});


// SET USER MY PROFILE
export const setUserMyProfileAPIAction = createAsyncThunk(
  SET_USER_MY_PROFILE,
  async (userSelected: UserDataType) => {
    return { userSelected };
  }
);