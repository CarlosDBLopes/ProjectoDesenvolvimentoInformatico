import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import { styles } from "../styles/RecuperarPasswordStyles";
import BotaoIdiomaFlutuante from "../components/BotaoIdiomaFlutuante";
import { supabase } from "../services/supabase";

export default function RecuperarPassword({ navigation }: any) {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [emailErro, setEmailErro] = useState("");

  const pedirRecuperacao = async () => {
    setEmailErro("");

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setEmailErro(t("auth_erro_email_valido"));
      return;
    }

    setCarregando(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      Toast.show({
        type: "error",
        text1: t("toast_erro"),
        text2: error.message,
      });
    } else {
      Toast.show({
        type: "success",
        text1: t("auth_sucesso_email_enviado"),
        text2: t("auth_sucesso_verifique_caixa"),
      });
      navigation.goBack();
    }

    setCarregando(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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
        <Text style={styles.textoBotaoVoltar}>{t("auth_voltar_login")}</Text>
      </Pressable>

      <View style={styles.zonaTexto}>
        <Text style={styles.titulo}>{t("auth_rec_titulo")}</Text>
        <Text style={styles.subtitulo}>{t("auth_rec_subtitulo")}</Text>
      </View>

      <View style={styles.formulario}>
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
            placeholder={t("auth_rec_email_ph")}
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

        <Pressable
          style={({ pressed }) => [
            styles.botaoEnviar,
            pressed && { transform: [{ scale: 0.96 }], opacity: 0.85 },
          ]}
          onPress={pedirRecuperacao}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.textoBotaoEnviar}>{t("auth_rec_btn")}</Text>
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
