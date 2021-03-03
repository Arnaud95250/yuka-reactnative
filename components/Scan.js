import React from 'react';
import {View, StyleSheet, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/core";

import { MaterialCommunityIcons } from '@expo/vector-icons';

const Scan = (props) => {
    const navigation = useNavigation();

    return(
        <View style={styles.content_scan}>
            <TouchableOpacity style={styles.scan} onPress={() => navigation.navigate("ScanScreen")}>
                <MaterialCommunityIcons name="barcode-scan" size={24} color="white"/>
            </TouchableOpacity>
        </View> 
        )
      }
      
export default Scan;

const styles = StyleSheet.create({
    content_scan:{
        position: "absolute",
        right: 20,
        bottom: 20  
      },
      scan:{
        backgroundColor: "rgb(80, 196, 130)",
        alignItems: "center",
        justifyContent: "center",
        borderRadius:50,
        height: 50,
        width: 50,
      },
  });
  

//   <View style={styles.content_scan}>
//             <TouchableOpacity style={styles.scan} onPress={() => navigation.navigate("ScanScreen")} >
//                 <MaterialCommunityIcons name="barcode-scan" size={24} color="white"/>
//             </TouchableOpacity>
//         </View> 