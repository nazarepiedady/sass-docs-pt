---
title: Operadores Booleanos
introduction: >
  Ao contrário de linguagens como JavaScript, a Sass usa mais palavras do que símbolos para os seus operadores [booleanos](/documentation/values/booleans).
---

* `not <expression>` retorna o oposto do valor da expressão: transforma `true` em `false` e `false` em `true`.

* `<expression> and <expression>` retorna `true` se *ambos* valores da expressão forem `true`, e `false` se um ou outro for `false`.

* `<expression> or <expression>` retorna `true` se *um ou outro* valor da expressão for `true`, e `false` se ambos forem `false`.

{% codeExample 'boolean', false %}
  @debug not true; // false
  @debug not false; // true

  @debug true and true; // true
  @debug true and false; // false

  @debug true or false; // true
  @debug false or false; // false
  ===
  @debug not true  // false
  @debug not false  // true

  @debug true and true  // true
  @debug true and false  // false

  @debug true or false  // true
  @debug false or false  // false
{% endcodeExample %}

{% render 'doc_snippets/truthiness-and-falsiness' %}
