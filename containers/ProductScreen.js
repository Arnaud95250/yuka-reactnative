import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Image, SafeAreaView} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

//Components
import Scan from "../components/Scan";
import ContentInfoProduct from "../components/ContentInfoProduct";

// Icon
import { Entypo } from '@expo/vector-icons';

const ProductScreen = (props) => {
    const [data, setData] = useState("");
    const [info, setInfo] = useState("");
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const params = useRoute();
    // console.log(params);
    // console.log(props);


    useEffect(() => {
      const fetchData = async () => {
        try {
          // lancement de récupération des données depuis l'API et le produit scanné avec une requête axios en get
          const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${props.route.params.productScanned}.json`);
            // console.log("toto1");
            console.log(response.data);
            setData(response.data);
            setIsLoading(false);
            // console.log("toto2");
        } catch (err) {
          console.log(err.message);
        }
      };
      fetchData();
    }, [params.productScanned]);





    return(
      <SafeAreaView style={styles.container}>
     {isLoading ?(
       <View  style={styles.container}>
          <Image style={styles.image} source={require('../assets/home00Icon.png')}/>
          <Scan/>
       </View>
       ) : ( 
         <ContentInfoProduct data={data} />
        )}
      </SafeAreaView>
        )
      }
      
export default ProductScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "white",
    },
    image: {
      height: "93%",
      width: "100%",
      resizeMode: "contain",
      position: "absolute"
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