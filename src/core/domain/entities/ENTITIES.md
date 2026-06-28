# src/core/domain/entities

## O que é

Representam objetos de negócio com identidade própria, diferenciados não pelo seu conteúdo,
mas por terem um identificador único (`id`) e um ciclo de vida. Normalmente possuem:

| Princípio             | Descrição                                                           |
| --------------------- | ------------------------------------------------------------------- |
| Identidade            | Cada entidade tem um `id` único; comparação é sempre por identidade |
| Ciclo de vida         | Podem ser criadas, lidas, atualizadas e deletadas                   |
| Validação obrigatória | Nunca podem ser instanciadas em estado inválido                     |
| Identidade genérica   | O tipo de `id` é decidido por cada subclasse                        |

## Convenção

Toda entidade deve herdar da classe abstrata `Entity<TId>`, pois ela define o contrato mínimo esperado e garante consistência entre as implementações. Além disto, deve-se seguir o **_Factory Pattern_**, garantindo que a criação seja feita de forma controlada e segura.

## Organização

Nesta pasta há apenas arquivos de implementação que seguem o padrão `PascalCase` e sem nenhum sufixo,
transmitindo clareza de sua responsabilidade, mantendo idioma consistente e sem abreviações obscuras.

- [Entity.ts](./Entity.ts)
- [IngestedDocument.ts](./IngestedDocument.ts)
