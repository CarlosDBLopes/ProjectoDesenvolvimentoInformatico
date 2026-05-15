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
  Image,
  BackHandler,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useTranslation } from "react-i18next";

import { styles } from "../styles/ModalDespensaStyles";
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

const validarData = (data: string) => {
  if (!data) return true;
  if (data.length !== 10) return false;

  const [dia, mes, ano] = data.split("/").map((num) => parseInt(num, 10));

  if (isNaN(dia) || isNaN(mes) || isNaN(ano)) return false;
  if (mes < 1 || mes > 12 || ano < 2000 || ano > 2100) return false;

  const diasPorMes = [
    31,
    (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  return dia >= 1 && dia <= diasPorMes[mes - 1];
};

export default function ModalDespensa({
  visivel,
  aoFechar,
  aoGuardar,
  aoEliminar,
  produtoEdicao,
}: ModalDespensaProps) {
  const { t } = useTranslation();

  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [validade, setValidade] = useState("");
  const [imagem, setImagem] = useState<string | null>(null);

  const [nomeErro, setNomeErro] = useState("");
  const [dataErro, setDataErro] = useState("");

  const [confirmacaoVisivel, setConfirmacaoVisivel] = useState(false);
  const [alertaPermissaoVisivel, setAlertaPermissaoVisivel] = useState(false);
  const [mensagemPermissao, setMensagemPermissao] = useState("");
  const [menuImagemVisivel, setMenuImagemVisivel] = useState(false);

  const [tecladoAberto, setTecladoAberto] = useState(false);

  useEffect(() => {
    const mostrarSub = Keyboard.addListener("keyboardDidShow", () =>
      setTecladoAberto(true),
    );
    const esconderSub = Keyboard.addListener("keyboardDidHide", () =>
      setTecladoAberto(false),
    );

    return () => {
      mostrarSub.remove();
      esconderSub.remove();
    };
  }, []);

  useEffect(() => {
    if (visivel) {
      const aoPressionarVoltar = () => {
        if (menuImagemVisivel) {
          setMenuImagemVisivel(false);
          return true;
        }
        if (confirmacaoVisivel || alertaPermissaoVisivel) {
          setConfirmacaoVisivel(false);
          setAlertaPermissaoVisivel(false);
          return true;
        }

        limparEFechar();
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        aoPressionarVoltar,
      );

      return () => backHandler.remove();
    }
  }, [visivel, menuImagemVisivel, confirmacaoVisivel, alertaPermissaoVisivel]);

  useEffect(() => {
    if (produtoEdicao) {
      setNome(produtoEdicao.nome);
      setMarca(produtoEdicao.marca || "");
      setQuantidade(produtoEdicao.quantidade);
      setValidade(produtoEdicao.validade || "");
      setImagem(produtoEdicao.imagem || null);
      setNomeErro("");
      setDataErro("");
    } else {
      setNome("");
      setMarca("");
      setQuantidade(1);
      setValidade("");
      setImagem(null);
      setNomeErro("");
      setDataErro("");
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
    setNomeErro("");
    setDataErro("");
    aoFechar();
  };

  const lidarComGuardar = () => {
    let valido = true;
    setNomeErro("");
    setDataErro("");

    if (nome.trim() === "") {
      setNomeErro(t("mod_nome_erro"));
      valido = false;
    }

    if (validade && !validarData(validade)) {
      setDataErro(t("mod_data_erro"));
      valido = false;
    }

    if (!valido) return;

    aoGuardar(nome, marca, quantidade, validade, imagem, produtoEdicao?.id);
    limparEFechar();
  };

  const escolherOrigemImagem = () => {
    setMenuImagemVisivel(true);
  };

  const tirarFoto = async () => {
    const permissao = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissao.granted) {
      setMensagemPermissao(t("mod_tirar_foto_erro"));
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
      setMensagemPermissao(t("mod_escolher_galeria_erro"));
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
        behavior="padding"
        enabled={Platform.OS === "ios" ? true : tecladoAberto}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.fundoEscuro}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.cartaoModal,
                  tecladoAberto && { paddingBottom: 20 },
                ]}
              >
                <View style={styles.cabecalho}>
                  <Text style={styles.titulo}>
                    {modoEdicao ? t("mod_edit_produto") : t("mod_add_despensa")}
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

                <View style={styles.fotoContainer}>
                  <Pressable
                    onPress={escolherOrigemImagem}
                    style={({ pressed }) => [
                      styles.fotoPlaceholder,
                      pressed && { transform: [{ scale: 0.96 }], opacity: 0.8 },
                    ]}
                  >
                    {imagem ? (
                      <Image
                        source={{ uri: imagem }}
                        style={styles.imagemProduto}
                        resizeMode="contain"
                      />
                    ) : (
                      <Ionicons name="camera-outline" size={32} color="#aaa" />
                    )}
                  </Pressable>
                </View>

                <Text style={styles.label}>{t("mod_nome")}</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderWidth: 1,
                      borderColor: "transparent",
                      marginBottom: 0,
                    },
                    nomeErro
                      ? { borderColor: "#d32f2f", backgroundColor: "#fff5f5" }
                      : null,
                  ]}
                  placeholder={t("mod_nome_ex")}
                  value={nome}
                  onChangeText={(texto) => {
                    setNome(texto);
                    setNomeErro("");
                  }}
                  cursorColor="#2e7d32"
                  selectionColor="rgba(46, 125, 50, 0.3)"
                />
                {nomeErro ? (
                  <Text
                    style={{
                      color: "#d32f2f",
                      fontSize: 13,
                      marginTop: 4,
                      marginBottom: 5,
                    }}
                  >
                    {nomeErro}
                  </Text>
                ) : (
                  <View style={{ height: 5 }} />
                )}

                <Text style={styles.label}>{t("mod_marca")}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={t("mod_marca_ex")}
                  value={marca}
                  onChangeText={setMarca}
                  cursorColor="#2e7d32"
                  selectionColor="rgba(46, 125, 50, 0.3)"
                />

                <View style={styles.linhaLadoALado}>
                  <View style={styles.metadeEsq}>
                    <Text style={styles.label}>{t("mod_qtd")}</Text>
                    <View style={styles.zonaQuantidade}>
                      <Pressable
                        onPress={() => {
                          setQuantidade((qtd) => Math.max(1, qtd - 1));
                        }}
                        style={({ pressed }) => [
                          styles.botaoQtd,
                          pressed && {
                            transform: [{ scale: 0.9 }],
                            opacity: 0.85,
                          },
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
                          pressed && {
                            transform: [{ scale: 0.9 }],
                            opacity: 0.85,
                          },
                        ]}
                      >
                        <Ionicons name="add" size={24} color="#333" />
                      </Pressable>
                    </View>
                  </View>

                  <View style={styles.metadeDir}>
                    <Text style={styles.label}>{t("mod_validade")}</Text>
                    <TextInput
                      style={[
                        styles.input,
                        {
                          borderWidth: 1,
                          borderColor: "transparent",
                          marginBottom: 0,
                        },
                        dataErro
                          ? {
                              borderColor: "#d32f2f",
                              backgroundColor: "#fff5f5",
                            }
                          : null,
                      ]}
                      placeholder={t("mod_validade_ex")}
                      value={validade}
                      onChangeText={(texto) => {
                        formatarData(texto);
                        setDataErro("");
                      }}
                      keyboardType="numeric"
                      maxLength={10}
                      cursorColor="#2e7d32"
                      selectionColor="rgba(46, 125, 50, 0.3)"
                    />
                    {dataErro ? (
                      <Text
                        style={{
                          color: "#d32f2f",
                          fontSize: 13,
                          marginTop: 4,
                          marginBottom: 5,
                        }}
                      >
                        {dataErro}
                      </Text>
                    ) : (
                      <View style={{ height: 5 }} />
                    )}
                  </View>
                </View>

                {modoEdicao ? (
                  <View style={styles.rodapeBotoes}>
                    <Pressable
                      onPress={lidarComEliminar}
                      style={({ pressed }) => [
                        styles.botaoMetade,
                        styles.botaoEliminar,
                        pressed && {
                          transform: [{ scale: 0.96 }],
                          opacity: 0.85,
                        },
                      ]}
                    >
                      <Text style={styles.textoBotao}>
                        {t("mod_btn_eliminar")}
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={lidarComGuardar}
                      style={({ pressed }) => [
                        styles.botaoMetade,
                        styles.botaoGuardarMetade,
                        pressed && {
                          transform: [{ scale: 0.96 }],
                          opacity: 0.85,
                        },
                      ]}
                    >
                      <Text style={styles.textoBotao}>
                        {t("mod_btn_guardar")}
                      </Text>
                    </Pressable>
                  </View>
                ) : (
                  <Pressable
                    onPress={lidarComGuardar}
                    style={({ pressed }) => [
                      styles.botaoGuardar,
                      pressed && {
                        transform: [{ scale: 0.96 }],
                        opacity: 0.85,
                      },
                    ]}
                  >
                    <Text style={styles.textoBotao}>
                      {t("mod_add_despensa")}
                    </Text>
                  </Pressable>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>

        <AlertaConfirmacao
          visivel={confirmacaoVisivel}
          titulo={t("msg_titulo_eliminar")}
          mensagem={t("msg_remover_despensa", { nome: nome })}
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
