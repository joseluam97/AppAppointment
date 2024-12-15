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
    keyboardType,
    mask,
    maxLength,
    readOnly = false,
    ...restOfProps
  } = props;

  // Integración con react-hook-form
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({ name, rules, defaultValue });

  const hasError: boolean = Boolean(error);

  const trailingAccessoryElement =
    (value?.length > 0 || showTrailingAccessoryAlways) && trailingAccessory ? trailingAccessory : undefined;

  return (
    <View style={styleField.container}>
      {label && <Text style={styleField.label}>{label}</Text>}
      <TextField
        {...restOfProps}
        label={label ?? props?.placeholder}
        floatOnFocus={true}
        floatingPlaceholder={true}
        style={[styleField.field, readOnly && styleField.readOnlyField]}
        enableErrors={hasError}
        validationMessagePosition={TextField.validationMessagePositions.TOP}
        validationMessage={hasError ? error?.message : undefined}
        trailingAccessory={trailingAccessoryElement}
        // Vinculando los eventos con react-hook-form
        onChangeText={onChange} // Actualiza el estado del formulario
        value={value} // Estado controlado por react-hook-form
        onBlur={onBlur} // Maneja el evento onBlur
        // Nuevas propiedades específicas
        keyboardType={keyboardType}
        mask={mask}
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
    backgroundColor: "#f0f0f0",
    color: "#000",
  },
});
