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
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { styles } from "../styles/ModalDespensaStyles";
import AlertaPersonalizado from "./AlertaPersonalizado";
import AlertaConfirmacao from "./AlertaConfirmacao";
import AlertaPermissoes from "./AlertaPermissoes";
import MenuImagem from "./MenuImagem";

interface ModalDespensaProps {
  visivel: boolean;
  aoFechar: () => void;
  aoGuardar: (
    nome: string,
    marca: string,
    quantidade: number,
    validade: string,
    imagem: string | null,
    id?: string,
  ) => void;
  aoEliminar?: (id: string) => void;
  produtoEdicao?: {
    id: string;
    nome: string;
    marca: string;
    quantidade: number;
    validade?: string;
    imagem?: string | null;
  } | null;
}

export default function ModalDespensa({
  visivel,
  aoFechar,
  aoGuardar,
  aoEliminar,
  produtoEdicao,
}: ModalDespensaProps) {
  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [validade, setValidade] = useState("");
  const [imagem, setImagem] = useState<string | null>(null);

  const [alertaVisivel, setAlertaVisivel] = useState(false);
  const [confirmacaoVisivel, setConfirmacaoVisivel] = useState(false);
  const [alertaPermissaoVisivel, setAlertaPermissaoVisivel] = useState(false);
  const [mensagemPermissao, setMensagemPermissao] = useState("");
  const [menuImagemVisivel, setMenuImagemVisivel] = useState(false);

  useEffect(() => {
    if (produtoEdicao) {
      setNome(produtoEdicao.nome);
      setMarca(produtoEdicao.marca || "");
      setQuantidade(produtoEdicao.quantidade);
      setValidade(produtoEdicao.validade || "");
      setImagem(produtoEdicao.imagem || null);
    } else {
      setNome("");
      setMarca("");
      setQuantidade(1);
      setValidade("");
      setImagem(null);
    }
  }, [produtoEdicao, visivel]);

  const formatarData = (texto: string) => {
    const apenasNumeros = texto.replace(/\D/g, "");

    const numerosLimitados = apenasNumeros.substring(0, 8);

    let dataFormatada = numerosLimitados;
    if (numerosLimitados.length > 2 && numerosLimitados.length <= 4) {
      dataFormatada = numerosLimitados.replace(/(\d{2})(\d+)/, "$1/$2");
    } else if (numerosLimitados.length > 4) {
      dataFormatada = numerosLimitados.replace(
        /(\d{2})(\d{2})(\d+)/,
        "$1/$2/$3",
      );
    }

    setValidade(dataFormatada);
  };

  const limparEFechar = () => {
    setNome("");
    setMarca("");
    setQuantidade(1);
    setValidade("");
    setImagem(null);
    aoFechar();
  };

  const lidarComGuardar = () => {
    if (nome.trim() === "") {
      setAlertaVisivel(true);
      return;
    }
    aoGuardar(nome, marca, quantidade, validade, imagem, produtoEdicao?.id);
    limparEFechar();
  };

  const escolherOrigemImagem = () => {
    setMenuImagemVisivel(true);
  };

  const tirarFoto = async () => {
    const permissao = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissao.granted) {
      setMensagemPermissao("É necessária permissão para aceder à câmara!");
      setAlertaPermissaoVisivel(true);
      return;
    }
    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
    }
  };

  const escolherDaGaleria = async () => {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissao.granted) {
      setMensagemPermissao("É necessária permissão para aceder à galeria!");
      setAlertaPermissaoVisivel(true);
      return;
    }
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
    }
  };

  const lidarComEliminar = () => {
    setConfirmacaoVisivel(true);
  };

  const confirmarEliminacao = () => {
    if (produtoEdicao && aoEliminar) {
      aoEliminar(produtoEdicao.id);
      setConfirmacaoVisivel(false);
      limparEFechar();
    }
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
                    {modoEdicao ? "Editar Produto" : "Adicionar à Despensa"}
                  </Text>
                  <TouchableOpacity onPress={limparEFechar}>
                    <Ionicons name="close" size={28} color="#888" />
                  </TouchableOpacity>
                </View>

                <View style={styles.fotoContainer}>
                  <TouchableOpacity
                    style={styles.fotoPlaceholder}
                    onPress={escolherOrigemImagem}
                  >
                    {imagem ? (
                      <Image
                        source={{ uri: imagem }}
                        style={styles.imagemProduto}
                      />
                    ) : (
                      <Ionicons name="camera-outline" size={32} color="#aaa" />
                    )}
                  </TouchableOpacity>
                </View>

                <Text style={styles.label}>Nome do Produto *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Arroz Agulha"
                  value={nome}
                  onChangeText={setNome}
                />

                <Text style={styles.label}>Marca do Produto (Opcional)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Cigala"
                  value={marca}
                  onChangeText={setMarca}
                />

                <View style={styles.linhaLadoALado}>
                  <View style={styles.metadeEsq}>
                    <Text style={styles.label}>Quantidade</Text>
                    <View style={styles.zonaQuantidade}>
                      <TouchableOpacity
                        style={styles.botaoQtd}
                        onPress={() =>
                          setQuantidade((qtd) => Math.max(1, qtd - 1))
                        }
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
                  </View>

                  <View style={styles.metadeDir}>
                    <Text style={styles.label}>Data de Validade</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="DD/MM/AAAA"
                      value={validade}
                      onChangeText={formatarData}
                      keyboardType="numeric"
                      maxLength={10}
                    />
                  </View>
                </View>

                {modoEdicao ? (
                  <View style={styles.rodapeBotoes}>
                    <TouchableOpacity
                      style={[styles.botaoMetade, styles.botaoEliminar]}
                      onPress={lidarComEliminar}
                    >
                      <Text style={styles.textoBotao}>Eliminar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.botaoMetade, styles.botaoGuardarMetade]}
                      onPress={lidarComGuardar}
                    >
                      <Text style={styles.textoBotao}>Guardar</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.botaoGuardar}
                    onPress={lidarComGuardar}
                  >
                    <Text style={styles.textoBotao}>Adicionar à Despensa</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>

        <AlertaPersonalizado
          visivel={alertaVisivel}
          mensagem="Por favor, insira o nome do produto!"
          aoFechar={() => setAlertaVisivel(false)}
        />

        <AlertaConfirmacao
          visivel={confirmacaoVisivel}
          titulo="Eliminar Produto"
          mensagem={`Tem a certeza que pretende remover "${nome}" da despensa?`}
          aoCancelar={() => setConfirmacaoVisivel(false)}
          aoConfirmar={confirmarEliminacao}
        />

        <AlertaPermissoes
          visivel={alertaPermissaoVisivel}
          mensagem={mensagemPermissao}
          aoFechar={() => setAlertaPermissaoVisivel(false)}
        />

        <MenuImagem
          visivel={menuImagemVisivel}
          aoFechar={() => setMenuImagemVisivel(false)}
          aoTirarFoto={() => {
            setMenuImagemVisivel(false);
            tirarFoto();
          }}
          aoEscolherDaGaleria={() => {
            setMenuImagemVisivel(false);
            escolherDaGaleria();
          }}
        />
      </KeyboardAvoidingView>
    </Modal>
  );
}
