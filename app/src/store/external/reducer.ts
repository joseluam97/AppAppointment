import { createReducer } from "@reduxjs/toolkit";
import {
  getInfoByZipCodeAPIAction,
  initValueExternalData,
} from "./actions";
import { ZippopotamDataType } from "../../models/zipCode";

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
