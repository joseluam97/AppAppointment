export type AppointmentDataType = {
  user: Object;
  type: Object;
  date_appointment: Date;
  description: string;
};

export type TypeAppointmentDataType = {
  _id: string;
  title: string;
  price: number;
  time: string;
  breed: Object;
}

export type BreedDataType = {
  _id: string;
  name: string;
  weight: number;
}

export type TimeAvailableForAppointment = {
  _id: string;
  time_available: Date;
}