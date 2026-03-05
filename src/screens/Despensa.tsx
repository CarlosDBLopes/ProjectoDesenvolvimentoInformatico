import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "../styles/DespensaStyles";

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
