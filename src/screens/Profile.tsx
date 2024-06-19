import { View, Text, ScrollView, Image, BackHandler, StatusBar, Platform, Linking, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "../constants";
import Header from "../components/Header";
import LoadingBox from "../components/LoadingBox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LogOutSvg from "../svg/LogOutSvg";
const Profile: React.FC = ({ navigation }: any) => {
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [photoShow, setPhotoShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [roleId, setRoleId] = useState("");
  const renderHeader = () => {
    return (
      <Header goBack={true} containerStyle={{ backgroundColor: theme.COLORS.primary }} goBackColor="white" />
    );
  };


  const removeData = async () => {
    await AsyncStorage.removeItem('persist:root');
    await AsyncStorage.clear();
    navigation.push("Login");

  };


  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });

    return unsubscribe;
  }, [navigation]);

  const getData = async () => {
    const user: any = await AsyncStorage.getItem("userName");
    const role: any = await AsyncStorage.getItem("roleId");
    setUserName(user);
    setRoleId(role);
  };

  useEffect(() => {
    if (userName?.length > 0 && roleId?.length > 0) {
      setLoading(false)
    }
  }, [userName, roleId])


  const renderUserInfo = () => {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.COLORS.primary,
        }}
      >
        {photoShow ? (
          <Image
            source={{ uri: userPhoto }}
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              marginRight: 16,
            }}
          />
        ) : (
          <Image
            source={require("../assets/users/01.png")}
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              marginRight: 16,
            }}
          />
        )}

        <View>
          <Text
            numberOfLines={1}
            style={{
              ...theme.FONTS.H4,
              color: "white",
              marginBottom: 2,
            }}
          >
            {userName}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              ...theme.FONTS.Mulish_400Regular,
              color: "white",
              fontSize: 16,
              lineHeight: 16 * 1.6,
            }}
          >
            {roleId}
          </Text>
        </View>
      </View>
    );
  };

  const renderProfileCategory = () => {
    return (
      <View style={{ width: "100%", alignItems: "center", }}>
        <TouchableOpacity style={{ width: "90%",backgroundColor:theme.COLORS.white,padding:20,borderRadius:10 }} onPress={() => {removeData();}}>
          <LogOutSvg />
        </TouchableOpacity>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {renderUserInfo()}
        {renderProfileCategory()}
      </ScrollView>
    );
  };

  return !loading ? (
    <SafeAreaView style={{ flex: 1,backgroundColor:theme.COLORS.primary }}>
      {/* <View> */}
        {renderHeader()}
        {renderContent()}
      {/* </View> */}
      <StatusBar
        hidden={false}
        translucent={true}
        backgroundColor={"#f74d62"}
        barStyle={"light-content"}
      ></StatusBar>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={{ flex: 1 }}>
      <LoadingBox></LoadingBox>
    </SafeAreaView>
  );
};

export default Profile;