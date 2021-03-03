import React from 'react';
import {Text, View, StyleSheet, Image} from "react-native";

const OtherChoiceScreen = (props) => {
    console.log(props);
    return(
      <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/home01Icon.png')} ></Image>
    </View>
    )

}

export default OtherChoiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white"
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