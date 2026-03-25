import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "../styles/ModalComprasStyles";

interface ModalComprasProps {
  visivel: boolean;
  aoFechar: () => void;
  aoGuardar: (
    nome: string,
    marca: string,
    quantidade: number,
    id?: string,
  ) => void;
  produtoEdicao?: {
    id: string;
    nome: string;
    marca: string;
    quantidade: number;
  } | null;
}

export default function ModalCompras({
  visivel,
  aoFechar,
  aoGuardar,
  produtoEdicao,
}: ModalComprasProps) {
  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [quantidade, setQuantidade] = useState(1);

  const [nomeErro, setNomeErro] = useState("");

  useEffect(() => {
    if (produtoEdicao) {
      setNome(produtoEdicao.nome);
      setMarca(produtoEdicao.marca || "");
      setQuantidade(produtoEdicao.quantidade);
      setNomeErro("");
    } else {
      setNome("");
      setMarca("");
      setQuantidade(1);
      setNomeErro("");
    }
  }, [produtoEdicao, visivel]);

  const limparEFechar = () => {
    setNome("");
    setMarca("");
    setQuantidade(1);
    setNomeErro("");
    aoFechar();
  };

  const lidarComGuardar = () => {
    if (nome.trim() === "") {
      setNomeErro("Por favor, insira o nome do produto!");
      return;
    }
    aoGuardar(nome, marca, quantidade, produtoEdicao?.id);
    limparEFechar();
  };

  const modoEdicao = !!produtoEdicao;

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visivel}
      onRequestClose={limparEFechar}
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: -47 })}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.fundoEscuro}>
            <TouchableWithoutFeedback>
              <View style={styles.cartaoModal}>
                <View style={styles.cabecalho}>
                  <Text style={styles.titulo}>
                    {modoEdicao ? "Editar Produto" : "Adicionar à Lista"}
                  </Text>
                  <Pressable
                    onPress={limparEFechar}
                    style={({ pressed }) => [
                      pressed && { transform: [{ scale: 0.85 }], opacity: 0.7 },
                    ]}
                  >
                    <Ionicons name="close" size={28} color="#888" />
                  </Pressable>
                </View>

                <Text style={styles.label}>Nome do Produto *</Text>
                <TextInput
                  style={[
                    styles.input,
                    { borderWidth: 1, borderColor: "transparent" },
                    nomeErro
                      ? { borderColor: "#d32f2f", backgroundColor: "#fff5f5" }
                      : null,
                  ]}
                  placeholder="Ex: Leite"
                  value={nome}
                  onChangeText={(texto) => {
                    setNome(texto);
                    setNomeErro("");
                  }}
                />
                {nomeErro ? (
                  <Text
                    style={{ color: "#d32f2f", fontSize: 13, marginTop: 2 }}
                  >
                    {nomeErro}
                  </Text>
                ) : null}

                <Text style={styles.label}>Marca do Produto (Opcional)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Mimosa"
                  value={marca}
                  onChangeText={setMarca}
                />

                <Text style={styles.label}>Quantidade</Text>
                <View style={styles.zonaQuantidade}>
                  <Pressable
                    onPress={() => {
                      setQuantidade((qtd) => Math.max(1, qtd - 1));
                    }}
                    style={({ pressed }) => [
                      styles.botaoQtd,
                      pressed && { transform: [{ scale: 0.9 }], opacity: 0.85 },
                    ]}
                  >
                    <Ionicons name="remove" size={24} color="#333" />
                  </Pressable>

                  <Text style={styles.textoQtd}>{quantidade}</Text>

                  <Pressable
                    onPress={() => {
                      setQuantidade((qtd) => Math.max(1, qtd + 1));
                    }}
                    style={({ pressed }) => [
                      styles.botaoQtd,
                      pressed && { transform: [{ scale: 0.9 }], opacity: 0.85 },
                    ]}
                  >
                    <Ionicons name="add" size={24} color="#333" />
                  </Pressable>
                </View>

                <Pressable
                  onPress={lidarComGuardar}
                  style={({ pressed }) => [
                    styles.botaoGuardar,
                    pressed && { transform: [{ scale: 0.96 }], opacity: 0.85 },
                  ]}
                >
                  <Text style={styles.textoBotaoGuardar}>
                    {modoEdicao ? "Guardar Alterações" : "Adicionar à Lista"}
                  </Text>
                </Pressable>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}
