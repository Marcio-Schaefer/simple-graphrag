# src/core/domain/value-objects

## O que é

Representa um conceito de negócio sem identidade própria (ID), definido exclusivamente pelos valores que carrega. Eles são imutáveis, podem ser comparados pelo seu conteúdo e normalmente representam valores puros, possuindo:

| Princípio           | Descrição                                                                     |
| ------------------- | ----------------------------------------------------------------------------- |
| Imutabilidade       | Uma vez criado, seu estado nunca muda                                         |
| Igualdade por valor | Dois VOs são iguais se todos os seus campos forem iguais (não por referência) |
| Auto-validação      | Deve validar seus dados no momento da criação.                                |
| Sem identidade      | Diferente de Entidades, VOs não possuem um ID                                 |
| Encapsulamento      | A lógica de validação e criação deve ser interna                              |
| Semântica rica      | Dá significado de domínio a tipos primitivos                                  |

## Organização

Nesta pasta não há arquivos soltos de implementação, ela é composta apenas por subpastas que seguem o padrão de nomenclatura _kebab-case_.

- [**/complexes**](./complexes/COMPLEXES.md): Compostos implementados como classes, contendo validações, invariantes e comportamentos próprios.

- [**/primitives**](./primitives/PRIMITIVES.md): Escalares representados por tipos primitivos, _unions_ e constantes.
