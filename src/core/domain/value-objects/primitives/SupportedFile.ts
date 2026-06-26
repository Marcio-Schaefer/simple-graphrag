/**
 * Valores válidos para arquivos suportados para ingestão de documentos.
 *
 * @remarks
 * - `embedding`: Busca vetorial (RAG clássico)
 * - `keyword`: Busca no grafo (relações entre entidades)
 * - `hybrid`: Busca híbrida (grafo + busca vetorial)
 */
export const SUPPORTED_FILES = [".md", ".txt", ".pdf", ".docx"] as const;

/**
 * Tipo que representa os arquivos suportados para ingestão de documentos.
 *
 * @see SUPPORTED_FILES
 */
export type SupportedFile = (typeof SUPPORTED_FILES)[number];
