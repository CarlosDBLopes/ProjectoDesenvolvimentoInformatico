export const procurarProdutoPorCodigo = async (codigo: string) => {
  try {
    const resposta = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${codigo}.json`,
    );
    const dados = await resposta.json();

    if (dados.status === 1 && dados.product) {
      return {
        nome: dados.product.product_name_pt || dados.product.product_name || "",
        marca: dados.product.brands || "",
        imagemUrl: dados.product.image_front_url || null,
      };
    }

    return null;
  } catch (erro) {
    console.error("Erro ao procurar produto no OpenFoodFacts:", erro);
    return null;
  }
};
