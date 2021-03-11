import React from 'react';
import {Text, View, StyleSheet, Image} from "react-native";
import Badge from "../components/Badge";

import { Entypo } from '@expo/vector-icons';

const ContentInfoProduct = ({data}) => {
    return(
        <View style={styles.container}>
            <View style={styles.content_info}>
                <View style={styles.content_img}>
                    <Image style={styles.img} source={{ uri: data.product.image_url}}/>
                </View>
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={1}>{data.product.brands}</Text>
                    <Text style={styles.title_info} numberOfLines={1}>{data.product.product_name}</Text>
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
     </View>
    )
  }
export default ContentInfoProduct;

const styles = StyleSheet.create({
    container:{
        // flex:1, 
        alignItems: "center"
    },
    content_info:{
        height: 150,
        width: "90%",
        padding:10,
        flexDirection:"row",   
      },
      info:{
        width: "70%"
        
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
        fontSize: 22,
        overflow: "hidden",
      },
      title_info:{
        fontSize: 16, 
        color: "rgb(105,105,105)",
        overflow: "hidden",
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
      },
  });