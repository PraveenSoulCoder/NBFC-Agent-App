import React from 'react';
import { View, Image, StyleSheet ,Text} from 'react-native';

import { theme } from "../constants";

export type Props = {
url?: string,
  label?: string
};
const ImageField : React.FC<Props> =  ({url,label}) => {
  return (
    <View style={styles.container}>
      <Text style={{...theme.FONTS.Mulish_600SemiBold}}>{label}</Text>
      <Image 
        source={{ uri: url }} 
        style={styles.image} 
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default ImageField;
