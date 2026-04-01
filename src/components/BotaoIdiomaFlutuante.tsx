import React, { useState } from "react";
import { Pressable, StyleSheet, Platform } from "react-native";
import { useTranslation } from "react-i18next";
import CountryFlag from "react-native-country-flag";
import MenuIdioma from "./MenuIdioma";

export default function BotaoIdiomaFlutuante() {
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
          styles.botao,
          pressed && { transform: [{ scale: 0.9 }], opacity: 0.8 },
        ]}
      >
        <CountryFlag isoCode={getIsoCode()} size={26} style={styles.bandeira} />
      </Pressable>

      <MenuIdioma
        visivel={menuVisivel}
        aoFechar={() => setMenuVisivel(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  botao: {
    position: "absolute",
    top: Platform.OS === "ios" ? 63 : 53,
    right: 20,
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  bandeira: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#fff",
  },
});
