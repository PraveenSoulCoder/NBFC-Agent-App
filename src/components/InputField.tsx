import { View, TextInput, TouchableOpacity ,Keyboard} from "react-native";
import React, { useState } from "react";

import { theme } from "../constants";

export type Props = {
    placeholder: string;
    secureTextEntry?: boolean;
    icon?: any;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
    containerStyle?: any;
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
    maxLength?:number
    onChangeText?:(e:string) => void;
    onEndEditing?:() => void;
    editable?:boolean;
    value?:string;
    autoComplete?:string;
    onEditing?:string;
    autoCap?:boolean;
};

const InputField: React.FC<Props> = ({
    autoComplete,
    placeholder,
    autoCap,
    onEditing,
    containerStyle,
    secureTextEntry,
    keyboardType,
    onEndEditing,
    leftIcon,
    rightIcon,
    maxLength,
    onChangeText,
    editable,
    value
}) => {
    const [isFocused, setIsFocused] = useState(0);
    

    return (
        <View
            style={{
                height: 50,
                width: "100%",
                backgroundColor: theme.COLORS.white,
                paddingHorizontal: 20,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: isFocused
                    ? theme.COLORS.mainDark
                    : theme.COLORS.transparent,
                flexDirection: "row",
                alignItems: "center",
                ...containerStyle,
            }}
        >
            {leftIcon && leftIcon}
            <TextInput
                placeholder={placeholder}
                style={{
                    flex: 1,
                    height: "100%",
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    fontSize: 14,
                    lineHeight: 16 * 1,
                    ...theme.FONTS.Mulish_400Regular,
                }}
                secureTextEntry={secureTextEntry}
                placeholderTextColor={"#868698"}
                keyboardType={keyboardType}
                numberOfLines={1}
                autoCapitalize={autoCap ? "characters" : "none"}
                maxLength={maxLength}
                editable={editable}
                value={value}
                onChangeText={onChangeText}
                autoComplete="off"
                onSubmitEditing={Keyboard.dismiss}
                onEndEditing={onEndEditing}
                // onChangeText={setPhoneNumber}
                onFocus={() => setIsFocused(1)}
                onBlur={() => setIsFocused(0)}

            />
            {rightIcon && rightIcon}
        </View>
    );
};

export default InputField;
