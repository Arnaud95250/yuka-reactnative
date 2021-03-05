import React from 'react';
import {View, StyleSheet} from "react-native";

const Badge = () => {
    return(
      <View style={styles.container}></View>
    )
}
export default Badge;

const styles = StyleSheet.create({
  container: {
      width:10,
      height: 10,
      borderRadius:10,
      backgroundColor: "green",
      marginRight: 10,
      marginLeft: 3
  }
  });