import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from "@react-navigation/core";
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';


import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';



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
              navigation.push("ProductScreen", {productScanned: data});
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
            <ScrollView>
              <View style={{flexDirection:"row",  backgroundColor: "white", width: "100%"}}>
                <View>
                    <Image style={styles.img} source={{ uri: data.product.image_url}}/>
                </View>
                <View>
                    <Text>{data.product.brands}</Text>
                    <Text>{data.product.product_name}</Text>
                    <Text>{data.product.ecoscore_data.agribalyse.score}/100</Text>
                </View>
              </View>
              <View style={{width: "80%", alignSelf: "center"}}>

                  {/*Sucre*/}
                  <View style={styles.info}>
                      <View style={{flexDirection: "row", height: 60,  justifyContent: 'center', alignItems: 'center'}}>
                        <View>
                            <Ionicons name="md-cube-sharp" size={28} color="black" /> 
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Text style={{fontSize:16, fontWeight: "bold"}}>Sucre</Text>
                            <Text style={{fontSize:10}}>Peu de sucre</Text>
                        </View>
                      </View>
                      <Text style={{fontSize:16, fontWeight: "bold"}}>{data.product.nutriments.sugars_value} {data.product.nutriments.sugars_unit} </Text>{/*Sucre*/}
                  </View>
                  
                  {/*Calories*/}
                  <View style={styles.info}>
                      <View style={{flexDirection: "row", height: 60,  justifyContent: 'center', alignItems: 'center'}}>
                        <View>
                            <Ionicons name="ios-flame-sharp" size={28} color="black" />
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Text style={{fontSize:16, fontWeight: "bold"}}>Calories</Text>
                            <Text style={{fontSize:10}}>Peu de calories</Text>
                        </View>
                      </View>
                      <Text style={{fontSize:16, fontWeight: "bold"}}>{data.product.nutriments.energy_value} {data.product.nutriments.energy_unit}</Text>{/*Calories*/}
                  </View>

                  {/*Graisses saturées*/}
                  <View style={styles.info}>
                      <View style={{flexDirection: "row", height: 60,  justifyContent: 'center', alignItems: 'center'}}>
                        <View>
                            <Ionicons name="water" size={28} color="black" />
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Text style={{fontSize:16, fontWeight: "bold"}}>Graisses saturées</Text>
                            <Text style={{fontSize:10}}>Peu de graisses saturées</Text>
                        </View>
                      </View>
                      <Text style={{fontSize:16, fontWeight: "bold"}}>{data.product.nutriments.fat_value} {data.product.nutriments.fat_unit}</Text>{/*Graisses saturées*/}
                  </View>
                  
                  {/*Sel*/}
                  <View style={styles.info}>
                      <View style={{flexDirection: "row", height: 60,  justifyContent: 'center', alignItems: 'center'}}>
                        <View>
                        <Fontisto name="spinner" size={28} color="black" />
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Text style={{fontSize:16, fontWeight: "bold"}}>Sel</Text>
                            <Text style={{fontSize:10}}>Peu de Sel</Text>
                        </View>
                      </View>
                      <Text style={{fontSize:16, fontWeight: "bold"}}>{data.product.nutriments.salt_value} {data.product.nutriments.salt_unit}</Text>{/*Sel*/}
                  </View>

                  {/*Proteines*/}
                  <View style={styles.info}>
                      <View style={{flexDirection: "row", height: 60,  justifyContent: 'center', alignItems: 'center'}}>
                        <View>
                            <FontAwesome5 name="fish" size={28} color="black" />
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Text style={{fontSize:16, fontWeight: "bold"}}>Protéines</Text>
                            <Text style={{fontSize:10}}>Quelques protéines</Text>
                        </View>
                      </View>
                      <Text style={{fontSize:16, fontWeight: "bold"}} >{data.product.nutriments.proteins_value} {data.product.nutriments.proteins_unit}</Text>{/*Proteines*/}
                  </View>
                
                </View>
            </ScrollView>
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
    flexDirection: "row"
  },
  img:{
    width:100,
    height: 130,
    marginTop:10,
    resizeMode: "contain",
  },
  info:{
    flexDirection: "row",
    height: 60,  
    justifyContent: "space-between", 
    alignItems: 'center',
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginTop: 10
  }

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