import React from 'react';
import { View, StyleSheet, Image, SafeAreaView, TouchableOpacity, RefreshControl } from "react-native";
import { useState, useEffect } from 'react/cjs/react.development';
import { ScrollView } from 'react-native-gesture-handler'; 
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Components
import ContentInfoProduct from "../components/ContentInfoProduct";

//@expo/vector-icons@12.0.3 ==> https://icons.expo.fyi/
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';



const FavoritesScreen = (props) => {
  const [data, setData] = useState();
  const navigation = useNavigation();

  // useEffect s'éffectue à chaque chargement de ma page
  useEffect(() => {
    const fetchData = async () => {
      try {
        const FavoritesRegister = await AsyncStorage.getItem("favoritesstocked"); // Je récupère les données stocké dans le téléphone
        const infoStocked = JSON.parse(FavoritesRegister); 
        setData(infoStocked); // je stock les datas dans un state
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
  }, []);

  // Function Je supprime un produit de la liste des favoris
  const deleteProduct = async (params) => {    
    const index = data.indexOf(params);
      data.splice(params, 1);
      await AsyncStorage.setItem("favoritesstocked", JSON.stringify(data));
      // await AsyncStorage.setItem("favoritesstocked", JSON.stringify(data));
    console.log(index);
  }

  // Return qui permet d'afficher mon contenue 
  return(
      <SafeAreaView style={styles.container_product}>
        <View>
          <AntDesign name="star" size={300} color="gold" style={styles.image}/> 
        <ScrollView>
        {!data ? (//Si je n'ai rien à afficher
          <View  style={styles.container_product}>
            <Image style={styles.image} source={require('../assets/home00Icon.png')}/>
          </View>
          ) : (
            data.map((elem, index) => { // Je boucle sur l'ensemble de mon tableau de produit qui on été push au scanne de l'article dans (ScanScreen.js) 
              return(
                // key qui correspond à l'indice de chaque éléments de mon tableau d'objet
                <View key={index} style={styles.container}> 
                  {/* Bounton qui qui me redirige sur la page produit séléctionné */}
                  <TouchableOpacity onPress={() => navigation.navigate("ProductInfo", elem={elem})}>
                      <ContentInfoProduct data={elem}/> 
                  </TouchableOpacity>
                  {/* Bounton qui active la function deleteProduct pour retirer un produit de la liste */}
                  <TouchableOpacity onPress={() => deleteProduct(index)} style={styles.trash}>
                    <Ionicons name="ios-trash-outline" size={24} color="rgb(80, 196, 130)" />
                  </TouchableOpacity>
                </View>
                )
              })
          )}
          </ScrollView>
          </View>
      </SafeAreaView>
      )
}
      
export default FavoritesScreen;

const styles = StyleSheet.create({
    container_product: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "white",
      
    },
    image: {
      height: "93%",
      width: "100%",
      position: "absolute",
      width: 300,
      height: 300,
      top: 200,
      left:60
    },
    container:{
      flexDirection: "row",
      borderWidth: 1,
      margin: 10,
      borderRadius:10,
      backgroundColor: "rgb(240, 240, 240)"
    },
    trash:{
      width: "100%",
      alignSelf: "center"
    }
  });