import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Pressable, View, TouchableOpacity } from "react-native";
import { RHFTextField } from "..";
import { FormProvider, useForm } from "react-hook-form";
import { SubCategoryDataType } from "../../screens/types";
import { useDispatch, useSelector } from "react-redux";
import { postCategoryAPIAction } from "../../store/category/actions";
import { StoreRootState } from "../../store/store";
import { Button, Dialog, Portal, PaperProvider, Text } from "react-native-paper";
import DatePicker from "../ui/datepicker";
import { getTimeInHoursAndMinutes } from "../utils";
import { initialStateSubCategoryAPIAction, postSubCategoryAPIAction, putSubCategoryAPIAction } from "../../store/subCategory/actions";
import { modalCreateSubCategoryVisibleAPIAction } from "../../store/modals/actions";

const CreateSubCategory = () => {
  const dispatch = useDispatch<any>();
  const form = useForm<SubCategoryDataType>();

  const [titleSubCategory, setTitleSubCategory] = useState<string | undefined>("");
  const [priceSubCategory, setPriceSubCategory] = useState<string | undefined>("");
  const [timeSubCategory, setTimeSubCategory] = useState<string | undefined>("");

  const modalCreateSubCategoryAPI = useSelector((state: StoreRootState) => state?.modals?.modalCreateSubCategory ?? undefined);
  const modeModalSubCategoryAPI = useSelector((state: StoreRootState) => state?.modals?.modeModalSubCategory ?? undefined);
  const categorySelectModalSubCategoryAPI = useSelector((state: StoreRootState) => state?.modals?.categorySelectModalSubCategory ?? undefined);
  const subCategorySelectModalSubCategoryAPI = useSelector((state: StoreRootState) => state?.modals?.subCategorySelectModalSubCategory ?? undefined);

  const clearForm = () => {
    // Clear form
    setTitleSubCategory("");
    setPriceSubCategory("");
    setTimeSubCategory("");
  };

  useEffect(() => {
    dispatch(initialStateSubCategoryAPIAction());
  }, [modalCreateSubCategoryAPI]);

  useEffect(() => {
    if (modeModalSubCategoryAPI == "new") {
      clearForm();
    }
    if (modeModalSubCategoryAPI == "show" || modeModalSubCategoryAPI == "edit") {
      setTitleSubCategory(subCategorySelectModalSubCategoryAPI?.title);
      setPriceSubCategory(subCategorySelectModalSubCategoryAPI?.price.toString());
      setTimeSubCategory(subCategorySelectModalSubCategoryAPI?.time.toString());
    }
  }, [modeModalSubCategoryAPI]);

  const createSubCategory = () => {
    let price_number: number = parseInt(priceSubCategory ?? "0");
    let time_number: number = parseInt(timeSubCategory ?? "0");

    if (modeModalSubCategoryAPI == "new") {
      dispatch(
        postSubCategoryAPIAction({
          title: titleSubCategory,
          price: price_number,
          time: time_number,
          category: categorySelectModalSubCategoryAPI?._id,
        })
      );
    }
    if (modeModalSubCategoryAPI == "edit") {
      dispatch(
        putSubCategoryAPIAction({
          _id: subCategorySelectModalSubCategoryAPI?._id,
          title: titleSubCategory,
          price: price_number,
          time: time_number,
          category: categorySelectModalSubCategoryAPI?._id,
        })
      );
    }
    closeModal();
  };

  const closeModal = () => {
    dispatch(modalCreateSubCategoryVisibleAPIAction({ isVisible: false, mode: "" }));
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalCreateSubCategoryAPI}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          //closeModal();
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Create a new subcategory</Text>

            <View style={styles.styleForm}>
              <FormProvider {...form}>
                <RHFTextField value={categorySelectModalSubCategoryAPI?.name} name="category" label="Category" readOnly={true} />

                <RHFTextField
                  value={titleSubCategory}
                  name="title"
                  label="Title"
                  readOnly={modeModalSubCategoryAPI == "show" ? true : false}
                  onChangeText={(value) => setTitleSubCategory(value)}
                />

                <RHFTextField
                  value={priceSubCategory}
                  name="price"
                  label="Price"
                  readOnly={modeModalSubCategoryAPI == "show" ? true : false}
                  keyboardType="phone-pad"
                  maxLength={5}
                  
                  onChangeText={(value) => setPriceSubCategory(value)}
                />

                <RHFTextField
                  value={timeSubCategory}
                  name="time"
                  label="Indicates appointment time (in minutes)"
                  readOnly={modeModalSubCategoryAPI == "show" ? true : false}
                  keyboardType="phone-pad"
                  maxLength={5}
                  onChangeText={(value) => setTimeSubCategory(value)}
                />
                {timeSubCategory != undefined && timeSubCategory != "" ? <Text style={styles.modalText}>The total appointment time will be: {getTimeInHoursAndMinutes(timeSubCategory)}</Text> : null}
              </FormProvider>
            </View>

            <View style={styles.listButton}>
              <Pressable style={[styles.button, styles.buttonClose]} onPress={closeModal}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>

              {modeModalSubCategoryAPI != "show" ?
              <Pressable style={[styles.button, styles.buttonSave]} onPress={createSubCategory}>
                <Text style={styles.textStyle}>{modeModalSubCategoryAPI == "new" ? "Save" : "Edit"}</Text>
              </Pressable> : undefined}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  styleForm: {
    width: "100%",
  },
  listButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: "60%",
  },
  modalView: {
    margin: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  button: {
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 40,
    elevation: 2,
  },
  buttonSave: {
    backgroundColor: "green",
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default CreateSubCategory;
