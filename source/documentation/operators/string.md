---
title: Operadores de Sequência de Caracteres
introduction: >
  A Sass suporta alguns operadores que geram [sequências de caracteres](/documentation/values/strings):
---

* `<expression> + <expression>` retorna uma sequência de caracteres que contém os valores de ambas expressões. Se um dos valores for uma [sequência de caracteres com aspas][quoted string], o resultado será com aspas; de outro modo, será sem aspas.

* `<expression> - <expression>` retorna uma sequência de caracteres sem aspas contém os valores de ambas expressões, separados por `-`. Isto é um operador legado, e a [interpolação][interpolation] deveria ser geralmente usada de preferência.

[quoted string]: /documentation/values/strings#quoted
[interpolation]: /documentation/interpolation

{% codeExample 'string', false %}
  @debug "Helvetica" + " Neue"; // "Helvetica Neue"
  @debug sans- + serif; // sans-serif
  @debug sans - serif; // sans-serif
  ===
  @debug "Helvetica" + " Neue"  // "Helvetica Neue"
  @debug sans- + serif  // sans-serif
  @debug sans - serif  // sans-serif
{% endcodeExample %}

Estes operadores não trabalham apenas com sequências de caracteres! Eles podem ser usados com quaisquer valores que pode ser escrito para CSS, com algumas exceções:

* Números que não podem ser usados como valor à esquerdo, já que têm [seus próprios operadores][numeric].

* Cores que não podem ser usados como valor à esquerda, já que costumam a ter [seus próprios operadores][color]

[numeric]: /documentation/operators/numeric
[color]: /documentation/operators

{% codeExample 'string-exceptions', false %}
  @debug "Elapsed time: " + 10s; // "Elapsed time: 10s";
  @debug true + " is a boolean value"; // "true is a boolean value";
  ===
  @debug "Elapsed time: " + 10s  // "Elapsed time: 10s";
  @debug true + " is a boolean value"  // "true is a boolean value";
{% endcodeExample %}

{% headsUp %}
  É muitas vezes mais limpo e claro usar a [interpolação][interpolation] para criar sequências de caracteres, ao invés de depender destes operadores.

  [interpolation]: /documentation/interpolation
{% endheadsUp %}

## Operadores Unário {#unary-operators}

Por razões históricas, a Sass também suporta `/` e `-` como operadores unários que recebem apenas um valor:

* `/<expression>` retorna uma sequência de caracteres sem aspas começando com `/` e seguido pelo valor da expressão.
* `-<expression>` retorna uma sequência de caracteres sem aspas começando com `-` e seguido pelo valor da expressão.

{% codeExample 'unary-operators', false %}
  @debug / 15px; // /15px
  @debug - moz; // -moz
  ===
  @debug / 15px  // /15px
  @debug - moz  // -moz
{% endcodeExample %}
