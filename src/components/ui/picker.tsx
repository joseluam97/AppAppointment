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
}

const MyPicker = <T extends unknown>({
  label,
  selectedValue,
  onValueChange,
  mode = 'dropdown',
  options,
  getValue,
  getLabel,
}: MyPickerProps<T>) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
        mode={mode}
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
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
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
});

export default MyPicker;
