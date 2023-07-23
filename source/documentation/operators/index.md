---
title: Operadores
introduction: >
  A Sass suporta um punhado de `operadores` úteis para trabalhar com diferentes valores. Estes incluem operadores matemáticos padrão como `+` e `*`, bem como operadores para outros vários tipos:
---

{% render 'doc_snippets/operator-list', parens: false %}

{% headsUp %}
  No princípio da história da Sass, ela adicionou suporte para operações matemática sobre as [cores][colors]. Estas operações operavam sobre cada canal de RGB das cores separadamente, assim adicionando duas cores produziria um cor com a soma de seus canais de vermelho de acordo com o seu canal de vermelho e assim por diante.

  [colors]: /documentation/values/colors

  Este comportamento não era muito útil, já que sua aritmética de RGB de canal por canal não correspondia bem a como os humanos percebem a cor. As [funções de cor][Color functions] foram adicionadas as quais são mais úteis, e os operadores de cor foram depreciados. Eles continuam a ser suportados na LibSass e Sass de Ruby, mas produziram avisos e os utilizadores são fortemente encorajados a evitá-los.

  [Color functions]: /documentation/modules/color
{% endheadsUp %}

## Ordem das Operações {#order-of-operations}

A Sass tem uma linda [ordem de operações][order of operations] padrão, do mais apertado até o mais desapertado:

[order of operations]: https://en.wikipedia.org/wiki/Order_of_operations#Programming_languages

1. Os operadores unários [`not`][], [`+`, `-`][], e [`/`][].
2. Os [operadores `*`, `/`, e `%`][`*`, `/`, and `%` operators].
3. Os [operadores `+` e `-`][`+` and `-` operators].
4. Os [operadores `>`, `>=`, `<` e `<=`][`>`, `>=`, `<` and `<=` operators].
5. Os [operadores `==` e `!=`][`==` and `!=` operators].
6. O [operador `and`][`and` operator].
7. O [operador `or`][`or` operator].
8. O [operador `=`][`=` operator], quando estiver disponível.

[`not`]: /documentation/operators/boolean
[`+`, `-`]: /documentation/operators/numeric#unary-operators
[`/`]: /documentation/operators/string#unary-operators
[`*`, `/`, and `%` operators]: /documentation/operators/numeric
[`+` and `-` operators]: /documentation/operators/numeric
[`>`, `>=`, `<` and `<=` operators]: /documentation/operators/relational
[`==` and `!=` operators]: /documentation/operators/equality
[`and` operator]: /documentation/operators/boolean
[`or` operator]: /documentation/operators/boolean
[`=` operator]: #single-equals

{% codeExample 'operators', false %}
  @debug 1 + 2 * 3 == 1 + (2 * 3); // true
  @debug true or false and false == true or (false and false); // true
  ===
  @debug 1 + 2 * 3 == 1 + (2 * 3)  // true
  @debug true or false and false == true or (false and false)  // true
{% endcodeExample %}

### Parênteses {#parentheses}

Tu podes controlar explicitamente a ordem das operações usando parêntesis. Uma operação dentro de parêntesis é sempre avaliada antes de quaisquer operadores fora dos parêntesis. Os parêntesis podem mesmo ser encaixados, no qual caso os parêntesis mais íntimo serão avaliados primeiro:

{% codeExample 'parentheses', false %}
  @debug (1 + 2) * 3; // 9
  @debug ((1 + 2) * 3 + 4) * 5; // 65
  ===
  @debug (1 + 2) * 3  // 9
  @debug ((1 + 2) * 3 + 4) * 5  // 65
{% endcodeExample %}

## Único Sinal de Igualdade {#single-equals}

A Sass suporta um operador especial `=` que é apenas permitido nos argumentos de função, que cria apenas uma [sequência de caracteres sem aspas][unquoted string] com os seus dois operandos separados pelo `=`. Isto existe por questões de retro-compatibilidade com a sintaxe muito antiga usada apenas no Internet Explorer.

[unquoted string]: /documentation/values/strings#unquoted

{% codeExample 'single-equals' %}
  .transparent-blue {
    filter: chroma(color=#0000ff);
  }
  ===
  .transparent-blue
    filter: chroma(color=#0000ff)
{% endcodeExample %}
