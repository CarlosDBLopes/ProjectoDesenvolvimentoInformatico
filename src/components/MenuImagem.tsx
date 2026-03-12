import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface MenuImagemProps {
  visivel: boolean;
  aoFechar: () => void;
  aoTirarFoto: () => void;
  aoEscolherDaGaleria: () => void;
}

export default function MenuImagem({
  visivel,
  aoFechar,
  aoTirarFoto,
  aoEscolherDaGaleria,
}: MenuImagemProps) {
  return (
    <Modal
      transparent={true}
      visible={visivel}
      animationType="fade"
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <TouchableWithoutFeedback onPress={aoFechar}>
        <View style={styles.fundoOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.caixaMenu}>
              <View style={styles.cabecalhoMenu}>
                <Text style={styles.tituloMenu}>Adicionar Foto</Text>
                <TouchableOpacity onPress={aoFechar}>
                  <Ionicons name="close" size={24} color="#888" />
                </TouchableOpacity>
              </View>

              <View style={styles.opcoesContainer}>
                <TouchableOpacity
                  style={styles.opcaoBotao}
                  onPress={aoTirarFoto}
                >
                  <View
                    style={[
                      styles.iconeCirculo,
                      { backgroundColor: "#e8f5e9" },
                    ]}
                  >
                    <Ionicons name="camera-outline" size={30} color="#2e7d32" />
                  </View>
                  <Text style={styles.opcaoTexto}>Tirar Foto</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.opcaoBotao}
                  onPress={aoEscolherDaGaleria}
                >
                  <View
                    style={[
                      styles.iconeCirculo,
                      { backgroundColor: "#e3f2fd" },
                    ]}
                  >
                    <Ionicons name="image-outline" size={30} color="#2196f3" />
                  </View>
                  <Text style={styles.opcaoTexto}>Escolher da Galeria</Text>
                </TouchableOpacity>
              </View>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  caixaMenu: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    paddingBottom: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    elevation: 10,
  },
  cabecalhoMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  tituloMenu: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  opcoesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  opcaoBotao: {
    alignItems: "center",
    width: "45%",
  },
  iconeCirculo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  opcaoTexto: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});
