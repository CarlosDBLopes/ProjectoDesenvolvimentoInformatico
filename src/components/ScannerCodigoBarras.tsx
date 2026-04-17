import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  Modal,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import { styles } from "../styles/ScannerCodigoBarrasStyles";

interface ScannerCodigoProps {
  visivel: boolean;
  aoFechar: () => void;
  aoLerCodigo: (codigo: string) => void;
}

export default function ScannerCodigo({
  visivel,
  aoFechar,
  aoLerCodigo,
}: ScannerCodigoProps) {
  const { t } = useTranslation();
  const [permissao, pedirPermissao] = useCameraPermissions();
  const [lido, setLido] = useState(false);

  useEffect(() => {
    if (visivel) {
      setLido(false);
      if (!permissao?.granted) {
        pedirPermissao();
      }
    }
  }, [visivel, permissao]);

  const lidarComLeitura = ({ data }: { data: string }) => {
    if (lido) return;
    setLido(true);
    aoLerCodigo(data);
  };

  return (
    <Modal
      visible={visivel}
      animationType="slide"
      transparent={false}
      onRequestClose={aoFechar}
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      {!permissao ? (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color="#2e7d32" />
        </View>
      ) : !permissao.granted ? (
        <View style={styles.centro}>
          <Text style={styles.textoAviso}>{t("perm_camera_negada")}</Text>
          <Pressable
            onPress={pedirPermissao}
            style={styles.botaoPedirPermissao}
          >
            <Text style={styles.textoBotaoFallback}>{t("perm_pedir")}</Text>
          </Pressable>
          <Pressable
            onPress={aoFechar}
            style={[
              styles.botaoPedirPermissao,
              { marginTop: 10, backgroundColor: "#555" },
            ]}
          >
            <Text style={styles.textoBotaoFallback}>{t("mod_btn_fechar")}</Text>
          </Pressable>
        </View>
      ) : (
        <View style={StyleSheet.absoluteFill}>
          <CameraView
            style={StyleSheet.absoluteFill}
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: ["ean13", "ean8", "qr", "upc_a", "upc_e"],
            }}
            onBarcodeScanned={lido ? undefined : lidarComLeitura}
          />

          <View style={styles.overlay}>
            <View style={styles.mira} />
            <Text style={styles.textoInstrucao}>{t("scan_instrucao")}</Text>
          </View>

          <Pressable style={styles.botaoVoltar} onPress={aoFechar}>
            <Ionicons name="close" size={32} color="#fff" />
          </Pressable>
        </View>
      )}
    </Modal>
  );
}
