import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from "@react-navigation/core";
import axios from 'axios';

const ScanScreen = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
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
            console.log(response.data);
            setData(response.data)
            setIsLoading(false);
          } catch (error){
              console.log(error.message);
          }
      };
      fetchData();   
  };

  // if (hasPermission === null) {
  //     return <Text>Requesting for camera permission</Text>;
  // }
  // if (hasPermission === false) {
  //     return <Text>No access to camera</Text>;
  // }

      return( 
        isLoading ? (
        
          <View style={styles.container}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
          </View>
      ) : (

        <View style={styles.container}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
          <View style={styles.info_product}>
            {scanned && !errorMessages ? (
              <View style={{flexDirection:'row'}}>
                <View style={{flexDirection: "row"}}>
                  <Image style={styles.img} source={{ uri: data.product.image_url}}/>
                  <View>
                    <Text>{data.product.brands}</Text>
                    <Text>{data.product.product_name}</Text>
                    <Text>{data.product.ecoscore_data.agribalyse.score}/100</Text>
                  </View>
                </View>
                
                <View style={{marginLeft:20}}>
                  <Text>{data.product.nutriments.sugars_value} {data.product.nutriments.sugars_unit} </Text>{/*Sucre*/}
                  <Text>{data.product.nutriments.energy_value} {data.product.nutriments.energy_unit}</Text>{/*Calories*/}
                  <Text>{data.product.nutriments.fat_value} {data.product.nutriments.fat_unit}</Text>{/*Graisses saturées*/}
                  <Text>{data.product.nutriments.salt_value} {data.product.nutriments.salt_unit}</Text>{/*Sel*/}
                  <Text>{data.product.nutriments.proteins_value} {data.product.nutriments.proteins_unit}</Text>{/*Proteines*/}
                </View>

                {/* <Text>{data.product.image_front_small_url}</Text> */}
                {/* {data.product.ingredients.map((score, index) => {
                  return <Text key={index}>{score.percent_estimate}</Text>;
                })} */}
              </View>
            ) : (
            scanned && errorMessages && <Text>Produit inconnu</Text>
          )}

      </View>
      </View>
  ))
}

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  info_product:{
    backgroundColor: "white",
    borderRadius: 10,
    position: "absolute",
    bottom:0,
    width: "100%",
    height: 150,
    flexDirection: "row"    // alignSelf: "flex-end"
  },
  img:{
    width:100,
    height: 130,
    marginTop:10,
    resizeMode: "contain",
  }
  

  })


  {/* // {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}