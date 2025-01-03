import React from "react";
import { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button } from "react-native";
import { DurationFormatter, TimeFormatter } from "../textFormatter";
import { MaterialIcons } from "@expo/vector-icons";
import SubCategoryItem from "./subCategory_item";
import { useDispatch, useSelector } from "react-redux";
import { modalCreateCategoryVisibleAPIAction, modalCreateSubCategoryVisibleAPIAction } from "../../store/modals/actions";

const CategoryItem = ({ category }) => {
  const dispatch = useDispatch<any>();

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const addSubCategory = () => {
    console.log("-EXECUTION addSubCategory-")
    dispatch(modalCreateSubCategoryVisibleAPIAction({isVisible: true, mode: "new", category: category}))
  };

  const editCategory = () => {
    console.log("Edit category")
    dispatch(modalCreateCategoryVisibleAPIAction({ isVisible: true, mode: "edit", category: category }));
  };

  return (
    <>
      <View style={styles.container}>
      
        <TouchableOpacity style={styles.header} onPress={toggleDetails}>
          <View style={styles.title_category}>
            <Text style={styles.title}>{category?.name}</Text>
            <MaterialIcons name="edit" size={24} color="#888" onPress={editCategory} />
          </View>
          <Text style={styles.description}>{category?.description}</Text>
          <MaterialIcons style={styles.icon} name={showDetails ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="#888" />
        </TouchableOpacity>
        {showDetails && (
          <View style={styles.details}>
            {category?.subcategories?.length != 0 ? (
              <>
              <FlatList
                data={category?.subcategories}
                renderItem={({ item }) => (
                  <View>
                    <SubCategoryItem category={category} subCategory={item} />
                  </View>
                )}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.flatListContent}
              />
              <Button title="CREATE SUBCATEGORY" onPress={addSubCategory} />
              </>
            ) : (
              <View style={styles.containerWarning}>
                <Text>No sub categories were found.</Text>
                <Button title="CREATE SUBCATEGORY" onPress={addSubCategory} />
              </View>
            )}
          </View>
        )}


      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    //borderBottomWidth: 0,
    //borderBottomColor: "#ccc",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 0,
  },
  title_category: {
    flexDirection: "row",
    width: "40%"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingRight: 10
  },
  description: {
    fontSize: 12,
    marginLeft: 5,
    color: "#444",
    width: "55%"
  },
  icon: {
    width: "5%"
  },
  details: {
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  flatListContent: {
    backgroundColor: "#ffffff", // Color de fondo blanco
  },
  containerWarning: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default CategoryItem;
