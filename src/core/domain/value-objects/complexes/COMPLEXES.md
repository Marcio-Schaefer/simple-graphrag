# src/core/domain/value-objects/complexes

## O que é

Representam conceitos do domínio que possuem estrutura própria, múltiplos atributos, invariantes ou comportamentos que não podem ser expressos apenas através de tipos primitivos, normalmente possuindo:

- Múltiplos atributos.
- Validações durante a criação.
- Comportamentos relacionados ao domínio.
- Comparação baseada em valor.
- Imutabilidade.

## Convenção

Todos os objetos de valor complexos devem herdar da classe abstrata `ComplexValueObject`, pois ela define o contrato mínimo esperado e garante consistência entre as implementações. Além disto, deve-se seguir o **_Factory Pattern_**, garantindo que a criação seja feita de forma controlada e segura.

## Organização

Nesta pasta há apenas arquivos de implementação que seguem o padrão _PascalCase_ e sem nenhum sufixo, transmitindo clareza de sua responsabilidade, mantendo idioma consistente e sem abreviações obscuras.

- [ComplexValueObject.ts](./ComplexValueObject.ts)
- [IngestionResult.ts](./IngestionResult.ts)
- [Triplet.ts](./Triplet.ts)
