import { View, Text, TouchableOpacity, TextInput, Alert ,BackHandler} from "react-native";
import React, { useState ,useEffect} from "react";
import { useNavigation } from "@react-navigation/native";

import { svg } from "../svg";
import { theme } from "../constants";

type Props = {
    containerStyle?: any;
    goBack?: boolean;
    burgerMenu?: boolean;
    title?: string;
    logo?: boolean;
    search?: boolean;
    bag?: boolean;
    border?: boolean;
    titleStyle?: any;
    arrowColor?: string;
    fileIcon?: boolean;
    goBackColor?: string;
    homeGoBack?: boolean;
    homeGoBackScreen?: object;
};

const Header: React.FC<Props> = ({
    containerStyle,
    goBack,
    title,
    logo,
    search,
    bag,
    border,
    titleStyle,
    arrowColor,
    fileIcon,
    goBackColor,
    homeGoBack,
    homeGoBackScreen
}) => {
    const navigation: any = useNavigation();
    const [lastBackPressed, setLastBackPressed] = useState(0);

    const backAction = () => {
  
      if (lastBackPressed===0) {
        if(homeGoBack){
            navigation.navigate("TabNavigator", homeGoBackScreen);
        }else{
          navigation.goBack();
        }
        setLastBackPressed(lastBackPressed+1);
        return true;
      }
       
      return true;
    };
  
    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [lastBackPressed, navigation]);
  
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: 47,
                borderBottomWidth: border ? 1 : 0,
                ...containerStyle,
            }}
        >
            {(goBack || homeGoBack) && (
                <View
                    style={{
                        position: "absolute",
                        left: 0,
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity
                        style={{
                            paddingHorizontal: 20,
                            paddingVertical: 12,
                        }}
                        onPress={() => backAction()}
                    >
                        <svg.GoBackSvg goBackColor={goBackColor} />
                    </TouchableOpacity>
                </View>
            )}
            {title && (
                <Text
                    style={{
                        textAlign: "center",
                        ...theme.FONTS.H4,
                        color: theme.COLORS.mainDark,
                        ...titleStyle,
                    }}
                >
                    {title}
                </Text>
            )}
            {search && (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: theme.SIZES.width - 200,
                    }}
                >
                    <View style={{ marginRight: 7 }}>
                        {/* <svg.HeaderSearchSvg /> */}
                    </View>

                    <TextInput
                        placeholder="Search"
                        style={{ height: "100%", width: "100%" }}
                    />
                </View>
            )}
            {fileIcon && (
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        right: 0,
                        height: "100%",
                        justifyContent: "center",
                        paddingLeft: 20,
                    }}
                >
                    <View
                        style={{
                            paddingHorizontal: 20,
                            flexDirection: "row",
                            paddingVertical: 6,
                        }}
                    >
                        <svg.FileTextSvg />
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Header;
