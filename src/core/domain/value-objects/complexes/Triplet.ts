import { ComplexValueObject } from "@/core/domain/value-objects/complexes/ComplexValueObject";

/**
 * Representa uma tripla semântica composta por **sujeito**, **relação** e
 * **objeto**, utilizada como unidade básica de um grafo de conhecimento.
 *
 * Cada instância descreve uma afirmação sobre uma entidade, seguindo o modelo:
 * `(sujeito) ──[relação]──▶ (objeto)`
 *
 * @remarks
 * **Invariantes**
 * - Sujeito, relação e objeto não podem ser vazios.
 * - Os valores são normalizados por meio de `trim()` durante a criação.
 * - A igualdade é definida exclusivamente pelos valores de sujeito, relação e objeto.
 */
export class Triplet extends ComplexValueObject {
  private constructor(
    private readonly subject: string,
    private readonly relation: string,
    private readonly object: string,
  ) {
    super();
  }

  /**
   * Cria uma nova instância de {@link Triplet}.
   *
   * @param subject Sujeito da afirmação.
   * @param relation Relação existente entre sujeito e objeto.
   * @param object Objeto da afirmação.
   *
   * @returns Uma instância imutável de {@link Triplet}.
   *
   * @remarks
   * Antes da validação, todos os valores são normalizados por meio de
   * `.trim()`, removendo espaços em branco nas extremidades.
   *
   * @throws Lançado caso qualquer uma das regras de validação da tripla seja violada.
   */
  public static create(
    subject: string,
    relation: string,
    object: string,
  ): Triplet {
    return Triplet.build(
      new Triplet(subject.trim(), relation.trim(), object.trim()),
    ) as Triplet;
  }

  protected validate(): void {
    if (!this.subject || !this.relation || !this.object) {
      throw new Error(
        "Triplet inválida: sujeito, relação e objeto não podem ser vazios.",
      );
    }
  }

  protected getEqualityComponents(): readonly unknown[] {
    return [this.subject, this.relation, this.object];
  }

  /**
   * Retorna o sujeito da tripla.
   *
   * @returns Sujeito da afirmação.
   */
  public getSubject(): string {
    return this.subject;
  }

  /**
   * Retorna a relação da tripla.
   *
   * @returns Relação da afirmação.
   */
  public getRelation(): string {
    return this.relation;
  }

  /**
   * Retorna o objeto da tripla.
   *
   * @returns Objeto da afirmação.
   */
  public getObject(): string {
    return this.object;
  }
}
