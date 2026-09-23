// Recover missing legacy PNG references without changing saved phrases.
const substituidos = new Set(["leite", "hospital", "parque", "supermercado", "restaurante", "entediado", "oi", "tchau", "por-favor", "com-licenca", "desculpa", "obrigado", "brinquedos", "quebra-cabeca", "tv", "musica", "livro", "ajuda", "perdido", "amor"]);
export function normalizarIcone(path: string): string {
  const match = /^assets\/icon\/([a-z-]+)\.png$/.exec(path);
  return match && substituidos.has(match[1]) ? path.replace(/\.png$/, '.svg') : path;
}
