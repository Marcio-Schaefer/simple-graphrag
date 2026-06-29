/**
 * Valores válidos para arquivos suportados para ingestão de documentos.
 *
 * @remarks
 * - `embedding`: Busca vetorial (RAG clássico)
 * - `keyword`: Busca no grafo (relações entre entidades)
 * - `hybrid`: Busca híbrida (grafo + busca vetorial)
 */
export const SUPPORTED_FILES = {
  MD: ".md",
  TXT: ".txt",
  PDF: ".pdf",
  DOCX: ".docx",
} as const;

/**
 * Tipo que representa os arquivos suportados para ingestão de documentos.
 *
 * @see {@link SUPPORTED_FILES}
 */
export type SupportedFile =
  (typeof SUPPORTED_FILES)[keyof typeof SUPPORTED_FILES];
