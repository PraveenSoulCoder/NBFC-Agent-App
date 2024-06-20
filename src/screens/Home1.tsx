import React, { useEffect, useState, useRef } from "react";
import { View, Text, Dimensions, TouchableOpacity, Image, TextInput, Keyboard, ToastAndroid, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../constants/theme";
import * as Location from 'expo-location';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modal } from "react-native";
import RadioButton from "../components/RadioButton";
import { useBackHandler } from "../components/ExitConfirmationModal";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Home1 = ({ navigation, route }: { navigation: any, route: any }) => {
    useBackHandler();

    const [searchPhone, setSearchPhone] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const [userName, setUserName] = useState("John Doe");
    const [apiKey, setApiKey] = useState("");
    const [roleId, setRoleId] = useState("");

    const [userFound, setUserFound] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [workDetails, setWorkDetails] = useState({});

    const [locationPermission, setLocationPermission] = useState(false);

    const [notesModal, setNotesModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState("No");

    const [notes, setNotes] = useState({ subject: "User Information", body: "All the details are correct and verified" })

    const submit = (
        !userDetails.houseLon || userDetails.houseLon.length <= 0 ||
        !userDetails.houseLat || userDetails.houseLat.length <= 0 ||
        !userDetails.housePhoto || userDetails.housePhoto.length <= 0 ||
        !userDetails.userPicture || userDetails.userPicture.length <= 0 ||
        !workDetails.companyLon || workDetails.companyLon.length <= 0 ||
        !workDetails.companyLat || workDetails.companyLat.length <= 0 ||
        !workDetails.companyPhoto || workDetails.companyPhoto.length <= 0 ||
        !userDetails.panPhoto || userDetails.panPhoto.length <= 0 ||
        !userDetails.aadhaarPhoto || userDetails.aadhaarPhoto.length <= 0
    );


//     const [backPressCount, setBackPressCount] = useState(0);

//   useEffect(() => {
//     const backAction = () => {
//       if (backPressCount === 0) {
//         setBackPressCount(backPressCount + 1);
//         ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);

//         setTimeout(() => setBackPressCount(0), 2000);

//         return true;
//       } else if (backPressCount === 1) {
//         BackHandler.exitApp();
//       }
//       return false;
//     };

//     const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

//     return () => backHandler.remove();
//   }, [backPressCount]);


    useEffect(() => {
        async function getasync() {
            try {
                const userName = await AsyncStorage.getItem('userName');
                console.log("userName", userName)
                if (userName !== null) {
                    setUserName(userName);
                }
                const roleId = await AsyncStorage.getItem('roleId');
                if (roleId !== null) {
                    setRoleId(roleId);
                }
                const apiKey = await AsyncStorage.getItem('apikey');
                if (apiKey !== null) {
                    setApiKey(apiKey);
                }

            } catch (err) {

            }
        }
        getasync();
        console.log("home page data :", userName, roleId, apiKey)
        getLocationPermission();
    }, []);

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener("focus", () => {
    //         if (searchPhone.length === 10) {
    //             console.log("navigation listener is working")
    //             getDetails();
    //         } else {
    //             console.log("search phone length is not 10:", searchPhone)
    //         }
    //     });

    //     return unsubscribe;
    // }, [navigation]);

    useEffect(() => {
        console.log("route listener is working",searchPhone)
        if (searchPhone.length === 10) {
            getDetails();
        }
    }, [searchPhone, route]);



    // overall functions

    const getDetails = async () => {
        console.log("parameters :", roleId, searchPhone, apiKey)
        try {
            if (searchPhone !== null && searchPhone !== undefined && searchPhone.length == 10) {
                await fetch(`http://192.168.1.22:6500/business/getAgentVerifyLoans`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }, body: JSON.stringify({
                        "roleId": roleId,
                        "userPhone": searchPhone,
                        "apiKey": apiKey
                    })
                })
                    .then((response) => response.json())
                    .then(async (responseData) => {
                        Keyboard.dismiss();

                        if (responseData.Success) {
                            console.log("Response data of get details is working", responseData )

                            const extractedUserDetails = {
                                currentCity: responseData.Success.currentCity,
                                currentCountry: responseData.Success.currentCountry,
                                currentDistrict: responseData.Success.currentDistrict,
                                currentHouseNo: responseData.Success.currentHouseNo,
                                currentLandmark: responseData.Success.currentLandmark,
                                currentPincode: responseData.Success.currentPincode,
                                currentState: responseData.Success.currentState,
                                currentStreet: responseData.Success.currentStreet,
                                loanStatus: responseData.Success.loanStatus,
                                passcode: responseData.Success.passcode,
                                permanentCity: responseData.Success.permanentCity,
                                permanentCountry: responseData.Success.permanentCountry,
                                permanentDistrict: responseData.Success.permanentDistrict,
                                permanentHouseNo: responseData.Success.permanentHouseNo,
                                permanentLandmark: responseData.Success.permanentLandmark,
                                permanentPincode: responseData.Success.permanentPincode,
                                permanentState: responseData.Success.permanentState,
                                permanentStreet: responseData.Success.permanentStreet,
                                userAge: responseData.Success.userAge,
                                userBloodGroup: responseData.Success.userBloodGroup,
                                userCommunity: responseData.Success.userCommunity,
                                userDOB: responseData.Success.userDOB,
                                userEducation: responseData.Success.userEducation,
                                userEmail: responseData.Success.userEmail,
                                userEmailVerified: responseData.Success.userEmailVerified,
                                userFatherName: responseData.Success.userFatherName,
                                userGST: responseData.Success.userGST,
                                userGender: responseData.Success.userGender,
                                userLatitude: responseData.Success.userLatitude,
                                userLongitude: responseData.Success.userLongitude,
                                userMaritalStatus: responseData.Success.userMaritalStatus,
                                userMotherName: responseData.Success.userMotherName,
                                userName: "Manish",  // This value is base64 encoded in the original JSON and should be decoded.
                                userNationality: responseData.Success.userNationality,
                                userPhone: responseData.Success.userPhone,
                                userProfilePic: responseData.Success.userProfilePic,
                                userResidentialOwnerShip: responseData.Success.userResidentialOwnerShip,
                                utilityBillImgUrl: responseData.Success.utilityBillImgUrl,
                                utilityBillType: responseData.Success.utilityBillType,
                                loanId: responseData.Success.loanId,
                                roleId: roleId,
                                userPicture: responseData.Success.userPicture,
                                housePhoto: responseData.Success.housePhoto,
                                houseLon: responseData.Success.houseLon,
                                houseLat: responseData.Success.houseLat,
                                aadhaarPhoto: responseData.Success.aadhaarPhoto,
                                panPhoto: responseData.Success.panPhoto,
                                userPicture: responseData.Success.userPicture,
                                userLatitude: responseData.Success.userLatitude,
                                userLongitude: responseData.Success.userLongitude,
                                agreementPhoto: responseData.Success.agreementPhoto,
                                no: searchPhone
                            };
                            setUserDetails(extractedUserDetails);

                            const extractedWorkDetails = {
                                companyName: responseData.Success.companyName,
                                companyCity: responseData.Success.companyCity,
                                companyCountry: responseData.Success.companyCountry,
                                companyDesignation: responseData.Success.companyDesignation,
                                companyDistrict: responseData.Success.companyDistrict,
                                companyEmail: responseData.Success.companyEmail,
                                companyEmployeeId: responseData.Success.companyEmployeeId,
                                companyIdPhoto: responseData.Success.companyIdPhoto,
                                companyJoinDate: responseData.Success.companyJoinDate,
                                companyJoiningLetter: responseData.Success.companyJoiningLetter,
                                companyLandmark: responseData.Success.companyLandmark,
                                companyLat: responseData.Success.companyLat,
                                companyLatitude: responseData.Success.companyLatitude,
                                companyLon: responseData.Success.companyLon,
                                companyLongitude: responseData.Success.companyLongitude,
                                companyPhoto: responseData.Success.companyPhoto,
                                companyPincode: responseData.Success.companyPincode,
                                companySalary: responseData.Success.companySalary,
                                companyState: responseData.Success.companyState,
                                companyStreet: responseData.Success.companyStreet,
                                companyTotalExp: responseData.Success.companyTotalExp,
                                companyType: responseData.Success.companyType,
                                loanId: responseData.Success.loanId,
                                roleId: roleId,
                                no: searchPhone

                            }
                            setWorkDetails(extractedWorkDetails);
                            setUserFound(true);

                        } else {
                            setUserFound(false);
                            ToastAndroid.show("Loan Not Found on this Number", 3)
                        }
                    }).catch(err => console.log(err))
            }
        } catch (err) {
            setLocationPermission(false);
            console.log(err)
        }
    }

    const verifyData = async () => {
        console.log("payload of the :", {
            apiKey: "M2hZZytlZU1vL3h0aWR2TXVoOUFhdTV1RmNRaWVnaGYxZ0Vpb0hBVmFKbz",
            roleId: userDetails?.roleId,
            loanId: userDetails?.loanId,
            status: "DOCUMENT_SUBMITTED",
            subject: notes.subject,
            body: notes.body,
        })
        setNotesModal(false)
        try {
            const apiKey = await AsyncStorage.getItem('apikey');
            if (apiKey !== null && submit == false) {
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
                        status: "DOCUMENT_SUBMITTED",
                        subject: notes.subject,
                        body: notes.body,
                    })
                })
                    .then((response) => response.json())
                    .then((responseData) => {
                        console.log("Response of the verify details of the user:", responseData)
                        if (responseData.Success) {
                            ToastAndroid.show("User Verified Successfully", 3)
                            getDetails()
                        }
                    })
            }
        } catch (e) {
            console.log("Error", e);
        }
    }

    async function getLocationPermission() {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocationPermission(false);
                return;
            } else {
                setLocationPermission(true);
            }
            let location = await Location.getCurrentPositionAsync({});
            console.log(location);
        } catch (err) {
            console.log(err)
        }

        // setLocation(location);
    }

    const notesModalHandler = () => {
        setNotesModal(!notesModal)
    }

    const handleSelect = (label: string) => {
        if (label == "No") {
            setNotes({ ...notes, body: "All the details are correct and verified" })
        } else {
            setNotes({ ...notes, body: "" })
        }
        setSelectedOption(label);
    };

    return (
        <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: theme.COLORS.secondary }} >

            <View style={{ width: windowWidth, backgroundColor: theme.COLORS.primary, height: windowHeight / 7, borderBottomStartRadius: 50, borderBottomEndRadius: 50, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginBottom: 20 }}>
                <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                    <Image source={require('../assets/users/01.png')} style={{ width: 45, height: 45, }} />
                </TouchableOpacity>
                <Text style={{ color: "white", ...theme.FONTS.Mulish_700Bold, fontSize: 20, marginLeft: 15 }}>Welcome, {userName}</Text>
            </View>

            <View style={{ marginBottom: 20 }}>
                <Text style={{ color: "black", ...theme.FONTS.Mulish_600SemiBold, fontSize: 17,textAlign:"center",marginBottom:5 }}>Search User</Text>
                <TextInput value={searchPhone} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} maxLength={10} onChangeText={(text) => setSearchPhone(text)} keyboardType="numeric" placeholderTextColor={"lightgrey"}
                    style={{ borderColor: isFocused ? theme.COLORS.primary : "lightgrey", borderWidth: 2, height: 50, width: 300, paddingHorizontal: 25,color:theme.COLORS.bodyTextColor, borderRadius: 25, backgroundColor: "white", }}
                    placeholder="User Number" />
            </View>

            <View style={{ width: windowWidth, flex: 1, elevation: 10,borderTopWidth:2,borderColor:"lightgrey", alignItems: "center", justifyContent: 'space-between', backgroundColor: "white", borderTopLeftRadius: 50, borderTopRightRadius: 50, paddingTop: 40 }}>

                {userFound ?
                    <>
                        <View style={{ width: "100%", alignItems: "center" }}>
                            <TouchableOpacity onPress={() => navigation.navigate("user-info", { data: userDetails })} style={{ width: "90%", backgroundColor: theme.COLORS.primary, padding: 20, borderRadius: 20, alignItems: "center", justifyContent: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", width: "70%" }}>
                                    <Image source={require('../assets/icons/user-info.png')} style={{ width: 28, height: 28, tintColor: "white" }}></Image>
                                    <Text style={{ color: "white", ...theme.FONTS.Mulish_500Medium, fontSize: 17, marginLeft: 17 }}>User Information</Text>
                                </View>
                                {userDetails.houseLon && userDetails.houseLat && userDetails.housePhoto && userDetails.userPicture ?
                                    <Image source={require('../assets/icons/checked.png')} style={{ width: 31, height: 31, tintColor: "lightgreen", }}></Image> :
                                    // <Image source={require('../assets/icons/check.png')} style={{ width: 31, height: 31, tintColor: "white" }}></Image>
                                    <View style={{ width: 31, height: 31, borderWidth: 2.5, borderColor: "white", borderRadius: 15, backgroundColor: "rgba(255, 255, 255, 0.5)", }} />

                                }
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate("work-info", { data: workDetails })} style={{ width: "90%", backgroundColor: theme.COLORS.primary, padding: 20, borderRadius: 20, alignItems: "center", justifyContent: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", width: "70%" }}>
                                    <Image source={require('../assets/icons/work-info.png')} style={{ width: 28, height: 28, tintColor: "white" }}></Image>
                                    <Text style={{ color: "white", ...theme.FONTS.Mulish_500Medium, fontSize: 17, marginLeft: 17 }}>Work Information</Text>
                                </View>
                                {workDetails.companyLon && workDetails.companyLat && workDetails.companyPhoto ?
                                    <Image source={require('../assets/icons/checked.png')} style={{ width: 31, height: 31, tintColor: "lightgreen" }}></Image> :
                                    // <Image source={require('../assets/icons/check.png')} style={{ width: 31, height: 31, tintColor: "white" }}></Image>
                                    <View style={{ width: 31, height: 31, borderWidth: 2.5, borderColor: "white", borderRadius: 15, backgroundColor: "rgba(255, 255, 255, 0.5)", }} />

                                }
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate("doc-info", { data: { roleId: userDetails.roleId, loanId: userDetails.loanId, panPhoto: userDetails.panPhoto, aadhaarPhoto: userDetails.aadhaarPhoto, agreementPhoto: userDetails.agreementPhoto, no: searchPhone } })} style={{ width: "90%", backgroundColor: theme.COLORS.primary, padding: 20, borderRadius: 20, alignItems: "center", justifyContent: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", width: "70%" }}>
                                    <Image source={require('../assets/icons/doc-info.png')} style={{ width: 28, height: 28, tintColor: "white" }}></Image>
                                    <Text style={{ color: "white", ...theme.FONTS.Mulish_500Medium, fontSize: 17, marginLeft: 17 }}>Document Information</Text>
                                </View>
                                {userDetails.panPhoto && userDetails.aadhaarPhoto ?
                                    <Image source={require('../assets/icons/checked.png')} style={{ width: 31, height: 31, tintColor: "lightgreen" }}></Image> :
                                    // <Image source={require('../assets/icons/check.png')} style={{ width: 31, height: 31, tintColor: "white" }}></Image>
                                    <View style={{ width: 31, height: 31, borderWidth: 2.5, borderColor: "white", borderRadius: 15, backgroundColor: "rgba(255, 255, 255, 0.5)", }} />

                                }
                            </TouchableOpacity>

                        </View>
                        <View style={{ width: "90%", padding: 0, alignSelf: 'center', alignItems: "flex-end" }}>
                            <TouchableOpacity disabled={submit} onPress={notesModalHandler} style={{ backgroundColor: theme.COLORS.primary, opacity: submit ? 0.5 : 1, borderRadius: 15, width: "50%", paddingVertical: 7, marginBottom: 20 }}>
                                <Text style={{ textAlign: "center", padding: 8, ...theme.FONTS.Mulish_700Bold, fontSize: 16, color: theme.COLORS.white, }}>Submit</Text>
                            </TouchableOpacity>
                        </View>

                    </>
                    :
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Image source={require('../assets/icons/doc-info.png')} style={{ width: 120, height: 120, alignSelf: "center", marginBottom: 20 }}></Image>
                        <Text style={{ ...theme.FONTS.Mulish_700Bold, fontSize: 17 }}>No Data</Text>
                    </View>
                }

            </View>

            <Modal transparent={true} animationType="none" visible={notesModal} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: "relative" }}>
                <TouchableOpacity style={{ flex: 1, backgroundColor: "#00000084" }} onPress={notesModalHandler} activeOpacity={1}></TouchableOpacity>
                <View style={{ position: 'absolute', top: selectedOption === "Yes" ? "40%" : '45%', left: '50%', transform: [{ translateX: -(windowWidth - 40) / 2 }, { translateY: -25 }], width: windowWidth - 40, backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
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

                    <TouchableOpacity style={{ backgroundColor: theme.COLORS.primary, borderRadius: 10, alignSelf: 'flex-end', width: "35%", paddingVertical: 7, justifyContent: "center", alignItems: "center" }} onPress={() => { verifyData() }}>
                        <Text style={{ color: theme.COLORS.white }}>Proceed</Text>
                    </TouchableOpacity>

                </View>
            </Modal>

        </SafeAreaView>
    )

}

export default Home1;
