import React, { useState, useCallback } from "react";
import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Svg, { Circle } from "react-native-svg";
import { useTranslation } from "react-i18next";

import { styles } from "../styles/DashboardStyles";
import { supabase } from "../services/supabase";

const calcularStatusValidade = (validade: string) => {
  if (!validade || validade.length < 10) return "verde";
  const partes = validade.split("/");
  if (partes.length !== 3) return "verde";

  const dia = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10) - 1;
  const ano = parseInt(partes[2], 10);

  const dataValidade = new Date(ano, mes, dia);
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const diferencaDias = Math.ceil(
    (dataValidade.getTime() - hoje.getTime()) / (1000 * 3600 * 24),
  );

  if (diferencaDias < 0) return "vermelho";
  if (diferencaDias <= 3) return "amarelo";
  return "verde";
};

export default function Dashboard() {
  const { t } = useTranslation();

  const [nomeUtilizador, setNomeUtilizador] = useState("");

  const [produtos, setProdutos] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const importarProdutosDaDespensa = async () => {
        setCarregando(true);
        const { data: authData } = await supabase.auth.getUser();

        if (authData?.user) {
          const { data: perfilData } = await supabase
            .from("perfis")
            .select("nome")
            .eq("id", authData.user.id)
            .single();

          if (perfilData && perfilData.nome) {
            setNomeUtilizador(perfilData.nome);
          } else {
            setNomeUtilizador("Utilizador");
          }
        }

        const { data: produtosData } = await supabase
          .from("despensa")
          .select("*");

        if (produtosData) {
          setProdutos(produtosData);
        }

        setCarregando(false);
      };

      importarProdutosDaDespensa();
    }, []),
  );

  const produtosVerdes = produtos.filter(
    (p) => calcularStatusValidade(p.validade) === "verde",
  );
  const produtosAmarelos = produtos.filter(
    (p) => calcularStatusValidade(p.validade) === "amarelo",
  );
  const produtosVermelhos = produtos.filter(
    (p) => calcularStatusValidade(p.validade) === "vermelho",
  );

  const totalProdutos = produtos.length;
  const percentagemVerde =
    totalProdutos === 0
      ? 0
      : Math.round((produtosVerdes.length / totalProdutos) * 100);

  const circunferencia = 540;
  const preenchimento =
    circunferencia - (circunferencia * percentagemVerde) / 100;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.zonaTopo}>
        <Text style={styles.textoOla}>
          {t("dash_ola", { nome: nomeUtilizador || t("dash_carregando") })}
        </Text>
        <Text style={styles.textoAlertas}>
          {t("dash_tem")}
          <Text style={styles.alertaDestaque}>{produtosVermelhos.length}</Text>
          {t("dash_alertas")}
        </Text>
      </View>

      {carregando ? (
        <View style={{ marginTop: 200, alignItems: "center" }}>
          <ActivityIndicator size="large" color="#2e7d32" />
        </View>
      ) : (
        <>
          <View style={styles.zonaGrafico}>
            <View style={styles.graficoFundo}>
              <Svg width={180} height={180}>
                <Circle
                  cx={90}
                  cy={90}
                  r={74}
                  stroke="#f1f3f5"
                  strokeWidth={14}
                  fill="none"
                />

                <Circle
                  cx={90}
                  cy={90}
                  r={74}
                  stroke="#2e7d32"
                  strokeWidth={14}
                  fill="none"
                  strokeDasharray={circunferencia}
                  strokeDashoffset={preenchimento}
                  strokeLinecap="round"
                  transform="rotate(-90 90 90)"
                />
              </Svg>

              <Image
                source={require("../assets/icon.png")}
                style={styles.logoCentro}
              />
            </View>
          </View>

          <Text style={styles.textoPercentagem}>
            {t("dash_percentagem", { percent: percentagemVerde })}
          </Text>

          <View style={styles.tabelasContainer}>
            <View style={styles.colunaTabela}>
              <Text style={styles.cabecalhoAmarelo}>{t("dash_a_expirar")}</Text>
              <ScrollView
                style={styles.listaContainer}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={true}
              >
                {produtosAmarelos.length === 0 ? (
                  <Text style={styles.listaVazia}>
                    {t("dash_nada_expirar")}
                  </Text>
                ) : (
                  produtosAmarelos.map((item) => (
                    <View key={item.id} style={styles.itemLista}>
                      <Text style={styles.nomeItem}>{item.nome}</Text>
                      <Text style={styles.diasItem}>
                        {item.validade.slice(0, 5)}
                      </Text>
                    </View>
                  ))
                )}
              </ScrollView>
            </View>

            <View style={styles.colunaTabela}>
              <Text style={styles.cabecalhoVermelho}>
                {t("dash_expirados")}
              </Text>
              <ScrollView
                style={styles.listaContainer}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={true}
              >
                {produtosVermelhos.length === 0 ? (
                  <Text style={styles.listaVazia}>
                    {t("dash_nada_expirado")}
                  </Text>
                ) : (
                  produtosVermelhos.map((item) => (
                    <View key={item.id} style={styles.itemLista}>
                      <Text style={styles.nomeItem}>{item.nome}</Text>
                    </View>
                  ))
                )}
              </ScrollView>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}
