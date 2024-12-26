import { useEffect, useState } from "react";
import { View, Button, TouchableOpacity, FlatList } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { RHFTextField } from "../../components";

import React from "react";
import { StyleSheet } from "react-native";
import globalStyles from "../../constants/globalStyles";
import { StoreRootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import MyPicker from "../../components/ui/picker";
import DatePicker from "../../components/ui/datepicker";
import { createToast, getNameDay, getPositionDay, listDays, transformZippopotamData } from "../../components/utils";
import { TimeFormatter } from "../../components/textFormatter";
import { getBusinessByIdAPIAction, initValueBusiness, postBussinesAPIAction, putBussinesAPIAction } from "../../store/business/actions";
import { getInfoByZipCodeAPIAction, initValueExternalData } from "../../store/external/actions";
import { BusinessDataType, ScheduleDataType } from "../../models/business";
import { PlacesZippopotamDataType } from "../../models/zipCode";

export default function ViewBusiness({ navigation, route }: any) {
  const { modeView } = route.params || {};

  const dispatch = useDispatch<any>();
  const isFocused = useIsFocused();

  const form = useForm<BusinessDataType>();

  // Atributes forms
  const [modeForm, setModeForm] = useState<string>("");

  const [country, setCountry] = useState<string | undefined>("");
  const [province, setProvince] = useState<string | undefined>("");
  const [listCityZipCode, setListCityZipCode] = useState<PlacesZippopotamDataType[]>([]);
  const [cityZipCode, setCityZipCode] = useState<PlacesZippopotamDataType | undefined>(undefined);

  const [nameBussines, setNameBussines] = useState<string | undefined>("");
  const [adressBussines, setAdressBussines] = useState<string | undefined>("");
  const [phoneBussines, setPhoneBussines] = useState<string | undefined>("");
  const [zipCodeBussines, setZipCodeBussines] = useState<string | undefined>("");
  const [selectedDay, setSelectedDay] = useState<string | undefined>("");
  const [selectedHourOpen, setSelectedHourOpen] = useState<Date | undefined>(undefined);
  const [selectedHourClose, setSelectedHourClose] = useState<Date | undefined>(undefined);
  const [listScheudable, setListScheudable] = useState<ScheduleDataType[]>([]);

  const resultPostBusiness = useSelector((state: StoreRootState) => state?.business?.resultPost ?? false);
  const userData = useSelector((state: StoreRootState) => state?.user?.userData ?? undefined);

  /*
    NAME: useEffect[isFocused]
    DESCRIPTION: When the screen loads
  */
  useEffect(() => {
    if (isFocused) {
      setModeForm(modeView);
      if (modeView != "create") {
        navigation.setOptions({ title: 'Details of your business' });
        if (userData?.my_business != undefined) {
          completeScheudable()
        }
      }
      else {
        navigation.setOptions({ title: 'Create your business' });
        clearForm();
      }
    }
  }, [isFocused]);
  /*
    NAME: useEffect[resultPostBusiness]
    DESCRIPTION: It runs when a new business is created
  */
  useEffect(() => {
    if (resultPostBusiness == true) {
      // Create toast
      createToast("The business has been properly registered.");

      // Redit to list appointment
      navigation.navigate("home");
    }
  }, [resultPostBusiness]);
  /*
    NAME: completeScheudable
    DESCRIPTION: Function to complete business details
    IMPUT: None
    OUTPUT: None
  */
  const completeScheudable = async () => {
    const resultAction = await dispatch(getBusinessByIdAPIAction(userData?.my_business?._id));

    if (getBusinessByIdAPIAction.fulfilled.match(resultAction)) {
      if (resultAction.payload != undefined && resultAction.payload.length != 0) {
        form.setValue("name", resultAction.payload.name);
        setNameBussines(resultAction.payload.name);
        form.setValue("address", resultAction.payload.address);
        setAdressBussines(resultAction.payload.address);
        form.setValue("phone", resultAction.payload.phone);
        setPhoneBussines(resultAction.payload.phone);
        form.setValue("zip_code", resultAction.payload.zip_code.toString());
        setZipCodeBussines(resultAction.payload.zip_code);

        getInfoAboutZipCode(resultAction.payload.zip_code.toString());


        let listScheudableComplete: ScheduleDataType[] = [];
        let listScheudableAPI: ScheduleDataType[] = Object.values(resultAction.payload.scheudable);

        for (let itemScheudable in listScheudableAPI) {
          let scheudableItem: ScheduleDataType = {
            _id: listScheudableAPI[itemScheudable]._id,
            day_week: listScheudableAPI[itemScheudable].day_week,
            time_open: new Date(listScheudableAPI[itemScheudable].time_open),
            time_close: new Date(listScheudableAPI[itemScheudable].time_close),
          };

          listScheudableComplete.push(scheudableItem)
        }

        setListScheudable(listScheudableComplete);
      }
    }
  }
  /*
    NAME: clearForm
    DESCRIPTION: Clear all information
    IMPUT: None
    OUTPUT: None
  */
  const clearForm = () => {
    form.setValue("name", "");
    form.setValue("address", "");
    form.setValue("phone", "");
    form.setValue("zip_code", "");
    form.setValue("city", "");

    setSelectedHourOpen(undefined);
    setSelectedHourClose(undefined);
    setListScheudable([]);

    dispatch(initValueBusiness());
    dispatch(initValueExternalData());
  };
  /*
    NAME: getInfoAboutZipCode
    DESCRIPTION: Get the city associated with a CP
    IMPUT: zipCode: string
    OUTPUT: None
  */
  const getInfoAboutZipCode = async (zipCode: string) => {
    setZipCodeBussines(zipCode);
    if (zipCode != undefined && zipCode != "" && zipCode?.length == 5) {
      const resultAction = await dispatch(getInfoByZipCodeAPIAction(zipCode));

      if (getInfoByZipCodeAPIAction.fulfilled.match(resultAction)) {
        if (resultAction.payload != undefined) {

          const result_zip_code_json = transformZippopotamData(resultAction.payload);

          setCountry(result_zip_code_json?.country);

          const list_places: PlacesZippopotamDataType[] = Object.values(result_zip_code_json?.places);
          setListCityZipCode(list_places);
          if (list_places.length != 0) {
            if (modeForm == "details") {
              //userData?.my_business.city
              const indexPlace = list_places.findIndex(element => element.place_name == userData?.my_business.city);
              if (indexPlace > 0 && indexPlace < list_places.length) {
                setCityZipCode(list_places[indexPlace]?._id);
              }
            }
            else {
              setCityZipCode(list_places[0]?._id);
            }
          }
        }
        else {
          setListCityZipCode([]);
          setCityZipCode(undefined);
        }
      }
    }
  };
  /*
    NAME: createNewBussiness
    DESCRIPTION: A new business is created
    IMPUT: formData: BusinessDataType
    OUTPUT: None
  */
  const createNewBussiness = async (formData: BusinessDataType) => {

    if (cityZipCode != undefined &&
      nameBussines != undefined && nameBussines != "" && adressBussines != undefined && adressBussines != "" &&
      phoneBussines != undefined && phoneBussines != "" && zipCodeBussines != undefined && zipCodeBussines != "" &&
      listScheudable.length != 0) {

      // Get value by _id
      let city_selected: string = "";
      let element_selected = listCityZipCode.filter(element => element._id == cityZipCode)[0]

      if (element_selected != undefined) {
        city_selected = element_selected?.place_name;
      }

      let listIdScheidable: string[] = [];
      for (let itemScheudable in listScheudable) {
        listIdScheidable.push(listScheudable[itemScheudable]._id)
      }

      if (modeForm == "create") {
        dispatch(
          postBussinesAPIAction({
            name: nameBussines,
            address: adressBussines,
            zip_code: zipCodeBussines,
            scheudable: listIdScheidable,
            phone: phoneBussines,
            country: country,
            province: province,
            city: city_selected,
            user: userData?._id,
          })
        );
      }
      if (modeForm == "editable") {
        dispatch(
          putBussinesAPIAction({
            _id: userData?.my_business._id,
            name: nameBussines,
            address: adressBussines,
            zip_code: zipCodeBussines,
            scheudable: listIdScheidable,
            phone: phoneBussines,
            country: country,
            province: province,
            city: city_selected,
            user: userData?._id,
          })
        );

        const resultAction = await dispatch(putBussinesAPIAction({
          _id: userData?.my_business._id,
          name: nameBussines,
          address: adressBussines,
          zip_code: zipCodeBussines,
          scheudable: listIdScheidable,
          phone: phoneBussines,
          country: country,
          province: province,
          city: city_selected,
          user: userData?._id,
        }));

        if (putBussinesAPIAction.fulfilled.match(resultAction)) {
          if (resultAction.payload != undefined) {
            createToast("The business data has been successfully updated.");
            navigation.reset({
              index: 0,
              routes: [{ name: 'viewBusiness', params: { modeView: "details" } }],
            });
          }
        }
      }
    }
    else {
      createToast("Complete all the requested data.");
    }

  };
  /*
    NAME: createNewScheudable
    DESCRIPTION: Create a new scheudable in database
    IMPUT: None
    OUTPUT: None
  */
  const createNewScheudable = () => {
    if (selectedDay != "" && selectedDay != undefined && selectedHourOpen != undefined && selectedHourClose != undefined) {
      // Check if the dates are correct
      let time_open: Date = new Date(selectedHourOpen);
      let time_close: Date = new Date(selectedHourClose);

      // Calculate time difference in milliseconds
      let timeDifferenceMs: number = time_close.getTime() - time_open.getTime();
      // Convert time difference to hours
      let timeDifferenceHours: number = timeDifferenceMs / (1000 * 60 * 60);

      if (time_close < time_open) {
        createToast("Closing time must be longer than the opening time.");
        return;
      }

      if (timeDifferenceHours < 1) {
        createToast("There must be at least 1 hour between opening and closing time.");
        return;
      }

      let id_item: string = "" + listScheudable.length + 1;
      let newElementScheudable: ScheduleDataType = {
        _id: id_item,
        day_week: getPositionDay(selectedDay),
        time_open: time_open,
        time_close: time_close,
      };

      // Crear un nuevo arreglo con el nuevo elemento y los elementos existentes
      const updatedListScheudable = [...listScheudable, newElementScheudable];
      setListScheudable(updatedListScheudable);

      // Clear form
      setSelectedDay("");
      setSelectedHourOpen(undefined);
      setSelectedHourClose(undefined);
    } else {
      createToast("Complete all requested data to add a new time slot.");
    }
  };

  const enableModeEditable = () => {
    navigation.setOptions({ title: 'Modify your business details' });
    setModeForm("editable");
  }
  /*
    SECTION: Interaction with view
    DESCRIPTION: Methods for view logic
    LIST:
      - valueCityZipCodeChange
      - deleteItemArray
      - renderItem
  */
  const valueCityZipCodeChange = (value: any) => {
    setCityZipCode(value)
    // Get value by _id
    let element_selected = listCityZipCode.filter(element => element._id == value)[0]
    if (element_selected != undefined) {
      setProvince(element_selected?.state);
    }
  }
  const deleteItemArray = (item_delete: ScheduleDataType) => {

    if (modeForm != "details") {
      const updatedListScheudable = [...listScheudable];
      const indexToDelete = updatedListScheudable.findIndex((item) => item._id === item_delete._id);

      if (indexToDelete !== -1) {
        updatedListScheudable.splice(indexToDelete, 1);
      }

      setListScheudable(updatedListScheudable);
    }
  };
  const renderItem = ({ item }: { item: ScheduleDataType }) => (
    <TouchableOpacity onPress={() => deleteItemArray(item)}>
      <View style={stylesScheudable.item}>
        <Text>{getNameDay(item.day_week)}</Text>
        <Text>{TimeFormatter(item.time_open.toISOString())}</Text>
        <Text>{TimeFormatter(item.time_close.toISOString())}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles?.containerBase}>

      {modeForm == "details" ?
        <TouchableOpacity style={stylesScheudable.button} onPress={enableModeEditable}>
          <Text style={stylesScheudable.buttonText}>EDIT</Text>
        </TouchableOpacity>
        :
        undefined
      }

      <FormProvider {...form}>
        <RHFTextField
          name="name"
          label="Name"
          value={nameBussines}
          onChangeText={(value) => setNameBussines(value)}
          readOnly={modeForm == "details" ? true : false}
        />

        <RHFTextField
          name="address"
          label="Address"
          value={adressBussines}
          onChangeText={(value) => setAdressBussines(value)}
          readOnly={modeForm == "details" ? true : false}
        />

        <RHFTextField
          name="phone"
          label="Phone"
          keyboardType="phone-pad"
          maxLength={10}
          value={phoneBussines}
          onChangeText={(value) => setPhoneBussines(value)}
          readOnly={modeForm == "details" ? true : false}
        />

        <RHFTextField
          name="zip_code"
          label="Zip Code"
          keyboardType="phone-pad"
          mask="99999"
          maxLength={5}
          value={zipCodeBussines}
          onChangeText={(value) => getInfoAboutZipCode(value)}
          readOnly={modeForm == "details" ? true : false}
        />

        <MyPicker
          label="Select the city"
          selectedValue={cityZipCode != undefined ? cityZipCode : []}
          onValueChange={(value) => valueCityZipCodeChange(value)}
          options={listCityZipCode}
          getValue={(option) => option._id}
          getLabel={(option) => option.place_name}
          editable={listCityZipCode.length == 0 || listCityZipCode.length == 1 || modeForm == "details" ? false : true}
        />

        {modeForm != "details" ?
          <View style={stylesScheudable.container}>
            {/* Selector de día */}
            <View style={{ flex: 1 }}>
              <MyPicker
                label="Select the day"
                selectedValue={selectedDay}
                onValueChange={(value) => setSelectedDay(value)}
                options={listDays}
                getValue={(option) => option}
                getLabel={(option) => option}
              />
            </View>
            {/* Selector de hora 1 */}
            <View style={{ flex: 1 }}>
              <DatePicker
                name="picker1"
                label="Select opening time"
                mode="time"
                value={selectedHourOpen != undefined ? new Date(selectedHourOpen) : ""}
                onChange={(value) => setSelectedHourOpen(value)}
              />
            </View>
            {/* Selector de hora 2 */}
            <View style={{ flex: 1 }}>
              <DatePicker
                name="picker2"
                label="Select the closing time"
                mode="time"
                value={selectedHourClose != undefined ? new Date(selectedHourClose) : ""}
                onChange={(value) => setSelectedHourClose(value)}
              />
            </View>
          </View>
          :
          undefined}
      </FormProvider>

      {/* Botón */}
      {modeForm != "details" ?
        <TouchableOpacity style={stylesScheudable.button} onPress={createNewScheudable}>
          <Text style={stylesScheudable.buttonText}>ADD</Text>
        </TouchableOpacity>
        :
        undefined
      }

      <Text variant="titleMedium">Scheudable</Text>
      <FlatList data={listScheudable} renderItem={renderItem} keyExtractor={(item) => item._id} />

      <Button title="SAVE" onPress={() => form?.handleSubmit(createNewBussiness)()} />
    </View>
  );
}

const styles: any = StyleSheet.flatten([
  globalStyles,
  StyleSheet.create({
    inputLeftIcon: {
      marginRight: 1,
    },
  }),
]);

const stylesScheudable = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Cambiado a 'space-between' para distribuir los elementos
    marginBottom: 10,
    paddingHorizontal: 0, // Añadido para dar espacio horizontal a los elementos
  },
  button: {
    height: 25,
    backgroundColor: "#007AFF",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
