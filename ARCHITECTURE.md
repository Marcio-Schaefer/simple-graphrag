# Arquitetura do Projeto

Este projeto segue a **Clean Architecture**, focando na separação de responsabilidades e independência de frameworks.

## ❤️ CORE Layer

Camada central onde residem as regras de negócio essenciais da aplicação. É totalmente isolada de detalhes técnicos como banco de dados, frameworks, interface de usuário ou qualquer tecnologia externa.

> Para mais detalhes, acesse: [src/core](./src/core/CORE.md)

### 1. Domain

Representa o mundo real do negócio, contendo as regras de negócio centrais da aplicação, suas lógicas e seus dados.

> Para mais detalhes, acesse: [src/core/domain](./src/core/domain/DOMAIN.md)

- ### Entities

  Representam objetos de negócio globais e fundamentais da aplicação, encapsulando regras e os dados mais críticos do sistema

  > Para mais detalhes, acesse: [src/core/domain/entities](./src/core/domain/entities/ENTITIES.md)

- ### Value Objects

  Representa um conceito de negócio sem identidade própria (ID), definido exclusivamente pelos valores que carrega. Eles são imutáveis, podem ser comparados pelo seu conteúdo e normalmente representam valores puros

  > Para mais detalhes, acesse: [src/core/domain/value-objects](./src/core/domain/value-objects/VALUE_OBJECTS.md)
