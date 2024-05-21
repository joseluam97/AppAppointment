import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from "react-native";
import { RHFTextField } from "..";
import { FormProvider, useForm } from "react-hook-form";
import { CategoryDataType } from "../../screens/types";
import { useDispatch, useSelector } from "react-redux";
import { postCategoryAPIAction } from "../../store/category/actions";
import { StoreRootState } from "../../store/store";

const CreateCategory = ({ modalCreateCategoryVisible, setModalCreateCategoryVisible }) => {
  const dispatch = useDispatch<any>();
  const form = useForm<CategoryDataType>();

  const [nameBussines, setNameBussines] = useState<string | undefined>("");
  const [descriptionBussines, setDescriptionBussines] = useState<string | undefined>("");

  const userData = useSelector((state: StoreRootState) => state?.user?.userData ?? undefined);

  const clearForm = () => {
    console.log("clearForm- INI");
    // Clear form
    setNameBussines("");
    setDescriptionBussines("");
    console.log("clearForm- END");
  };

  useEffect(() => {
    clearForm();
  }, [modalCreateCategoryVisible]);

  const createCategory = () => {
    dispatch(
      postCategoryAPIAction({
        business: userData?.my_business?._id,
        name: nameBussines,
        description: descriptionBussines,
      })
    );

    setModalCreateCategoryVisible(false);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalCreateCategoryVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalCreateCategoryVisible(!modalCreateCategoryVisible);
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>

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
              <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalCreateCategoryVisible(!modalCreateCategoryVisible)}>
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
