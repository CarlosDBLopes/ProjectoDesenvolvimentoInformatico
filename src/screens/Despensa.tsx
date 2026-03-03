import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Despensa() {
  const [pesquisa, setPesquisa] = useState("");
  const [produtos, setProdutos] = useState([
    {
      id: "1",
      nome: "Arroz Agulha",
      marca: "Cigala",
      quantidade: 2,
      status: "verde",
    },
    {
      id: "2",
      nome: "Leite Meio Gordo",
      marca: "Mimosa",
      quantidade: 1,
      status: "amarelo",
    },
    {
      id: "3",
      nome: "Iogurte Natural",
      marca: "Danone",
      quantidade: 4,
      status: "vermelho",
    },
    {
      id: "4",
      nome: "Atum em Lata",
      marca: "Bom Petisco",
      quantidade: 5,
      status: "verde",
    },
  ]);

  const produtosFiltrados = produtos.filter(
    (produto) =>
      produto.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
      produto.marca.toLowerCase().includes(pesquisa.toLowerCase()),
  );

  const getCorStatus = (status: string) => {
    if (status === "verde") return "#4caf50";
    if (status === "amarelo") return "#ffeb3b";
    if (status === "vermelho") return "#f44336";
    return "#ccc";
  };

  const desenharCartao = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.cartao}
      onPress={() => console.log("Abrir produto:", item.nome)}
    >
      <View style={styles.colImagem}>
        <View style={styles.caixaImagemPlaceholder}>
          <Ionicons name="image-outline" size={20} color="#aaa" />
        </View>
      </View>

      <View style={styles.colNome}>
        <Text style={styles.nomeProduto} numberOfLines={1}>
          {item.nome}
        </Text>
        <Text style={styles.marcaProduto} numberOfLines={1}>
          {item.marca}
        </Text>
      </View>

      <View style={styles.colQtd}>
        <Text style={styles.textoQtd}>{item.quantidade}</Text>
      </View>

      <View style={styles.colStatus}>
        <View
          style={[
            styles.bolinhaStatus,
            { backgroundColor: getCorStatus(item.status) },
          ]}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.zonaTopo}>
        <View style={styles.barraPesquisa}>
          <Ionicons
            name="search"
            size={20}
            color="gray"
            style={styles.iconePesquisa}
          />
          <TextInput
            style={styles.inputPesquisa}
            placeholder="Procurar na despensa..."
            value={pesquisa}
            onChangeText={(texto) => setPesquisa(texto)}
          />
        </View>
        <TouchableOpacity style={styles.botaoAdicionar}>
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.cabecalhoTabela}>
        <Text style={[styles.textoCabecalho, styles.colImagem]}>Imagem</Text>
        <Text style={[styles.textoCabecalho, styles.colNome]}>Produto</Text>
        <Text style={[styles.textoCabecalho, styles.colQtd]}>Qtd.</Text>
        <Text style={[styles.textoCabecalho, styles.colStatus]}>Estado</Text>
      </View>

      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={desenharCartao}
        contentContainerStyle={styles.lista}
        ListFooterComponent={<View style={{ height: 110 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
    paddingTop: 10,
    paddingHorizontal: 15,
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
  colImagem: {
    width: 60,
    alignItems: "center",
    textAlign: "center",
  },
  colNome: {
    flex: 1,
    paddingLeft: 10,
  },
  colQtd: {
    width: 50,
    alignItems: "center",
    textAlign: "center",
  },
  colStatus: {
    width: 60,
    alignItems: "center",
    textAlign: "center",
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
  caixaImagemPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: "#f1f3f5",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  nomeProduto: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  marcaProduto: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
  textoQtd: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  bolinhaStatus: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e7d32",
  },
});
