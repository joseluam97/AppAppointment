import { BusinessDataType } from "../../screens/types";
import { createReducer } from "@reduxjs/toolkit";
import {
  postBussinesAPIAction,
  initValueBusiness,
  getAllBusinessAPIAction
} from "./actions";

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
    .addDefaultCase((state) => {
      return state;
    });
});
