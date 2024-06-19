import React from 'react';
import { View, Image, StyleSheet ,Text} from 'react-native';

import { theme } from "../constants";
import Checkbox from 'expo-checkbox';

export type Props = {
  label?: string
  isChecked?: boolean
  onValueChange?: (value: boolean) => void
  checkBoxValue?: string
};
const CheckBoxField : React.FC<Props> =  ({label,isChecked, onValueChange,checkBoxValue}) => {
  return (
    <View style={styles.container}>
      <Text style={{...theme.FONTS.Mulish_600SemiBold}}>{label}</Text>
     <View style={styles.section}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={onValueChange}
          color={isChecked ? '#e32f45' : undefined}
        />
        <Text style={styles.paragraph}>{checkBoxValue}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 15,
      },
      section: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      paragraph: {
        fontSize: 15,
      },
      checkbox: {
        margin: 8,
        padding: 10,
      },
    
});

export default CheckBoxField;
