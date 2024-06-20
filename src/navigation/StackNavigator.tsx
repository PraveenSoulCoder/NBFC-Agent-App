import React, { useEffect, useState, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screens } from "../screens";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";




const Stack = createStackNavigator();

const StackNavigator: React.FC = ({ }: any) => {
  const navigation: any = useNavigation();



  const [initialScreen, setInitialScreen] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("userName");
        const getPhone = await AsyncStorage.getItem("roleId");
        const apiKey = await AsyncStorage.getItem("apikey");
        if (value && getPhone && apiKey) {
          setInitialScreen("Home1");
        } else {
          setInitialScreen("Login");
        }
      } catch (e) {
        // handle error
      }
    };

    getData();
  }, []);




  useEffect(() => {
    if (initialScreen) {
      navigation.navigate(initialScreen);
      // if(initialScreen=="TabNavigator"){
      //   navigation.navigate(initialScreen,{myRoute:"yes",screenName:"Home"});
      // }else{
      //   navigation.navigate(initialScreen);
      // }
    }
  }, [initialScreen, navigation]);


  return (
    <Stack.Navigator
      initialRouteName={initialScreen}
      screenOptions={{
        gestureEnabled: false,
        cardStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen
        name="LoadingScreen"
        component={screens.LoadingScreen}
        options={{ headerShown: false, headerLeft: () => null }}
      />
      {/* <Stack.Screen
        name="Home"
        component={screens.Home}
        options={{ headerShown: false, headerLeft: () => null }}
      /> */}

      <Stack.Screen
        name="Home1"
        component={screens.Home1}
        options={{ headerShown: false, headerLeft: () => null }}
      />

      <Stack.Screen
        name="user-info"
        component={screens.User_Info}
        options={{ headerShown: false, headerLeft: () => null }}
      />

      <Stack.Screen
        name="work-info"
        component={screens.Work_Info}
        options={{ headerShown: false, headerLeft: () => null }}
      />

      <Stack.Screen
        name="doc-info"
        component={screens.Document_Info}
        options={{ headerShown: false, headerLeft: () => null }}
      />

      <Stack.Screen
        name="Profile"
        component={screens.Profile}
        options={{ headerShown: false, gestureEnabled: true, gestureDirection: "horizontal" }}
      />

      <Stack.Screen
        name="FileCapture"
        component={screens.FileCapture}
        options={{ headerShown: false, gestureEnabled: true, gestureDirection: "horizontal" }}
      />

      <Stack.Screen
        name="Webview"
        component={screens.WebviewScreen}
        options={{ headerShown: false, gestureEnabled: true, gestureDirection: "horizontal" }}
      />



      <Stack.Screen
        name="Login"
        component={screens.Login}
        options={{ headerShown: false }}
      />


    </Stack.Navigator>
  );
};

export default StackNavigator;
