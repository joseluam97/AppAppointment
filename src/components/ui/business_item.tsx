import React from "react";
import { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DurationFormatter, TimeFormatter } from "../textFormatter";
import { MaterialIcons } from "@expo/vector-icons";
import { BusinessDataType, CategoryDataType, ScheduleDataType } from "../../screens/types";
import { getNameDay } from "../utils";

const BusinessItem = ({ business }) => {
  
  const renderScheudable = (listScheudable: ScheduleDataType[]) => {
    // Creamos un objeto para agrupar los elementos por day_week
    const groupedScheudable: {[key: string]: ScheduleDataType[]} = {};
  
    // Agrupamos los elementos por day_week
    listScheudable.forEach(item => {
      if (!groupedScheudable[item.day_week]) {
        groupedScheudable[item.day_week] = [];
      }
      groupedScheudable[item.day_week].push(item);
    });
  
    // Renderizamos los grupos
    return Object.keys(groupedScheudable).map(day_week => (
      <View key={day_week}>
        <View style={styles.row}>
          <MaterialIcons name="access-time" size={20} color="#888" />
          {groupedScheudable[day_week].map((item, index) => (
            <Text key={index} style={styles.text}>
              {index == 0 ? <Text style={styles.dayWeek}>{getNameDay(day_week)}: </Text> : null}
              {TimeFormatter(item.time_open?.toString())} - {TimeFormatter(item.time_close?.toString())}
              {index !== groupedScheudable[day_week].length - 1 ? " y" : ""}
            </Text>
          ))}
        </View>
      </View>
    ));
  };
  

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{business?.name}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.detailsContainer}>
          <View style={styles.details}>
            <View style={styles.row}>
              <MaterialIcons name="location-on" size={20} color="#888" />
              <Text style={styles.text}> {business?.address}</Text>
            </View>
            <View style={styles.row}>
              <MaterialIcons name="phone" size={20} color="#888" />
              <Text style={styles.text}> {business?.phone}</Text>
            </View>
            <View style={styles.row}>
              <MaterialIcons name="map" size={20} color="#888" />
              <Text style={styles.text}> {business?.zip_code}</Text>
            </View>
            <View style={styles.row}>
              <MaterialIcons name="access-time" size={20} color="#888" />
              <Text style={styles.text}> {business?.name}</Text>
            </View>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.details}>
            {renderScheudable(business?.scheudable)}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  dayWeek: {
    fontSize: 15,
    fontWeight: "bold",
  },
  content: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detailsContainer: {
    width: "50%",
  },
  details: {
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginLeft: 5,
    color: "#444",
  },
});

export default BusinessItem;
