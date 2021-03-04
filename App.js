import * as React from 'react';
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
// const Drawer = createDrawerNavigator ( ) ; 

//@expo/vector-icons@12.0.3 ==> https://icons.expo.fyi/  css
import colors from "./assets/colors";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

//Components
import Scan from "./components/Scan";

//Containers
import ProductScreen from "./containers/ProductScreen";
import ProductInfoScreen from "./containers/ProductInfoScreen";
import OtherChoiceScreen from "./containers/OtherChoiceScreen";
import StatisticalScreen from "./containers/StatisticalScreen";
import ScanScreen from "./containers/ScanScreen";

function App() {
  const [infoData,setInfoData] = useState("test props");
  const [test,setTest] = useState("test props");  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Product">
        <Stack.Screen name="Product" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator 
              style={styles.tabbar} 
              tabBarOptions={{
                activeTintColor: 'white',
                tabStyle:{width: 70, height: 50},
                indicatorStyle:{backgroundColor: "white"} ,
                showIcon: true,
                showLabel: false,
                style: {
                  backgroundColor: 'rgb(80, 196, 130)',
                }
              }}>
                
              {/*Onglet page Home (PRODUCT)*/}
              <Tab.Screen name="Product" component={ProductScreen} 
                  options={{ tabBarIcon: ({ color, focused, size }) => (<FontAwesome5 name="carrot" size={24} color={color}/>)}}>
              </Tab.Screen>

              {/*Onglet page Other Choice*/}
              <Tab.Screen name="OtherChoice" component={OtherChoiceScreen} 
                  options={{ tabBarIcon: ({ color, size }) => (<MaterialIcons name="compare-arrows" size={24} color={color}/> )}}>
              </Tab.Screen>

              {/*Onglet page Statistical*/}
              <Tab.Screen name="Statistical" component={StatisticalScreen} 
                  options={{ tabBarIcon: ({ color, size }) => ( <AntDesign name="piechart" size={24} color={color}/> )}}>
              </Tab.Screen>
            </Tab.Navigator>
            )}
          </Stack.Screen>

          <Stack.Screen name="ProductScreen">
              {(props) => <ProductScreen {...props} test={test} />}
          </Stack.Screen>

          <Stack.Screen name="ProductInfo">
              {(props) => <ProductInfoScreen {...props} test={test} />}
          </Stack.Screen>

          <Stack.Screen name="ScanScreen"
          //  component={ScanScreen}
          options={{
            title: 'Scanner votre produit',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
              {(props) => <ScanScreen {...props}/>}
          </Stack.Screen>
      </Stack.Navigator>    
    </NavigationContainer>
    
  );
}

export default App;

const styles = StyleSheet.create({
  tabbar: {
    marginTop: 25,
  },
  
});