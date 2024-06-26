import {
  View,
  ImageBackground,
  Text,
  Dimensions,
  Pressable,
  StyleSheet,
  ToastAndroid,
  BackHandler,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import React, { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Passwordcenter from "../extra/passwordcenter";

import { theme } from "../constants";
import { components } from "../components";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Login: React.FC = ({ navigation, route }: any) => {
  const [password, setpassword] = useState<any>("");
  const [isPinReady, setIsPinReady] = useState(false);
  const [loading, setLoading] = useState(true);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [email,setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [usererrorMessage, setUserErrorMessage] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [regButton, setRegButton] = useState(false);

  const backAction = () => {
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  // useEffect(() => {

  //   if (route.params != undefined && route.params != null) {
  //     if (route.params.loginData !== undefined) {
  //       if (route.params.loginData == true) {
  //         setpassword("");
  //         setPhoneNumber("");
  //       }
  //     }
  //   }
  // },[route]);

  // const renderHeader = () => {
  //   return <components.Header goBack={true} goBackColor="white" />;
  // };

  const clearAppData = async function () {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error("Error clearing app data.");
    }
  };
  const removeData = async () => {
    //clearAppData();
    await AsyncStorage.clear();
    setLoading(false);
  };

  useEffect(() => {
    removeData();
  }, []);
  async function isPhoneAvaliable(myNumber: any) {
    setPhoneNumber(myNumber);
  }
  const storeData = async (roleId:any,apiKey: any,userName:any) => {
    try {
      await AsyncStorage.setItem("roleId", roleId);
      await AsyncStorage.setItem("apikey", apiKey);
      await AsyncStorage.setItem("userName", userName);
      navigation.replace("Home1");
    } catch (e) {
      // saving error
    }
  };

  const renderContent = () => {
    async function getNumber() {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        email != null &&
        email != undefined && regex.test(email)
      ) {
        setErrorMessage(false);
        if (
          password !== undefined &&
          password !== null &&
          password.length === 6 &&
          !isNaN(password)
        ) {
          setUserErrorMessage(false);
          // navigation.navigate("Home");
          await fetch("http://192.168.1.7:6500/business/loginRole", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "userPassword": password,
              "userEmail": email,
              "userRole":"AGENT"
            }),
          })
            .then((response) => response.json())
            .then((responseData) => {
              if(responseData.Success){
                var apiKey = responseData?.Success?.user[0]?.apiKey;
                var roleId = responseData?.Success?.user[0]?.roleId;
                var userName = responseData?.Success?.user[0]?.userName;
                console.log(apiKey);
                storeData(roleId,apiKey,userName);
              }else{
                ToastAndroid.show("Invalid Agent Details", 3)
              }
              console.log(responseData);
              // if (responseData.apiKey) {
              //   storeData(responseData.apiKey);
              // } else if (
              //   responseData.Error === "Login failed: check credentials"
              // ) {
              //   setUserErrorMessage(true);
              //   setpassword("");

              //   setTimeout(() => {
              //     setUserErrorMessage(false);
              //   }, 3000);
              // }
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          setpassword("");
          setUserErrorMessage(true);

          setTimeout(() => {
            setUserErrorMessage(false);
          }, 3000);
        }
      } else {
        setpassword("");
        setErrorMessage(true);

        setTimeout(() => {
          setErrorMessage(false);
        }, 3000);
      }
    }
    return (
      <View
        style={{
          paddingHorizontal: 20,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Text
          style={{
            ...theme.FONTS.H2,
            color: theme.COLORS.white,
            bottom: windowHeight / 10,
            fontSize: 38,
          }}>
          Login
        </Text>
        <View style={{ bottom: windowHeight / 15, marginTop: 15 }}>
          <components.InputField
            value={email}
            placeholder="E-mail"
            maxLength={50}
            onChangeText={(text) => {
              setEmail(text);
            }}
           
          />
          <Text
            style={{
              fontSize: 13,
              color: "white",
              margin: 10,
            }}>
            Enter Your Password
          </Text>
          <Passwordcenter
            code={password}
            setCode={setpassword}
            maximumLength={6}
            setIsPinReady={setIsPinReady}
          />
        </View>
        {usererrorMessage ? (
          <Text
            style={{
              fontSize: 12,
              color: "white",
              marginBottom: 10,
              textAlign: "center",
            }}>
            Enter Valid Passcode
          </Text>
        ) : null}
        {errorMessage ? (
          <Text
            style={{
              fontSize: 12,
              color: "white",
              marginBottom: 10,
              textAlign: "center",
            }}>
            Enter Valid Phone Number
          </Text>
        ) : null}
        {isPhone ? (
          <Text
            style={{
              fontSize: 12,
              color: "white",
              marginBottom: 10,
              textAlign: "center",
            }}>
            Account Not Available
          </Text>
        ) : null}
        <Pressable
          style={{
            backgroundColor: "white",
            width: windowWidth / 2,
            alignItems: "center",
            justifyContent: "center",
            height: 55,
            borderRadius: 50,
            elevation: 3,
            opacity: regButton ? 0.8 : 1,
          }}
          // onPress={() => navigation.navigate("SignUpAccountCreated")}
          //onPress={() => navigation.navigate("OTP")}
          onPress={getNumber}
          disabled={regButton}>
          <Text style={{ color: "#e32f45", fontSize: 17 }}>Confirm</Text>
        </Pressable>

      </View>
    );
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require("../assets/bg-04.png")}
        style={{ flex: 1, height: windowHeight + 45, width: windowWidth }}
        resizeMode="stretch">
        {/* {renderHeader()} */}
        {renderContent()}
      </ImageBackground>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  TextInputView: {
    backgroundColor: "white",
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 10,
    height: 55,
  },
  TextInputText: {
    fontSize: 30,
    textAlign: "center",
  },
});
