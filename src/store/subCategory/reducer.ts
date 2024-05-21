import { AppointmentDataType, SubCategoryDataType, TimeAvailableForAppointment } from "../../screens/types";
import { createReducer } from "@reduxjs/toolkit";
import { initialStateSubCategoryAPIAction, getSubCategoryByBusinessAPIAction, postSubCategoryAPIAction, putSubCategoryAPIAction } from "./actions";

type InitialStateType = {
  resultPost: boolean;
  resultPut: boolean;
  listSubCategoryAPI: SubCategoryDataType[] | undefined;
};

const initialState: InitialStateType = {
  resultPost: false,
  resultPut: false,
  listSubCategoryAPI: [],
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(getSubCategoryByBusinessAPIAction.fulfilled, (state, action) => {
      return {
        ...state,
        loggedin: true,
        listSubCategoryAPI: { ...action.payload },
      };
    })
    .addCase(postSubCategoryAPIAction.fulfilled, (state, action) => {
      return {
        ...state,
        resultPost: true,
      };
    })
    .addCase(putSubCategoryAPIAction.fulfilled, (state, action) => {
      return {
        ...state,
        resultPut: true,
      };
    })
    .addCase(initialStateSubCategoryAPIAction, () => {
      return initialState;
    })
    .addDefaultCase((state) => {
      return state;
    });
});
