import { GET_CATEGORY_BY_BUSINESS, POST_CATEGORY, PUT_CATEGORY, INIT_VALUE_CATEGORY } from "./types";

import axios from "axios";
import { createAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL_API } from "../../constants/constant";

const urlCategory = URL_API + "/category";

export const initialStateCategoryAPIAction = createAction(INIT_VALUE_CATEGORY);

//APOINTMENT
export const getCategoryByBusinessAPIAction = createAsyncThunk(GET_CATEGORY_BY_BUSINESS, async (idBusiness: string) => {
  try {
    // Realiza una solicitud POST a la ruta de inicio de sesión en tu servidor
    const urlCategoryByBusiness = `${urlCategory}/business/${idBusiness}`;
    const response = await axios.get(urlCategoryByBusiness);

    // Devuelve los datos del usuario si la solicitud es exitosa
    return response.data;
  } catch (error) {
    // Maneja cualquier error que ocurra durante la solicitud
    console.error("Error during login:", error);
    throw error;
  }
});

export const postCategoryAPIAction = createAsyncThunk(POST_CATEGORY, async (data_category: any) => {
  try {
    // Realiza una solicitud POST a la ruta de inicio de sesión en tu servidor
    const response = await axios.post(urlCategory, data_category);

    // Devuelve los datos del usuario si la solicitud es exitosa
    return response.data;
  } catch (error) {
    // Maneja cualquier error que ocurra durante la solicitud
    console.error("Error during login:", error);
    throw error;
  }
});

export const putCategoryAPIAction = createAsyncThunk(PUT_CATEGORY, async (data_category: any) => {
  try {
    // Realiza una solicitud POST a la ruta de inicio de sesión en tu servidor
    const urlCategoryPut = `${urlCategory}/${data_category?._id}`;
    const response = await axios.put(urlCategoryPut, data_category);

    // Devuelve los datos del usuario si la solicitud es exitosa
    return response.data;
  } catch (error) {
    // Maneja cualquier error que ocurra durante la solicitud
    console.error("Error during login:", error);
    throw error;
  }
});
