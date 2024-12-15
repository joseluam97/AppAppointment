export type ScheduleDataType = {
    _id: string;
    day_week: number;
    time_open: Date;
    time_close: Date;
}

export type BusinessDataType = {
    _id: string;
    name: string;
    address: string;
    phone: string;
    zip_code: string;
    country: string;
    province: string;
    city: string;
    scheudable: ScheduleDataType[];
};