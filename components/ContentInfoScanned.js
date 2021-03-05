import React from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from "react-native";
import Badge from "../components/Badge";

import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


const ContentInfoScanned = ({data}) => {
    return(
        <ScrollView>
        <View style={{flexDirection:"row",  backgroundColor: "white", width: "100%"}}>
          <View>
              <Image style={styles.img} source={{ uri: data.product.image_url}}/>
          </View>
          <View style={styles.content_title}>
              <Text style={styles.title}>{data.product.brands}</Text>
              <Text style={styles.title_info}>{data.product.product_name}</Text>
              <View>
                <Badge/>
                <Text style={styles.note}>{data.product.ecoscore_data.agribalyse.score}/100</Text>
              </View>
          </View>
        </View>
        <View style={styles.ingredients}>

            {/*Sucre*/}
            <View style={styles.info}>
                <View style={{flexDirection: "row", height: 60,  justifyContent: 'center', alignItems: 'center'}}>
                  <View>
                      <Ionicons name="md-cube-sharp" size={28} color="rgb(105,105,105)" /> 
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
                      <Ionicons name="ios-flame-sharp" size={28} color="rgb(105,105,105)" />
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
                      <Ionicons name="water" size={28} color="rgb(105,105,105)" />
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
                  <Fontisto name="spinner" size={28} color="rgb(105,105,105)" />
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
                      <FontAwesome5 name="fish" size={28} color="rgb(105,105,105)" />
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
     
    )
}
export default ContentInfoScanned;

const styles = StyleSheet.create({
    img:{
        width:100,
        height: 130,
        marginLeft: 40,
        resizeMode: "contain",
      },
      content_title:{
        alignSelf: "center",
        marginLeft: 20
      },
      title:{
        fontSize: 20
      },
      title_info:{
        fontSize: 16,
        color: "rgb(105,105,105)"
      },
      note:{
        fontSize: 14,
        marginTop: 10,
        color: "rgb(105,105,105)"
      },
      ingredients:{
        width: "80%",
        alignSelf: "center"
      },
      info:{
        flexDirection: "row",
        height: 60,  
        justifyContent: "space-between", 
        alignItems: 'center',
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        marginTop: 10,
        
      }
});