import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  fundoEscuro: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  cartaoModal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // Fix temporário
    //marginBottom: -40,
    paddingTop: 20,
    paddingHorizontal: 20,
    // Fix temporário
    //paddingBottom: Platform.OS === "android" ? 95 : 75,
    paddingBottom: Platform.OS === "android" ? 60 : 40,
    minHeight: 350,
  },
  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#f1f3f5",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: "#333",
  },
  zonaQuantidade: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 20,
  },
  botaoQtd: {
    backgroundColor: "#e9ecef",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  textoQtd: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
    color: "#333",
  },
  botaoGuardar: {
    backgroundColor: "#2e7d32",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  textoBotaoGuardar: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
