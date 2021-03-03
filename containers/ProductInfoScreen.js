import React from 'react';
import {Text, View, StyleSheet, Image} from "react-native";

const ProductInfoScreen = (props) => {
    console.log(props);
    console.log("page product");
    return(
    <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/home01Icon.png')} ></Image>
    </View>
        
    )

}

export default ProductInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain", 
    zIndex: 0,
    position: "absolute",
  },
  });