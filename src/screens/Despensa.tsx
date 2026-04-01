import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import * as FileSystem from "expo-file-system/legacy";
import { decode } from "base64-arraybuffer";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";

import { styles } from "../styles/DespensaStyles";
import ModalDespensa from "../components/ModalDespensa";
import { supabase } from "../services/supabase";

const extrairNomeFicheiro = (url: string) => {
  if (!url) return null;
  const partes = url.split("/");
  return partes[partes.length - 1];
};

export default function Despensa() {
  const { t } = useTranslation();

  const [pesquisa, setPesquisa] = useState("");
  const [produtos, setProdutos] = useState<any[]>([]);

  const [carregando, setCarregando] = useState(true);

  const [modalVisivel, setModalVisivel] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState<any>(null);

  const importarProdutos = async () => {
    setCarregando(true);
    const { data, error } = await supabase
      .from("despensa")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      Toast.show({
        type: "error",
        text1: t("toast_erro"),
        text2: t("toast_erro_carregar_despensa"),
      });
    } else if (data) {
      setProdutos(data);
    }
    setCarregando(false);
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
    setCarregando(true);

    const { data: authData } = await supabase.auth.getUser();
    const userId = authData.user?.id;

    if (!userId) {
      Toast.show({
        type: "error",
        text1: t("toast_erro"),
        text2: t("toast_sessao_invalida"),
      });
      setCarregando(false);
      return;
    }

    let imagemFinal = imagem;

    if (imagem && imagem.startsWith("file://")) {
      const base64 = await FileSystem.readAsStringAsync(imagem, {
        encoding: "base64",
      });
      const nomeFicheiro = `${new Date().getTime()}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(nomeFicheiro, decode(base64), { contentType: "image/jpeg" });

      if (uploadError) {
        Toast.show({
          type: "error",
          text1: t("toast_aviso_imagem"),
          text2: t("toast_aviso_imagem_msg"),
        });
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
            }
          }
        }
      }
    }

    if (id) {
      const { error } = await supabase
        .from("despensa")
        .update({ nome, marca, quantidade, validade, imagem: imagemFinal })
        .eq("id", id);

      if (error) {
        Toast.show({
          type: "error",
          text1: t("toast_erro"),
          text2: t("toast_erro_atualizar_produto"),
        });
        setCarregando(false);
      } else {
        Toast.show({
          type: "success",
          text1: t("toast_sucesso"),
          text2: t("toast_sucesso_atualizar_despensa"),
        });
        importarProdutos();
      }
    } else {
      const { error } = await supabase.from("despensa").insert([
        {
          nome,
          marca,
          quantidade,
          validade,
          imagem: imagemFinal,
          user_id: userId,
        },
      ]);

      if (error) {
        Toast.show({
          type: "error",
          text1: t("toast_erro"),
          text2: t("toast_erro_guardar_produto"),
        });
        setCarregando(false);
      } else {
        Toast.show({
          type: "success",
          text1: t("toast_sucesso"),
          text2: t("toast_sucesso_add_despensa"),
        });
        importarProdutos();
      }
    }
  };

  const removerProduto = async (id: string) => {
    setCarregando(true);
    const produtoA_Apagar = produtos.find((p) => p.id === id);

    const { error } = await supabase.from("despensa").delete().eq("id", id);

    if (error) {
      Toast.show({
        type: "error",
        text1: t("toast_erro"),
        text2: t("toast_erro_eliminar_produto"),
      });
      setCarregando(false);
    } else {
      if (
        produtoA_Apagar &&
        produtoA_Apagar.imagem &&
        produtoA_Apagar.imagem.startsWith("http")
      ) {
        const nomeFicheiro = extrairNomeFicheiro(produtoA_Apagar.imagem);
        if (nomeFicheiro) {
          await supabase.storage.from("images").remove([nomeFicheiro]);
        }
      }
      Toast.show({
        type: "success",
        text1: t("toast_eliminado"),
        text2: t("toast_sucesso_eliminar_despensa"),
      });
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
            placeholder={t("desp_pesquisar")}
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
        <Text style={[styles.textoCabecalho, styles.colImagem]}>
          {t("desp_col_imagem")}
        </Text>
        <Text style={[styles.textoCabecalho, styles.colNome]}>
          {t("desp_col_produto")}
        </Text>
        <Text style={[styles.textoCabecalho, styles.colQtd]}>
          {t("desp_col_qtd")}
        </Text>
        <Text style={[styles.textoCabecalho, styles.colStatus]}>
          {t("desp_col_estado")}
        </Text>
      </View>

      {carregando ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 150,
          }}
        >
          <ActivityIndicator size="large" color="#2e7d32" />
        </View>
      ) : (
        <FlatList
          data={produtosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={desenharCartao}
          contentContainerStyle={styles.lista}
          ListFooterComponent={<View style={{ height: 110 }} />}
          ListEmptyComponent={
            <View style={{ alignItems: "center", marginTop: 60 }}>
              <MaterialIcons name="food-bank" size={60} color="#ccc" />
              <Text style={{ color: "#888", fontSize: 16, marginTop: 10 }}>
                {pesquisa ? t("desp_nada_encontrado") : t("desp_vazia")}
              </Text>
            </View>
          }
        />
      )}

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
