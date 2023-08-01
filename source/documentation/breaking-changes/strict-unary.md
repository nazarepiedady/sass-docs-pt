---
title: "Mudança de Rutura: Operadores Unários Estritos"
introduction: >
  Historicamente, a Sass tem permitido que `-` e `+` que sejam usados de maneiras que as tornam ambíguas se o autor pretendia que fossem operadores binários ou unários. Esta sintaxe confusa está a ser depreciada.
---

Como é que esta propriedade é compilada?

{% codeExample 'strict-unary', false %}
  $size: 10px;

  div {
    margin: 15px -$size;
  }
  ===
  $size: 10px

  div
    margin: 15px -$size
{% endcodeExample %}

Alguns utilizadores podem dizer "o `-` está anexado ao `$size`, então deve ser `margin: 20px -10px`". Outros podem dizer "o `-` está entre `20px` e `$size`, então deve ser `margin: 5px`". A Sass atualmente concorda com a última opinião, mas o verdadeiro problema é que é tão confuso em primeiro lugar! Trata-se de uma situação natural porém uma consequência infeliz da sintaxe de lista separadas por espaço da CSS combinada com a sintaxe aritmética da Sass.

É por isto que estamos a caminho de tornar isto um erro. No futuro, se quiseres usar um operador `-` ou `+` binário (isto é, um que subtrai ou adiciona dois números), precisarás de colocar um espaço em branco ambos lados ou em nenhum dos lados:

* Válido: `15px - $size`
* Válido: `(15px)-$size`
* Inválido: `15px -$size`

Se quiseres usar um operador `-` ou `+` unário como parte duma lista separada por espaço, (ainda) precisarás de envolvê-lo em parênteses:

* Válido: `15px (-$size)`

## Período de Transição {#transition-period}

{% compatibility 'dart: "1.55.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

Tornaremos isto um erro na Sass de Dart 2.0.0, mas até lá apenas emitirá um aviso de depreciação:

{% render 'doc_snippets/silence-deprecations' %}

## Migração Automática {#automatic-migration}

Tu podes usar [o migrador da Sass][the Sass migrator] para atualizar automaticamente as tuas folhas de estilo, para adicionares um espaço depois de quaisquer operadores `-` ou `+` que precisar dele, o que preservará o comportamento existente destas folhas de estilo:

[the Sass migrator]: https://github.com/sass/migrator#readme

```shellsession
$ npm install -g sass-migrator
$ sass-migrator strict-unary **/*.scss
```
