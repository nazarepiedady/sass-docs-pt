---
title: Booleanos
introduction: >
  Os booleanos são os valores lógicos `true` e `false`. Além das suas formas literais, os booleanos são retornados pelos operadores de [igualdade](/documentation/operators/equality) e [relacionais](/documentation/operators/relational), bem como muitas funções embutidas como [`math.comparable()`](/documentation/modules/math#comparable) e [`map.has-key()`](/documentation/modules/map#has-key.
---

{% codeExample 'booleans', false %}
  @use "sass:math";

  @debug 1px == 2px; // false
  @debug 1px == 1px; // true
  @debug 10px < 3px; // false
  @debug math.comparable(100px, 3in); // true
  ===
  @use "sass:math"

  @debug 1px == 2px  // false
  @debug 1px == 1px  // true
  @debug 10px < 3px  // false
  @debug math.comparable(100px, 3in)  // true
{% endcodeExample %}

Tu podes trabalhar com booleanos usando [operadores booleanos][boolean operators]. O operador `and` retorna `true` se *ambos* ambos lados forem `true`, e o operador `or` retorna `true` se *um ou outro* lado for `true`. O operador `not` retorna o oposto de um único valor booleano.

[boolean operators]: /documentation/operators/boolean

{% codeExample 'boolean-operators', false %}
  @debug true and true; // true
  @debug true and false; // false

  @debug true or false; // true
  @debug false or false; // false

  @debug not true; // false
  @debug not false; // true
  ===
  @debug true and true  // true
  @debug true and false  // false

  @debug true or false  // true
  @debug false or false  // false

  @debug not true  // false
  @debug not false  // true
{% endcodeExample %}

## Usando Booleanos {#using-booleans}

Tu podes usar booleanos para escolheres se fazes ou não várias coisas na Sass. A [regra `@if`][`@if` rule] avalia um bloco de estilos se seu argumento for `true`:

[`@if` rule]: /documentation/at-rules/control/if

{% render 'code_snippets/example-if' %}

A [função `if()`][`if()` function] retorna um valor se seu argumento `true` e um outro se seu argumento for `false`:

[`if()` function]: /documentation/modules#if

{% codeExample 'if-function', false %}
  @debug if(true, 10px, 30px); // 10px
  @debug if(false, 10px, 30px); // 30px
  ===
  @debug if(true, 10px, 30px)  // 10px
  @debug if(false, 10px, 30px)  // 30px
{% endcodeExample %}

{% render 'doc_snippets/truthiness-and-falsiness' %}
