import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import theme from "../../constants/theme";
import { modalCreateSubCategoryVisibleAPIAction } from "../../store/modals/actions";
import { useDispatch } from "react-redux";
import { IconButton, Menu, Provider as PaperProvider } from "react-native-paper";

const SubCategoryItem = ({ category, subCategory }) => {
  const dispatch = useDispatch<any>();

  const [showDetails, setShowDetails] = useState(false);

  const showSubCategory = () => {
    dispatch(modalCreateSubCategoryVisibleAPIAction({ isVisible: true, mode: "show", category: category, subCategory: subCategory }))
  };

  const editSubCategory = () => {
    dispatch(modalCreateSubCategoryVisibleAPIAction({ isVisible: true, mode: "edit", category: category, subCategory: subCategory }))
  };

  const deleteSubCategory = () => {

  };

  const [visibleMenuIndex, setVisibleMenuIndex] = useState<number | null>(null);
  const openMenu = (index: number) => {
    setVisibleMenuIndex(index);
  };

  const closeMenu = () => {
    setVisibleMenuIndex(null);
  };


  return (
    <>
      <View style={styles.subCategoryItemContainer}>
        <TouchableOpacity style={styles.contentSubCategory} onPress={showSubCategory}>
          <View style={styles.header}>
            <Text style={styles.text}>{subCategory?.title}</Text>
            <Text style={styles.text}>{subCategory?.price} €</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.actionSubCategory}>
          <View style={styles.header}>
            <Menu
              visible={visibleMenuIndex === subCategory._id}
              onDismiss={closeMenu}
              anchor={
                <IconButton
                  icon="dots-vertical"
                  onPress={() => openMenu(subCategory._id)}
                />
              }
              style={{ marginTop: 0 }} // Ajuste de la posición vertical
            >
              <Menu.Item onPress={() => { showSubCategory() }} title="Show details" />
              <Menu.Item onPress={() => { editSubCategory() }} title="Edit subcategory" />
              <Menu.Item onPress={() => { deleteSubCategory() }} title="Delete subcategory" />
            </Menu>

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
