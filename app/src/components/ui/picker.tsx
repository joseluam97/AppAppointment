import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from "@react-native-picker/picker";

interface MyPickerProps<T> {
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  mode?: 'dialog' | 'dropdown';
  options: T[];
  getValue: (option: T) => string;
  getLabel: (option: T) => string;
  editable?: boolean; // Nueva propiedad
}

const MyPicker = <T extends unknown>({
  label,
  selectedValue,
  onValueChange,
  mode = 'dropdown',
  options,
  getValue,
  getLabel,
  editable = true, // Valor por defecto es true (editable)
}: MyPickerProps<T>) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={editable ? onValueChange : () => {}}
        style={[styles.picker, !editable && styles.disabledPicker]}
        mode={mode}
        enabled={editable} // Habilita o deshabilita el Picker
      >
        <Picker.Item label="" value="" />
        {options?.map((option, index) => (
          <Picker.Item
            key={index}
            label={getLabel(option)}
            value={getValue(option)}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    paddingHorizontal: 1,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  disabledPicker: {
    backgroundColor: '#e0e0e0', // Cambiar color de fondo para deshabilitado
  },
});

export default MyPicker;
