import React from "react";
import { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { DurationFormatter, TimeFormatter } from "../textFormatter";
import { MaterialIcons } from "@expo/vector-icons";
import { AppointmentDataType, CategoryDataType } from "../../screens/types";
import theme from "../../constants/theme";
import CreateSubCategory from "../modal/createSubCategory";
import { modalCreateSubCategoryVisibleAPIAction } from "../../store/modals/actions";
import { useDispatch, useSelector } from "react-redux";

const SubCategoryItem = ({ category, subCategory }) => {
  const dispatch = useDispatch<any>();

  const [showDetails, setShowDetails] = useState(false);

  const editSubCategory = () => {
    console.log("-EXECUTION editSubCategory-")
    dispatch(modalCreateSubCategoryVisibleAPIAction({isVisible: true, mode: "edit", category: category, subCategory: subCategory}))
  };

  const deleteSubCategory = () => {

  };

  return (
    <>
      <View style={styles.subCategoryItemContainer}>
        <View style={styles.contentSubCategory}>
          <View style={styles.header}>
            <Text style={styles.text}>{subCategory?.title}</Text>
            <Text style={styles.text}>{subCategory?.price} €</Text>
            <Text style={styles.text}>{subCategory?.time} minutes</Text>
          </View>
        </View>
        <View style={styles.actionSubCategory}>
          <View style={styles.header}>
            <Button title="EDIT" onPress={editSubCategory} />
            {/*<Button title="DELETE" onPress={deleteSubCategory} />*/}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  contentSubCategory: {
    width: "70%",
  },
  actionSubCategory: {
    width: "30%",
  },
  text: {
    fontSize: 16,
    marginLeft: 5,
    color: "#444",
  },
  subCategoryItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginBottom: 5,
    borderRadius: 10,
    shadowColor: theme?.primaryColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
  },
});

export default SubCategoryItem;
