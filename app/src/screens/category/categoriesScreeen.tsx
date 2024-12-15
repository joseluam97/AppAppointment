import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import { StoreRootState } from "../../store/store";
import { getCategoryByBusinessAPIAction, postCategoryAPIAction } from "../../store/category/actions";
import CategoryItem from "../../components/ui/category_item";
import CreateCategory from "../../components/modal/category/createCategory";
import { initialStateModalsAPIAction, modalCreateCategoryVisibleAPIAction } from "../../store/modals/actions";
import CreateSubCategory from "../../components/modal/category/createSubCategory";
import { CategoryDataType } from "../../models/category";

export default function Categories({ navigation }: any) {
  
  const dispatch = useDispatch<any>();
  const isFocused = useIsFocused();

  const [listCategory, setListCategory] = useState<CategoryDataType[]>();

  const userData = useSelector((state: StoreRootState) => state?.user?.userData ?? undefined);

  const resultPostSubCategoryAPI = useSelector((state: StoreRootState) => state?.subCategory?.resultPost ?? undefined);
  const resultPutSubCategoryAPI = useSelector((state: StoreRootState) => state?.subCategory?.resultPut ?? undefined);
  const resultPostCategoryAPI = useSelector((state: StoreRootState) => state?.category?.resultPost ?? undefined);
  const resultPutCategoryAPI = useSelector((state: StoreRootState) => state?.category?.resultPut ?? undefined);
  const modalCreateCategoryAPI = useSelector((state: StoreRootState) => state?.modals?.modalCreateCategory ?? undefined);

  /*
    NAME: useEffect[isFocused]
    DESCRIPTION: When the screen loads
  */
  useEffect(() => {
    if (isFocused) {
      getCategorys();
      dispatch(initialStateModalsAPIAction());
    }
  }, [isFocused]);

  /*
    NAME: useEffect[modalCreateCategoryAPI]
    DESCRIPTION: When there is a change in any of the specified variables, the categories are updated.
  */
  useEffect(() => {
    getCategorys();
  }, [modalCreateCategoryAPI]);
  
  /*
    NAME: useEffect[resultPostSubCategoryAPI, resultPutSubCategoryAPI, resultPostCategoryAPI, resultPutCategoryAPI]
    DESCRIPTION: When there is a change in any of the specified variables, the categories are updated.
  */
  useEffect(() => {
    if(resultPostSubCategoryAPI == true || resultPutSubCategoryAPI == true){
      getCategorys();
    }
  }, [resultPostSubCategoryAPI, resultPutSubCategoryAPI, resultPostCategoryAPI, resultPutCategoryAPI]);

  /*
    NAME: getCategorys
    DESCRIPTION: Get the categories
    IMPUT: None
    OUTPUT: None
  */
  const getCategorys = async () => {
    const resultAction = await dispatch(getCategoryByBusinessAPIAction(userData?.my_business?._id));

    if (getCategoryByBusinessAPIAction.fulfilled.match(resultAction)) {
      if (resultAction.payload != undefined && resultAction.payload.length != 0) {
        const categoryArray: CategoryDataType[] = Object.values(resultAction.payload);
        setListCategory(categoryArray);
      }
    }
  }

  /*
    NAME: createCategory
    DESCRIPTION: Opens the dialog to create a new category
    IMPUT: None
    OUTPUT: None
  */
  const createCategory = () => {
    if(modalCreateCategoryAPI == true){
      dispatch(modalCreateCategoryVisibleAPIAction({ isVisible: false, mode: "new" }));
    }
    if(modalCreateCategoryAPI == false){
      dispatch(modalCreateCategoryVisibleAPIAction({ isVisible: true, mode: "new" }));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <View style={styles.buttonContainer}>
          <Button title="CREATE NEW CATEGORY" onPress={createCategory} />
        </View>
      </View>

      {listCategory?.length != 0 ? (
        <FlatList
          data={listCategory}
          renderItem={({ item }) => (
            <View style={styles.appointmentItemContainer}>
              <CategoryItem category={item} />
            </View>
          )}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.flatListContent}
        />
      ) : (
        <View style={styles.containerWarning}>
          <Text>No categories were found.</Text>
        </View>
      )}
      <CreateCategory />
      <CreateSubCategory />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
  },
  centeredContainer: {
    alignItems: "center",
  },
  flatListContent: {
    backgroundColor: "#ffffff", // Color de fondo blanco
  },
  appointmentItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 5,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#ffffff",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  widthIcons: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center", // Centrar verticalmente
    padding: 20
  },
  widthSelector: {
    width: "50%",
    alignItems: "center",
  },
  containerWarning: {
    marginTop: 20,
    alignItems: "center",
  },
});
