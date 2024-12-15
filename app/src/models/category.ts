import { BusinessDataType } from "./business";

export type SubCategoryDataType = {
    _id: string;
    title: string;
    price: number;
    time: number;
    category: CategoryDataType;
}

export type CategoryDataType = {
    _id: string;
    business: BusinessDataType;
    name: string;
    description: string;
    subcategories: SubCategoryDataType[];
}

export type TimeAvailableForAppointment = {
    _id: string;
    time_available: Date;
}