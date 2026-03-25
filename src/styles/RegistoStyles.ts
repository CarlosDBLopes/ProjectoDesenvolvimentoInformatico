import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  botaoVoltar: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  textoVoltar: {
    color: "#2e7d32",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  zonaTexto: {
    marginBottom: 30,
    marginTop: 50,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2e7d32",
  },
  subtitulo: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  formulario: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f3f5",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 55,
    borderWidth: 1,
    borderColor: "transparent",
  },
  inputContainerErro: {
    borderColor: "#d32f2f",
    backgroundColor: "#fff5f5",
  },
  iconeInput: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  iconeOlho: {
    padding: 5,
  },
  textoErro: {
    color: "#d32f2f",
    fontSize: 13,
    marginTop: -10,
    marginBottom: 15,
    marginLeft: 5,
  },
  textoErroGeral: {
    color: "#d32f2f",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "bold",
    backgroundColor: "#ffebee",
    padding: 10,
    borderRadius: 8,
  },
  botaoRegisto: {
    backgroundColor: "#2e7d32",
    borderRadius: 10,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  textoBotaoRegisto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
