import { AppointmentDataType, SubCategoryDataType, CategoryDataType, TimeAvailableForAppointment } from "../../screens/types";
import { createReducer } from "@reduxjs/toolkit";
import {
  getAllApointmentAPIAction,
  getAllTypesApointmentAPIAction,
  getAllCategoryAPIAction,
  getTypesApointmentByCategoryAPIAction,
  getTimeAvailableAppointmentAPIAction,
  postAppointmentAPIAction,
  getApointmentsWithFiltersAPIAction,
  putAppointmentAPIAction,
  resetPutAppointment
} from "./actions";

type InitialStateType = {
  resultPost: boolean;
  resultPut: boolean;
  loggedin: boolean;
  listAppointmentAPI: AppointmentDataType[] | undefined;
  listSubCategoryAPI: SubCategoryDataType[] | undefined;
  listCategoryAPI: CategoryDataType[] | undefined;
  listTimeAppointmentAvailable: TimeAvailableForAppointment[] | undefined;
};

const initialState: InitialStateType = {
  resultPost: false,
  resultPut: false,
  loggedin: false,
  listAppointmentAPI: [],
  listSubCategoryAPI: [],
  listCategoryAPI: [],
  listTimeAppointmentAvailable: []
};

export default createReducer(initialState, (builder) => {
  builder
  .addCase(getApointmentsWithFiltersAPIAction.fulfilled, (state, action) => {
    return {
      ...state,
      loggedin: true,
      listAppointmentAPI: { ...action.payload },
    };
  })
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
    .addCase(putAppointmentAPIAction.fulfilled, (state, action) => {
      return {
        ...state,
        resultPut: true,
      };
    })
    .addCase(resetPutAppointment, (state, action) => {
      return {
        ...state,
        resultPut: false,
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
        listSubCategoryAPI: { ...action.payload },
      };
    })
    .addCase(getTypesApointmentByCategoryAPIAction.fulfilled, (state, action) => {
      return {
        ...state,
        loggedin: true,
        listSubCategoryAPI: { ...action.payload },
      };
    })
    .addCase(getAllCategoryAPIAction.fulfilled, (state, action) => {
      return {
        ...state,
        loggedin: true,
        listCategoryAPI: { ...action.payload },
      };
    })
    /*.addCase(userLogout, () => {
        return initialState;
      })*/
    .addDefaultCase((state) => {
      return state;
    });
});
