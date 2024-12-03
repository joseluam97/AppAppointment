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

export type ScheduleDataType = {
  _id: string;
  day_week: number;
  time_open: Date;
  time_close: Date;
}

export type PlacesZippopotamDataType = {
  _id: string;
  place_name: string;
  longitude: string;
  state: string;
  state_abbreviation: string;
  latitude: string;
}

export type ZippopotamDataType = {
  post_code: string;
  country: string;
  country_abbreviation: string;
  places: PlacesZippopotamDataType[];
}