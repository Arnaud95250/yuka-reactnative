import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

import { useNavigation } from "@react-navigation/core";
import * as RootNavigation from './path/to/RootNavigation.js';

import ContentInfoScanned from "../components/ContentInfoScanned";





const ScanScreen = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const navigation = useNavigation();
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  const [errorMessages, setErrorMessages] = useState(false);


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
              setData(response.data)
              setIsLoading(false);
              navigation.navigate("ProductScreen", {productScanned: data});
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