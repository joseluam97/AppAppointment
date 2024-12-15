import { BusinessDataType } from "./business";

export type AppointmentDataType = {
    _id: string;
    business: BusinessDataType;
    user: Object;
    type: Object;
    date_appointment: Date;
    description: string;
    complete: boolean;
    approved: boolean;
};