import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { theme } from "../constants";

type Props = {
    date:string;
    name:string;
    amount: string;
    transactionType: string;
    paymentType: string;
    onPress?: () => void;
    containerStyle?: any;
    deposit?: boolean;
    transfer?: boolean;
    success?:boolean;
    failed?:boolean;
    imgView:any;
};

const Transaction: React.FC<Props> = ({
    date,
    amount,
    name,
    transactionType,
    paymentType,
    onPress,
    containerStyle,
    deposit,
    transfer,
    success,
    failed,
    imgView
}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          ...containerStyle,
          height: 70,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          backgroundColor: theme.COLORS.white,
          borderRadius: 10,
        }}
      >
        {imgView==="transaction" && (
          <Image
            source={require("../assets/payment/01.png")}
            style={{ width: 40, height: 40, marginRight: 14 }}
          />
        ) }{ imgView==="success" && (
<Image
            source={require("../assets/payment/correct.png")}
            style={{ width: 40, height: 40, marginRight: 14 }}
          />
        )}{
           imgView==="failed" &&(
          <Image
            source={require("../assets/payment/cancel.png")}
            style={{ width: 40, height: 40, marginRight: 14 }}
          />
        )}
        {
          imgView ==="pending" &&(
            <Image
            source={require("../assets/payment/pending.png")}
            style={{ width: 40, height: 40, marginRight: 14 }}
          />
          )
        }
        
        
        <View>
          <Text
            style={{
              ...theme.FONTS.H6,
              color: theme.COLORS.mainDark,
            }}
          >
           {name}
            {/* {transactionType} */}
          </Text>
          <Text
            style={{
              ...theme.FONTS.Mulish_400Regular,
              fontSize: 12,
              lineHeight: 12 * 1.2,
              color: theme.COLORS.bodyTextColor,
            }}
          >
              {date}
          </Text>
        </View>
        <View style={{ marginLeft: "auto" }}>
          <Text
            style={{
              ...theme.FONTS.H6,
              color: deposit ? theme.COLORS.green : theme.COLORS.red,
            }}
          >
            ₹ {amount}
          </Text>
        </View>
      </TouchableOpacity>
    );
};

export default Transaction;
