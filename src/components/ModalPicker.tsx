import React from "react";
import{
    StyleSheet,Text,View,
   ScrollView,TouchableHighlight,Pressable,Image,TouchableOpacity
}from 'react-native'
import { theme } from "../constants";

const OPTIONS = [
  "Automobiles",
  "Beauty/Wellness",
  "Dairy/Fresh Products",
  "Food & Beverages",
  "Education",
  "Electronics & Durables",
  "Entertainment",
  "Fuel & Gas",
  "Grocery & General Store",
  "Home Utilites",
  "Liquor/Alcohol",
  "Medical/Healthcare",
  "Near Bus/Railway Station",
  "Office Complex",
  "Retail Outlet",
  "Roadside Stall/kiosk",
  "Services",
  "Transportation",
  "Travel/Hospitality",
  "Wholesale/Distributor",
  "Others/Miscellaneous",
];


const ModalPicker =(props:any)=>{

   const onPressItem=(option:any) =>{
    props.Toggle(false);
    props.setData(option)
   }

   
   
    const Option = OPTIONS.map((item,index)=>{
        return(
            <View style={styles.listcontainer} key={index}>
            <TouchableHighlight 
               activeOpacity={0.6}
               underlayColor="#4D8BFF66"  
               onPress={()=>onPressItem(item)}
               >
               
              <Text style={styles.itemText}>
               {item}
              </Text>
            </TouchableHighlight>
          </View>
        )
    })
   
    return(
        
            <View style={styles.dContainer}>
               <TouchableOpacity
              style={{ flex: 1, backgroundColor: "#0000003D" }}
              onPress={()=>{props.Toggle(false)}}
              activeOpacity={1}
            ></TouchableOpacity>
           <View style={styles.dropDrownContianer}>
           <View style={styles.header}>
          <Text style={styles.headerText}>Select</Text>
          <Pressable onPress={()=>{props.Toggle(false)}}>
          <Image style={styles.cross} source={require('../assets/icons/cross.png')}/></Pressable>
          </View>
               <ScrollView showsVerticalScrollIndicator={false}>
                {Option}
               </ScrollView>
           </View></View>
       
    )
}

const styles = StyleSheet.create({
    dropDrownContianer:{
    position:'absolute',
    bottom:0,
      width:'100%',
      height:500,
      backgroundColor:'#ffff',
      borderBottomWidth:0,
      padding:20,
      borderTopLeftRadius:20,
      borderTopRightRadius:20
    },
    dropDownText:{
        textAlign:"left"
    },
    listcontainer:{
        width:'100%',
        borderStyle:'solid',
        borderBottomWidth:1,
        borderBottomColor:'#261B1E1E'
      },
      itemText:{
        margin:5,
        padding:10,
        width:'100%',
        ...theme.FONTS.Mulish_400Regular,
        borderStyle:'solid',
        color:'#00000',

      },
      dContainer:{
        flex:1,
       backgroundColor:'#0504046D',
        
      },
      header:{
        padding:20,
        height:70,
        width:'100%',
        justifyContent:'space-between',
        flexDirection:'row',  
        
      },
      headerText:{
        fontSize:20,
        ...theme.FONTS.Mulish_600SemiBold,
        color:'#000000'
      },
      cross:{
        width:15,
        height:15
      }
  });

export {ModalPicker}