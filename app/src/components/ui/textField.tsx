import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextField } from "react-native-ui-lib";
import { TextFieldProps } from "./types";
import { globalStyles as styles } from "../../constants";
import { useController } from "react-hook-form";

export default (props: TextFieldProps): JSX.Element => {
  const { 
    label, 
    name, 
    rules, 
    defaultValue, 
    trailingAccessory, 
    showTrailingAccessoryAlways = false, 
    keyboardType, // Nuevo: Tipo de teclado para el campo de entrada
    mask, // Nuevo: Máscara para el campo de entrada
    maxLength, // Nueva: Longitud máxima del campo de entrada
    value,
    onChangeText,
    readOnly = false,
    ...restOfProps 
  } = props;

  const {
    field,
    fieldState: { error },
  } = useController({ name, rules, defaultValue });

  const hasError: boolean = Boolean(error);

  const trailingAccessoryElement = field.value?.length > 0 || showTrailingAccessoryAlways ? trailingAccessory : undefined;

  return (
    <View style={styleField.container}>
      <Text style={styleField.label}>{label}</Text>
      <TextField
        {...restOfProps}
        // TextField Props
        label={props?.label ?? props?.placeholder}
        floatOnFocus={true}
        floatingPlaceholder={true}
        style={[styleField.field, readOnly && styleField.readOnlyField]}
        enableErrors={hasError}
        validationMessagePosition={TextField.validationMessagePositions.TOP}
        validationMessage={hasError ? error?.message : undefined}
        trailingAccessory={trailingAccessoryElement}
        //Value props
        onChangeText={onChangeText}
        value={value}
        onBlur={field.onBlur}
        // Nuevas propiedades para campos específicos
        keyboardType={keyboardType} // Tipo de teclado para el campo de entrada
        mask={mask} // Máscara para el campo de entrada
        maxLength={maxLength}
        editable={!readOnly}
      />
    </View>
  );
};

const styleField = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: -14,
  },
  field: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingLeft: 15,
    
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  readOnlyField: {
    backgroundColor: "#f0f0f0", // Color de fondo para campos de solo lectura
    color: "#000", // Color de texto para campos de solo lectura
  },
});
