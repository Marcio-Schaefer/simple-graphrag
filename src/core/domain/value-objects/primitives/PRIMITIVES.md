# src/core/domain/value-objects/primitives

## O que é

Representam conceitos do domínio através de tipos primitivos, normalmente utilizando _string unions_, _literal types_ ou constantes tipadas, modelando conceitos simples que possuem um conjunto finito e conhecido de valores válidos, normalmente caracterizados por:

- Serem compostos por um único valor escalar.
- Não possuírem estado composto.
- Não exigirem construtores ou validações em tempo de execução.
- Não possuírem comportamento próprio.

## Organização

Nesta pasta há apenas arquivos de implementação que seguem o padrão _PascalCase_ e sem nenhum sufixo, transmitindo clareza de sua responsabilidade, mantendo idioma consistente e sem abreviações obscuras.

- [MessageRole.ts](./MessageRole.ts)
