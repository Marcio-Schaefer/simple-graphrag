/**
 * Classe base abstrata que define os requisitos de um Value Object com regras, invariantes ou comportamentos próprios.
 *
 * @remarks
 * - Garante imutabilidade profunda via recursividade
 * - Implementa comparação por valor com suporte a objetos/arrays aninhados
 * - Força validação via método abstrato `validate()`
 *
 * @note
 * A classe usa `Readonly<T>` apenas para tipagem em tempo de compilação.
 * Para garantir imutabilidade real em runtime, faça sempre uso do método `build()`.
 */
export abstract class ComplexValueObject {
  protected constructor() {}

  /**
   * Imuta o próprio objeto e todas as suas propriedades aninhadas que sejam objetos ou arrays.
   *
   * @param {T} obj O objeto a ser imutado.
   * @returns {T} O objeto imutado.
   */
  private static deepFreeze<T extends object>(obj: T): T {
    Object.freeze(obj);

    Object.getOwnPropertyNames(obj).forEach((prop) => {
      const value = (obj as Record<string, unknown>)[prop];

      if (
        value !== null &&
        typeof value === "object" &&
        !Object.isFrozen(value)
      ) {
        this.deepFreeze(value as object);
      }
    });

    return obj;
  }

  /**
   * Compara dois valores com suporte a objetos e arrays aninhados.
   *
   * @param {unknown} a Primeiro valor.
   * @param {unknown} b Segundo valor.
   * @returns {boolean} True se são iguais por valor.
   */
  private static deepEqual(a: unknown, b: unknown): boolean {
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
   * Inicializa o VO garantindo validação e imutabilidade.
   *
   * @param {T} instance A instância do Value Object.
   * @returns {Readonly<T>} A instância imutável do Value Object.
   *
   * @throws {Error} Se a validação falhar, o erro é lançado antes da imutabilidade ser aplicada.
   */
  protected static build<T extends ComplexValueObject>(
    instance: T,
  ): Readonly<T> {
    instance.validate();
    this.deepFreeze(instance);

    return instance;
  }

  /**
   * Valida os atributos do objeto, lançando erro se houver violação de invariantes.
   *
   * @returns {void} Sem retorno.
   *
   * @throws {Error} Lança um erro se os atributos do objeto forem inválidos.
   *
   * @remarks
   * Este método é chamado automaticamente por `build()` e deve conter
   * todas as regras de negócio e validações do Value Object.
   */
  protected abstract validate(): void;

  /**
   * Obtém os componentes usados para comparação por valor.
   *
   * Deve retornar uma tupla ou array contendo todos os atributos relevantes
   * para a igualdade do VO. A ordem é importante.
   *
   * @returns {readonly unknown[]} Os componentes usados para comparação por valor.
   *
   * @remarks
   * - Primitivos (string, number, boolean) são sempre comparáveis.
   * - Objetos/arrays aninhados serão comparados recursivamente.
   */
  protected abstract getEqualityComponents(): readonly unknown[];

  /**
   * Compara se outro objeto é igual por valor.
   *
   * @param {ComplexValueObject} other Objeto a ser comparado.
   * @returns {boolean} True se o objeto for igual por valor, false caso contrário.
   *
   * @remarks
   * - Retorna false se `other` for null, undefined ou de tipo diferente (incluso subclasses).
   * - Usa comparação profunda nos componentes de igualdade, suportando objetos/arrays aninhados.
   * - A comparação é estrita quanto ao tipo de classe: `Triplet` e `TripletV2` nunca são iguais,
   *   mesmo que tenham os mesmos atributos.
   */
  public equals(other: ComplexValueObject): boolean {
    if (!other || this.constructor !== other.constructor) {
      return false;
    }

    const current = this.getEqualityComponents();
    const target = other.getEqualityComponents();

    if (current.length !== target.length) {
      return false;
    }

    return current.every((value, index) =>
      ComplexValueObject.deepEqual(value, target[index]),
    );
  }
}
