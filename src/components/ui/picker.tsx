import {Picker, PickerModes, PickerValue, TextField} from 'react-native-ui-lib';
import {PickerItemType, PickerPropType} from './types';

import React from 'react';
import {globalStyles as styles} from '../../constants';
import {useController} from 'react-hook-form';


export default (props: PickerPropType): JSX.Element => {
  const {
    name,
    rules,
    defaultValue,
    optionList = [],
    labelProperty = 'id',
    value,
    onChange,
    ...restOfProps
  } = props;

  const {
    field,
    fieldState: {error},
  } = useController({name, rules, defaultValue});

  const hasError: boolean = Boolean(error);

  const RenderOptions = () => {
    return optionList?.map((item: PickerItemType, index: number) => {
      return (
        <Picker.Item key={index} value={item?.id} label={item['label']} />
      );
    });
  };

  const handlePickerChange = (selectedValue: PickerValue | undefined) => {
    const selectedItem = optionList.find(item => item.id === selectedValue);
    onChange(selectedItem); // Llamar a onChange con el elemento seleccionado
    field.onChange(selectedValue); // Actualizar el valor del campo de react-hook-form
  };

  return (
    <Picker
      {...restOfProps}
      //Picker props
      mode={PickerModes.SINGLE}
      topBarProps={{title: props?.placeholder}}
      // TextField props
      floatOnFocus={true}
      floatingPlaceholder={true}
      label={props?.label ?? props?.placeholder}
      enableErrors={hasError}
      validationMessagePosition={TextField.validationMessagePositions.TOP}
      validationMessage={hasError ? error?.message : undefined}
      containerStyle={[styles?.textFieldContainer, props?.containerStyle]}
      fieldStyle={[styles?.textField, props?.fieldStyle]}
      //Value props
      onChange={handlePickerChange}
      value={field.value}
      >
      {RenderOptions()}
    </Picker>
  );
};
