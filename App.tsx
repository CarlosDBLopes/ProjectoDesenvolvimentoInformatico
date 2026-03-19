import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

import Dashboard from "./src/screens/Dashboard";
import Despensa from "./src/screens/Despensa";
import Compras from "./src/screens/Compras";

const Tab = createBottomTabNavigator();

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: "#e8f5e9",
        borderLeftWidth: 0,
        borderRadius: 12,
        height: "auto",
        paddingVertical: 15,
        width: "90%",
        elevation: 3,
        shadowOpacity: 0.1,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
        fontWeight: "bold",
        color: "#2e7d32",
      }}
      text2Style={{
        fontSize: 15,
        color: "#444",
        flexWrap: "wrap",
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: "#ffebee",
        borderLeftWidth: 0,
        borderRadius: 12,
        height: "auto",
        paddingVertical: 15,
        width: "90%",
        elevation: 3,
        shadowOpacity: 0.1,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
        fontWeight: "bold",
        color: "#d32f2f",
      }}
      text2Style={{
        fontSize: 15,
        color: "#444",
        flexWrap: "wrap",
      }}
    />
  ),
};

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            tabBarShowLabel: true,
            tabBarActiveTintColor: "#2e7d32",
            tabBarInactiveTintColor: "gray",

            headerStyle: {
              backgroundColor: "#2e7d32",
            },
            headerTintColor: "#ffffff",
            headerTitleAlign: "center",

            tabBarStyle: {
              backgroundColor: "#ffffff",
              height: 95,
              paddingBottom: Platform.OS === "ios" ? 30 : 20,
              elevation: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              position: "absolute",
            },
          }}
        >
          <Tab.Screen
            name="Despensa"
            component={Despensa}
            options={{
              headerTitle: "A Minha Despensa",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="food-bank" size={size} color={color} />
              ),
            }}
          />

          <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerTitle: "Início",
              tabBarLabel: () => null,
              tabBarIcon: ({ focused }) => (
                <View
                  style={[
                    styles.tabCentral,
                    { backgroundColor: focused ? "#2e7d32" : "#ffffff" },
                  ]}
                >
                  <Ionicons
                    name="home"
                    size={28}
                    color={focused ? "#ffffff" : "gray"}
                  />
                </View>
              ),
            }}
          />

          <Tab.Screen
            name="Compras"
            component={Compras}
            options={{
              headerTitle: "Lista de Compras",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="shopping-cart" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} topOffset={50} />
      {/*<Toast config={toastConfig} topOffset={110} />*/}
    </>
  );
}

const styles = StyleSheet.create({
  tabCentral: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    top: -10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
});
