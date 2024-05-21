import { AppointmentDataType, SubCategoryDataType, CategoryDataType, TimeAvailableForAppointment } from "../../screens/types";
import { createReducer } from "@reduxjs/toolkit";
import { modalCreateSubCategoryVisibleAPIAction, initialStateModalsAPIAction} from "./actions";

type InitialStateType = {
  modalCreateSubCategory: boolean;
  modeModalSubCategory: string;
  categorySelectModalSubCategory: CategoryDataType | undefined;
  subCategorySelectModalSubCategory: SubCategoryDataType | undefined;
};

const initialState: InitialStateType = {
  // MODAL CREATION CATEGORY
  // TO-DO

  // MODAL CREATION SUB CATEGORY
  modalCreateSubCategory: false,
  modeModalSubCategory: "",
  categorySelectModalSubCategory: undefined,
  subCategorySelectModalSubCategory: undefined,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(modalCreateSubCategoryVisibleAPIAction.fulfilled, (state, action) => {
      return {
        ...state,
        modalCreateSubCategory: action.payload.isVisible,
        modeModalSubCategory: action.payload.mode,
        categorySelectModalSubCategory: {...action.payload.category},
        subCategorySelectModalSubCategory: {...action.payload.subCategory}
      };
    })
    .addCase(initialStateModalsAPIAction, () => {
      return initialState;
    })
    .addDefaultCase((state) => {
      return state;
    });
});
