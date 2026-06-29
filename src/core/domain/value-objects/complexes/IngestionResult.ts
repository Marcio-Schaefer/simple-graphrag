import { ComplexValueObject } from "@/core/domain/value-objects/complexes/ComplexValueObject";
import type { IngestResultStatus } from "@/core/domain/value-objects/primitives/IngestResultStatus";

/**
 * Representa o resultado da tentativa de ingestão de um único arquivo.
 *
 * Encapsula o arquivo processado, o status da ingestão e, opcionalmente,
 * uma razão associada ao resultado (ex: falha de validação ou erro de parsing).
 *
 * @remarks
 * **Invariantes**
 * - O campo `file` não pode ser vazio ou conter apenas espaços.
 * - O campo `reason` é opcional e pode estar ausente em casos de sucesso.
 */
export class IngestionResult extends ComplexValueObject {
  private constructor(
    private readonly file: string,
    private readonly status: IngestResultStatus,
    private readonly reason?: string,
  ) {
    super();
  }

  /**
   * Cria uma nova instância de {@link IngestionResult}.
   *
   * @param file Caminho ou identificador do arquivo processado.
   * @param status Status resultante da ingestão.
   * @param reason Razão opcional associada ao resultado da ingestão.
   *
   * @returns Uma instância imutável de {@link IngestionResult}.
   *
   * @remarks
   * Antes da validação, o campo `file` é normalizado com `trim()`,
   * removendo espaços em branco nas extremidades.
   *
   * @throws Lançado caso alguma invariante de domínio seja violada.
   */
  public static create(
    file: string,
    status: IngestResultStatus,
    reason?: string,
  ): IngestionResult {
    return IngestionResult.build(
      new IngestionResult(file.trim(), status, reason),
    ) as IngestionResult;
  }

  protected validate(): void {
    if (!this.file || !this.file.trim()) {
      throw new Error("IngestionResult inválido: file não pode ser vazio.");
    }
  }

  protected getEqualityComponents(): readonly unknown[] {
    return [this.file, this.status, this.reason];
  }

  /**
   * Retorna o identificador do arquivo associado ao resultado da ingestão.
   *
   * @returns Nome ou caminho do arquivo processado.
   */
  public getFile(): string {
    return this.file;
  }

  /**
   * Retorna o status da ingestão do arquivo.
   *
   * @returns Status resultante da operação.
   */
  public getStatus(): IngestResultStatus {
    return this.status;
  }

  /**
   * Retorna a razão associada ao resultado da ingestão, se existir.
   *
   * @returns Motivo do resultado, quando existente.
   */
  public getReason(): string | undefined {
    return this.reason;
  }
}
