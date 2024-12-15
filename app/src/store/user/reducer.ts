import { AppointmentDataType, SubCategoryDataType, CategoryDataType, TimeAvailableForAppointment, UserDataType } from "../../screens/types";
import { createReducer } from "@reduxjs/toolkit";
import {
  loginUserAPIAction,
  initValue,
  logUserAPIAction,
  putUserAPIAction,
  getMyClientsAPIAction,
  setUserMyProfileAPIAction
} from "./actions";

type InitialStateType = {
  loggedin: boolean | undefined;
  userData: UserDataType | undefined;
  resultPut: boolean | undefined;
  listMyClients: UserDataType[] | undefined;

  // View my profile
  userSelected: UserDataType | undefined;

};

const initialState: InitialStateType = {
  loggedin: undefined,
  userData: undefined,
  resultPut: undefined,
  listMyClients: [],

  // View my profile
  userSelected: undefined,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(initValue, () => {
      return initialState;
    })
    .addCase(logUserAPIAction, () => {
      return {
        loggedin: undefined,
        userData: undefined,
      };
    })
    .addCase(getMyClientsAPIAction.fulfilled, (state, action) => {
      return {
        ...state,
        listMyClients: { ...action.payload },
      };
    })
    .addCase(putUserAPIAction.pending, (state, action) => {
      return {
        ...state,
        resultPut: undefined,
      };
    })
    .addCase(putUserAPIAction.fulfilled, (state, action) => {
      return {
        ...state,
        resultPut: true,
        userData: { ...action.payload },
      };
    })
    .addCase(loginUserAPIAction.pending, (state, action) => {
      return {
        ...state,
        loggedin: undefined,
        userData: undefined,
      };
    })
    .addCase(loginUserAPIAction.fulfilled, (state, action) => {
      return {
        ...state,
        loggedin: true,
        userData: { ...action.payload },
      };
    })
    .addCase(loginUserAPIAction.rejected, (state, action) => {
      return {
        ...state,
        loggedin: undefined,
        userData: undefined,
      };
    })
    .addCase(setUserMyProfileAPIAction.fulfilled, (state, action) => {
      return {
        ...state,
        userSelected: { ...action.payload.userSelected },
      };
    })
    /*.addCase(userLogout, () => {
        return initialState;
      })*/
    .addDefaultCase((state) => {
      return state;
    });
});
