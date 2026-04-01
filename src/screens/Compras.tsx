import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";

import { styles } from "../styles/ComprasStyles";
import ModalCompras from "../components/ModalCompras";
import AlertaConfirmacao from "../components/AlertaConfirmacao";
import { supabase } from "../services/supabase";

export default function Compras() {
  const { t } = useTranslation();

  const [pesquisa, setPesquisa] = useState("");
  const [modalVisivel, setModalVisivel] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState<any>(null);

  const [confirmacaoVisivel, setConfirmacaoVisivel] = useState(false);
  const [produtoParaRemover, setProdutoParaRemover] = useState<any>(null);

  const [listaCompras, setListaCompras] = useState<any[]>([]);

  const [carregando, setCarregando] = useState(true);

  const importarCompras = async (mostrarSpinner = true) => {
    if (mostrarSpinner) setCarregando(true);

    const { data, error } = await supabase
      .from("compras")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao importar lista de compras:", error.message);
      Toast.show({
        type: "error",
        text1: t("toast_erro"),
        text2: t("toast_erro_carregar_compras"),
      });
    } else if (data) {
      setListaCompras(data);
    }
    if (mostrarSpinner) setCarregando(false);
  };

  useFocusEffect(
    useCallback(() => {
      importarCompras();
    }, []),
  );

  const guardarProduto = async (
    nome: string,
    marca: string,
    quantidade: number,
    id?: string,
  ) => {
    const { data: authData } = await supabase.auth.getUser();
    const userId = authData.user?.id;

    if (!userId) {
      Toast.show({
        type: "error",
        text1: t("toast_erro"),
        text2: t("toast_sessao_invalida"),
      });
      return;
    }

    if (id) {
      const { error } = await supabase
        .from("compras")
        .update({ nome, marca, quantidade })
        .eq("id", id);

      if (error)
        Toast.show({
          type: "error",
          text1: t("toast_erro"),
          text2: t("toast_erro_atualizar_produto"),
        });
      else {
        Toast.show({
          type: "success",
          text1: t("toast_sucesso"),
          text2: t("toast_sucesso_atualizar_compras"),
        });
        importarCompras();
      }
    } else {
      const { error } = await supabase
        .from("compras")
        .insert([
          { nome, marca, quantidade, comprado: false, user_id: userId },
        ]);

      if (error) {
        Toast.show({
          type: "error",
          text1: t("toast_erro"),
          text2: t("toast_erro_add_lista"),
        });
      } else {
        Toast.show({
          type: "success",
          text1: t("toast_sucesso"),
          text2: t("toast_sucesso_add_lista"),
        });
        importarCompras();
      }
    }
  };

  const alternarComprado = async (id: string, estadoAtual: boolean) => {
    const novoEstado = !estadoAtual;

    setListaCompras((listaAtual) =>
      listaAtual.map((item) =>
        item.id === id ? { ...item, comprado: novoEstado } : item,
      ),
    );

    const { error } = await supabase
      .from("compras")
      .update({ comprado: novoEstado })
      .eq("id", id);

    if (error) {
      Toast.show({
        type: "error",
        text1: t("toast_erro"),
        text2: t("toast_erro_alterar_estado"),
      });
      importarCompras(false);
    }
  };

  const removerItem = async (id: string) => {
    const { error } = await supabase.from("compras").delete().eq("id", id);

    if (error) {
      Toast.show({
        type: "error",
        text1: t("toast_erro"),
        text2: t("toast_erro_eliminar_lista"),
      });
    } else {
      Toast.show({
        type: "success",
        text1: t("toast_eliminado"),
        text2: t("toast_sucesso_eliminar_lista"),
      });
      importarCompras();
    }
  };

  const pedirConfirmacaoRemocao = (itemSelecionado: any) => {
    setProdutoParaRemover(itemSelecionado);
    setConfirmacaoVisivel(true);
  };

  const confirmarRemocao = () => {
    if (produtoParaRemover) {
      removerItem(produtoParaRemover.id);
      setConfirmacaoVisivel(false);

      setTimeout(() => {
        setProdutoParaRemover(null);
      }, 300);
    }
  };

  const itensParaMostrar = listaCompras
    .filter(
      (item) =>
        item.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
        (item.marca &&
          item.marca.toLowerCase().includes(pesquisa.toLowerCase())), // <-- PESQUISA PELA MARCA
    )
    .sort((a, b) => {
      if (a.comprado === b.comprado) return 0;
      return a.comprado ? 1 : -1;
    });

  const desenharItem = ({ item }: { item: any }) => (
    <Pressable
      onPress={() => {
        alternarComprado(item.id, item.comprado);
      }}
      style={({ pressed }) => [
        styles.cartao,
        item.comprado && styles.cartaoComprado,
        pressed && { backgroundColor: "#f1f3f5", transform: [{ scale: 0.98 }] },
      ]}
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

      <Pressable
        onPress={() => {
          setProdutoEditando(item);
          setModalVisivel(true);
        }}
        style={({ pressed }) => [
          styles.colEdit,
          pressed && { transform: [{ scale: 0.9 }], opacity: 0.85 },
        ]}
      >
        <Ionicons name="pencil" size={20} color="#2196F3" />
      </Pressable>

      <Pressable
        onPress={() => {
          pedirConfirmacaoRemocao(item);
        }}
        style={({ pressed }) => [
          styles.colDelete,
          pressed && { transform: [{ scale: 0.9 }], opacity: 0.85 },
        ]}
      >
        <Ionicons name="close" size={24} color="#f44336" />
      </Pressable>
    </Pressable>
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
            placeholder={t("comp_pesquisar")}
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
        <View style={styles.colCheckbox} />
        <Text style={[styles.textoCabecalho, styles.colNome]}>
          {t("comp_col_produto")}
        </Text>
        <Text style={[styles.textoCabecalho, styles.colQtd]}>
          {t("comp_col_qtd")}
        </Text>
        <View style={styles.colEdit} />
        <View style={styles.colDelete} />
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
          data={itensParaMostrar}
          keyExtractor={(item) => item.id}
          renderItem={desenharItem}
          contentContainerStyle={styles.lista}
          ListFooterComponent={<View style={{ height: 110 }} />}
          ListEmptyComponent={
            <View style={{ alignItems: "center", marginTop: 60 }}>
              <MaterialIcons name="shopping-cart" size={60} color="#ccc" />
              <Text style={{ color: "#888", fontSize: 16, marginTop: 10 }}>
                {pesquisa ? t("comp_nada_encontrado") : t("comp_vazia")}
              </Text>
            </View>
          }
        />
      )}

      <ModalCompras
        visivel={modalVisivel}
        aoFechar={() => setModalVisivel(false)}
        aoGuardar={guardarProduto}
        produtoEdicao={produtoEditando}
      />

      <AlertaConfirmacao
        visivel={confirmacaoVisivel}
        titulo={t("msg_titulo_remover_lista")}
        mensagem={
          produtoParaRemover
            ? t("msg_remover_compras", { nome: produtoParaRemover?.nome })
            : "..."
        }
        aoCancelar={() => setConfirmacaoVisivel(false)}
        aoConfirmar={confirmarRemocao}
      />
    </View>
  );
}
