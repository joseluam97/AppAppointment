import "intl";
import "intl/locale-data/jsonp/mn-MN";

import { DateTime } from "luxon";
import { constantValues } from "../constants";
import { ToastAndroid } from "react-native";
import { UserDataType, ZippopotamDataType } from "../screens/types";

export const listDays: string[] = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

export function getPositionDay(daySelected: string) {
  if (daySelected == "" || daySelected == undefined) {
    return null;
  }

  const postDay = listDays.findIndex((element) => element == daySelected);

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

export function createToast(message: string) {
  ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 100);
}

export const transformZippopotamData = (data: any): ZippopotamDataType => {
  let idCounter = 0;
  if (data?.places != undefined && data?.places?.length != 0) {
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
        latitude: place["latitude"],
      })),
    };
  } else {
    return {
      post_code: "",
      country: "",
      country_abbreviation: "",
      places: [
        {
          _id: "0",
          place_name: "",
          longitude: "",
          state: "",
          state_abbreviation: "",
          latitude: "",
        },
      ],
    };
  }
};

export const getTimeInHoursAndMinutes = (minutes: string): string => {
  // Convertir la cadena a un número
  const totalMinutes = parseInt(minutes, 10);

  // Calcular las horas y los minutos restantes
  const hours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  // Construir la cadena de resultado
  let result = "";

  if (hours > 0) {
    result += `${hours} hora${hours > 1 ? "s" : ""}`;
  }

  if (remainingMinutes > 0) {
    if (hours > 0) {
      result += " y ";
    }
    result += `${remainingMinutes} minuto${remainingMinutes > 1 ? "s" : ""}`;
  }

  return result || "0 minutos";
};

export const formatTime = (dateInt: any) => {
  const fecha = new Date(dateInt);

  // Obtener la hora y los minutos
  const horas = fecha.getHours().toString().padStart(2, "0");
  const minutos = fecha.getMinutes().toString().padStart(2, "0");

  // Formatear la hora y los minutos como una cadena
  const horaFormateada = `${horas}:${minutos}`;

  return horaFormateada;
};

export const getFullName = (client: UserDataType) => {
  if (client != undefined) {
    return `${client?.first_name} ${client?.last_name}`;
  }
  return "";
};

export const getLabelName = (client: UserDataType) => {
  if (client != undefined) {
    if (client.first_name.indexOf(" ") === -1) {
      return client.first_name[0] + client.last_name[0];
    } else {
      let array_name = client.first_name.split(" ");
      return array_name.length === 2 ? array_name[0][0] + array_name[1][0] : client.first_name[0];
    }
  }
  return "";
};
