import { supabase } from "./supabase";

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

export const falarComChef = async (
  mensagemUtilizador: string,
  idiomaAtual: string,
) => {
  if (!GEMINI_API_KEY) {
    throw new Error("Chave da API do Gemini não configurada no ficheiro .env");
  }

  try {
    const { data: authData } = await supabase.auth.getUser();
    let listaIngredientes = "A despensa está vazia.";

    if (authData?.user) {
      const { data: despensa } = await supabase
        .from("despensa")
        .select("nome, quantidade")
        .eq("user_id", authData.user.id);

      if (despensa && despensa.length > 0) {
        listaIngredientes = despensa
          .map((item) => `${item.quantidade}x ${item.nome}`)
          .join(", ");
      }
    }

    const lang = idiomaAtual.toLowerCase();
    const idioma = lang.startsWith("en")
      ? "Inglês"
      : lang.startsWith("es")
        ? "Espanhol"
        : "Português de Portugal";

    const systemPrompt = `
      És um Chef de cozinha profissional, criativo e amigável.
      O teu cliente tem os seguintes ingredientes na despensa: ${listaIngredientes}.
      
      Regras:
      1. Responde OBRIGATORIAMENTE em ${idioma}.
      2. Tenta sugerir receitas ou ideias que usem os ingredientes disponíveis.
      3. Se sugerires uma receita, indica os ingredientes em falta que o cliente precisa de comprar.
      4. Sê conciso, formata bem o texto (com parágrafos ou pontos) para ser fácil de ler num telemóvel.
      5. MUITO IMPORTANTE: NÃO uses qualquer formatação Markdown! É ESTRITAMENTE PROIBIDO usar asteriscos (*) ou cardinais (#).
      6. Para destacar títulos, usa apenas setas '->'. Para listas, usa apenas traços normais (-).
    `;

    const promptFinal = `${systemPrompt}\n\nPergunta do cliente: "${mensagemUtilizador}"`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

    const resposta = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptFinal }] }],
      }),
    });

    const dados = await resposta.json();

    if (dados.error) {
      throw new Error(dados.error.message);
    }

    return dados.candidates[0].content.parts[0].text;
  } catch (erro: any) {
    throw new Error(erro.message || "Erro de comunicação com o Chef.");
  }
};
