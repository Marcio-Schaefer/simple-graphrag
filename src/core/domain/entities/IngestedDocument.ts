import { Entity } from "@/core/domain/entities/Entity";

/**
 * Representa um documento que passou pelo processo de ingestão e está pronto
 * para ser indexado no grafo de conhecimento.
 *
 * @remarks
 * A identidade (`id`) corresponde ao caminho normalizado do documento (`source`),
 * garantindo que múltiplas ingestões do mesmo arquivo representem a mesma
 * entidade lógica. Dessa forma, o processo de indexação pode ser executado de
 * forma idempotente, evitando duplicação de documentos.
 *
 * Além do conteúdo textual, a entidade registra o instante em que a ingestão
 * foi realizada, permitindo rastreabilidade e auditoria.
 */
export class IngestedDocument extends Entity<string> {
  private constructor(
    private readonly text: string,
    private readonly source: string,
    private readonly ingestedAt: string,
  ) {
    super(source);
  }

  /**
   * Cria uma nova instância de {@link IngestedDocument}.
   *
   * @param text - Conteúdo textual extraído do documento.
   * @param source - Caminho ou identificador único da origem do documento.
   * @returns Instância de {@link IngestedDocument}.
   *
   * @remarks
   * O identificador da entidade é derivado de `source`, tornando a criação
   * determinística para um mesmo documento. A data de ingestão é definida
   * automaticamente utilizando o horário atual em formato ISO 8601.
   *
   * @throws Se a entidade não satisfaça suas regras de validação.
   */
  public static create(text: string, source: string): IngestedDocument {
    return Entity.build(
      new IngestedDocument(text, source, new Date().toISOString()),
    );
  }

  protected validate(): void {
    if (!this.text.trim()) {
      throw new Error(this.source);
    }
  }

  /**
   * Retorna o texto do documento.
   *
   * @returns Texto do documento.
   */
  public getText(): string {
    return this.text;
  }

  /**
   * Retorna a quantidade de caracteres que compõem o documento.
   *
   * @returns Quantidade de caracteres do documento.
   */
  public getCharCount(): number {
    return this.text.length;
  }

  /**
   * Retorna a origem do documento.
   *
   * @returns Origem do documento.
   */
  public getSource(): string {
    return this.source;
  }

  /**
   * Retorna a data de ingestão do documento.
   *
   * @returns Data de ingestão do documento.
   */
  public getIngestedAt(): string {
    return this.ingestedAt;
  }
}
