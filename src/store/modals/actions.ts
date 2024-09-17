import { INIT_VALUE_MODALS, MODAL_CREATE_SUB_CATEGORY, MODAL_CREATE_CATEGORY, MODAL_VIEW_APPOINTMENT } from "./types";

import axios from "axios";
import { createAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryDataType, SubCategoryDataType } from "../../screens/types";

export const initialStateModalsAPIAction = createAction(INIT_VALUE_MODALS);

export const modalCreateSubCategoryVisibleAPIAction = createAsyncThunk(
  MODAL_CREATE_SUB_CATEGORY,
  async ({ isVisible, mode, category = undefined, subCategory = undefined }: { isVisible: boolean; mode: string; category: CategoryDataType; subCategory: SubCategoryDataType}) => {
    return { isVisible, mode, category, subCategory };
  }
);

export const modalCreateCategoryVisibleAPIAction = createAsyncThunk(
  MODAL_CREATE_CATEGORY,
  async ({ isVisible, mode, category = undefined }: { isVisible: boolean; mode: string; category: CategoryDataType}) => {
    return { isVisible, mode, category };
  }
);

export const modalViewSumaryAppointmentCreateCategoryVisibleAPIAction = createAsyncThunk(
  MODAL_VIEW_APPOINTMENT,
  async (isVisible: boolean ) => {
    return { isVisible };
  }
);
