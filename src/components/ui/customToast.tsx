import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Toast from 'react-native-custom-toast';

const CustomToast = ({ message, duration, backgroundColor }) => {
  return (
    <Toast
      style={{ backgroundColor, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 }}
      position="bottom"
      textStyle={{ color: '#000000', fontSize: 16 }}
      fadeInDuration={750}
      fadeOutDuration={1000}
      visible={true}
      duration={duration}
    >
      {message}
    </Toast>
  );
};

export default CustomToast;