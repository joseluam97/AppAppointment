import 'intl';
import 'intl/locale-data/jsonp/mn-MN';

import {DateTime} from 'luxon';
import {constantValues} from '../constants';
import { ToastAndroid } from 'react-native';
import { ZippopotamDataType } from '../screens/types';

export const listDays: string[] = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]

export function getPositionDay(daySelected: string) {
  if (daySelected == "" || daySelected == undefined) {
    return null;
  }

  const postDay = listDays.findIndex(element => element == daySelected);

  // Formatea la hora en formato HH:mm
  return postDay;
}

export function getNameDay(daySelected: number) {
  if (daySelected < 0 || daySelected == undefined || daySelected >= 8) {
    return null;
  }

  const nameDay = listDays[daySelected];

  // Formatea la hora en formato HH:mm
  return nameDay;
}

export function createToast(message: string){
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    0,
    100,
  );
}

export const transformZippopotamData = (data: any): ZippopotamDataType => {
  let idCounter = 0;
  if(data?.places != undefined && data?.places?.length != 0){
    return {
      post_code: data["post code"],
      country: data["country"],
      country_abbreviation: data["country abbreviation"],
      places: data.places.map((place: any) => ({
        _id: idCounter++,
        place_name: place["place name"],
        longitude: place["longitude"],
        state: place["state"],
        state_abbreviation: place["state abbreviation"],
        latitude: place["latitude"]
      }))
    };
  }
  else{
    return {
      post_code: "",
      country: "",
      country_abbreviation: "",
      places: [{
        _id: "0",
        place_name: "",
        longitude: "",
        state: "",
        state_abbreviation: "",
        latitude: "",
      }]
    };
  }
  
};