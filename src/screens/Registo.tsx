import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "../styles/RegistoStyles";
import { supabase } from "../services/supabase";

export default function Registo({ navigation }: any) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [carregando, setCarregando] = useState(false);

  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmarPassword, setMostrarConfirmarPassword] =
    useState(false);

  const [nomeErro, setNomeErro] = useState("");
  const [emailErro, setEmailErro] = useState("");
  const [passwordErro, setPasswordErro] = useState("");
  const [confirmarPasswordErro, setConfirmarPasswordErro] = useState("");
  const [erroGeral, setErroGeral] = useState("");

  const validarFormulario = () => {
    let valido = true;
    setNomeErro("");
    setEmailErro("");
    setPasswordErro("");
    setConfirmarPasswordErro("");
    setErroGeral("");

    if (!nome.trim()) {
      setNomeErro("Por favor, insira o seu nome!");
      valido = false;
    }

    if (!email.trim()) {
      setEmailErro("Por favor, insira o seu email!");
      valido = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailErro("O formato do email é inválido!");
      valido = false;
    }

    if (!password) {
      setPasswordErro("Por favor, crie uma password!");
      valido = false;
    } else if (password.length < 6) {
      setPasswordErro("A password deve ter pelo menos 6 caracteres!");
      valido = false;
    }

    if (!confirmarPassword) {
      setConfirmarPasswordErro("Por favor, confirme a sua password!");
      valido = false;
    } else if (password !== confirmarPassword) {
      setConfirmarPasswordErro("As passwords não coincidem!");
      valido = false;
    }

    return valido;
  };

  const fazerRegisto = async () => {
    if (!validarFormulario()) return;

    setCarregando(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setErroGeral(signUpError.message);
      setCarregando(false);
      return;
    }

    if (data?.user) {
      const { error: perfilError } = await supabase
        .from("perfis")
        .insert([{ id: data.user.id, nome }]);

      if (perfilError) {
        console.error("Erro ao criar perfil:", perfilError);
        setErroGeral("A conta foi criada, mas falhou ao guardar o seu nome!");
      } else {
        Toast.show({
          type: "success",
          text1: "Conta Criada!",
          text2: "Bem-vindo à DespensaSmart.",
        });
      }
    }

    setCarregando(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
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
          <Text style={styles.textoVoltar}>Voltar para Login</Text>
        </Pressable>

        <View style={styles.zonaTexto}>
          <Text style={styles.titulo}>Criar Conta</Text>
          <Text style={styles.subtitulo}>
            Junte-se a nós e organize a sua despensa.
          </Text>
        </View>

        <View style={styles.formulario}>
          {erroGeral ? (
            <Text style={styles.textoErroGeral}>{erroGeral}</Text>
          ) : null}

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
              style={styles.input}
              placeholder="Nome (ex: Tiago)"
              value={nome}
              onChangeText={(texto) => {
                setNome(texto);
                setNomeErro("");
              }}
            />
          </View>
          {nomeErro ? <Text style={styles.textoErro}>{nomeErro}</Text> : null}

          <View
            style={[
              styles.inputContainer,
              emailErro ? styles.inputContainerErro : null,
            ]}
          >
            <Ionicons
              name="mail-outline"
              size={20}
              color={emailErro ? "#d32f2f" : "#666"}
              style={styles.iconeInput}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(texto) => {
                setEmail(texto);
                setEmailErro("");
              }}
            />
          </View>
          {emailErro ? <Text style={styles.textoErro}>{emailErro}</Text> : null}

          <View
            style={[
              styles.inputContainer,
              passwordErro ? styles.inputContainerErro : null,
            ]}
          >
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={passwordErro ? "#d32f2f" : "#666"}
              style={styles.iconeInput}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!mostrarPassword}
              autoCapitalize="none"
              value={password}
              onChangeText={(texto) => {
                setPassword(texto);
                setPasswordErro("");
              }}
            />
            <Pressable
              onPress={() => setMostrarPassword(!mostrarPassword)}
              style={({ pressed }) => [
                styles.iconeOlho,
                pressed && { opacity: 1 },
              ]}
            >
              <Ionicons
                name={mostrarPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#666"
              />
            </Pressable>
          </View>
          {passwordErro ? (
            <Text style={styles.textoErro}>{passwordErro}</Text>
          ) : null}

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
              style={styles.input}
              placeholder="Confirmar Password"
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
                  mostrarConfirmarPassword ? "eye-outline" : "eye-off-outline"
                }
                size={20}
                color="#666"
              />
            </Pressable>
          </View>
          {confirmarPasswordErro ? (
            <Text style={styles.textoErro}>{confirmarPasswordErro}</Text>
          ) : null}

          <Pressable
            style={({ pressed }) => [
              styles.botaoRegisto,
              pressed && { transform: [{ scale: 0.96 }], opacity: 0.85 },
            ]}
            onPress={fazerRegisto}
            disabled={carregando}
          >
            {carregando ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.textoBotaoRegisto}>Registar</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
