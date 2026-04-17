import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  centro: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.9)",
    zIndex: 999,
  },
  textoAviso: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 20,
  },
  botaoPedirPermissao: {
    backgroundColor: "#2e7d32",
    padding: 12,
    borderRadius: 8,
    minWidth: 150,
    alignItems: "center",
  },
  textoBotaoFallback: {
    color: "#fff",
    fontWeight: "bold",
  },
  botaoVoltar: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 1000,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 30,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  mira: {
    width: 280,
    height: 150,
    borderWidth: 3,
    borderColor: "rgba(46, 125, 50, 0.8)",
    borderRadius: 15,
    backgroundColor: "transparent",
  },
  textoInstrucao: {
    color: "#fff",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    overflow: "hidden",
  },
});
