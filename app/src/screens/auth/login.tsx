import { useEffect, useState, useRef } from "react";
import { View, Button, StyleSheet, Text, ToastAndroid } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { Icons, RHFTextField } from "../../components";

import React from "react";
import globalStyles from "../../constants/globalStyles";
import { loginUserAPIAction, initValue } from "../../store/user/actions";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from '@react-navigation/native';
import { StoreRootState } from "../../store/store";
import { UserDataType } from "../../models/user";

export default function Login({ navigation }: any): JSX.Element {
  const form = useForm<UserDataType>();

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [loginError, setLoginError] = useState<string | null>(null);

  const loggedin = useSelector((state: StoreRootState) => state?.user?.loggedin ?? undefined);
  const userData = useSelector((state: StoreRootState) => state?.user?.userData ?? undefined);

  const showToast = (message: string) => {
    /*ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      100,
    );*/
    ToastAndroid.show(message, ToastAndroid.SHORT);

  };

  // ELIMINAR
  /*useEffect(() => {
    if (isFocused) {
      dispatch(loginUserAPIAction({ email: "joseluastorga97@gmail.com", password: "1234" }));
      // dispatch(loginUserAPIAction({ email: "angelbenitez1997@gmail.com", password: "1234" }));
    }
  }, [isFocused]);*/

  // DESCOMENTAR
  useEffect(() => {
    if (isFocused) {
      dispatch(initValue());
    }
  }, [isFocused]);

  const reditToListAppointment = () => {

    const delay = 4000; // 4 segundos en milisegundos

    const timer = setTimeout(() => {
      // Esta función se ejecutará después de 4 segundos
      console.log('Han pasado 2 segundos');
      navigation.navigate('listAppointment')
    }, delay);

    // Es importante limpiar el temporizador para evitar fugas de memoria
    return () => clearTimeout(timer);

  }

  useEffect(() => {
    if (loggedin != undefined) {
      if (loggedin == true) {
        showToast("Successful login");
        // Redit to list appointment
        //reditToListAppointment();s
      } else {
        showToast("Login failed");
        handleResetForm();
      }
    }
  }, [loggedin]);

  /*const onLoginPress = (formData: any) => {

    dispatch(loginUserAPIAction({ email: formData.email, password: formData.password }));
  };*/

  const onLoginPress = async (formData: any) => {
    const resultAction = await dispatch(
      loginUserAPIAction({ email: formData.email, password: formData.password })
    );

    if (loginUserAPIAction.rejected.match(resultAction)) {
      // Captura el error desde payload
      const { status, message } = resultAction.payload || {};
      setLoginError(`Error (${status || "Unknown"}): ${message}`);
      setLoginError(`${message}`);
    } else {
      // Login exitoso
      console.log("Login successful:", resultAction.payload);
      setLoginError(null);
    }
  };

  // #region Text Input Icons
  const emailIcon = <Icons iconSet="Ionicons" name="person-outline" color="#000000" size={16} style={styles.inputLeftIcon} />;
  const passwordIcon = <Icons iconSet="Ionicons" name="lock-closed-outline" color="#000000" size={16} style={styles.inputLeftIcon} />;

  const handleResetForm = () => {
    form.reset();
  };

  return (
    <View style={styles?.containerBase}>
      <FormProvider {...form}>
        <RHFTextField name="email" placeholder="Email" leadingAccessory={emailIcon} />

        <RHFTextField name="password" placeholder="Password" leadingAccessory={passwordIcon} secureTextEntry={true} />
      </FormProvider>

      <Button title="Login" onPress={() => form?.handleSubmit(onLoginPress)()} />

      {loginError && (
        <Text style={{ color: "red", marginTop: 10 }}>
          {loginError}
        </Text>
      )}
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
