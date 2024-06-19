import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setScreen } from "../store/tabSlice";
import { useRoute, useNavigation } from "@react-navigation/native";
import { theme } from "../constants";
import { svg } from "../svg";
import { screens } from "../screens";

const TabNavigator = () => {
  const position = new Animated.Value(0);
  const dispatch = useDispatch();
  const route :any = useRoute();
  const navigation = useNavigation();
  const currentScreen = route.params?.myRoute === "yes"
    ? route.params.screenName
    : useSelector((state:any) => state.tab.screen);

  const moveTop = () => {
    Animated.timing(position, {
      toValue: 0.05,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const moveBack = () => {
    Animated.timing(position, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const interpolateY = position.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -200],
  });

  enum Tab {
    Calculator = "Calculator",
    Home = "Home",
    More = "More",
  }

  useEffect(() => {
    currentScreen === Tab.Home ? moveTop() : moveBack();
  }, [currentScreen]);

  const tabs = [
    {
      name: Tab.Calculator,
      icon: (
        <svg.Calculator
          color={currentScreen === Tab.Calculator ? theme.COLORS.linkColor : theme.COLORS.bodyTextColor}
        />
      ),
    },
    {
      name: Tab.Home,
      icon: (
        <Animated.View
          style={{
            position: "relative",
            bottom: 20,
            // marginBottom: -45,
            elevation: currentScreen === Tab.Home ? 7 : 0,
            shadowColor: currentScreen === Tab.Home ? "#e32f45" : "#000",
            transform: [{ translateY: interpolateY }],
            zIndex: currentScreen === Tab.Home ? 10 : 0,
            
          }}
        >
          <View
            style={{
              width: 68,
              height: 68,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ padding: 10 ,alignContent: "center",
            alignItems: "center",
            justifyContent: "center",}}>
              <svg.HomeSvg
                color={theme.COLORS.white}
              />
              <Text style={{ ...theme.FONTS.Mulish_700Bold, color: "white", paddingTop: 5 }}>
                Home
              </Text>
            </View>
          </View>
        </Animated.View>
      ),
    },
    {
      name: Tab.More,
      icon: (
        <svg.MoreSvg
          color={currentScreen === Tab.More ? theme.COLORS.linkColor : theme.COLORS.bodyTextColor}
        />
      ),
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.COLORS.bgColor }}>
      {currentScreen === Tab.Calculator && <screens.LoanCalc />}
      {currentScreen === Tab.Home && <screens.Home />}
      {currentScreen === Tab.More && <screens.More />}

      <View style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        // padding: 5,
        // paddingBottom: 28,
        // paddingTop: 1,
        backgroundColor: theme.COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingRight: 25,
      }}>
        {tabs.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            onPress={() => {
              navigation.setParams({ "myRoute": "no" });
              dispatch(setScreen(item.name));
            }}
          >
            <View style={{ alignSelf: "center", marginBottom: 6 }}>
              {item.icon}
            </View>
            {
              item.name !== "Home"  &&(
                <Text style={{
                  textAlign: "center",
                  ...theme.FONTS.Mulish_600SemiBold,
                  fontSize: 12,
                  color: item.name === currentScreen ? theme.COLORS.linkColor : theme.COLORS.mainDark,
                }}>
                  {item.name}
                </Text>
              )
            }
           
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default TabNavigator;

