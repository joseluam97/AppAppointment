import { DateTimePicker, TextField } from "react-native-ui-lib";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { globalStyles as styles } from "../../constants";
import { useColorScheme } from "react-native";
import { useController } from "react-hook-form";

interface DatePickerProps {
  name: string;
  rules?: Record<string, any>;
  defaultValue?: Date;
  onChange?: (date: Date) => void; // Nueva propiedad onChange
  value?: Date; // Nueva propiedad value
}

export default function DatePicker(props: DatePickerProps): JSX.Element {
  const { name, rules, defaultValue, onChange, value, ...restOfProps } = props;

  const {
    field,
    fieldState: { error },
  } = useController({ name, rules, defaultValue });

  const hasError: boolean = Boolean(error);

  const currentColorScheme: "dark" | "light" | undefined = useColorScheme() ?? undefined;
  
  return (
    <DateTimePicker
      {...restOfProps}
      themeVariant={currentColorScheme}
      is24Hour={true}
      locale="mn"
      mode="date"
      minimumDate={new Date()}
      labelStyle={stylePicker.label}
      floatOnFocus={true}
      floatingPlaceholder={false}
      containerStyle={[stylePicker.container]}
      fieldStyle={[stylePicker.picker]} 
      enableErrors={hasError}
      validationMessagePosition={TextField.validationMessagePositions.TOP}
      validationMessage={hasError ? error?.message : undefined}
      onChange={(date: Date) => {
        field.onChange(date?.toISOString() ?? null);
        if (onChange) {
          onChange(date); // Llama a la función onChange si está definida
        }
      }}
      value={value ?? (field.value ? new Date(field.value) : undefined)}
    />
  );
}

const stylePicker = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  picker: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingLeft: 15
  },
});
