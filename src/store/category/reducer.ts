import { AppointmentDataType, SubCategoryDataType, CategoryDataType, TimeAvailableForAppointment } from "../../screens/types";
import { createReducer } from "@reduxjs/toolkit";
import { initialStateCategoryAPIAction, getCategoryByBusinessAPIAction, postCategoryAPIAction, putCategoryAPIAction } from "./actions";

type InitialStateType = {
  resultPost: boolean;
  resultPut: boolean;
  listCategoryAPI: CategoryDataType[] | undefined;
};

const initialState: InitialStateType = {
  resultPost: false,
  resultPut: false,
  listCategoryAPI: [],
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(getCategoryByBusinessAPIAction.fulfilled, (state, action) => {
      return {
        ...state,
        loggedin: true,
        listCategoryAPI: { ...action.payload },
      };
    })
    .addCase(postCategoryAPIAction.fulfilled, (state, action) => {
      return {
        ...state,
        resultPost: true,
      };
    })
    .addCase(putCategoryAPIAction.fulfilled, (state, action) => {
      return {
        ...state,
        resultPut: true,
      };
    })
    .addCase(initialStateCategoryAPIAction, () => {
      return initialState;
    })
    .addDefaultCase((state) => {
      return state;
    });
});
