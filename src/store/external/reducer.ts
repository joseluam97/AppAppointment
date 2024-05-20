import { AppointmentDataType, SubCategoryDataType, CategoryDataType, TimeAvailableForAppointment, UserDataType, ZippopotamDataType } from "../../screens/types";
import { createReducer } from "@reduxjs/toolkit";
import {
  getInfoByZipCodeAPIAction,
  initValueExternalData,
} from "./actions";

type InitialStateType = {
  result_zip_code: ZippopotamDataType | undefined;
};

const initialState: InitialStateType = {
  result_zip_code: undefined,
};

export default createReducer(initialState, (builder) => {
  builder
  .addCase(initValueExternalData, () => {
    return initialState;
  })
  .addCase(getInfoByZipCodeAPIAction.fulfilled, (state, action) => {
    return {
      ...state,
      result_zip_code: { ...action.payload },
    };
  })
  .addCase(getInfoByZipCodeAPIAction.rejected, (state, action) => {
    return {
      ...state,
      result_zip_code: undefined,
    };
  })
    .addDefaultCase((state) => {
      return state;
    });
});
