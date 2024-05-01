import { View, Button } from 'react-native'
import {FormProvider, useForm} from 'react-hook-form';
import {Icons, RHFTextField} from '../../components';

import React from 'react';
import {StyleSheet} from 'react-native';
import {UserDataType} from './types';
import globalStyles from '../../constants/globalStyles';
//import {useDispatch} from 'react-redux';
//import {userLogin} from '@app/redux/actions';

export default function Login(): JSX.Element {
  const form = useForm<UserDataType>();

  /*const dispatch = useDispatch();*/

  const onLoginPress = (formData: UserDataType) => {
    //dispatch(userLogin(formData));
  };


  // #region Text Input Icons
  const usernameIcon = (
    <Icons
      iconSet="Ionicons"
      name="person-outline"
      color="#000000"
      size={16}
      style={styles.inputLeftIcon}
    />
  );

  const passwordIcon = (
    <Icons
      iconSet="Ionicons"
      name="lock-closed-outline"
      color="#FFFFFF"
      size={16}
      style={styles.inputLeftIcon}
    />
  );
  // #endregion

  return (
    <View style={styles?.containerBase}>
      <FormProvider {...form}>
        <RHFTextField
          name="username"
          placeholder="Username"
          rules={{required: 'Enter any username please!'}}
          leadingAccessory={usernameIcon}
        />
        <RHFTextField
          name="password"
          placeholder="Password"
          rules={{required: 'Enter any password please!'}}
          leadingAccessory={passwordIcon}
          secureTextEntry={true}
        />
      </FormProvider>

      <Button
        title="Login"
        onPress={() => form?.handleSubmit(onLoginPress)()}
      />
    </View>
  );
}

const styles: any = StyleSheet.flatten([
  globalStyles,
  StyleSheet.create({
    inputLeftIcon: {
      marginRight: 8,
    },
  }),
]);
