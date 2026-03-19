import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  Image,
  Alert,
} from "react-native";
import * as FileSystem from "expo-file-system/legacy";
import { decode } from "base64-arraybuffer";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import { styles } from "../styles/DespensaStyles";
import ModalDespensa from "../components/ModalDespensa";
import { supabase } from "../services/supabase";

const extrairNomeFicheiro = (url: string) => {
  if (!url) return null;
  const partes = url.split("/");
  return partes[partes.length - 1];
};

export default function Despensa() {
  const [pesquisa, setPesquisa] = useState("");
  const [produtos, setProdutos] = useState<any[]>([]);

  const [modalVisivel, setModalVisivel] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState<any>(null);

  const importarProdutos = async () => {
    const { data, error } = await supabase
      .from("despensa")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao buscar produtos:", error.message);
      Alert.alert("Erro", "Não foi possível carregar a despensa.");
    } else if (data) {
      setProdutos(data);
    }
  };

  useFocusEffect(
    useCallback(() => {
      importarProdutos();
    }, []),
  );

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

  const guardarProduto = async (
    nome: string,
    marca: string,
    quantidade: number,
    validade: string,
    imagem: string | null,
    id?: string,
  ) => {
    let imagemFinal = imagem;

    if (imagem && imagem.startsWith("file://")) {
      try {
        const base64 = await FileSystem.readAsStringAsync(imagem, {
          encoding: "base64",
        });
        const nomeFicheiro = `${new Date().getTime()}.jpg`;

        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(nomeFicheiro, decode(base64), { contentType: "image/jpeg" });

        if (uploadError) {
          Alert.alert(
            "Aviso",
            "A imagem não foi guardada, mas o produto será gravado.",
          );
        } else {
          const { data: publicData } = supabase.storage
            .from("images")
            .getPublicUrl(nomeFicheiro);

          imagemFinal = publicData.publicUrl;

          if (id) {
            const produtoAntigo = produtos.find((p) => p.id === id);
            if (
              produtoAntigo &&
              produtoAntigo.imagem &&
              produtoAntigo.imagem.startsWith("http")
            ) {
              const nomeFicheiroAntigo = extrairNomeFicheiro(
                produtoAntigo.imagem,
              );
              if (nomeFicheiroAntigo) {
                await supabase.storage
                  .from("images")
                  .remove([nomeFicheiroAntigo]);
                console.log(
                  "Substituição: Imagem antiga apagada:",
                  nomeFicheiroAntigo,
                );
              }
            }
          }
        }
      } catch (error) {
        console.error("Erro ao processar imagem:", error);
      }
    }

    if (id) {
      const { error } = await supabase
        .from("despensa")
        .update({ nome, marca, quantidade, validade, imagem: imagemFinal })
        .eq("id", id);

      if (error) {
        Alert.alert("Erro", "Não foi possível atualizar o produto.");
      } else {
        importarProdutos();
      }
    } else {
      const { error } = await supabase
        .from("despensa")
        .insert([{ nome, marca, quantidade, validade, imagem: imagemFinal }]);

      if (error) {
        Alert.alert("Erro", "Não foi possível guardar o produto.");
      } else {
        importarProdutos();
      }
    }
  };

  const removerProduto = async (id: string) => {
    const produtoA_Apagar = produtos.find((p) => p.id === id);

    const { error } = await supabase.from("despensa").delete().eq("id", id);

    if (error) {
      Alert.alert("Erro", "Não foi possível eliminar o produto.");
    } else {
      if (
        produtoA_Apagar &&
        produtoA_Apagar.imagem &&
        produtoA_Apagar.imagem.startsWith("http")
      ) {
        const nomeFicheiro = extrairNomeFicheiro(produtoA_Apagar.imagem);
        if (nomeFicheiro) {
          await supabase.storage.from("images").remove([nomeFicheiro]);
          console.log("Imagem antiga apagada do Storage:", nomeFicheiro);
        }
      }
      importarProdutos();
    }
  };

  const produtosFiltrados = produtos.filter(
    (produto) =>
      produto.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
      (produto.marca &&
        produto.marca.toLowerCase().includes(pesquisa.toLowerCase())),
  );

  const getCorStatus = (status: string) => {
    if (status === "verde") return "#2e7d32";
    if (status === "amarelo") return "#f0c609";
    if (status === "vermelho") return "#9b111e";
    return "#ccc";
  };

  const desenharCartao = ({ item }: { item: any }) => {
    const novoStatus = calcularStatusValidade(item.validade);

    return (
      <Pressable
        onPress={() => {
          setProdutoEditando(item);
          setModalVisivel(true);
        }}
        style={({ pressed }) => [
          styles.cartao,
          pressed && {
            backgroundColor: "#f1f3f5",
            transform: [{ scale: 0.98 }],
          },
        ]}
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
              { backgroundColor: getCorStatus(novoStatus) },
            ]}
          />
        </View>
      </Pressable>
    );
  };

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

        <Pressable
          onPress={() => {
            setProdutoEditando(null);
            setModalVisivel(true);
          }}
          style={({ pressed }) => [
            styles.botaoAdicionar,
            pressed && { transform: [{ scale: 0.9 }], opacity: 0.85 },
          ]}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </Pressable>
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
