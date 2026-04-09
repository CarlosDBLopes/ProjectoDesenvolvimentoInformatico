import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import { styles } from "../styles/ModalChefIAStyles";
import { falarComChef } from "../services/gemini";

interface ModalChefIAProps {
  visivel: boolean;
  aoFechar: () => void;
}

interface Mensagem {
  id: string;
  texto: string;
  remetente: "user" | "ia";
}

export default function ModalChefIA({ visivel, aoFechar }: ModalChefIAProps) {
  const { t, i18n } = useTranslation();
  const scrollViewRef = useRef<ScrollView>(null);

  const [input, setInput] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);

  useEffect(() => {
    if (visivel) {
      setMensagens([{ id: "saudacao", texto: t("ia_ola"), remetente: "ia" }]);
    }
  }, [visivel, i18n.language]);

  const enviarMensagem = async () => {
    if (!input.trim() || carregando) return;

    const textoUtilizador = input.trim();

    const novaMensagem: Mensagem = {
      id: Date.now().toString(),
      texto: textoUtilizador,
      remetente: "user",
    };

    setMensagens((prev) => [...prev, novaMensagem]);
    setInput("");
    setCarregando(true);
    Keyboard.dismiss();

    try {
      const respostaIA = await falarComChef(textoUtilizador, i18n.language);

      setMensagens((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          texto: respostaIA,
          remetente: "ia",
        },
      ]);
    } catch (erro) {
      setMensagens((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          texto: t("ia_erro"),
          remetente: "ia",
        },
      ]);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visivel}
      onRequestClose={aoFechar}
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <KeyboardAvoidingView
        style={styles.fundoEscuro}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: -47 })}
      >
        <View style={styles.cartaoModal}>
          <View style={styles.cabecalho}>
            <View style={styles.infoChef}>
              <View style={styles.iconChef}>
                <MaterialCommunityIcons
                  name="chef-hat"
                  size={44}
                  color="white"
                />
              </View>
              <View>
                <Text style={styles.titulo}>{t("ia_titulo")}</Text>
                <Text style={styles.subtitulo}>{t("ia_subtitulo")}</Text>
              </View>
            </View>
            <Pressable
              onPress={aoFechar}
              style={({ pressed }) => [
                pressed && { transform: [{ scale: 0.85 }], opacity: 0.7 },
              ]}
            >
              <Ionicons name="close" size={30} color="#fff" />
            </Pressable>
          </View>

          <ScrollView
            ref={scrollViewRef}
            style={styles.areaChat}
            contentContainerStyle={{ padding: 15 }}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }
          >
            {mensagens.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.balao,
                  msg.remetente === "user" ? styles.balaoUser : styles.balaoIA,
                ]}
              >
                <Text
                  style={[
                    styles.textoMensagem,
                    msg.remetente === "user" && { color: "#fff" },
                  ]}
                >
                  {msg.texto}
                </Text>
              </View>
            ))}
            {carregando && (
              <View style={styles.zonaA_Pensar}>
                <ActivityIndicator size="small" color="#2e7d32" />
                <Text style={styles.textoA_Pensar}>{t("ia_escrevendo")}</Text>
              </View>
            )}
          </ScrollView>

          <View style={styles.areaInput}>
            <TextInput
              style={styles.input}
              placeholder={t("ia_placeholder")}
              value={input}
              onChangeText={setInput}
              multiline
              maxLength={200}
            />
            <Pressable
              onPress={enviarMensagem}
              disabled={!input.trim() || carregando}
              style={({ pressed }) => [
                styles.botaoEnviar,
                (!input.trim() || carregando) && { backgroundColor: "#ccc" },
                pressed && { transform: [{ scale: 0.96 }], opacity: 0.85 },
              ]}
            >
              <Ionicons name="send" size={20} color="#fff" />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
