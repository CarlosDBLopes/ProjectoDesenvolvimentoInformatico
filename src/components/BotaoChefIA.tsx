import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import ModalChefIA from "./ModalChefIA";

export default function BotaoChefIA() {
  const { t } = useTranslation();
  const [modalVisivel, setModalVisivel] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => setModalVisivel(true)}
        style={({ pressed }) => [
          styles.botao,
          pressed && { transform: [{ scale: 0.9 }], opacity: 0.85 },
        ]}
      >
        <View style={styles.content}>
          <MaterialCommunityIcons name="chef-hat" size={28} color="#fff" />

          <Text style={styles.label}>{t("ia_label")}</Text>
        </View>
      </Pressable>

      <ModalChefIA
        visivel={modalVisivel}
        aoFechar={() => setModalVisivel(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  botao: {
    position: "absolute",
    bottom: 110,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2e7d32",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 999,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: -2,
  },
});
