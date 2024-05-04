import { AppointmentDataType, TypeAppointmentDataType, BreedDataType, TimeAvailableForAppointment } from "../../screens/dates/types";
import { createReducer } from "@reduxjs/toolkit";
import {
  getAllApointmentAPIAction,
  getAllTypesApointmentAPIAction,
  getAllBreedAPIAction,
  getTypesApointmentByBreedAPIAction,
  getTimeAvailableAppointmentAPIAction,
  postAppointmentAPIAction
} from "./actions";

type InitialStateType = {
  resultPost: boolean;
  loggedin: boolean;
  listAppointmentAPI: AppointmentDataType[] | undefined;
  listTypeAppointmentAPI: TypeAppointmentDataType[] | undefined;
  listBreedAPI: BreedDataType[] | undefined;
  listTimeAppointmentAvailable: TimeAvailableForAppointment[] | undefined;
};

const initialState: InitialStateType = {
  resultPost: false,
  loggedin: false,
  listAppointmentAPI: [],
  listTypeAppointmentAPI: [],
  listBreedAPI: [],
  listTimeAppointmentAvailable: []
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(getAllApointmentAPIAction.fulfilled, (state, action) => {
      return {
        ...state,
        loggedin: true,
        listAppointmentAPI: { ...action.payload },
      };
    })
    .addCase(postAppointmentAPIAction.fulfilled, (state, action) => {
      return {
        ...state,
        resultPost: true,
      };
    })
    .addCase(getTimeAvailableAppointmentAPIAction.fulfilled, (state, action) => {
      return {
        ...state,
        loggedin: true,
        listTimeAppointmentAvailable: { ...action.payload },
      };
    })
    .addCase(getAllTypesApointmentAPIAction.fulfilled, (state, action) => {
      return {
        ...state,
        loggedin: true,
        listTypeAppointmentAPI: { ...action.payload },
      };
    })
    .addCase(getTypesApointmentByBreedAPIAction.fulfilled, (state, action) => {
      return {
        ...state,
        loggedin: true,
        listTypeAppointmentAPI: { ...action.payload },
      };
    })
    .addCase(getAllBreedAPIAction.fulfilled, (state, action) => {
      return {
        ...state,
        loggedin: true,
        listBreedAPI: { ...action.payload },
      };
    })
    /*.addCase(userLogout, () => {
        return initialState;
      })*/
    .addDefaultCase((state) => {
      return state;
    });
});
