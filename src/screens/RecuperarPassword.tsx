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

import { styles } from "../styles/RecuperarPasswordStyles";
import { supabase } from "../services/supabase";

export default function RecuperarPassword({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [emailErro, setEmailErro] = useState("");

  const pedirRecuperacao = async () => {
    setEmailErro("");

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setEmailErro("Por favor, insira um email válido!");
      return;
    }

    setCarregando(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      Toast.show({ type: "error", text1: "Erro", text2: error.message });
    } else {
      Toast.show({
        type: "success",
        text1: "Email Enviado!",
        text2: "Verifique a sua caixa de entrada.",
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
      <Pressable
        onPress={() => navigation.goBack()}
        style={({ pressed }) => [
          styles.botaoVoltar,
          pressed && { transform: [{ scale: 0.96 }], opacity: 0.7 },
        ]}
      >
        <Ionicons name="arrow-back" size={28} color="#2e7d32" />
        <Text style={styles.textoBotaoVoltar}>Voltar para Login</Text>
      </Pressable>

      <View style={styles.zonaTexto}>
        <Text style={styles.titulo}>Recuperar Password</Text>
        <Text style={styles.subtitulo}>
          Insira o seu email e será enviado um link para definir uma nova
          password.
        </Text>
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
            placeholder="O seu Email"
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
            <Text style={styles.textoBotaoEnviar}>
              Enviar Link de Recuperação
            </Text>
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
