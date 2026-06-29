/**
 * Valores válidos para o modo de busca de um agente.
 *
 * @remarks
 * - `embedding`: Busca vetorial (RAG clássico)
 * - `keyword`: Busca no grafo (relações entre entidades)
 * - `hybrid`: Busca híbrida (grafo + busca vetorial)
 */
export const QUERY_MODES = {
  EMBEDDING: "embedding",
  KEYWORD: "keyword",
  HYBRID: "hybrid",
} as const;

/**
 * Tipo que representa o modo de consulta.
 *
 * @see {@link QUERY_MODES}
 */
export type QueryMode = (typeof QUERY_MODES)[keyof typeof QUERY_MODES];
