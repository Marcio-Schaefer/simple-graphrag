/**
 * Valores válidos para o status do processamento de ingestão de um arquivo.
 *
 * @remarks
 * - `ok`: Arquivo processado com sucesso.
 * - `skipped`: Arquivo ignorado (ex: sem alterações).
 * - `error`: Ocorreu um erro durante o processamento.
 */
export const INGEST_RESULT_STATUS = {
  OK: "ok",
  SKIPPED: "skipped",
  ERROR: "error",
} as const;

/**
 * Tipo que representa o status do processamento de ingestão de um arquivo.
 *
 * @see {@link INGEST_RESULT_STATUS}
 */
export type IngestResultStatus =
  (typeof INGEST_RESULT_STATUS)[keyof typeof INGEST_RESULT_STATUS];
