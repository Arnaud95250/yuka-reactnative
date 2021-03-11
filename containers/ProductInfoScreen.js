import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react/cjs/react.development';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

//Components
import ContentInfoScanned from "../components/ContentInfoScanned";

//@expo/vector-icons@12.0.3 ==> https://icons.expo.fyi/
import { AntDesign } from '@expo/vector-icons';


const ProductInfoScreen = (props) => {
  const route = useRoute();
  const keyProduct = route.params.elem.code;
  const [infoData, setInfoData] = useState();
  const [infoFav, setInfoFav] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [star, setStar] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try{  
        const infoTab = await AsyncStorage.getItem("favoritesstocked");
        const tab = JSON.parse(infoTab); 
        const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${keyProduct}.json`);
          setInfoData(response.data);
          setInfoFav(tab);
          setStar(false)
          setIsLoading(false);

          
          for (let i = 0; i < tab.length; i++) { //Je boucle sur mon tableau de produit existant
            if(tab[i].code === keyProduct){ // si le code bar d'un article existe je passe ma variable a true sinon je sort de ma condition et j'enregistre le produit scanné
            setStar(true)
            // console.log(tab[i].code);
            // console.log(keyProduct);
            }
          }
          
          console.log(star);
           
      } 
      catch (error){
          console.log(error.message);
      }
  };
  fetchData();   
  }, []);

  const registerFavorite = async (info) => {
    if (info) {
      const stored = await AsyncStorage.getItem("favoritesstocked");
        // console.log(stored);
        
        if(stored === null){
          const valueStock = [info];
          AsyncStorage.setItem("favoritesstocked", JSON.stringify(valueStock));
        } else {
          const infoTab = await AsyncStorage.getItem("favoritesstocked");
          const tab = JSON.parse(infoTab);
          let estCeQueProduitExiste = false; // je créé une variabe qui me servira dans mes conditions
          // verif si le produit existe
          for (let i = 0; i < tab.length; i++) { //Je boucle sur mon tableau de produit existant
            if(tab[i].code === info.code){ // si le code bar d'un article existe je passe ma variable a true sinon je sort de ma condition et j'enregistre le produit scanné
              estCeQueProduitExiste = true;
              
              // deleteProduct(tab[i].code);
              // console.log(tab[i].code);

            }
          }
          if(estCeQueProduitExiste === false){ // si le produit n'éxiste pas je rentre dans ma condition
            setStar(true)
            tab.push(info); // je push dans mon tableau le nouveau produit scanné 
            AsyncStorage.setItem("favoritesstocked", JSON.stringify(tab));// j'enregistre dans favoritesstocked et transcrit les data en string 
          }
        }
    } 
    else{ 
      alert('Aucun code bar trouvé')
    }
  }



  const deleteProduct = async (params) => { 
    setStar(false) // mon bouton favorite (staro s'affiche vide)   
    const values = infoFav.values(params);
    infoData.splice(params, 1);
    await AsyncStorage.setItem("favoritesstocked", JSON.stringify(infoData));
    console.log(values);
  }


  return(
    isLoading ? (
      <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="rgb(80, 196, 130)" />
      </View>
      ) : (
        <View style={{paddingTop: 20, backgroundColor: "white", flex: 1}} >
          <ContentInfoScanned data={infoData}/>
          
          {!star ? (
            <TouchableOpacity onPress={() => registerFavorite(infoData)} style={styles.fav}>
                <AntDesign name="staro" size={24} color="rgb(80, 196, 130)"/> 
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => deleteProduct(infoData)} style={styles.fav}>
                <AntDesign name="star" size={24} color="rgb(80, 196, 130)" />
            </TouchableOpacity>
          )}
            
         
          
        </View>
      )
    )
}

export default ProductInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  fav:{
    position: "absolute",
    right: 50,
    top: 20,
    zIndex: 10
  }
  });