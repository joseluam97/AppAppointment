import { INIT_VALUE_MODALS, MODAL_CREATE_SUB_CATEGORY, MODAL_CREATE_CATEGORY, MODAL_VIEW_SUMARY_APPOINTMENT, MODAL_VIEW_DETAILS_APPOINTMENT } from "./types";

import axios from "axios";
import { createAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppointmentDataType, CategoryDataType, SubCategoryDataType } from "../../screens/types";

export const initialStateModalsAPIAction = createAction(INIT_VALUE_MODALS);

export const modalCreateSubCategoryVisibleAPIAction = createAsyncThunk(
  MODAL_CREATE_SUB_CATEGORY,
  async ({ isVisible, mode, category = undefined, subCategory = undefined }: { isVisible: boolean; mode: string; category: CategoryDataType; subCategory: SubCategoryDataType }) => {
    return { isVisible, mode, category, subCategory };
  }
);

export const modalCreateCategoryVisibleAPIAction = createAsyncThunk(
  MODAL_CREATE_CATEGORY,
  async ({ isVisible, mode, category = undefined }: { isVisible: boolean; mode: string; category: CategoryDataType }) => {
    return { isVisible, mode, category };
  }
);

export const modalViewSumaryAppointmentVisibleAPIAction = createAsyncThunk(MODAL_VIEW_SUMARY_APPOINTMENT, async (isVisible: boolean) => {
  return { isVisible };
});

export const modalViewDetailsAppointmentVisibleAPIAction = createAsyncThunk(
  MODAL_VIEW_DETAILS_APPOINTMENT,
  async ({ isVisible, mode = "", appointment = undefined }: { isVisible: boolean; mode: string; appointment: AppointmentDataType | undefined }) => {
    return { isVisible, mode, appointment };
  }
);
