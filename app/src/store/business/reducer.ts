import { createReducer } from "@reduxjs/toolkit";
import {
  postBussinesAPIAction,
  initValueBusiness,
  getAllBusinessAPIAction,
  getBusinessByIdAPIAction,
  putBussinesAPIAction
} from "./actions";
import { BusinessDataType } from "../../models/business";

type InitialStateType = {
  resultPost: boolean;
  list_bussines: BusinessDataType[] | undefined;
  bussines_user: BusinessDataType | undefined;
};

const initialState: InitialStateType = {
  resultPost: false,
  list_bussines: undefined,
  bussines_user: undefined,
};

export default createReducer(initialState, (builder) => {
  builder
  .addCase(initValueBusiness, () => {
    return initialState;
  })
  .addCase(getAllBusinessAPIAction.fulfilled, (state, action) => {
    return {
      ...state,
      list_bussines: { ...action.payload },
    };
  })
  .addCase(postBussinesAPIAction.pending, (state, action) => {
    return {
      ...state,
      resultPost: false,
    };
  })
  .addCase(postBussinesAPIAction.fulfilled, (state, action) => {
    return {
      ...state,
      resultPost: true,
    };
  })
  .addCase(putBussinesAPIAction.fulfilled, (state, action) => {
    return {
      ...state,
    };
  })
  .addCase(getBusinessByIdAPIAction.fulfilled, (state, action) => {
    return {
      ...state,
      bussines_user: { ...action.payload },
    };
  })
    .addDefaultCase((state) => {
      return state;
    });
});
