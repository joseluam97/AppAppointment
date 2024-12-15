import { GET_SUB_CATEGORY, POST_SUB_CATEGORY, PUT_SUB_CATEGORY, INIT_VALUE_SUB_CATEGORY } from "./types";

import axios from "axios";
import { createAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL_API } from "../../constants/constant";
import { SubCategoryDataType } from "../../models/category";

const urlSubCategory = URL_API + "/subCategory";

export const initialStateSubCategoryAPIAction = createAction(INIT_VALUE_SUB_CATEGORY);

export const getSubCategoryByBusinessAPIAction = createAsyncThunk(GET_SUB_CATEGORY, async (idBusiness: string) => {
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

export const postSubCategoryAPIAction = createAsyncThunk(
  POST_SUB_CATEGORY,
  async (data_subCategory: any) => {
    try {
      // Realiza una solicitud POST a la ruta de inicio de sesión en tu servidor
      const response = await axios.post(urlSubCategory, data_subCategory);

      // Devuelve los datos del usuario si la solicitud es exitosa
      return response.data;
    } catch (error) {
      // Maneja cualquier error que ocurra durante la solicitud
      console.error("Error during login:", error);
      throw error;
    }
  }
);

export const putSubCategoryAPIAction = createAsyncThunk(
  PUT_SUB_CATEGORY,
  async (data_subCategory: SubCategoryDataType) => {
    try {
      // Realiza una solicitud POST a la ruta de inicio de sesión en tu servidor
      const urlSubCategoryWithId = `${urlSubCategory}/${data_subCategory?._id}`;
      const response = await axios.put(urlSubCategoryWithId, data_subCategory);

      // Devuelve los datos del usuario si la solicitud es exitosa
      return response.data;
    } catch (error) {
      // Maneja cualquier error que ocurra durante la solicitud
      console.error("Error during login:", error);
      throw error;
    }
  }
);