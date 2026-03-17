import React from "react";
import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AlertaConfirmacaoProps {
  visivel: boolean;
  titulo?: string;
  mensagem: string;
  textoCancelar?: string;
  textoConfirmar?: string;
  aoCancelar: () => void;
  aoConfirmar: () => void;
}

export default function AlertaConfirmacao({
  visivel,
  titulo = "Atenção",
  mensagem,
  textoCancelar = "Cancelar",
  textoConfirmar = "Eliminar",
  aoCancelar,
  aoConfirmar,
}: AlertaConfirmacaoProps) {
  return (
    <Modal
      transparent={true}
      visible={visivel}
      animationType="fade"
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <View style={styles.fundoOverlay}>
        <View style={styles.caixaAlerta}>
          <View style={styles.iconeContainer}>
            <Ionicons name="trash-outline" size={55} color="#f44336" />
          </View>

          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.mensagem}>{mensagem}</Text>

          <View style={styles.botoesContainer}>
            <Pressable
              onPress={aoCancelar}
              style={({ pressed }) => [
                styles.botao,
                styles.botaoCancelar,
                pressed && { transform: [{ scale: 0.96 }], opacity: 0.8 },
              ]}
            >
              <Text style={styles.textoBotaoCancelar}>{textoCancelar}</Text>
            </Pressable>

            <Pressable
              onPress={aoConfirmar}
              style={({ pressed }) => [
                styles.botao,
                styles.botaoConfirmar,
                pressed && { transform: [{ scale: 0.96 }], opacity: 0.8 },
              ]}
            >
              <Text style={styles.textoBotaoConfirmar}>{textoConfirmar}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fundoOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  caixaAlerta: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  iconeContainer: {
    marginBottom: 15,
    backgroundColor: "#ffebee",
    padding: 15,
    borderRadius: 50,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  mensagem: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 22,
  },
  botoesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  botao: {
    paddingVertical: 12,
    borderRadius: 12,
    width: "48%",
    alignItems: "center",
  },
  botaoCancelar: {
    backgroundColor: "#f1f3f5",
  },
  botaoConfirmar: {
    backgroundColor: "#f44336",
  },
  textoBotaoCancelar: {
    color: "#555",
    fontSize: 16,
    fontWeight: "bold",
  },
  textoBotaoConfirmar: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
