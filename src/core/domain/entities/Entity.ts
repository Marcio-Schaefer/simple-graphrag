/**
 * Classe base abstrata que define os requisitos de uma Entidade com identidade própria.
 *
 * @typeParam TId - Tipo da identidade, decidido por cada classe concreta.
 *
 * @remarks
 * - Entidades são comparadas por identidade (`id`), nunca por valor.
 * - Força validação via método abstrato `validate()`
 */
export abstract class Entity<TId> {
  /**
   * @param id A identidade única da entidade.
   */
  protected constructor(public readonly id: TId) {}

  /**
   * Compara dois valores com suporte a objetos e arrays aninhados.
   *
   * @param a Primeiro valor.
   * @param b Segundo valor.
   * @returns True se são iguais por valor.
   */
  protected static deepEqual(a: unknown, b: unknown): boolean {
    if (a === b) {
      return true;
    }

    if (a === null || b === null || a === undefined || b === undefined) {
      return a === b;
    }

    if (typeof a !== typeof b) {
      return false;
    }

    if (typeof a === "object") {
      if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) {
          return false;
        }
        return a.every((valueA, index) =>
          this.deepEqual(valueA, (b as unknown[])[index]),
        );
      }

      const keysA = Object.keys(a);
      const keysB = Object.keys(b);

      if (keysA.length !== keysB.length) {
        return false;
      }

      return keysA.every((key) =>
        this.deepEqual(
          (a as Record<string, unknown>)[key],
          (b as Record<string, unknown>)[key],
        ),
      );
    }

    return false;
  }

  /**
   * Inicializa a entidade garantindo validação.
   *
   * @param instance A instância da Entidade.
   * @returns A instância da Entidade.
   *
   * @throws Se a validação falhar, o erro é lançado.
   */
  protected static build<T extends Entity<unknown>>(instance: T): T {
    instance.validate();
    return instance;
  }

  /**
   * Valida os atributos do objeto, lançando erro se houver violação de invariantes.
   *
   * @returns Sem retorno.
   *
   * @throws Lança um erro se os atributos do objeto forem inválidos.
   *
   * @remarks
   * Este método é chamado automaticamente por `build()` e deve conter
   * todas as regras de negócio e validações da Entidade.
   */
  protected abstract validate(): void;

  /**
   * Compara se outra entidade é igual por identidade.
   *
   * @param other Entidade a ser comparada.
   * @returns True se a entidade for igual por identidade, false caso contrário.
   *
   * @remarks
   * - Compara apenas o `id` do objeto
   * - Retorna false se `other` for null, undefined ou de tipo diferente (incluindo subclasses)
   */
  public equals(other: Entity<TId>): boolean {
    if (!other || this.constructor !== other.constructor) {
      return false;
    }
    return this.id === other.id;
  }
}
