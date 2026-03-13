import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "../styles/DespensaStyles";
import ModalDespensa from "../components/ModalDespensa";

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

  const [modalVisivel, setModalVisivel] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState<any>(null);

  const calcularStatusValidade = (validade?: string) => {
    if (!validade || validade.length < 10) return "verde";

    const partes = validade.split("/");
    if (partes.length !== 3) return "verde";

    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1;
    const ano = parseInt(partes[2], 10);

    const dataValidade = new Date(ano, mes, dia);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const diferencaTempo = dataValidade.getTime() - hoje.getTime();
    const diferencaDias = Math.ceil(diferencaTempo / (1000 * 3600 * 24));

    if (diferencaDias < 0) {
      return "vermelho";
    } else if (diferencaDias <= 3) {
      return "amarelo";
    } else {
      return "verde";
    }
  };

  const guardarProduto = (
    nome: string,
    marca: string,
    quantidade: number,
    validade: string,
    imagem: string | null,
    id?: string,
  ) => {
    const novoStatus = calcularStatusValidade(validade);

    if (id) {
      setProdutos((produtosAtuais) =>
        produtosAtuais.map((produto) =>
          produto.id === id
            ? {
                ...produto,
                nome,
                marca,
                quantidade,
                validade,
                imagem,
                status: novoStatus,
              }
            : produto,
        ),
      );
    } else {
      const novoProduto = {
        id: Math.random().toString(),
        nome,
        marca,
        quantidade,
        validade,
        imagem,
        status: novoStatus,
      };
      setProdutos((produtosAtuais) => [novoProduto, ...produtosAtuais]);
    }
  };

  const removerProduto = (id: string) => {
    setProdutos((produtosAtuais) =>
      produtosAtuais.filter((produto) => produto.id !== id),
    );
  };

  const produtosFiltrados = produtos.filter(
    (produto) =>
      produto.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
      produto.marca.toLowerCase().includes(pesquisa.toLowerCase()),
  );

  const getCorStatus = (status: string) => {
    if (status === "verde") return "#2e7d32";
    if (status === "amarelo") return "#f0c609";
    if (status === "vermelho") return "#9b111e";
    return "#ccc";
  };

  const desenharCartao = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.cartao}
      onPress={() => {
        setProdutoEditando(item);
        setModalVisivel(true);
      }}
    >
      <View style={styles.colImagem}>
        {item.imagem ? (
          <Image
            source={{ uri: item.imagem }}
            style={styles.caixaImagemPlaceholder}
          />
        ) : (
          <View style={styles.caixaImagemPlaceholder}>
            <Ionicons name="image-outline" size={20} color="#aaa" />
          </View>
        )}
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
        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={() => {
            setProdutoEditando(null);
            setModalVisivel(true);
          }}
        >
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

      <ModalDespensa
        visivel={modalVisivel}
        aoFechar={() => setModalVisivel(false)}
        aoGuardar={guardarProduto}
        aoEliminar={removerProduto}
        produtoEdicao={produtoEditando}
      />
    </View>
  );
}
