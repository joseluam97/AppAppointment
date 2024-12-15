import { BusinessDataType } from "./business";

export type UserDataType = {
    _id: string;
    first_name: string;
    last_name: string;
    date_birth: Date;
    address: string;
    email: string;
    password: string;
    list_business: BusinessDataType[];
    my_business: BusinessDataType;
}