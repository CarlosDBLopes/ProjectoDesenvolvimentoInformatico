import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "../styles/ComprasStyles";
import ModalCompras from "../components/ModalCompras";

export default function Compras() {
  const [pesquisa, setPesquisa] = useState("");
  const [modalVisivel, setModalVisivel] = useState(false);
  const adicionarProduto = (
    nome: string,
    marca: string,
    quantidade: number,
  ) => {
    const novoProduto = {
      id: Math.random().toString(),
      nome: nome,
      marca: marca,
      quantidade: quantidade,
      comprado: false,
    };
    setListaCompras((listaAtual) => [novoProduto, ...listaAtual]);
  };
  const [listaCompras, setListaCompras] = useState([
    {
      id: "1",
      nome: "Azeite",
      marca: "Gallo",
      quantidade: 1,
      comprado: false,
    },
    {
      id: "2",
      nome: "Detergente Roupa",
      marca: "Skip",
      quantidade: 1,
      comprado: false,
    },
    {
      id: "3",
      nome: "Pasta de Dentes",
      marca: "Colgate",
      quantidade: 2,
      comprado: false,
    },
    {
      id: "4",
      nome: "Bananas",
      marca: "Madeira",
      quantidade: 6,
      comprado: true,
    },
  ]);

  const alternarComprado = (id: string) => {
    setListaCompras((listaAtual) =>
      listaAtual.map((item) => {
        if (item.id === id) {
          return { ...item, comprado: !item.comprado };
        }
        return item;
      }),
    );
  };

  const removerItem = (id: string) => {
    setListaCompras((listaAtual) =>
      listaAtual.filter((item) => item.id !== id),
    );
  };

  const itensParaMostrar = listaCompras
    .filter(
      (item) =>
        item.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
        item.marca.toLowerCase().includes(pesquisa.toLowerCase()),
    )
    .sort((a, b) => {
      if (a.comprado === b.comprado) return 0;
      return a.comprado ? 1 : -1;
    });

  const desenharItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.cartao, item.comprado && styles.cartaoComprado]}
      onPress={() => alternarComprado(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.colCheckbox}>
        <Ionicons
          name={item.comprado ? "checkbox" : "square-outline"}
          size={26}
          color={item.comprado ? "#4caf50" : "#aaa"}
        />
      </View>

      <View style={styles.colNome}>
        <Text
          style={[styles.nomeProduto, item.comprado && styles.textoRiscado]}
        >
          {item.nome}
        </Text>
        {item.marca ? (
          <Text
            style={[styles.marcaProduto, item.comprado && styles.textoRiscado]}
          >
            {item.marca}
          </Text>
        ) : null}
      </View>

      <View style={styles.colQtd}>
        <Text style={[styles.textoQtd, item.comprado && styles.textoRiscado]}>
          {item.quantidade}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.colDelete}
        onPress={() => removerItem(item.id)}
      >
        <Ionicons name="close" size={24} color="#f44336" />
      </TouchableOpacity>
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
            placeholder="Procurar na lista..."
            value={pesquisa}
            onChangeText={(texto) => setPesquisa(texto)}
          />
        </View>

        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={() => setModalVisivel(true)}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.cabecalhoTabela}>
        <View style={styles.colCheckbox} />
        <Text style={[styles.textoCabecalho, styles.colNome]}>Produto</Text>
        <Text style={[styles.textoCabecalho, styles.colQtd]}>Qtd.</Text>
        <View style={styles.colDelete} />
      </View>

      <FlatList
        data={itensParaMostrar}
        keyExtractor={(item) => item.id}
        renderItem={desenharItem}
        contentContainerStyle={styles.lista}
        ListFooterComponent={<View style={{ height: 110 }} />}
      />

      <ModalCompras
        visivel={modalVisivel}
        aoFechar={() => setModalVisivel(false)}
        aoGuardar={adicionarProduto}
      />
    </View>
  );
}
