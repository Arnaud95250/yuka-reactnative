import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, SafeAreaView, FlatList, TouchableOpacity, RefreshControl} from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Components*******************************************
import Scan from "../components/Scan";

//Containers*******************************************
import ContentInfoProduct from "../components/ContentInfoProduct";

//@expo/vector-icons@12.0.3 ==> https://icons.expo.fyi/
import { Ionicons } from '@expo/vector-icons';

const ProductScreen = (props) => {
    const [data, setData] = useState();
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const productScanned = await AsyncStorage.getItem("datacodebar");
          const infoStocked = JSON.parse(productScanned); 
          setData(infoStocked);
        } catch (err) {
          console.log(err.message);
        }
      }
      fetchData();
    }, []);

     // Function Je supprime un produit de la liste productScreen mais il est supprimé dans product je supprime également des favoris
    const deleteProduct = async (params) => {     
      const index = data.indexOf(params);
        data.splice(params, 1);
        await AsyncStorage.setItem("datacodebar", JSON.stringify(data));
        await AsyncStorage.setItem("favoritesstocked", JSON.stringify(data));
      console.log(index);
    }

    // Je scroll vers le bas pour refresh la page
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout((() => setRefreshing(false)),1000);
    }, []);

    // Return qui permet d'afficher mon contenue 
    return(
      <SafeAreaView style={styles.container_product} >
        <View>
          <Image style={styles.image} source={require('../assets/home00Icon.png')}/>
          <ScrollView 
          contentContainerStyle={styles.scrollView} 
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
        {/* <ScrollView> */}
        {!data ? (
            <View>
              <Image style={styles.image} source={require('../assets/home00Icon.png')}/>
            </View>
          ) : (
            data.map((elem, index) => { // Je boucle sur l'ensemble de mon tableau de produit qui on été push au scanne de l'article dans (ScanScreen.js) 
              return(
                // key qui correspond à l'indice de chaque éléments de mon tableau d'objet
                <View key={index} style={styles.container}> 
                  <TouchableOpacity style={{width: "90%"}} onPress={() => navigation.navigate("ProductInfo", elem={elem})}>
                      <ContentInfoProduct data={elem}/> 
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteProduct(index)} style={styles.trash}>
                    <Ionicons name="ios-trash-outline" size={24} color="rgb(80, 196, 130)" />
                  </TouchableOpacity>
                </View>
                )
              })
          )}
          </ScrollView>
            <Scan/>
          </View>
      </SafeAreaView>
    )
  }
      
export default ProductScreen;

const styles = StyleSheet.create({
    container_product: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "white",
    },
    image: {
      height: "93%",
      width: "100%",
      resizeMode: "contain",
      position: "absolute",
    },
    container:{
      flexDirection: "row",
      borderWidth: 1,
      margin: 10,
      borderRadius:10,
      backgroundColor: "rgb(240, 240, 240)"
    },
    scrollView: {
      flex: 1,
      flexDirection: "column"
    },
    trash:{
      width: "100%",
      alignSelf: "center"
    }
  });
  

// REQUETE**************************************************
// const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${keyProduct}.json`);
// const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${props.route.params.productScanned}.json`);
// const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${params.params.productScanned}.json`);
// const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${data}.json`);
// REQUETE**************************************************

// FLATLIST***************************************************

// <FlatList
//   data={data}
//   renderItem={({ item }) => {
//   return (           
//       <View style={styles.container}>
//         <View style={styles.content_info}>
//           <View style={styles.content_img}>
//               <Image style={styles.img} source={{ uri: item.product.image_url}}/>
//           </View>
//           <View style={styles.info}>
//               <Text style={styles.title}>{item.product.brands}</Text>
//               <Text style={styles.title_info}>{item.product.product_name}</Text>
//               <View style={styles.badge}>
//               <Badge/>
//               <Text style={styles.quality}>Excellent</Text>
//               </View>
//               <View style={styles.content_timer}>
//               <Entypo name="back-in-time" size={16} color="rgb(105,105,105)" />
//               <Text style={styles.timer}>Il y a 19 heurs</Text>
//               </View>
//           </View>
//         </View>
//           <Scan/>
//       </View>
//        )
//       }}
//       keyExtractor={(item) => item.code}
//     >
//     </FlatList>
        
// FLATLIST***************************************************