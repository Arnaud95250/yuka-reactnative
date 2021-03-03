import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, SafeAreaView} from "react-native";
import { useNavigation } from "@react-navigation/core";
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

//Components
import Scan from "../components/Scan";
import { ScrollView } from 'react-native-gesture-handler';

const ProductScreen = (props) => {
    const [data, setData] = useState("");
    const [info, setInfo] = useState("");
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const route = useRoute();

    return(
      <SafeAreaView style={styles.container}>
          <Image style={styles.image} source={require('../assets/home00Icon.png')}/>
          <Scan/>
      </SafeAreaView>
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
      height: "93%",
      width: "100%",
      resizeMode: "contain",
    },
  });
  
  
  
{/* <View style={{alignItems: "center", marginTop: 350}}>
  <TouchableOpacity style={styles.button} 
    onPress={() =>
      navigation.navigate("ProductInfo")
    }>
    <Text>test props product info</Text>
  </TouchableOpacity> 
</View> */}
{/* 
// button:{
//   alignItems: "center",
//   backgroundColor: "red",
//   padding: 10,
//   borderRadius:10,
//   width: 200,
// }, */}