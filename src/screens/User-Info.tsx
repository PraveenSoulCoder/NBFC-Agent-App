import React, { useEffect, useState, useRef } from "react";
import { Text, View, Dimensions, TouchableOpacity, Modal, TextInput, ToastAndroid, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { theme } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "react-native";
import * as Location from 'expo-location';
import RadioButton from "../components/RadioButton";
import PermissionModal from "../components/PermissionModal";
import { Camera } from 'expo-camera';
import PinchableImage from "../components/PinchableImage";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const User_Info = ({ navigation, route }: { navigation: any, route: any }) => {

    const [userDetails, setUserDetails] = useState({})
    const [permissionModal, setPermissionModal] = useState(false);
    const [permissionType, setPermissionType] = useState('');
    const [notesModal, setNotesModal] = useState(false);
    const [notes, setNotes] = useState({ subject: "User Information", body: "All the details are correct and verified" })
    const [selectedOption, setSelectedOption] = useState("No");
    const [openPhoto, setOpenPhoto] = useState(false)
    const [locationtrigger, setLocationTrigger] = useState(false)

    const verifyUser = (userDetails.houseLon && userDetails.houseLat)
        && (userDetails.housePhoto)
        && (userDetails.userPicture);

    useEffect(() => {
        if (route?.params?.fileUri) {
            console.log(route?.params?.fileUri)
            if (route?.params?.photoType == "house") {
                // setUserHousePhoto(route?.params?.fileUri)
                setUserDetails({ ...userDetails, housePhoto: route?.params?.fileUri })
            } else if (route?.params?.photoType == "profile") {
                // setUserProfilePhoto(route?.params?.fileUri)
                setUserDetails({ ...userDetails, userPicture: route?.params?.fileUri })
            }

            console.log("passRoute :", route?.params?.photoType)
            // }else if(route?.params?.type == "user"){
        } else {
            setUserDetails(route?.params?.data)
            console.log("userDetails", route?.params?.data.roleId)
        }
    }, [route]);

    // const getUserDetails = async () => {

    //     try {
    //         const apiKey = await AsyncStorage.getItem('apikey');
    //         console.log("ApiKey", apiKey)
    //         if (apiKey !== null) {
    //             await fetch(`http://192.168.1.22:6500/business/getDetails`, {
    //                 method: 'POST',
    //                 headers: {
    //                     Accept: 'application/json',
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     accId: "1001718080758",
    //                     apiKey: "TjJXNk9oNm14a2dobzR0K3NmK1dIY1BsRVMvMyswNktMRkV0MjBVRXJadz0=",
    //                     type: "user",
    //                 })
    //             })
    //                 .then((response) => response.json())
    //                 .then((responseData) => {
    //                     console.log("Response :", responseData)
    //                     if (responseData.Success) {
    //                         setUserDetails(responseData.Success)
    //                     }
    //                 })
    //         }
    //     } catch (e) {
    //         console.log("Error", e);
    //     }
    // }

    const verifyUserDetails = async () => {
        console.log("payload of the :", {
            apiKey: "M2hZZytlZU1vL3h0aWR2TXVoOUFhdTV1RmNRaWVnaGYxZ0Vpb0hBVmFKbz",
            roleId: userDetails?.roleId,
            loanId: userDetails?.loanId,
            houseLon: userDetails.houseLon,
            houseLat: userDetails.houseLat,
            housePhoto: userDetails.housePhoto,
            userPicture: userDetails.userPicture,
            subject: notes.subject,
            body: notes.body,
        })

        try {
            const apiKey = await AsyncStorage.getItem('apikey');
            if (apiKey !== null && userDetails.housePhoto && userDetails.userPicture && userDetails.houseLon && userDetails.houseLat && notes.subject !== "" && notes.body !== "") {
                await fetch(`http://192.168.1.22:6500/business/updateAgentVerify`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        apiKey: "M2hZZytlZU1vL3h0aWR2TXVoOUFhdTV1RmNRaWVnaGYxZ0Vpb0hBVmFKbz",
                        roleId: userDetails?.roleId,
                        loanId: userDetails?.loanId,
                        houseLon: userDetails.houseLon,
                        houseLat: userDetails.houseLat,
                        housePhoto: userDetails.housePhoto,
                        userPicture: userDetails.userPicture,
                        subject: notes.subject,
                        body: notes.body,
                    })
                })
                    .then((response) => response.json())
                    .then((responseData) => {
                        setNotesModal(false)
                        console.log("Response of the verify details of the user:", responseData)
                        if (responseData.Success) {
                            navigation.navigate("Home1", { no: userDetails.no })
                        }
                    })
            }
        } catch (e) {
            console.log("Error", e);
        }
    }

    const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {

        console.log(lat1)
        console.log(lon1)

        console.log(lat2)
        console.log(lon2)

        const R = 6371e3; // Radius of the Earth in meters
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in meters
        return distance;
    };

    const getCurrentLocation = async () => {
        setLocationTrigger(true)
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                openModal('Location')
                console.log('Permission to access location was denied');
                return;
            } else {
                console.log('Permission to access location granted');
            }

            let location = await Location.getCurrentPositionAsync({});

            console.log("location",location);

            const userLat = location.coords.latitude;
            const userLon = location.coords.longitude;

            const distance = getDistanceFromLatLonInMeters(userLat, userLon, userDetails.userLatitude, userDetails.userLongitude);
            console.log(`Distance to house: ${distance} meters`);

            if (distance <= 100) {
                ToastAndroid.show("Location fetched successfully", 3)
                setLocationTrigger(false)
                setUserDetails({ ...userDetails, houseLon: location.coords.longitude, houseLat: location.coords.latitude })
            } else {
                ToastAndroid.show("You need to be within 100 meters of the company", 3)

                console.log('User is not within 100 meters of the company');
                // Perform actions based on the user being outside of 100 meters
            }
        } catch (err) {
            console.log(err);
            //   setErrorMsg('An error occurred while fetching the location');
        }
    };

    const getCameraPermission = async (type) => {

        const { status } = await Camera.requestCameraPermissionsAsync();
        console.log("Camera permission", status);

        if (status !== "granted") {
            openModal('Camera');
        } else {
            if (type == "housePhoto") {
                navigation.navigate("FileCapture", { "screenName": "user-info", "action": "userHouse_" + userDetails.loanId + "", photoType: "house" })
            } else if (type == "userProfile") {
                navigation.navigate("FileCapture", { "screenName": "user-info", "action": "userProfile_" + userDetails.loanId + "", photoType: "profile" })
            }
        }

    }

    const notesModalHandler = () => {
        setNotesModal(!notesModal)
    }

    const openModal = (type) => {
        setPermissionType(type);
        setPermissionModal(true);
    };

    const closeModal = () => {
        setPermissionModal(false);
    };

    const handleSelect = (label: string) => {
        if (label == "No") {
            setNotes({ ...notes, body: "All the details are correct and verified" })
        } else {
            setNotes({ ...notes, body: "" })
        }
        setSelectedOption(label);
    };

    if (!userDetails || !userDetails.utilityBillImgUrl) {
        return null; // Or render some placeholder content
    }

    const isPdf = userDetails.utilityBillImgUrl.endsWith('.pdf');

    const handlePress = () => {
        if (isPdf) {
            Linking.openURL(userDetails.utilityBillImgUrl);
        }
    };

    const photoOpen = (type) => {
        console.log("Inside photoOpen")
        setOpenPhoto(true)
    }




    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.COLORS.secondary }}>
                <Header goBack={true} goBackColor={theme.COLORS.white} titleStyle={{ color: theme.COLORS.white, }} containerStyle={{ backgroundColor: theme.COLORS.primary, height: windowHeight / 9, borderBottomEndRadius: 25, borderBottomStartRadius: 25 }} title="User Information" />
                <ScrollView showsVerticalScrollIndicator={false} style={{ width: windowWidth - 20, height: windowHeight, alignSelf: "center", paddingVertical: 25, paddingHorizontal: 20, backgroundColor: theme.COLORS.white, marginTop: 20, borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>User Name </Text>
                        <Text style={{ width: "100%", color: theme.COLORS.bodyTextColor, backgroundColor: theme.COLORS.white, padding: 15, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary }}>{userDetails.userName}</Text>
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>User Email </Text>
                        <Text style={{ width: "100%", color: theme.COLORS.bodyTextColor, backgroundColor: theme.COLORS.white, padding: 15, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary }}>{userDetails.userEmail}</Text>
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>User DOB </Text>
                        <Text style={{ width: "100%", color: theme.COLORS.bodyTextColor, backgroundColor: theme.COLORS.white, padding: 15, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary }}>{userDetails.userDOB}</Text>
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>User Marital Status </Text>
                        <Text style={{ width: "100%", color: theme.COLORS.bodyTextColor, backgroundColor: theme.COLORS.white, padding: 15, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary }}>{userDetails.userMaritalStatus}</Text>
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>User Blood Group </Text>
                        <Text style={{ width: "100%", color: theme.COLORS.bodyTextColor, backgroundColor: theme.COLORS.white, padding: 15, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary }}>{userDetails.userBloodGroup}</Text>
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>User Educational Qualification </Text>
                        <Text style={{ width: "100%", color: theme.COLORS.bodyTextColor, backgroundColor: theme.COLORS.white, padding: 15, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary }}>{userDetails.userEducation}</Text>
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>User Permanent Address </Text>
                        <Text style={{ width: "100%", color: theme.COLORS.bodyTextColor, backgroundColor: theme.COLORS.white, padding: 15, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary, lineHeight: 20 }}>{userDetails.permanentHouseNo + ", " + userDetails.permanentStreet + ", " + userDetails.permanentCity + ", " + userDetails.permanentDistrict + "-" + userDetails.permanentPincode + ", " + userDetails.permanentState + ", " + userDetails.permanentCountry}</Text>
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>User Current Address </Text>
                        <Text style={{ width: "100%", color: theme.COLORS.bodyTextColor, backgroundColor: theme.COLORS.white, padding: 15, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary, lineHeight: 20 }}>{userDetails.currentHouseNo + ", " + userDetails.currentStreet + ", " + userDetails.currentCity + ", " + userDetails.currentDistrict + "-" + userDetails.currentPincode + ", " + userDetails.currentState + ", " + userDetails.currentCountry}</Text>
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>User Father Name </Text>
                        <Text style={{ width: "100%", color: theme.COLORS.bodyTextColor, backgroundColor: theme.COLORS.white, padding: 15, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary }}>{userDetails.userFatherName}</Text>
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>User Mother Name </Text>
                        <Text style={{ width: "100%", color: theme.COLORS.bodyTextColor, backgroundColor: theme.COLORS.white, padding: 15, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary }}>{userDetails.userMotherName}</Text>
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>User Religion </Text>
                        <Text style={{ width: "100%", color: theme.COLORS.bodyTextColor, backgroundColor: theme.COLORS.white, padding: 15, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary }}>{userDetails.userCommunity}</Text>
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>User Nationality </Text>
                        <Text style={{ width: "100%", color: theme.COLORS.bodyTextColor, backgroundColor: theme.COLORS.white, padding: 15, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary }}>{userDetails.userNationality}</Text>
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>User Utility Bill </Text>
                        <View style={{ width: "100%", color: theme.COLORS.bodyTextColor, overflow: "hidden", backgroundColor: theme.COLORS.white, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary }}>
                            <Text style={{ textAlign: "center", padding: 8, ...theme.FONTS.Mulish_700Bold, color: theme.COLORS.white, backgroundColor: theme.COLORS.primary }}>{userDetails.utilityBillType}</Text>
                            {isPdf ? (
                                <TouchableOpacity onPress={handlePress} style={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../assets/icons/pdf.png')} style={{ width: 100, height: 100, marginBottom: 15 }} />
                                    <Text style={{ color: theme.COLORS.primary, ...theme.FONTS.Mulish_700Bold }}>Open PDF to view</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={photoOpen}>
                                    <Image
                                        source={{ uri: userDetails.utilityBillImgUrl }}
                                        style={{ width: '100%', height: 200, objectFit: 'contain' }}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>



                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>User Residential status </Text>
                        <Text style={{ width: "100%", color: theme.COLORS.bodyTextColor, backgroundColor: theme.COLORS.white, padding: 15, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary }}>{userDetails.userResidentialOwnerShip}</Text>
                    </View>

                    {/* <Text style={{ textAlign: "center", padding: 8, ...theme.FONTS.Mulish_700Bold, fontSize: 20, marginBottom: 5, }}>Necessary Details</Text> */}
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>User House Photo </Text>
                        <TouchableOpacity onPress={() => getCameraPermission('housePhoto')} style={{ width: "100%", color: theme.COLORS.bodyTextColor, overflow: "hidden", backgroundColor: theme.COLORS.white, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary }}>
                            <Text style={{ textAlign: "center", padding: 8, ...theme.FONTS.Mulish_700Bold, color: theme.COLORS.white, backgroundColor: theme.COLORS.primary }}>House Image</Text>
                            {userDetails.housePhoto ?
                                <Image source={{ uri: userDetails.housePhoto }} style={{ width: "100%", height: 200, objectFit: "contain" }} /> :
                                <View style={{ width: "100%", height: 150, justifyContent: "center", alignItems: "center", backgroundColor: theme.COLORS.secondary }}>
                                    <Image source={require('../assets/icons/camera.png')} style={{ width: 50, height: 50, objectFit: "contain", marginBottom: 10, }} />
                                    <Text style={{ ...theme.FONTS.Mulish_700Bold, color: theme.COLORS.bodyTextColor }}>Take Photo</Text>
                                </View>
                            }
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>User Profile Photo </Text>
                        <TouchableOpacity onPress={() => { getCameraPermission('userProfile'); }} style={{ width: "100%", color: theme.COLORS.bodyTextColor, overflow: "hidden", backgroundColor: theme.COLORS.white, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary }}>
                            <Text style={{ textAlign: "center", padding: 8, ...theme.FONTS.Mulish_700Bold, color: theme.COLORS.white, backgroundColor: theme.COLORS.primary }}>Profile Image</Text>
                            {userDetails.userPicture ?
                                <Image source={{ uri: userDetails.userPicture }} style={{ width: "100%", height: 200, objectFit: "contain" }} /> :
                                <View style={{ width: "100%", height: 150, justifyContent: "center", alignItems: "center", backgroundColor: theme.COLORS.secondary }}>
                                    <Image source={require('../assets/icons/camera.png')} style={{ width: 50, height: 50, objectFit: "contain", marginBottom: 10, }} />
                                    <Text style={{ ...theme.FONTS.Mulish_700Bold, color: theme.COLORS.bodyTextColor }}>Take Photo</Text>
                                </View>
                            }
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginBottom: 50 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>User Current Location </Text>
                        <TouchableOpacity onPress={() => getCurrentLocation()} style={{ width: "100%", color: theme.COLORS.bodyTextColor, overflow: "hidden", backgroundColor: theme.COLORS.white, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary }}>
                            <Text style={{ textAlign: "center", padding: 8, ...theme.FONTS.Mulish_700Bold, color: theme.COLORS.white, backgroundColor: theme.COLORS.primary }}>Location Cordinates</Text>
                            {locationtrigger? 
                                <Image source={require('../assets/loader.gif')}  style={{ width: 40, height: 40,alignSelf:"center",margin:10, }}/> :
                                (userDetails.houseLon && userDetails.houseLat) ?
                                    <View style={{ width: "100%", padding: 10 }}>
                                        <Text style={{ ...theme.FONTS.Mulish_700Bold, color: theme.COLORS.bodyTextColor, fontSize: 12, textAlign: "center", borderRadius: 10, marginBottom: 10, borderColor: theme.COLORS.bodyTextColor, borderWidth: 0.5, padding: 10 }}>Latitude : {userDetails.houseLat}</Text>
                                        <Text style={{ ...theme.FONTS.Mulish_700Bold, color: theme.COLORS.bodyTextColor, fontSize: 12, textAlign: "center", borderRadius: 10, borderColor: theme.COLORS.bodyTextColor, borderWidth: 0.5, padding: 10 }}>Longitude : {userDetails.houseLon}</Text>
                                    </View> :
                                    <View style={{ width: "100%", padding: 10, justifyContent: "center", alignItems: "center", backgroundColor: theme.COLORS.secondary }}>
                                        <Image source={require('../assets/icons/location.png')} style={{ width: 50, height: 50, objectFit: "contain", marginBottom: 10, tintColor: theme.COLORS.primary }} />
                                        <Text style={{ ...theme.FONTS.Mulish_700Bold, color: theme.COLORS.bodyTextColor }}>Get User Location</Text>
                                    </View>

                            }
                        </TouchableOpacity>



                        <PermissionModal
                            permissionContent={permissionType}
                            visible={permissionModal}
                            closeModal={closeModal}
                        />


                    </View>


                    <TouchableOpacity disabled={!verifyUser} style={{ backgroundColor: theme.COLORS.primary, opacity: verifyUser ? 1 : 0.5, borderRadius: 15, alignSelf: 'flex-end', width: "50%", marginBottom: 20, paddingVertical: 10, }} onPress={notesModalHandler}>
                        <Text style={{ textAlign: "center", ...theme.FONTS.Mulish_700Bold, fontSize: 15, color: theme.COLORS.white }}>{userDetails.houseLat && userDetails.houseLon && userDetails.userPicture && userDetails.housePhoto ? "Update" : "Verify"}</Text>
                    </TouchableOpacity>

                    <View style={{ marginBottom: 15 }}>

                    </View>

                </ScrollView>

                <Modal transparent={true} animationType="none" visible={notesModal} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: "relative" }}>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: "#00000084" }} onPress={notesModalHandler} activeOpacity={1}></TouchableOpacity>
                    <View style={{ position: 'absolute', top: selectedOption === "Yes" ? "35%" : '45%', left: '50%', transform: [{ translateX: -(windowWidth - 40) / 2 }, { translateY: -25 }], width: windowWidth - 40, backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold, marginBottom: 15, fontSize: 17 }}>Are you facing any issues?</Text>
                        <View style={{ flexDirection: 'row', width: "100%", marginBottom: 15 }}>
                            <RadioButton
                                label="Option 1"
                                selected={selectedOption === 'No'}
                                onSelect={() => handleSelect("No")}
                                color={theme.COLORS.primary}
                                disabled={false}
                            />
                            <Text style={{ marginRight: 10 }}>No</Text>
                            <RadioButton
                                label="Option 2"
                                selected={selectedOption === 'Yes'}
                                onSelect={() => handleSelect("Yes")}
                                color={theme.COLORS.primary}
                                disabled={false}
                            />
                            <Text>Yes</Text>

                        </View>

                        {selectedOption === "Yes" &&
                            <TextInput placeholder="Enter Your Notes..." onChange={(e) => setNotes({ ...notes, body: e.nativeEvent.text })} placeholderTextColor={theme.COLORS.bodyTextColor}
                                multiline={true} numberOfLines={4} style={{
                                    width: '100%', padding: 10, borderRadius: 10, borderColor: theme.COLORS.bodyTextColor, borderWidth: 0.5, marginBottom: 15,
                                    textAlignVertical: 'top', color: theme.COLORS.bodyTextColor, height: 90,
                                }} value={notes.body} />
                        }

                        <TouchableOpacity style={{ backgroundColor: theme.COLORS.primary, borderRadius: 10, alignSelf: 'flex-end', width: "35%", paddingVertical: 7, justifyContent: "center", alignItems: "center" }} onPress={() => { verifyUserDetails() }}>
                            <Text style={{ color: theme.COLORS.white }}>Proceed</Text>
                        </TouchableOpacity>

                    </View>
                </Modal>


            </SafeAreaView>
            {openPhoto &&
                <View style={{ width: "100%", height: "100%", position: "absolute", }}>
                    <TouchableOpacity style={{ top: windowHeight/15, right: 20,alignSelf:"flex-end" , zIndex: 10}} onPress={() => setOpenPhoto(false)} >
                        <Image source={require('../assets/icons/cross.png')} style={{ width: 20, height: 20, tintColor: "white" }} />

                    </TouchableOpacity>
                    <PinchableImage uri={userDetails.utilityBillImgUrl} />
                </View>
            }
        </>
    );
};

export default User_Info;