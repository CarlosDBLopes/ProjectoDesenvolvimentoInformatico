import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AlertaProps {
  visivel: boolean;
  mensagem: string;
  aoFechar: () => void;
}

export default function AlertaPersonalizado({
  visivel,
  mensagem,
  aoFechar,
}: AlertaProps) {
  if (!visivel) return null;

  return (
    <View style={styles.fundoOverlay}>
      <View style={styles.caixaAlerta}>
        <View style={styles.iconeContainer}>
          <Ionicons name="alert-circle" size={55} color="#f44336" />
        </View>

        <Text style={styles.titulo}>Atenção</Text>
        <Text style={styles.mensagem}>{mensagem}</Text>

        <TouchableOpacity style={styles.botao} onPress={aoFechar}>
          <Text style={styles.textoBotao}>Entendi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fundoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    elevation: 999,
  },
  caixaAlerta: {
    width: "80%",
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
  botao: {
    backgroundColor: "#2e7d32",
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 25,
    width: "100%",
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
