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

import { styles } from "../styles/PerfilStyles";
import { supabase } from "../services/supabase";

export default function Perfil({ navigation }: any) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [carregandoDados, setCarregandoDados] = useState(true);

  const [modalPasswordVisivel, setModalPasswordVisivel] = useState(false);
  const [novaPassword, setNovaPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");

  const [mostrarNovaPassword, setMostrarNovaPassword] = useState(false);
  const [mostrarConfirmarPassword, setMostrarConfirmarPassword] =
    useState(false);

  const [novaPasswordErro, setNovaPasswordErro] = useState("");
  const [confirmarPasswordErro, setConfirmarPasswordErro] = useState("");
  const [gravando, setGravando] = useState(false);

  useEffect(() => {
    importarDados();
  }, []);

  const importarDados = async () => {
    const { data: authData } = await supabase.auth.getUser();

    if (authData?.user) {
      setEmail(authData.user.email || "");

      const { data: perfilData } = await supabase
        .from("perfis")
        .select("nome")
        .eq("id", authData.user.id)
        .single();

      if (perfilData && perfilData.nome) {
        setNome(perfilData.nome);
      }
    }
    setCarregandoDados(false);
  };

  const limparEFecharModal = () => {
    setNovaPassword("");
    setConfirmarPassword("");
    setNovaPasswordErro("");
    setConfirmarPasswordErro("");
    setMostrarNovaPassword(false);
    setMostrarConfirmarPassword(false);
    setModalPasswordVisivel(false);
  };

  const alterarPassword = async () => {
    let valido = true;
    setNovaPasswordErro("");
    setConfirmarPasswordErro("");

    if (!novaPassword) {
      setNovaPasswordErro("Por favor, insira a nova password!");
      valido = false;
    } else if (novaPassword.length < 6) {
      setNovaPasswordErro("A password deve ter pelo menos 6 caracteres!");
      valido = false;
    }

    if (!confirmarPassword) {
      setConfirmarPasswordErro("Por favor, confirme a nova password!");
      valido = false;
    } else if (novaPassword !== confirmarPassword) {
      setConfirmarPasswordErro("As passwords não coincidem!");
      valido = false;
    }

    if (!valido) return;

    setGravando(true);

    const { error } = await supabase.auth.updateUser({
      password: novaPassword,
    });

    if (error) {
      let mensagemErro = error.message;

      if (
        mensagemErro.includes("different from the old password") ||
        mensagemErro.includes("same password")
      ) {
        setNovaPasswordErro("A nova password não pode ser igual à atual!");
      } else {
        setNovaPasswordErro("Erro: " + mensagemErro);
      }
    } else {
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: "A sua password foi alterada!",
      });
      limparEFecharModal();
    }

    setGravando(false);
  };

  const fazerLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao sair",
        text2: error.message,
      });
    }
  };

  if (carregandoDados) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
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
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [
            styles.botaoVoltar,
            pressed && { transform: [{ scale: 0.96 }], opacity: 0.7 },
          ]}
        >
          <Ionicons name="arrow-back" size={28} color="#2e7d32" />
          <Text style={styles.textoBotaoVoltar}>Voltar à Despensa</Text>
        </Pressable>

        <View style={styles.zonaTexto}>
          <Text style={styles.titulo}>O Meu Perfil</Text>
        </View>

        <View style={styles.cartaoDados}>
          <Text style={styles.labelDados}>Nome</Text>
          <Text style={styles.textoDados}>{nome}</Text>

          <Text style={[styles.labelDados, { marginTop: 15 }]}>Email</Text>
          <Text style={styles.textoDados}>{email}</Text>
        </View>

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
          <Text style={styles.textoBotaoAbrirModal}>Alterar Password</Text>
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
          <Text style={styles.textoBotaoLogout}>Terminar Sessão</Text>
        </Pressable>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalPasswordVisivel}
        onRequestClose={limparEFecharModal}
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
                  <View style={styles.cabecalhoModal}>
                    <Text style={styles.tituloModal}>Alterar Password</Text>
                    <Pressable
                      onPress={limparEFecharModal}
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

                  <Text style={styles.labelModal}>Nova Password</Text>
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
                      placeholder="Mínimo 6 caracteres"
                      secureTextEntry={!mostrarNovaPassword}
                      autoCapitalize="none"
                      value={novaPassword}
                      onChangeText={(texto) => {
                        setNovaPassword(texto);
                        setNovaPasswordErro("");
                      }}
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

                  <Text style={styles.labelModal}>Confirmar Nova Password</Text>
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
                      placeholder="Repita a nova password"
                      secureTextEntry={!mostrarConfirmarPassword}
                      autoCapitalize="none"
                      value={confirmarPassword}
                      onChangeText={(texto) => {
                        setConfirmarPassword(texto);
                        setConfirmarPasswordErro("");
                      }}
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
                    disabled={gravando}
                  >
                    {gravando ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.textoBotaoGuardar}>
                        Atualizar Password
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
