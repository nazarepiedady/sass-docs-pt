---
title: "@for"
introduction: >
  A regra `@for`, escrita `@for <variable> from <expression> to <expression> { ... }` ou `@for <variable> from <expression> through <expression> { ... }`, conta ou faz contagem decrescente desde um número (o resultado da primeira [expressão](/documentation/syntax/structure#expressions)) até um outro (o resultado do segundo) e avalia um bloco para cada número entre os números. Cada número ao longo do caminho é atribuído ao dado nome de variável. Se `to` for usado, o número final é excluído; se `through` for usado, é incluído.
---

{% codeExample 'for' %}
  $base-color: #036;

  @for $i from 1 through 3 {
    ul:nth-child(3n + #{$i}) {
      background-color: lighten($base-color, $i * 5%);
    }
  }
  ===
  $base-color: #036

  @for $i from 1 through 3
    ul:nth-child(3n + #{$i})
      background-color: lighten($base-color, $i * 5%)
{% endcodeExample %}
