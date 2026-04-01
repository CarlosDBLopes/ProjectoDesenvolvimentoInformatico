import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform, Pressable } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Toast, {
  BaseToast,
  ErrorToast,
  ToastProps,
} from "react-native-toast-message";

import "./src/locales/i18n";
import { useTranslation } from "react-i18next";

import { supabase } from "./src/services/supabase";

import Dashboard from "./src/screens/Dashboard";
import Despensa from "./src/screens/Despensa";
import Compras from "./src/screens/Compras";
import Login from "./src/screens/Login";
import Registo from "./src/screens/Registo";
import RecuperarPassword from "./src/screens/RecuperarPassword";
import Perfil from "./src/screens/Perfil";
import CountryFlag from "react-native-country-flag";
import MenuIdioma from "./src/components/MenuIdioma";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const toastConfig = {
  success: (props: ToastProps) => (
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
  error: (props: ToastProps) => (
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

function BotaoPerfil() {
  const navigation = useNavigation<any>();
  const [letra, setLetra] = useState("?");

  useEffect(() => {
    const fetchNome = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (authData?.user) {
        const { data } = await supabase
          .from("perfis")
          .select("nome")
          .eq("id", authData.user.id)
          .single();

        if (data && data.nome) {
          setLetra(data.nome.charAt(0).toUpperCase());
        }
      }
    };
    fetchNome();
  }, []);

  return (
    <Pressable
      onPress={() => navigation.navigate("Perfil")}
      style={({ pressed }) => [
        {
          marginLeft: 15,
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: "#ffffff",
          justifyContent: "center",
          alignItems: "center",
          elevation: 2,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
        },
        pressed && { transform: [{ scale: 0.9 }], opacity: 0.8 },
      ]}
    >
      <Text style={{ color: "#2e7d32", fontSize: 18, fontWeight: "bold" }}>
        {letra}
      </Text>
    </Pressable>
  );
}

function BotaoIdioma() {
  const { i18n } = useTranslation();
  const [menuVisivel, setMenuVisivel] = useState(false);

  const getIsoCode = () => {
    if (i18n.language === "en") return "GB";
    if (i18n.language === "es") return "ES";
    return "PT";
  };

  return (
    <>
      <Pressable
        onPress={() => setMenuVisivel(true)}
        style={({ pressed }) => [
          { marginRight: 15, justifyContent: "center", alignItems: "center" },
          pressed && { transform: [{ scale: 0.9 }], opacity: 0.8 },
        ]}
      >
        <CountryFlag
          isoCode={getIsoCode()}
          size={24}
          style={{ borderRadius: 4, borderWidth: 1, borderColor: "#fff" }}
        />
      </Pressable>

      <MenuIdioma
        visivel={menuVisivel}
        aoFechar={() => setMenuVisivel(false)}
      />
    </>
  );
}

function MainTabs() {
  const { t } = useTranslation();

  return (
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

        headerLeft: () => <BotaoPerfil />,
        headerRight: () => <BotaoIdioma />,

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
          headerTitle: t("tab_despensa"),
          tabBarLabel: t("tab_despensa"),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="food-bank" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerTitle: t("tab_inicio"),
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
          headerTitle: t("tab_compras"),
          tabBarLabel: t("tab_compras"),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="shopping-cart" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [sessao, setSessao] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSessao(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSessao(session);
    });
  }, []);

  return (
    <>
      <NavigationContainer>
        {sessao && sessao.user ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="Perfil" component={Perfil} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registo" component={Registo} />
            <Stack.Screen
              name="RecuperarPassword"
              component={RecuperarPassword}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
      <Toast config={toastConfig} topOffset={50} />
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
