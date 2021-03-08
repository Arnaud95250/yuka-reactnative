import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from "@react-navigation/core";
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

import ContentInfoScanned from "../components/ContentInfoScanned";

const ScanScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  const [errorMessages, setErrorMessages] = useState(false);
  const [codeBar,setCodeBar] = useState([]); 
  
  
  const setCode = async (data) => {
      if (data) {
        const newProduct =[...codeBar];
        newProduct.push(data);
        AsyncStorage.setItem("codebar", JSON.stringify(newProduct));
        console.log(newProduct);
      } else{ 
        AsyncStorage.removeItem("codebar");
        setCodeBar(null);
      }
    };
  
    //Demande la permission d'acceder l'appareil photo de l'utilisateur
    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);

    const handleBarCodeScanned = async({ type, data }) => {
      setScanned(true);
      setIsLoading(true);

      const fetchData = async () => {
          try{  
            const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${data}.json`);
              setCode(data);
              setData(response.data);
              setIsLoading(false);
          } 
          catch (error){
              console.log(error.message);
          }
      };
      fetchData();   
    };


    return( 
      isLoading ? (
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      ) : (
        <View style={styles.info_product}>
          {scanned && !errorMessages ? (
            <ContentInfoScanned data={data}/>
          ) : (
          scanned && errorMessages && <Text>Produit inconnu</Text>
        )}

    </View>
    )
  )
}

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  info_product:{
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    flexDirection: "row",
    paddingTop: 20
  },
})

        //   const fetchData = async () => {
        //     try{  
        //       const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${data}.json`);
        //         // console.log(response.data);
        //         // console.log(data);
        //         setData(response.data)
        //         setIsLoading(false);
        //         // navigation.push("Product", {productScanned: data});
        //     } catch (error){
        //         console.log(error.message);
        //     }
        // };
        // fetchData(); 


        // <View style={styles.container}>
        //   <BarCodeScanner
        //     onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        //     style={StyleSheet.absoluteFillObject}
        //   />
        //   {scanned && <View style={{alignItems: "center", marginTop: 350}}>
        //     <TouchableOpacity style={styles.button} 
        //       onPress={() =>
        //         navigation.navigate("ProductScreen", {test: "data"})
        //       }>
        //       <Text>test props product info</Text>
        //     </TouchableOpacity> 
        //   </View>}
        // </View>