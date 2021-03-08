import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Image, SafeAreaView, FlatList} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useRoute } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

//Components
import Scan from "../components/Scan";
import ContentInfoProduct from "../components/ContentInfoProduct";
import { Entypo } from '@expo/vector-icons';

const ProductScreen = (props) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState([])
    const params = useRoute();

    

    useEffect(() => {
      const fetchData = async () => {
        try {       
          const keyProduct = await AsyncStorage.getItem("codebar");
          // console.log(keyProduct);
         
          const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${keyProduct}.json`);
          setData(response.data);

          // console.log(response.data);
          setData(response.data);
          setIsLoading(false);
          // })
        } catch (err) {
          console.log(err.message);
        }
      }
      fetchData();
    }, [params.productScanned]);


    return(
      <SafeAreaView style={styles.container_product}>
     {isLoading ?(
       <View  style={styles.container_product}>
          <Image style={styles.image} source={require('../assets/home00Icon.png')}/>
          <Scan/>
       </View>
       ) : ( 
        
        // <ContentInfoProduct data={data}/>

        <FlatList
          data={data}
          renderItem={({ item }) => {
          return (           
              <View style={styles.container}>
                <View style={styles.content_info}>
                  <View style={styles.content_img}>
                      <Image style={styles.img} source={{ uri: item.product.image_url}}/>
                  </View>
                  <View style={styles.info}>
                      <Text style={styles.title}>{item.product.brands}</Text>
                      <Text style={styles.title_info}>{item.product.product_name}</Text>
                      <View style={styles.badge}>
                      <Badge/>
                      <Text style={styles.quality}>Excellent</Text>
                      </View>
                      <View style={styles.content_timer}>
                      <Entypo name="back-in-time" size={16} color="rgb(105,105,105)" />
                      <Text style={styles.timer}>Il y a 19 heurs</Text>
                      </View>
                  </View>
                </View>
                  <Scan/>
              </View>
               )
              }}
              keyExtractor={(item) => item.code}
            >
            </FlatList>
        )}
        <Scan/>
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
      position: "absolute"
    },


    container:{
      flex:1, 
      // alignItems: "center"
  },
  content_info:{
      height: 150,
      width: "90%",
      padding:10,
      flexDirection:"row",
      borderBottomWidth: 1,
    },
    content_img:{
      width:100,
    },
    img:{
      width:70,
      height: 130,
      resizeMode: "contain",
      alignItems: "flex-start",
    },
    title:{
      fontSize: 22
    },
    title_info:{
      fontSize: 16, 
      color: "rgb(105,105,105)"
    },
    quality:{
      fontSize: 12, 
      color: "rgb(105,105,105)"
    },
    badge:{
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
    },
    content_timer:{
      marginTop: 10,
      flexDirection: "row",
      alignItems: "center",
    },
    timer:{
      fontSize: 12, 
      marginLeft: 10, 
      color: "rgb(105,105,105)"
    }
    
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

// const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${props.route.params.productScanned}.json`);
// const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${params.params.productScanned}.json`);
// const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${data}.json`);