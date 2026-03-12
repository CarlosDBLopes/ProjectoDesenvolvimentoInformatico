import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "../styles/ModalComprasStyles";
import AlertaPersonalizado from "./AlertaPersonalizado";

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
  const [alertaVisivel, setAlertaVisivel] = useState(false);

  useEffect(() => {
    if (produtoEdicao) {
      setNome(produtoEdicao.nome);
      setMarca(produtoEdicao.marca || "");
      setQuantidade(produtoEdicao.quantidade);
    } else {
      setNome("");
      setMarca("");
      setQuantidade(1);
    }
  }, [produtoEdicao, visivel]);

  const limparEFechar = () => {
    setNome("");
    setMarca("");
    setQuantidade(1);
    aoFechar();
  };

  const lidarComGuardar = () => {
    if (nome.trim() === "") {
      setAlertaVisivel(true);
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
                  <TouchableOpacity onPress={limparEFechar}>
                    <Ionicons name="close" size={28} color="#888" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.label}>Nome do Produto *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Leite"
                  value={nome}
                  onChangeText={setNome}
                />

                <Text style={styles.label}>Marca do Produto (Opcional)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Mimosa"
                  value={marca}
                  onChangeText={setMarca}
                />

                <Text style={styles.label}>Quantidade</Text>
                <View style={styles.zonaQuantidade}>
                  <TouchableOpacity
                    style={styles.botaoQtd}
                    onPress={() => setQuantidade((qtd) => Math.max(1, qtd - 1))}
                  >
                    <Ionicons name="remove" size={24} color="#333" />
                  </TouchableOpacity>

                  <Text style={styles.textoQtd}>{quantidade}</Text>

                  <TouchableOpacity
                    style={styles.botaoQtd}
                    onPress={() => setQuantidade((qtd) => qtd + 1)}
                  >
                    <Ionicons name="add" size={24} color="#333" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.botaoGuardar}
                  onPress={lidarComGuardar}
                >
                  <Text style={styles.textoBotaoGuardar}>
                    {modoEdicao ? "Guardar Alterações" : "Adicionar à Lista"}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>

        <AlertaPersonalizado
          visivel={alertaVisivel}
          mensagem="Por favor, insira o nome do produto!"
          aoFechar={() => setAlertaVisivel(false)}
        />
      </KeyboardAvoidingView>
    </Modal>
  );
}
