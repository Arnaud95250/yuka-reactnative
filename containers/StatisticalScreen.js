import React from 'react';
import {Text, View, StyleSheet, Image} from "react-native";

const StatisticalScreen = () => {
    console.log("page StatisticalScreen");
    return(
      <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/home02Icon.png')} ></Image>
  </View>
        
    )
}

export default StatisticalScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 1,
    flexDirection: "column",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "stretch",
  },
  });