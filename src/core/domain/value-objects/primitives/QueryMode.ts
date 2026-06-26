/**
 * Valores válidos para o modo de busca de um agente.
 *
 * @remarks
 * - `embedding`: Busca vetorial (RAG clássico)
 * - `keyword`: Busca no grafo (relações entre entidades)
 * - `hybrid`: Busca híbrida (grafo + busca vetorial)
 */
export const QUERY_MODES = ["embedding", "keyword", "hybrid"] as const;

/**
 * Tipo que representa o modo de consulta.
 *
 * @see {QUERY_MODES}
 */
export type QueryMode = (typeof QUERY_MODES)[number];
