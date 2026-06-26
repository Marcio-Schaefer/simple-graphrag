/**
 * Valores válidos para o papel do emissor de uma mensagem.
 *
 * @remarks
 * - `user`: Usuário humano ou agente externo
 * - `assistant`: Inteligência artificial ou sistema
 * - `system`: Configurações ou contexto do sistema
 */
export const MESSAGE_ROLES = ["user", "assistant", "system"] as const;

/**
 * Tipo que representa o papel do emissor de uma mensagem.
 *
 * @see MESSAGE_ROLES
 */
export type MessageRole = (typeof MESSAGE_ROLES)[number];
