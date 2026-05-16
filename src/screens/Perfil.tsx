import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "../styles/PerfilStyles";
import BotaoIdiomaFlutuante from "../components/BotaoIdiomaFlutuante";
import { supabase } from "../services/supabase";

export default function Perfil({ navigation }: any) {
  const { t } = useTranslation();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [carregandoDados, setCarregandoDados] = useState(true);

  const [modalNomeVisivel, setModalNomeVisivel] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [nomeErro, setNomeErro] = useState("");
  const [gravandoNome, setGravandoNome] = useState(false);

  const [modalPasswordVisivel, setModalPasswordVisivel] = useState(false);
  const [novaPassword, setNovaPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [mostrarNovaPassword, setMostrarNovaPassword] = useState(false);
  const [mostrarConfirmarPassword, setMostrarConfirmarPassword] =
    useState(false);
  const [novaPasswordErro, setNovaPasswordErro] = useState("");
  const [confirmarPasswordErro, setConfirmarPasswordErro] = useState("");
  const [gravandoPass, setGravandoPass] = useState(false);

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
    importarDados();
  }, []);

  const importarDados = async () => {
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError) {
      const isErroRede =
        authError.message?.toLowerCase().includes("network") ||
        authError.message?.toLowerCase().includes("fetch");
      Toast.show({
        type: "error",
        text1: isErroRede ? t("global_erro_titulo") : t("toast_erro"),
        text2: isErroRede
          ? t("global_erro_rede")
          : t("toast_erro_carregar_perfil"),
      });
      setCarregandoDados(false);
      return;
    }

    if (authData?.user) {
      setEmail(authData.user.email || "");

      const { data: perfilData } = await supabase
        .from("perfis")
        .select("nome")
        .eq("id", authData.user.id)
        .single();

      if (perfilData && perfilData.nome) {
        setNome(perfilData.nome);
        setNovoNome(perfilData.nome);
      }
    }
    setCarregandoDados(false);
  };

  const limparEFecharModalNome = () => {
    setNovoNome(nome);
    setNomeErro("");
    setModalNomeVisivel(false);
  };

  const limparEFecharModalPass = () => {
    setNovaPassword("");
    setConfirmarPassword("");
    setNovaPasswordErro("");
    setConfirmarPasswordErro("");
    setMostrarNovaPassword(false);
    setMostrarConfirmarPassword(false);
    setModalPasswordVisivel(false);
  };

  const alterarNome = async () => {
    let valido = true;
    setNomeErro("");

    if (!novoNome.trim()) {
      setNomeErro(t("auth_erro_nome_vazio"));
      valido = false;
    } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(novoNome)) {
      setNomeErro(t("auth_erro_nome_invalido"));
      valido = false;
    }

    if (!valido) return;

    setGravandoNome(true);
    const { data: authData } = await supabase.auth.getUser();

    if (authData?.user) {
      const { error } = await supabase
        .from("perfis")
        .update({ nome: novoNome.trim() })
        .eq("id", authData.user.id);

      if (error) {
        const isErroRede =
          error.message?.toLowerCase().includes("network") ||
          error.message?.toLowerCase().includes("fetch");
        Toast.show({
          type: "error",
          text1: isErroRede ? t("global_erro_titulo") : t("toast_erro"),
          text2: isErroRede ? t("global_erro_rede") : error.message,
        });
      } else {
        setNome(novoNome.trim());
        Toast.show({
          type: "success",
          text1: t("toast_sucesso"),
          text2: t("perf_sucesso_nome"),
        });
        setNomeErro("");
        setModalNomeVisivel(false);
      }
    }
    setGravandoNome(false);
  };

  const alterarPassword = async () => {
    let valido = true;
    setNovaPasswordErro("");
    setConfirmarPasswordErro("");

    if (!novaPassword) {
      setNovaPasswordErro(t("perf_erro_nova_vazia"));
      valido = false;
    } else if (novaPassword.length < 6) {
      setNovaPasswordErro(t("perf_erro_nova_curta"));
      valido = false;
    }

    if (!confirmarPassword) {
      setConfirmarPasswordErro(t("perf_erro_conf_vazia"));
      valido = false;
    } else if (novaPassword !== confirmarPassword) {
      setConfirmarPasswordErro(t("perf_erro_conf_diferente"));
      valido = false;
    }

    if (!valido) return;

    setGravandoPass(true);

    const { error } = await supabase.auth.updateUser({
      password: novaPassword,
    });

    if (error) {
      let mensagemErro = error.message || "";
      const isErroRede =
        mensagemErro.toLowerCase().includes("network") ||
        mensagemErro.toLowerCase().includes("fetch");

      if (
        mensagemErro.includes("different from the old password") ||
        mensagemErro.includes("same password")
      ) {
        setNovaPasswordErro(t("perf_erro_pass_igual"));
      } else if (isErroRede) {
        setNovaPasswordErro(t("global_erro_rede"));
      } else {
        setNovaPasswordErro(t("toast_erro") + mensagemErro);
      }
    } else {
      Toast.show({
        type: "success",
        text1: t("toast_sucesso"),
        text2: t("perf_sucesso_alterada"),
      });
      limparEFecharModalPass();
    }

    setGravandoPass(false);
  };

  const fazerLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      const isErroRede =
        error.message?.toLowerCase().includes("network") ||
        error.message?.toLowerCase().includes("fetch");
      Toast.show({
        type: "error",
        text1: isErroRede ? t("global_erro_titulo") : t("perf_erro_sair"),
        text2: isErroRede ? t("global_erro_rede") : error.message,
      });
    } else {
      await AsyncStorage.removeItem("@chef_ia_historico");
    }
  };

  if (carregandoDados) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" color="#2e7d32" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <BotaoIdiomaFlutuante />

        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [
            styles.botaoVoltar,
            pressed && { transform: [{ scale: 0.96 }], opacity: 0.7 },
          ]}
        >
          <Ionicons name="arrow-back" size={28} color="#2e7d32" />
          <Text style={styles.textoBotaoVoltar}>{t("perf_voltar")}</Text>
        </Pressable>

        <View style={styles.zonaTexto}>
          <Text style={styles.titulo}>{t("perf_titulo")}</Text>
        </View>

        <View style={styles.cartaoDados}>
          <Text style={styles.labelDados}>{t("perf_nome")}</Text>
          <Text style={styles.textoDados}>{nome}</Text>

          <Text style={[styles.labelDados, { marginTop: 15 }]}>
            {t("perf_email")}
          </Text>
          <Text style={styles.textoDados}>{email}</Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.botaoSecundario,
            pressed && { transform: [{ scale: 0.96 }], opacity: 0.85 },
          ]}
          onPress={() => {
            setNovoNome(nome);
            setNomeErro("");
            setModalNomeVisivel(true);
          }}
        >
          <Ionicons
            name="person-outline"
            size={22}
            color="#fff"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.textoBotaoSecundario}>
            {t("perf_btn_alterar_nome")}
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.botaoAbrirModal,
            pressed && { transform: [{ scale: 0.96 }], opacity: 0.85 },
          ]}
          onPress={() => setModalPasswordVisivel(true)}
        >
          <Ionicons
            name="key-outline"
            size={22}
            color="#fff"
            style={{ marginRight: 10 }}
          />
          <Text style={styles.textoBotaoAbrirModal}>
            {t("perf_btn_alterar_pass")}
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.botaoLogout,
            pressed && { transform: [{ scale: 0.96 }], opacity: 0.85 },
          ]}
          onPress={fazerLogout}
        >
          <Ionicons
            name="log-out-outline"
            size={24}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.textoBotaoLogout}>{t("perf_btn_logout")}</Text>
        </Pressable>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalNomeVisivel}
        onRequestClose={limparEFecharModalNome}
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
                  <View style={styles.cabecalhoModal}>
                    <Text style={styles.tituloModal}>
                      {t("perf_btn_alterar_nome")}
                    </Text>
                    <Pressable
                      onPress={limparEFecharModalNome}
                      style={({ pressed }) => [
                        pressed && {
                          transform: [{ scale: 0.85 }],
                          opacity: 0.7,
                        },
                      ]}
                    >
                      <Ionicons name="close" size={28} color="#888" />
                    </Pressable>
                  </View>

                  <Text style={styles.labelModal}>{t("perf_novo_nome")}</Text>
                  <View
                    style={[
                      styles.inputContainer,
                      nomeErro ? styles.inputContainerErro : null,
                    ]}
                  >
                    <Ionicons
                      name="person-outline"
                      size={20}
                      color={nomeErro ? "#d32f2f" : "#666"}
                      style={styles.iconeInput}
                    />
                    <TextInput
                      style={styles.inputModal}
                      placeholder={t("perf_nome")}
                      value={novoNome}
                      onChangeText={(texto) => {
                        setNovoNome(texto);
                        setNomeErro("");
                      }}
                      cursorColor="#2e7d32"
                      selectionColor="rgba(46, 125, 50, 0.3)"
                    />
                  </View>
                  {nomeErro ? (
                    <Text style={styles.textoErro}>{nomeErro}</Text>
                  ) : null}

                  <Pressable
                    style={({ pressed }) => [
                      styles.botaoGuardar,
                      pressed && {
                        transform: [{ scale: 0.96 }],
                        opacity: 0.85,
                      },
                    ]}
                    onPress={alterarNome}
                    disabled={gravandoNome}
                  >
                    {gravandoNome ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.textoBotaoGuardar}>
                        {t("perf_btn_atualizar_nome")}
                      </Text>
                    )}
                  </Pressable>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalPasswordVisivel}
        onRequestClose={limparEFecharModalPass}
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
                  <View style={styles.cabecalhoModal}>
                    <Text style={styles.tituloModal}>
                      {t("perf_btn_alterar_pass")}
                    </Text>
                    <Pressable
                      onPress={limparEFecharModalPass}
                      style={({ pressed }) => [
                        pressed && {
                          transform: [{ scale: 0.85 }],
                          opacity: 0.7,
                        },
                      ]}
                    >
                      <Ionicons name="close" size={28} color="#888" />
                    </Pressable>
                  </View>

                  <Text style={styles.labelModal}>{t("perf_nova_pass")}</Text>
                  <View
                    style={[
                      styles.inputContainer,
                      novaPasswordErro ? styles.inputContainerErro : null,
                    ]}
                  >
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color={novaPasswordErro ? "#d32f2f" : "#666"}
                      style={styles.iconeInput}
                    />
                    <TextInput
                      style={styles.inputModal}
                      placeholder={t("perf_nova_pass_ph")}
                      secureTextEntry={!mostrarNovaPassword}
                      autoCapitalize="none"
                      value={novaPassword}
                      onChangeText={(texto) => {
                        setNovaPassword(texto);
                        setNovaPasswordErro("");
                      }}
                      cursorColor="#2e7d32"
                      selectionColor="rgba(46, 125, 50, 0.3)"
                    />
                    <Pressable
                      onPress={() =>
                        setMostrarNovaPassword(!mostrarNovaPassword)
                      }
                      style={({ pressed }) => [
                        styles.iconeOlho,
                        pressed && { opacity: 1 },
                      ]}
                    >
                      <Ionicons
                        name={
                          mostrarNovaPassword
                            ? "eye-outline"
                            : "eye-off-outline"
                        }
                        size={20}
                        color="#666"
                      />
                    </Pressable>
                  </View>
                  {novaPasswordErro ? (
                    <Text style={styles.textoErro}>{novaPasswordErro}</Text>
                  ) : null}

                  <Text style={styles.labelModal}>{t("perf_conf_pass")}</Text>
                  <View
                    style={[
                      styles.inputContainer,
                      confirmarPasswordErro ? styles.inputContainerErro : null,
                    ]}
                  >
                    <Ionicons
                      name="shield-checkmark-outline"
                      size={20}
                      color={confirmarPasswordErro ? "#d32f2f" : "#666"}
                      style={styles.iconeInput}
                    />
                    <TextInput
                      style={styles.inputModal}
                      placeholder={t("perf_conf_pass_ph")}
                      secureTextEntry={!mostrarConfirmarPassword}
                      autoCapitalize="none"
                      value={confirmarPassword}
                      onChangeText={(texto) => {
                        setConfirmarPassword(texto);
                        setConfirmarPasswordErro("");
                      }}
                      cursorColor="#2e7d32"
                      selectionColor="rgba(46, 125, 50, 0.3)"
                    />
                    <Pressable
                      onPress={() =>
                        setMostrarConfirmarPassword(!mostrarConfirmarPassword)
                      }
                      style={({ pressed }) => [
                        styles.iconeOlho,
                        pressed && { opacity: 1 },
                      ]}
                    >
                      <Ionicons
                        name={
                          mostrarConfirmarPassword
                            ? "eye-outline"
                            : "eye-off-outline"
                        }
                        size={20}
                        color="#666"
                      />
                    </Pressable>
                  </View>
                  {confirmarPasswordErro ? (
                    <Text style={styles.textoErro}>
                      {confirmarPasswordErro}
                    </Text>
                  ) : null}

                  <Pressable
                    style={({ pressed }) => [
                      styles.botaoGuardar,
                      pressed && {
                        transform: [{ scale: 0.96 }],
                        opacity: 0.85,
                      },
                    ]}
                    onPress={alterarPassword}
                    disabled={gravandoPass}
                  >
                    {gravandoPass ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.textoBotaoGuardar}>
                        {t("perf_btn_atualizar")}
                      </Text>
                    )}
                  </Pressable>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
