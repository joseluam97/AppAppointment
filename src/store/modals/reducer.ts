import { AppointmentDataType, SubCategoryDataType, CategoryDataType, TimeAvailableForAppointment } from "../../screens/types";
import { createReducer } from "@reduxjs/toolkit";
import { modalCreateSubCategoryVisibleAPIAction, initialStateModalsAPIAction, modalCreateCategoryVisibleAPIAction, modalViewSumaryAppointmentCreateCategoryVisibleAPIAction} from "./actions";

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
    .addCase(modalViewSumaryAppointmentCreateCategoryVisibleAPIAction.fulfilled, (state, action) => {
      return {
        ...state,
        modalViewSumaryAppointment: action.payload.isVisible,
      };
    })
    .addCase(initialStateModalsAPIAction, () => {
      return initialState;
    })
    .addDefaultCase((state) => {
      return state;
    });
});
