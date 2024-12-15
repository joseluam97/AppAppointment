import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getAllApointmentAPIAction, getApointmentsWithFiltersAPIAction } from "../../store/appointment/actions";
import AppointmentItem from "../../components/ui/appointment_item";
import DatePicker from "../../components/ui/datepicker";
import { StoreRootState } from "../../store/store";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Icons } from "../../components";
import { getAllBusinessAPIAction } from "../../store/business/actions";
import BusinessItem from "../../components/ui/business_item";
import { putUserAPIAction } from "../../store/user/actions";
import { createToast } from "../../components/utils";
import { BusinessDataType } from "../../models/business";
import { UserDataType } from "../../models/user";

const ListBusiness = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const isFocused = useIsFocused();

  const form = useForm<any>();

  const [operationRequest, setOperationRequest] = useState<string>("");

  const [listBusiness, setListBusiness] = useState<BusinessDataType[]>();
  const [openAll, setOpenAll] = useState<boolean | undefined>(undefined);

  const list_bussinesAPI = useSelector((state: StoreRootState) => state?.business?.list_bussines ?? []);
  const userData = useSelector((state: StoreRootState) => state?.user?.userData ?? undefined);
  const resultPutAPI = useSelector((state: StoreRootState) => state?.user?.resultPut ?? false);

  /*
    NAME: useEffect[isFocused]
    DESCRIPTION: When the screen loads
  */
  useEffect(() => {
    if (isFocused) {
      getAllBussines();
    }
  }, [isFocused]);

  /*
    NAME: useEffect[resultPutAPI, userData]
    DESCRIPTION: When a business is updated
  */
  useEffect(() => {
    if (resultPutAPI == true) {
      let listBusiness: BusinessDataType[] = Object.values(list_bussinesAPI);
      let listBusinessCopy = [...listBusiness];
      setListBusiness(listBusinessCopy);
      if(operationRequest == "add"){
        createToast("The shop for requesting appointments has been successfully added.")
      }
      if(operationRequest == "remove"){
        createToast("The shop has been successfully removed.")
      }
      setOperationRequest("")
    }
  }, [resultPutAPI, userData]);

  /*
    NAME: getAllBussines
    DESCRIPTION: Get all bussines in database
    IMPUT: None
    OUTPUT: None
  */
  const getAllBussines = async () => {
    const resultAction = await dispatch(getAllBusinessAPIAction());

    if (getAllBusinessAPIAction.fulfilled.match(resultAction)) {
      if (resultAction.payload != undefined && resultAction.payload.length != 0) {
        const categoryArray: BusinessDataType[] = Object.values(resultAction.payload);
        setListBusiness(categoryArray);
      }
    }
  }

  /*
    NAME: saveOrDeleteBusiness
    DESCRIPTION: Save or delete bussines in my list
    IMPUT: item: BusinessDataType
    OUTPUT: None
  */
  const saveOrDeleteBusiness = (item: BusinessDataType) => {
    let result_filter = userData?.list_business.filter(elemento => elemento._id == item?._id)[0]
    
    if(result_filter == undefined){
      // ADD ITEM
      setOperationRequest("add")
      let data_user: UserDataType | undefined = userData;
      if (data_user) {
        const updatedUserData = {
          ...data_user,
          list_business: [...data_user.list_business, item]
        };
        dispatch(putUserAPIAction(updatedUserData));
      }
    }
    else{
      // DELETE ITEM
      setOperationRequest("remove")
      let data_user: UserDataType | undefined = userData;
      if (data_user) {
        const updatedListBusiness = data_user.list_business.filter(elemento => elemento._id !== item._id);
        const updatedUserData = {
          ...data_user,
          list_business: updatedListBusiness
        };
        dispatch(putUserAPIAction(updatedUserData));
      }
    }
  }

  /*
    SECTION: Interaction with view
    DESCRIPTION: Methods for view logic
    LIST:
      - checkIfUserSaveBusiness
  */
  const checkIfUserSaveBusiness = (item: BusinessDataType) => {
    let result_filter = userData?.list_business.filter(elemento => elemento._id == item?._id)[0]
    if(result_filter == undefined){
      return "ADD TO MY SHOPS";
    }
    else{
      return "REMOVE FROM MY SHOPS";
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={listBusiness}
        renderItem={({ item }) => (
          <View style={styles.columnBusinessItemContainer}>
            <View style={styles.appointmentItemContainer}>
              <BusinessItem business={item} />
            </View>
            <Button title={checkIfUserSaveBusiness(item)} onPress={() => saveOrDeleteBusiness(item)} />
          </View>
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

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
    flex: 0.48,
  },
  centeredContainer: {
    alignItems: "center",
  },
  datePickerContainer: {
    marginBottom: 10,
    width: "50%",
  },
  flatListContent: {
    backgroundColor: "#ffffff", // Color de fondo blanco
  },
  columnBusinessItemContainer: {
    flexDirection: "column",
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
  appointmentItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
});

export default ListBusiness;
