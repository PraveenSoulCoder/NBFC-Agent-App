import {
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Text,
  Dimensions,
  Pressable,
  StyleSheet,
  StatusBar,
  BackHandler,
  TextInput,
  ScrollView,
  SafeAreaView,
  Linking,
  ToastAndroid,
  Keyboard
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import InputField from "../extra/InputField";
import ImageField from "../extra/ImageField";
import { theme } from "../constants";
// import CheckBoxField from "../extra/CheckBoxField";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';

const { height } = Dimensions.get('window');

const Home = ({ navigation, route }: { navigation: any, route: any }) => {
  const scrollViewRef = useRef(null);
  const [userName, setUserName] = useState("John Doe");
  const [apiKey, setApiKey] = useState("");
  const [roleId, setRoleId] = useState("");
  const [locationPermission, setLocationPermission] = useState(false);
  const [targetPositions, setTargetPositions] = useState([]);
  const [searchPhone, setSearchPhone] = useState("");
  const [renderLoan, setRenderLoan] = useState(false);
  const [loanData, setLoanData] = useState<any>([]);
  const [errText, setErrText] = useState("Enter Phone Number")
  // const [loanData, setLoanData] = useState([{
  //     "userName": "John Doe",
  //     "userPhone": "1234567890",
  //     "userEmail": "john.doe@example.com",
  //     "userDOB": "1990-01-01",
  //     "currentCountry": "USA",
  //     "currentState": "California",
  //     "currentCity": "Los Angeles",
  //     "currentDistrict": "Downtown",
  //     "currentPincode": "90001",
  //     "currentHouseNo": "123",
  //     "currentStreet": "Main St",
  //     "currentLandmark": "Beachfront",
  //     "permanentCountry": "USA",
  //     "permanentState": "California",
  //     "permanentCity": "Los Angeles",
  //     "permanentDistrict": "Downtown",
  //     "permanentPincode": "90001",
  //     "permanentHouseNo": "123",
  //     "permanentStreet": "Main St",
  //     "permanentLandmark": "Beachfront",
  //     "userProfilePic": "https://example.com/profile.jpg",
  //     "userAge": 32,
  //     "userGender": "Male",
  //     "userFatherName": "Jim Doe",
  //     "userMotherName": "Jane Doe",
  //     "userMaritalStatus": "Married",
  //     "userCommunity": "Los Angeles Community",
  //     "userNationality": "American",
  //     "userBloodGroup": "O+",
  //     "userEducation": "Bachelor of Science in Computer Science",
  //     "userResidentialOwnerShip": "Own",
  //     "userLatitude": 34.052235,
  //     "userLongitude": -118.243683,
  //     "companyName": "Tech Solutions",
  //     "companyType": "self",
  //     "companyDesignation": "Developer",
  //     "companyCity": "San Francisco",
  //     "companyDistrict": "South Bay",
  //     "companyPincode": "94123",
  //     "companyStreet": "Market St",
  //     "companyLandmark": "Financial District",
  //     "companyLatitude": 37.794234,
  //     "companyLongitude": -122.401416,
  //     "companyEmail": "info@techsolutions.com",
  //     "companyJoinDate": "2015-05-20",
  //     "companySalary": "50000",
  //     "companyEmployeeId": "EMP001",
  //     "loanAmount": "100000",
  //     "loanDuration": "6",
  //     "loanInterestRatePct": "10",
  //     "loanStatus": "Approved",
  //     "loanStartDate": "2022-01-01",
  //     "loanEndDate": "2022-06-01",
  //     "processingCharges": "500",
  //     "processingChargesPct": "5",
  //     "dailyEMI": "1000",
  //     "bankAcctName": "John Doe",
  //     "bankAcctNum": "1234567890",
  //     "bankIfsc": "ABCD0123456",
  //     "bankName": "Example Bank",
  //     "panNum": "THBERG53UmFYZzg3Z3hhSTNWVzNrdz09",
  //     "panName": "John Doe",
  //     "panImgUrl": "https://5.imimg.com/data5/SB/WU/KT/ANDROID-33737889/product-jpeg-500x500.jpg",
  //     "aadhaarNum": "123456789012",
  //     "aadhaarName": "John Doe",
  //     "aadhaarDOB": "01-01-1990",
  //     "aadhaarAddress": "123, Example Street, City, Country",
  //     "aadhaarImage": "https://5.imimg.com/data5/SB/WU/KT/ANDROID-33737889/product-jpeg-500x500.jpg",
  //     "aadhaarFrontImgUrl": "https://5.imimg.com/data5/SB/WU/KT/ANDROID-33737889/product-jpeg-500x500.jpg",
  //     "aadhaarBackImgUrl": "https://5.imimg.com/data5/SB/WU/KT/ANDROID-33737889/product-jpeg-500x500.jpg",
  //     "profilePicUrl": "https://5.imimg.com/data5/SB/WU/KT/ANDROID-33737889/product-jpeg-500x500.jpg",
  //     "salarySlip": [
  //         "https://www.ucl.ac.uk/students/sites/students/files/example-bank-statement_1_0.pdf",
  //         "https://www.ucl.ac.uk/students/sites/students/files/example-bank-statement_1_0.pdf",
  //         "https://www.ucl.ac.uk/students/sites/students/files/example-bank-statement_1_0.pdf"
  //     ],
  //     "bankStatement": "https://www.ucl.ac.uk/students/sites/students/files/example-bank-statement_1_0.pdf",
  //     "companyIdPhoto": "https://5.imimg.com/data5/SB/WU/KT/ANDROID-33737889/product-jpeg-500x500.jpg"

  //   }
  //   ]);
  const [currentAddress, setCurrentAddress] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [aadhaarFlag, setAadhaarFlag] = useState(false);
  const [panFlag, setPanFlag] = useState(false);

  const [agreementSigned, setAgreementSigned] = useState(false);
  const [userPhotoCaptured, setUserPhotoCaptured] = useState(false);
  const [userPhotoURL, setUserPhotoURL] = useState("");

  const [isApply, setIsApply] = useState(false);

  useEffect(() => {
    if (loanData.length > 0) {
      var cur = loanData[0].currentHouseNo + "," + loanData[0].currentStreet + ", \n" + loanData[0].currentLandmark + ",\n" + loanData[0].currentDistrict + "," + loanData[0].currentCity + "," + loanData[0].currentState + "," + loanData[0].currentCountry
      setCurrentAddress(cur);
      var per = loanData[0].permanentHouseNo + "," + loanData[0].permanentStreet + "," + loanData[0].permanentLandmark + "," + loanData[0].permanentDistrict + "," + loanData[0].permanentCity + "," + loanData[0].permanentState + "," + loanData[0].permanentCountry
      setPermanentAddress(per);
      var wor = loanData[0].companyStreet + "," + loanData[0].companyDistrict + "," + loanData[0].companyLandmark + "," + loanData[0].companyCity
      setCompanyAddress(wor);
    }

  }, [loanData]);

  useEffect(() => {
    if (route?.params?.fileUri) {
      console.log(route?.params?.fileUri)
      setUserPhotoURL(route?.params?.fileUri)
      setUserPhotoCaptured(true)
    }
  }, [route]);
  const [viewPositions, setViewPositions] = useState({});

  useEffect(() => {
    async function getasync() {
      try {
        const userName = await AsyncStorage.getItem('userName');
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
    getLocationPermission();

  }, []);

  const getDetails = async () => {
    try {
      console.log(roleId, searchPhone, apiKey)
      if (searchPhone !== null && searchPhone !== undefined && searchPhone.length == 10) {
        await fetch(`http://192.168.1.7:6500/business/getAgentVerifyLoans`, {
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
          .then((responseData) => {
            console.log(responseData)
            if (responseData.Success) {
              Keyboard.dismiss();
              setLoanData([responseData.Success])
            } else {
              setErrText("Enter valid User Phone No")
              ToastAndroid.show("Loan Not Found to this Number", 3)
            }
          }).catch(err => console.log(err))
      }
    } catch (err) {
      setLocationPermission(false);
      console.log(err)
    }
  }

  const updateDetails = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      if (isApply) {
        await fetch(`http://192.168.1.22:6500/business/updateAgentVerify`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }, body: JSON.stringify({
            "roleId": roleId,
            "apiKey": apiKey,
            "loanId": loanData[0]?.loanId,
            "userPhoto": userPhotoURL,
            "aadhaarFlag": "yes",
            "panFlag": "yes",
            "latitude": location.coords.latitude,
            "longitude": location.coords.longitude,
            "status": "DOCUMENT_SUBMITTED",
            "agreementSigned": "yes",
          })
        })
          .then((response) => response.json())
          .then((responseData) => {
            if (responseData.Success) {
              setLoanData([])
              setAadhaarFlag(false)
              setPanFlag(false)
              setAgreementSigned(false)
              setUserPhotoCaptured(false)
              setUserPhotoURL("")
              ToastAndroid.show("Loan Updated", 3)
            } else {
              ToastAndroid.show("Failed to upload Loan", 3)

            }
            console.log(responseData)
          }).catch(err => console.log(err))
      }
    } catch (err) {
      setLocationPermission(false);
      console.log(err)
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

  const handleScrollToView = (x: any, y: any) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x, y, animated: true });
    }
  };

  useEffect(() => {
    if (searchPhone?.length == 10) {
      getDetails();
    }
  }, [searchPhone])

  const profileComponent = () => {
    return (
      <View style={{ justifyContent: "space-between", flexDirection: "row", padding: 10, backgroundColor: "#e32f45" }}>
        <TouchableOpacity onPress={() => { navigation.navigate("Profile") }}>
          <Image source={require('../assets/users/01.png')} style={{ width: 45, height: 45 }} />
        </TouchableOpacity>
        <View>
          <Text style={{ color: "white", marginTop: 10 }}>Welcome, {userName}</Text>
        </View>
        <View>

        </View>
      </View>
    )
  }

  const submitHandler = () => {
    if (aadhaarFlag && panFlag && agreementSigned && userPhotoCaptured) {
      updateDetails();
    }
  }

  useEffect(() => {
    if (aadhaarFlag && panFlag && agreementSigned && userPhotoCaptured) {
      setIsApply(true)
    } else {
      setIsApply(false)
    }

  }, [aadhaarFlag, panFlag, agreementSigned, userPhotoCaptured]);

  const searchComponent = () => {
    return (
      <View style={{ marginTop: 5 }}>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 5 }}>
          <TextInput value={searchPhone}
            maxLength={10}
            onChangeText={(text) => setSearchPhone(text)}
            keyboardType="numeric"
            style={{ borderColor: "#e32f45", borderWidth: 1, height: 50, width: 300, padding: 10, borderRadius: 25 }}
            placeholder="Phone Number"
          ></TextInput>
          <View>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 5 }}>
          <TouchableOpacity onPress={() => { handleScrollToView(0, 0) }} style={{ padding: 10, backgroundColor: "#e32f45", width: 50, height: 50, alignItems: "center", justifyContent: "center", borderRadius: 25 }}>
            {/* <Image source={require('../assets/user.png')} style={{ width: 25, height: 25, tintColor: "white" }}></Image> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { handleScrollToView(0, 1240) }} style={{ padding: 10, backgroundColor: "#e32f45", width: 50, height: 50, alignItems: "center", justifyContent: "center", borderRadius: 25 }}>
            {/* <Image source={require('../assets/work.png')} style={{ width: 25, height: 25, tintColor: "white" }}></Image> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { handleScrollToView(0, 1800) }} style={{ padding: 10, backgroundColor: "#e32f45", width: 50, height: 50, alignItems: "center", justifyContent: "center", borderRadius: 25 }}>
            {/* <Image source={require('../assets/loan.png')} style={{ width: 25, height: 25, tintColor: "white" }}></Image> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { handleScrollToView(0, 2500) }} style={{ padding: 10, backgroundColor: "#e32f45", width: 50, height: 50, alignItems: "center", justifyContent: "center", borderRadius: 25 }}>
            {/* <Image source={require('../assets/document.png')} style={{ width: 25, height: 25, tintColor: "white" }}></Image> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { handleScrollToView(0, 4000) }} style={{ padding: 10, backgroundColor: "#e32f45", width: 50, height: 50, alignItems: "center", justifyContent: "center", borderRadius: 25 }}>
            {/* <Image source={require('../assets/req.png')} style={{ width: 25, height: 25, tintColor: "white" }}></Image> */}
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  const renderInput = () => {
    console.log("loanData?.length > 0", loanData?.length > 0)
    if (loanData?.length > 0) {
      return (
        <ScrollView ref={scrollViewRef} contentContainerStyle={{ flexGrow: 1 }} style={{ marginBottom: 150 }}>
          <View style={{ borderColor: "black", borderWidth: 1, padding: 10, marginBottom: 10 }}>
            <View style={{ backgroundColor: "#F1A9A9", padding: 15, width: "100%", borderRadius: 15 }}><Text style={{ color: "white", textAlign: "center" }}>User Details</Text></View>

            <InputField
              value={loanData[0].userPhone}
              placeholder="Phone Number"
              label="Phone Number"
            />
            <InputField
              value={loanData[0].userName}
              placeholder="User Name"
              label="User Name"
            />
            <InputField
              value={currentAddress}
              placeholder="User Address"
              label="User Current Address"
              lines={5}
            />
            <View>
              <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>User Current Location</Text>
              <Pressable style={{
                marginTop: 10,
                padding: 5,
                backgroundColor: "#e32f45",
                borderRadius: 5,
                width: 150,
              }} onPress={() => { Linking.openURL("https://www.google.com/maps/search/?api=1&query=" + loanData[0]?.userLatitude + "," + loanData[0]?.userLongitude) }}><Text style={{ color: "white", textAlign: "center" }}>Open Map</Text></Pressable>
            </View>
            <InputField
              value={permanentAddress}
              placeholder="User Permanent Address"
              label="User Permanent Address"
              lines={5}
            />
            <InputField
              value={loanData[0].userEmail}
              placeholder="User Email"
              label="User Email"
            />
            <InputField
              value={loanData[0].userAge.toString()}
              placeholder="User Age"
              label="User Age"
            />
            <InputField
              value={loanData[0].userGender}
              placeholder="User Gender"
              label="User Gender"
            />
            <InputField
              value={loanData[0].userFatherName}
              placeholder="User Father Name"
              label="User Father Name"
            />
            <InputField
              value={loanData[0].userMotherName}
              placeholder="User Mother Name"
              label="User Mother Name"
            />
            <InputField
              value={loanData[0].userMaritalStatus}
              placeholder="User Marital Status"
              label="User Marital Status"
            />
            <InputField
              value={loanData[0].userCommunity}
              placeholder="User Community"
              label="User Community"
            />
            <InputField
              value={loanData[0].userNationality}
              placeholder="User Nationality"
              label="User Nationality"
            />
            <InputField
              value={loanData[0].userBloodGroup}
              placeholder="User Blood Group"
              label="User Blood Group"
            />
            <InputField
              value={loanData[0].userEducation}
              placeholder="User Education"
              label="User Education"
            />
          </View>


          <View style={{ borderColor: "black", borderWidth: 1, padding: 10, marginBottom: 10 }}>
            <View style={{ backgroundColor: "#F1A9A9", padding: 15, width: "100%", borderRadius: 15 }}><Text style={{ color: "white", textAlign: "center" }}>Company Details</Text></View>


            <InputField
              value={loanData[0].companyName}
              placeholder="Company Name"
              label="Company Name"
            />
            <InputField
              value={companyAddress}
              placeholder="Company Address"
              label="Company Address"
              lines={5}
            />
            <View>
              <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>Company Location</Text>
              <Pressable style={{
                marginTop: 10,
                padding: 10,
                backgroundColor: "#e32f45",
                borderRadius: 5,
                width: 150,
              }} onPress={() => { Linking.openURL("https://www.google.com/maps/search/?api=1&query=" + loanData[0].companyLatitude + "," + loanData[0].companyLongitude) }}><Text style={{ color: "white", textAlign: "center" }}>Open Map</Text></Pressable>
            </View>
            <InputField
              value={loanData[0].companyEmail}
              placeholder="Company Email"
              label="Company Email"
            />
            <InputField
              value={loanData[0].companyJoinDate}
              placeholder="Company Join Date"
              label="Company Join Date"
            />
            <InputField
              value={loanData[0].companySalary}
              placeholder="Company Salary"
              label="Company Salary"
            />

          </View>

          <View style={{ borderColor: "black", borderWidth: 1, padding: 10, marginBottom: 10 }}>
            <View style={{ backgroundColor: "#F1A9A9", padding: 15, width: "100%", borderRadius: 15 }}><Text style={{ color: "white", textAlign: "center" }}>Loan Details</Text></View>

            <InputField
              value={loanData[0].loanAmount}
              placeholder="Loan Amount"
              label="Loan Amount"
            />
            <InputField
              value={loanData[0].loanStartDate}
              placeholder="Loan Start Date"
              label="Loan Start Date"
            />
            <InputField
              value={loanData[0].loanEndDate}
              placeholder="Loan End Date"
              label="Loan End Date"
            />
            <InputField
              value={loanData[0].loanDuration}
              placeholder="Loan Duration"
              label="Loan Duration"
            />
            <InputField
              value={loanData[0].loanInterestRatePct}
              placeholder="Loan Interest"
              label="Loan Interest"
            />
            <InputField
              value={loanData[0].loanStatus}
              placeholder="Loan Status"
              label="Loan Status"
            />
            <InputField
              value={loanData[0].processingChargesPct}
              placeholder="Loan Processing  Percentage"
              label="Loan Processing  Percentage"
            />
            <InputField
              value={loanData[0].processingCharges}
              placeholder="Loan Processing  Charges"
              label="Loan Repayment"
            />
          </View>

          <View style={{ borderColor: "black", borderWidth: 1, padding: 10, marginBottom: 10 }}>
            <View style={{ backgroundColor: "#F1A9A9", padding: 15, width: "100%", borderRadius: 15 }}><Text style={{ color: "white", textAlign: "center" }}>KYC</Text></View>

            <InputField
              value={loanData[0].aadhaarNum}
              placeholder="Aadhaar Number"
              label="Aadhaar Number"
            />
            <InputField
              value={loanData[0].aadhaarName}
              placeholder="Aadhaar Name"
              label="Aadhaar Name"
            />
            <InputField
              value={loanData[0].aadhaarDOB}
              placeholder="Aadhaar DOB"
              label="Aadhaar DOB"
            />
            <InputField
              value={loanData[0].aadhaarAddress}
              placeholder="Aadhaar Address"
              label="Aadhaar Address"
            />
            <InputField
              value={loanData[0].panName}
              placeholder="PAN Name"
              label="PAN Name"
            />
            <InputField
              value={loanData[0].panNum}
              placeholder="PAN Number"
              label="PAN Number"
            />
            <ImageField
              url={loanData[0].panImgUrl ? loanData[0].panImgUrl : "https://5.imimg.com/data5/SB/WU/KT/ANDROID-33737889/product-jpeg-500x500.jpg"}
              label="PAN Image"
            />
            {/* <InputField
            value={loanData[0].bankAcctName}
            placeholder="Bank Account Name"
            label="Bank Account Name"
            />
            <InputField
            value={loanData[0].bankAcctNum}
            placeholder="Bank Account Number"
            label="Bank Account Number"
            />
            <InputField
            value={loanData[0].bankName}
            placeholder="Bank Name"
            label="Bank Name"
            />
            <InputField
            value={loanData[0].bankIfsc}
            placeholder="Bank IFSC"
            label="Bank IFSC"
            /> */}
            <ImageField
              url={loanData[0].companyEmployeeId ? loanData[0].companyEmployeeId : "https://5.imimg.com/data5/SB/WU/KT/ANDROID-33737889/product-jpeg-500x500.jpg"}
              label="Company Employee Id"
            />
            <ImageField
              url={loanData[0].profilePicUrl ? loanData[0].profilePicUrl : "https://5.imimg.com/data5/SB/WU/KT/ANDROID-33737889/product-jpeg-500x500.jpg"}
              label="Profile Pic"
            />


          </View>
          <View style={{ borderColor: "black", borderWidth: 1, padding: 10, marginBottom: 10 }}>
            <View style={{ backgroundColor: "#F1A9A9", padding: 15, width: "100%", borderRadius: 15 }}><Text style={{ color: "white", textAlign: "center" }}>Required Documents</Text></View>
            <CheckBoxField
              label="Aadhaar Check"
              isChecked={aadhaarFlag}
              onValueChange={setAadhaarFlag}
              checkBoxValue="Aadhaar Check"
            />
            <CheckBoxField
              label="Pan Check"
              isChecked={panFlag}
              onValueChange={setPanFlag}
              checkBoxValue="Pan Check"
            />
            <CheckBoxField
              label="Agreement Signed"
              isChecked={agreementSigned}
              onValueChange={setAgreementSigned}
              checkBoxValue="Agreement Signed"
            />

            {/* <CheckBoxField
          label="Bank Check"
          isChecked={bankFlag}
          onValueChange={setBankFlag}
          checkBoxValue="Bank Check"
          />
          <CheckBoxField
          label="Company Check"
          isChecked={companyFlag}
          onValueChange={setCompanyFlag}
          checkBoxValue="Company Check"
          /> */}
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>User Photo</Text>
              <TouchableOpacity style={{ alignContent: "center", justifyContent: "center", marginTop: 10, alignItems: "center" }} onPress={() => { navigation.navigate("FileCapture", { "screenName": "Home", "action": "userPhoto_" + loanData[0]?.loanId + "" }) }}>
                <ImageBackground
                  source={{ uri: userPhotoCaptured ? userPhotoURL : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }}
                  style={{ width: 200, height: 200 }}
                  imageStyle={{ borderRadius: 10 }}

                ></ImageBackground>
              </TouchableOpacity>

            </View>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center", marginTop: 5, marginBottom: 50 }}>
            <TouchableOpacity disabled={!isApply} style={{ backgroundColor: "#e32f45", padding: 15, width: "40%", borderRadius: 15, opacity: isApply ? 1 : 0.5 }} onPress={() => { submitHandler() }}><Text style={{ color: "white", textAlign: "center" }}>Submit</Text></TouchableOpacity>

          </View>

        </ScrollView>
      );
    } else {
      return (
        <View style={{ justifyContent: "center", alignContent: "center", "alignItems": "center", marginTop: 10 }}>
          <Text>{errText}</Text>

        </View>
      )
    }


  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginTop: 30 }}>
        {profileComponent()}
        {searchComponent()}
        {locationPermission ? renderInput() : <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Please Enable Location Permission</Text>
          <TouchableOpacity style={{ marginTop: 10 }} onPress={() => { getLocationPermission() }}><Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Allow</Text></TouchableOpacity>
        </View>}
      </View>
    </SafeAreaView>
  );
};

export default Home;