import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  zonaTopo: {
    flexDirection: "row",
    margin: 15,
    alignItems: "center",
  },
  barraPesquisa: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    marginRight: 10,
  },
  iconePesquisa: {
    marginRight: 10,
  },
  inputPesquisa: {
    flex: 1,
    fontSize: 15,
  },
  botaoAdicionar: {
    width: 50,
    height: 50,
    backgroundColor: "#2e7d32",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  cabecalhoTabela: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginBottom: 10,
  },
  textoCabecalho: {
    fontSize: 12,
    color: "#888",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  lista: {
    paddingHorizontal: 15,
  },
  cartao: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 8,
    borderRadius: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
  },
  cartaoComprado: {
    backgroundColor: "#f1f3f5",
    elevation: 0,
  },
  colCheckbox: {
    width: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  colNome: {
    flex: 1,
    paddingLeft: 5,
  },
  colQtd: {
    width: 45,
    alignItems: "center",
    textAlign: "center",
  },
  colEdit: {
    width: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  colDelete: {
    width: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  nomeProduto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  marcaProduto: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },
  textoQtd: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  textoRiscado: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
});
