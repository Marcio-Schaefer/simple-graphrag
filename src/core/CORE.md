# src/core

## O que é

Camada central onde residem as regras de negócio essenciais da aplicação. É totalmente isolada de detalhes técnicos como banco de dados, _frameworks_, interface de usuário ou qualquer tecnologia externa.

## Organização

Nesta pasta não há arquivos soltos de implementação, ela é composta apenas por subpastas que seguem o padrão de nomenclatura _kebab-case_.

- [**/domain**](./domain/DOMAIN.md): Contém as regras de negócio da aplicação
