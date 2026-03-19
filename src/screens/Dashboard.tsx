import React, { useState, useCallback } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Svg, { Circle } from "react-native-svg";

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
  const nomeUtilizador = "Tiago";

  const [produtos, setProdutos] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      const buscarProdutosDaDespensa = async () => {
        const { data, error } = await supabase.from("despensa").select("*");

        if (error) {
          console.error("Erro ao importar produtos:", error.message);
        } else if (data) {
          setProdutos(data);
        }
      };

      buscarProdutosDaDespensa();
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

  const circunferencia = 408;
  const preenchimento =
    circunferencia - (circunferencia * percentagemVerde) / 100;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.zonaTopo}>
        <Text style={styles.textoOla}>Olá, {nomeUtilizador}!</Text>
        <Text style={styles.textoAlertas}>
          Tem{" "}
          <Text style={styles.alertaDestaque}>{produtosVermelhos.length}</Text>{" "}
          alerta(s) hoje
        </Text>
      </View>

      <View style={styles.zonaGrafico}>
        <View style={styles.graficoFundo}>
          <Svg width={150} height={150}>
            <Circle
              cx={75}
              cy={75}
              r={65}
              stroke="#f1f3f5"
              strokeWidth={12}
              fill="none"
            />

            <Circle
              cx={75}
              cy={75}
              r={65}
              stroke="#2e7d32"
              strokeWidth={12}
              fill="none"
              strokeDasharray={circunferencia}
              strokeDashoffset={preenchimento}
              strokeLinecap="round"
              transform="rotate(-90 75 75)"
            />
          </Svg>

          <Image
            source={require("../../assets/logo.png")}
            style={styles.logoCentro}
          />
        </View>
      </View>

      <Text style={styles.textoPercentagem}>
        Tem {percentagemVerde}% dos itens{"\n"}dentro do prazo!
      </Text>

      <View style={styles.tabelasContainer}>
        <View style={styles.colunaTabela}>
          <Text style={styles.cabecalhoAmarelo}>A Expirar</Text>
          <ScrollView
            style={styles.listaContainer}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}
          >
            {produtosAmarelos.length === 0 ? (
              <Text style={styles.listaVazia}>Nada a expirar!</Text>
            ) : (
              produtosAmarelos.map((item) => (
                <View key={item.id} style={styles.itemLista}>
                  <Text style={styles.nomeItem} numberOfLines={1}>
                    {item.nome}
                  </Text>
                  <Text style={styles.diasItem}>
                    {item.validade.slice(0, 5)}
                  </Text>
                </View>
              ))
            )}
          </ScrollView>
        </View>

        <View style={styles.colunaTabela}>
          <Text style={styles.cabecalhoVermelho}>Expirados</Text>
          <ScrollView
            style={styles.listaContainer}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}
          >
            {produtosVermelhos.length === 0 ? (
              <Text style={styles.listaVazia}>Nada expirado!</Text>
            ) : (
              produtosVermelhos.map((item) => (
                <View key={item.id} style={styles.itemLista}>
                  <Text style={styles.nomeItem} numberOfLines={1}>
                    {item.nome}
                  </Text>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}
