import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import { styles } from "../styles/LoginStyles";
import BotaoIdiomaFlutuante from "../components/BotaoIdiomaFlutuante";
import { supabase } from "../services/supabase";

export default function Login({ navigation }: any) {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const [emailErro, setEmailErro] = useState("");
  const [passwordErro, setPasswordErro] = useState("");
  const [erroGeral, setErroGeral] = useState("");

  const validarFormulario = () => {
    let valido = true;
    setEmailErro("");
    setPasswordErro("");
    setErroGeral("");

    if (!email.trim()) {
      setEmailErro(t("auth_erro_email_vazio"));
      valido = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailErro(t("auth_erro_email_invalido"));
      valido = false;
    }

    if (!password) {
      setPasswordErro(t("auth_erro_pass_vazia"));
      valido = false;
    }

    return valido;
  };

  const fazerLogin = async () => {
    if (!validarFormulario()) return;

    setCarregando(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErroGeral(t("auth_erro_credenciais"));
      setCarregando(false);
    } else {
      Toast.show({
        type: "success",
        text1: t("auth_bem_vindo"),
        text2: t("auth_sucesso_login"),
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <BotaoIdiomaFlutuante />

      <View style={styles.zonaLogo}>
        <Image
          source={require("../../assets/adaptive-icon.png")}
          style={styles.logo}
        />
        <Text style={styles.titulo}>DespensaSmart</Text>
        <Text style={styles.subtitulo}>{t("auth_login_subtitulo")}</Text>
      </View>

      <View style={styles.formulario}>
        {erroGeral ? (
          <Text style={styles.textoErroGeral}>{erroGeral}</Text>
        ) : null}

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
            placeholder={t("auth_email")}
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
            placeholder={t("auth_pass")}
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

        <Pressable
          onPress={() => navigation.navigate("RecuperarPassword")}
          style={({ pressed }) => [
            styles.botaoEsqueceu,
            pressed && { opacity: 0.6 },
          ]}
        >
          <Text style={styles.textoEsqueceu}>{t("auth_esqueceu")}</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.botaoLogin,
            pressed && { transform: [{ scale: 0.96 }], opacity: 0.85 },
          ]}
          onPress={fazerLogin}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.textoBotaoLogin}>{t("auth_entrar")}</Text>
          )}
        </Pressable>
      </View>

      <View style={styles.rodape}>
        <Text style={styles.textoRodape}>{t("auth_sem_conta")} </Text>
        <Pressable
          onPress={() => navigation.navigate("Registo")}
          style={({ pressed }) => [pressed && { opacity: 0.6 }]}
        >
          <Text style={styles.textoRegisto}>{t("auth_registe_se")}</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
