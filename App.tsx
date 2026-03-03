import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Dashboard from "./src/screens/Dashboard";
import Despensa from "./src/screens/Despensa";
import Compras from "./src/screens/Compras";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
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
            height: 90,
            paddingBottom: 25,
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
              <Ionicons name="fast-food-outline" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerTitle: "Início",
            tabBarLabel: "",
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
              <Ionicons name="cart-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
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
