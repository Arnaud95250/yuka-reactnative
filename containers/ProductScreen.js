import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, ImageBackground, Image, Button, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/core";

//Components
import Scan from "../components/Scan";

const ProductScreen = (props) => {
    const [data, setData] = useState("");
    const [info, setInfo] = useState("");
    const navigation = useNavigation();

    return(
    <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/home00Icon.png')}></Image>
        {/* <Scan/> */}
    </View>
        )
      }
      
export default ProductScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "white"
    },
    image: {
      height: "100%",
      width: "100%",
      resizeMode: "contain",
      zIndex: 0,
      position: "absolute",
    },
    button:{
      alignItems: "center",
      backgroundColor: "red",
      padding: 10,
      borderRadius:10,
      width: 200,
      zIndex: 1,
    },
    content_scan:{
      alignItems: "center", 
      marginTop: 350,
      backgroundColor: "white",
      borderRadius:10,
      position: "absolute",
      marginTop: "140%",
      marginLeft: "80%",
      zIndex: 1,
    },
    scan:{
      backgroundColor: "rgb(80, 196, 130)",
      alignItems: "center",
      justifyContent: "center",
      borderRadius:50,
      height: 50,
      width: 50,
    },
  });
  
  
  
//{/* <Icon.Button name="carrot"  solid>
//Login with Facebook
//</Icon.Button> */}

{/* <View style={{alignItems: "center", marginTop: 350}}>
  <TouchableOpacity style={styles.button} 
    onPress={() =>
      navigation.navigate("ProductInfo")
    }>
    <Text>test props product info</Text>
  </TouchableOpacity> 
</View> */}