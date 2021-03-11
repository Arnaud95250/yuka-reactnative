import * as React from 'react';
import { useState } from "react";
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

//@expo/vector-icons@12.0.3 ==> https://icons.expo.fyi/  css
import colors from "./assets/colors";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

//Containers
import ProductScreen from "./containers/ProductScreen";
import ProductInfoScreen from "./containers/ProductInfoScreen";
import OtherChoiceScreen from "./containers/OtherChoiceScreen";
import FavoritesScreen from "./containers/FavoritesScreen";
import ScanScreen from "./containers/ScanScreen";

function App() {
  const [test,setTest] = useState("test props");  
  // AsyncStorage.removeItem("datacodebar", null)  //permet de vider mon asyncStorage le commenter une fois vidé
  // AsyncStorage.removeItem("favoritesstocked", null)  //permet de vider mon asyncStorage le commenter une fois vidé

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
              <Tab.Screen name="Product"  
                  options={{ tabBarIcon: ({ color, focused, size }) => (<FontAwesome5 name="carrot" size={24} color={color}/>)}}>
                    {() => (
                    <Stack.Navigator>
                      <Stack.Screen name="Product" options={{ title: '', headerStyle: { height:0 }}}>
                        {(props) => <ProductScreen {...props} test={test} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
              </Tab.Screen>

              {/*Onglet page Favorites*/}
              <Tab.Screen name="Favorites"
                  options={{ tabBarIcon: ({ color, size }) => ( <AntDesign name="star" size={24} color={color} /> )}}>
                    {() => (
                    <Stack.Navigator>
                      <Stack.Screen name="Favorites" options={{ title: '', headerStyle: { height:0 }, zIndex: 1}}>
                        {(props) => <FavoritesScreen {...props} test={test} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
              </Tab.Screen>

              {/*Onglet page Other Choice*/}
              <Tab.Screen name="OtherChoice" component={OtherChoiceScreen} 
                  options={{ tabBarIcon: ({ color, size }) => (<MaterialIcons name="compare-arrows" size={24} color={color}/> )}}>
              </Tab.Screen>

            </Tab.Navigator>
            )}
          </Stack.Screen>

          {/*Navigation sur la page Information produit*/}
          <Stack.Screen name="ProductInfo" 
              options={{ title: '',
              headerStyle: {
                backgroundColor: 'rgb(80, 196, 130)',            
              },
              headerTintColor: 'white',
              headerRight: () => ( 
                <View style={{flexDirection: "row"}}>
                  <Ionicons name="ios-menu" size={24} color="white" style={{marginRight: 10}}/>
                </View>
                ),
              }}>
              {(props) => <ProductInfoScreen {...props} test={test} />}
          </Stack.Screen>

          {/*Navigation sur la page Information ScanScreen*/}
          <Stack.Screen name="ScanScreen"
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
              {() => <ScanScreen/>}
              {/* {(props) => <ScanScreen {...props} setCode={setCode}/>} */}
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