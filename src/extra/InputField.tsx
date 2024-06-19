import { View, TextInput, TouchableOpacity, Keyboard ,Text} from "react-native";
import React, { useState } from "react";

import { theme } from "../constants/theme";

export type Props = {
  placeholder: string;
  secureTextEntry?: boolean;
  icon?: any;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  containerStyle?: any;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  maxLength?: number;
  onChangeText?: (e: string) => void;
  editable?: boolean;
  value?: string;
  autoComplete?: string;
  onEditing?: string;
  label?: string
  lines?:number
};

const InputField: React.FC<Props> = ({
  placeholder,
  containerStyle,
  secureTextEntry,
  leftIcon,
  rightIcon,
  value,
  label,
  lines
}) => {
  const [isFocused, setIsFocused] = useState(0);

  return (
    <View style={{marginTop: 10,margin:10}}>
      <Text style={{...theme.FONTS.Mulish_600SemiBold}}>{label}</Text>
    <View
      style={{
        width: "100%",
        marginTop: 5,
        // backgroundColor: theme.COLORS.white,
        backgroundColor: "#FFF",
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.COLORS.mainDark,
        flexDirection: "row",
        alignItems: "center",
        ...containerStyle,
        shadowColor: "grey",
        elevation: 2,
      }}
    >
      {leftIcon && leftIcon}
      <TextInput
        placeholder={placeholder}
        style={{
          flex: 1,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          fontSize: 13,
          lineHeight: 19 * 1,
          color: "black",
          ...theme.FONTS.Mulish_400Regular,
          // letterSpacing:4
        }}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={"#868698"}
        numberOfLines={lines}
        editable={false}
        value={value}
        autoComplete="off"
        multiline={true}
        // onSubmitEditing={Keyboard.dismiss}
        // onChangeText={setPhoneNumber}
        onFocus={() => setIsFocused(1)}
      />
      {rightIcon && rightIcon}
    </View>
    </View>

  );
};

export default InputField;
