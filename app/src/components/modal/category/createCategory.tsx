import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from "react-native";
import { RHFTextField } from "../..";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postCategoryAPIAction, putCategoryAPIAction } from "../../../store/category/actions";
import { StoreRootState } from "../../../store/store";
import { modalCreateCategoryVisibleAPIAction } from "../../../store/modals/actions";
import { initialStateSubCategoryAPIAction } from "../../../store/subCategory/actions";
import { CategoryDataType } from "../../../models/category";

const CreateCategory = () => {
  const dispatch = useDispatch<any>();
  const form = useForm<CategoryDataType>();

  const [nameBussines, setNameBussines] = useState<string | undefined>("");
  const [descriptionBussines, setDescriptionBussines] = useState<string | undefined>("");

  const userData = useSelector((state: StoreRootState) => state?.user?.userData ?? undefined);

  const modalCreateCategoryAPI = useSelector((state: StoreRootState) => state?.modals?.modalCreateCategory ?? undefined);
  const modeModalCategoryAPI = useSelector((state: StoreRootState) => state?.modals?.modeModalCategory ?? undefined);
  const categorySelectModalCategoryAPI = useSelector((state: StoreRootState) => state?.modals?.categorySelectModalCategory ?? undefined);

  const clearForm = () => {
    console.log("clearForm- INI");
    // Clear form
    setNameBussines("");
    setDescriptionBussines("");
    console.log("clearForm- END");
  };

  useEffect(() => {
    dispatch(initialStateSubCategoryAPIAction());
  }, [modalCreateCategoryAPI]);

  const closeModal = () => {
    dispatch(modalCreateCategoryVisibleAPIAction({ isVisible: false, mode: "" }));
  };

  useEffect(() => {
    if (modeModalCategoryAPI == "new") {
      clearForm();
    }
    if (modeModalCategoryAPI == "edit") {
      setNameBussines(categorySelectModalCategoryAPI?.name);
      setDescriptionBussines(categorySelectModalCategoryAPI?.description);
    }
  }, [modeModalCategoryAPI]);

  const createCategory = () => {
    if (modeModalCategoryAPI == "new") {
      dispatch(
        postCategoryAPIAction({
          business: userData?.my_business?._id,
          name: nameBussines,
          description: descriptionBussines,
        })
      );
    }
    if (modeModalCategoryAPI == "edit") {
      dispatch(
        putCategoryAPIAction({
          _id: categorySelectModalCategoryAPI?._id,
          business: userData?.my_business?._id,
          name: nameBussines,
          description: descriptionBussines,
        })
      );
    }

    closeModal();
  };


  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalCreateCategoryAPI}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          closeModal();
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Create a new category</Text>

            {/* FORM NEW CATEGORY */}

            <View style={styles.styleForm}>
              <FormProvider {...form}>
                <RHFTextField
                  value={nameBussines}
                  name="name"
                  label="Name"
                  //rules={{ required: "Enter name please!" }}
                  onChangeText={(value) => setNameBussines(value)}
                />

                <RHFTextField
                  value={descriptionBussines}
                  name="description"
                  label="Description"
                  //rules={{ required: "Enter address please!" }}
                  onChangeText={(value) => setDescriptionBussines(value)}
                />
              </FormProvider>
            </View>

            {/* Botón */}
            {/*<TouchableOpacity style={stylesScheudable.button} onPress={createCategory}>
                <Text style={stylesScheudable.buttonText}>ADD</Text>
                </TouchableOpacity>*/}

            <View style={styles.listButton}>
              <Pressable style={[styles.button, styles.buttonClose]} onPress={() => closeModal()}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonSave]}
                //onPress={() => setModalCreateCategoryVisible(!modalCreateCategoryVisible)}>
                onPress={createCategory}
              >
                <Text style={styles.textStyle}>Save</Text>
              </Pressable>
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

export default CreateCategory;
