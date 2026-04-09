import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  fundoEscuro: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  cartaoModal: {
    backgroundColor: "#f8f9fa",
    height: "85%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: "hidden",
  },
  cabecalho: {
    backgroundColor: "#2e7d32",
    padding: 20,
    paddingTop: Platform.OS === "ios" ? 40 : 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoChef: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconChef: {
    marginRight: 10,
  },
  emojiChef: {
    fontSize: 24,
  },
  titulo: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitulo: {
    color: "#e8f5e9",
    fontSize: 13,
  },
  areaChat: {
    flex: 1,
  },
  balao: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  balaoIA: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  balaoUser: {
    backgroundColor: "#2e7d32",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  textoMensagem: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
  zonaA_Pensar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginLeft: 10,
  },
  textoA_Pensar: {
    marginLeft: 8,
    color: "#666",
    fontStyle: "italic",
  },
  areaInput: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
    alignItems: "flex-end",
    paddingBottom: Platform.OS === "android" ? 60 : 40,
  },
  input: {
    flex: 1,
    backgroundColor: "#f1f3f5",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 16,
    maxHeight: 100,
    minHeight: 45,
  },
  botaoEnviar: {
    backgroundColor: "#2e7d32",
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginBottom: 2,
  },
});
