import { AppointmentDataType, TypeAppointmentDataType } from "../../screens/dates/types";
import { createReducer } from "@reduxjs/toolkit";
import { getAllApointmentAPIAction, getAllTypesApointmentAPIAction } from "./actions";
import {
  GET_APPOINTMENT,
  GET_APPOINTMENT_EXITO,
  GET_APPOINTMENT_ERROR,
} from "./types";

type InitialStateType = {
  loggedin: boolean;
  listAppointment: AppointmentDataType[] | undefined;
  listTypeAppointment: TypeAppointmentDataType[] | undefined;
};

const initialState: InitialStateType = {
  loggedin: false,
  listAppointment: undefined,
  listTypeAppointment: undefined,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(getAllApointmentAPIAction.fulfilled, (state, action) => {
      return {
        ...state,
        loggedin: true,
        listAppointment: { ...action.payload }
      };
    })
    .addCase(getAllTypesApointmentAPIAction.fulfilled, (state, action) => {
      return {
        ...state,
        loggedin: true,
        listTypeAppointment: { ...action.payload }
      };
    })
    /*.addCase(userLogout, () => {
        return initialState;
      })*/
    .addDefaultCase((state) => {
      return state;
    });
});
