import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import CountryFlag from "react-native-country-flag";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";

interface MenuIdiomaProps {
  visivel: boolean;
  aoFechar: () => void;
}

export default function MenuIdioma({ visivel, aoFechar }: MenuIdiomaProps) {
  const { t, i18n } = useTranslation();

  const mudarIdioma = (lang: string) => {
    i18n.changeLanguage(lang);
    aoFechar();
  };

  return (
    <Modal
      transparent={true}
      visible={visivel}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <TouchableWithoutFeedback onPress={aoFechar}>
        <View style={styles.fundoOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.caixaMenu}>
              <Text style={styles.titulo}>{t("menu_idioma_titulo")}</Text>

              <Pressable
                style={({ pressed }) => [
                  styles.opcao,
                  pressed && { backgroundColor: "#f1f3f5" },
                ]}
                onPress={() => mudarIdioma("pt")}
              >
                <CountryFlag isoCode="PT" size={24} style={styles.bandeira} />
                <Text
                  style={[
                    styles.textoOpcao,
                    i18n.language === "pt" && styles.textoAtivo,
                  ]}
                >
                  Português
                </Text>
                {i18n.language === "pt" && (
                  <Ionicons name="checkmark" size={24} color="#2e7d32" />
                )}
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.opcao,
                  pressed && { backgroundColor: "#f1f3f5" },
                ]}
                onPress={() => mudarIdioma("en")}
              >
                <CountryFlag isoCode="GB" size={24} style={styles.bandeira} />
                <Text
                  style={[
                    styles.textoOpcao,
                    i18n.language === "en" && styles.textoAtivo,
                  ]}
                >
                  English
                </Text>
                {i18n.language === "en" && (
                  <Ionicons name="checkmark" size={24} color="#2e7d32" />
                )}
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.opcao,
                  pressed && { backgroundColor: "#f1f3f5" },
                ]}
                onPress={() => mudarIdioma("es")}
              >
                <CountryFlag isoCode="ES" size={24} style={styles.bandeira} />
                <Text
                  style={[
                    styles.textoOpcao,
                    i18n.language === "es" && styles.textoAtivo,
                  ]}
                >
                  Español
                </Text>
                {i18n.language === "es" && (
                  <Ionicons name="checkmark" size={24} color="#2e7d32" />
                )}
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fundoOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  caixaMenu: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  opcao: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f3f5",
  },
  bandeira: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  textoOpcao: {
    flex: 1,
    fontSize: 16,
    color: "#555",
    marginLeft: 15,
  },
  textoAtivo: {
    color: "#2e7d32",
    fontWeight: "bold",
  },
});
