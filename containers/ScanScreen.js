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
  const [infoData, setInfoData] = useState("");
  const [errorMessages, setErrorMessages] = useState(false);
  

  const setCode = async (info) => {
    if (info) {
      const stored = await AsyncStorage.getItem("datacodebar");
        console.log(stored);

        if(stored === null){
          const valueStock = [info];
          AsyncStorage.setItem("datacodebar", JSON.stringify(valueStock));
        } else {
          const infoTab = await AsyncStorage.getItem("datacodebar");
          const tab = JSON.parse(infoTab);
          let estCeQueProduitExiste = false;
          // verif si le produit existe
          for (let i = 0; i < tab.length; i++) {
           if(tab[i].code === info.code){
             estCeQueProduitExiste = true;
           }
          }
          if(estCeQueProduitExiste === false){
            tab.push(info);
            AsyncStorage.setItem("datacodebar", JSON.stringify(tab));
          }
          

          
          // const infoStocked = JSON.parse(stored);
          // infoStocked.push(info);
          // AsyncStorage.setItem("datacodebar", JSON.stringify(infoStocked));
        }
    } 
    else{ 
      alert('Aucun code bar trouvé')
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
              setCode(response.data); // Je stock les datas dans mon state setCodeBar et les enregistre dans mon smartphone avec AsyncStorage
              setInfoData(response.data); // Je stock les datas scanné et les affiches dans (scanScreen.js). 
              setIsLoading(false); // je passe isLoading à false et affiche le contenue recupéré.
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
            <ContentInfoScanned data={infoData}/>
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