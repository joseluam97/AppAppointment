import { createReducer } from "@reduxjs/toolkit";
import { modalCreateSubCategoryVisibleAPIAction, initialStateModalsAPIAction, modalCreateCategoryVisibleAPIAction, modalViewSumaryAppointmentVisibleAPIAction, modalViewDetailsAppointmentVisibleAPIAction} from "./actions";
import { AppointmentDataType } from "../../models/appointment";
import { CategoryDataType, SubCategoryDataType } from "../../models/category";

type InitialStateType = {
  // MODAL CREATION CATEGORY
  modalCreateCategory: boolean;
  modeModalCategory: string;
  categorySelectModalCategory: CategoryDataType | undefined;

  // MODAL CREATION SUB CATEGORY
  modalCreateSubCategory: boolean;
  modeModalSubCategory: string;
  categorySelectModalSubCategory: CategoryDataType | undefined;
  subCategorySelectModalSubCategory: SubCategoryDataType | undefined;

  // MODAL VIEW SUMARY APPOINTMENT
  modalViewSumaryAppointment: boolean;
  
  // MODAL VIEW DETAILS APPOINTMENT
  modalViewDetailsAppointment: boolean;
  modeViewDetailsAppointment: string;
  appointmentSelected: AppointmentDataType | undefined;
};

const initialState: InitialStateType = {
  // MODAL CREATION CATEGORY
  modalCreateCategory: false,
  modeModalCategory: "",
  categorySelectModalCategory: undefined,

  // MODAL CREATION SUB CATEGORY
  modalCreateSubCategory: false,
  modeModalSubCategory: "",
  categorySelectModalSubCategory: undefined,
  subCategorySelectModalSubCategory: undefined,
  
  // MODAL VIEW SUMARY APPOINTMENT
  modalViewSumaryAppointment: false,

  // MODAL VIEW DETAILS APPOINTMENT
  modalViewDetailsAppointment: false,
  modeViewDetailsAppointment: "",
  appointmentSelected: undefined,

};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(modalCreateCategoryVisibleAPIAction.fulfilled, (state, action) => {
      return {
        ...state,
        modalCreateCategory: action.payload.isVisible,
        modeModalCategory: action.payload.mode,
        categorySelectModalCategory: {...action.payload.category},
      };
    })
    .addCase(modalCreateSubCategoryVisibleAPIAction.fulfilled, (state, action) => {
      return {
        ...state,
        modalCreateSubCategory: action.payload.isVisible,
        modeModalSubCategory: action.payload.mode,
        categorySelectModalSubCategory: {...action.payload.category},
        subCategorySelectModalSubCategory: {...action.payload.subCategory}
      };
    })
    .addCase(modalViewSumaryAppointmentVisibleAPIAction.fulfilled, (state, action) => {
      return {
        ...state,
        modalViewSumaryAppointment: action.payload.isVisible,
      };
    })
    .addCase(modalViewDetailsAppointmentVisibleAPIAction.fulfilled, (state, action) => {
      return {
        ...state,
        modalViewDetailsAppointment: action.payload.isVisible,
        modeViewDetailsAppointment: action.payload.mode,
        appointmentSelected: {...action.payload.appointment},
      };
    })
    .addCase(initialStateModalsAPIAction, () => {
      return initialState;
    })
    .addDefaultCase((state) => {
      return state;
    });
});
