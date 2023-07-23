---
title: "Mudança de Rutura: Barra como Divisão"
introduction: >
  A Sass atualmente trata `/` como uma operação de divisão em alguns contextos e um separador em outros. Isto torna difícil para os utilizadores da Sass dizer o que qualquer dada `/` significará, e dificulta trabalhar com as novas funcionalidades da CSS que usam `/` como separador.
---

{% compatibility 'dart: "partial"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

Hoje, a Sass usa [heurísticas complexas][complex heuristics] para compreender se uma `/` deveria ser tratada como divisão ou um separador. Mesmo assim, uma vez que um separador apenas produz uma sequência de caracteres sem aspas é difícil inspecionar a partir de dentro da Sass. Conforme mais e mais funcionalidades de CSS como [Grade de CSS][CSS Grid] e a [nova sintaxe de `rgb()` e `hsl()`][new `rgb()` and `hsl()` syntax] usam `/` como um separador, está a tornar-se ainda mais penoso para os utilizadores da Sass.

[complex heuristics]: /documentation/operators/numeric#slash-separated-values
[CSS Grid]: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row
[new `rgb()` and `hsl()` syntax]: https://drafts.csswg.org/css-color/#rgb-functions

Uma vez que a Sass é um superconjunto de CSS, estamos a combinar a sintaxe da CSS redefinindo `/` para ser *apenas* um separador. `/` será tratado como um novo tipo de separador de lista, semelhante a como `,` funciona hoje. A divisão será escrita usando a nova função `math.div()`. Esta função comportar-se-á exatamente como `/` hoje.

Esta depreciação não afeta os usos de `/` dentro de expressões de `calc()`:

{% codeExample 'slash-div' %}
  @use "sass:math";

  // Sass do futuro, ainda não funciona!
  .item3 {
    $row: span math.div(6, 2) / 7; // Uma lista separada por barra de dois elementos.
    grid-row: $row;
  }
  ===
  @use "sass:math"

  // Sass do futuro, ainda não funciona!
  .item3
    $row: span math.div(6, 2) / 7 // // Uma lista separada por barra de dois elementos.
    grid-row: $row
  ===
  .item3 {
    grid-row: span 3 / 7;
  }
{% endcodeExample %}

## Período de Transição {#transition-period}

{% compatibility 'dart: "1.33.0"', 'libsass: false', 'ruby: false', 'feature: "math.div() e list.slash()"' %}{% endcompatibility %}

Para facilitar a transição, começamos por adicionar a função `math.div()`. Por agora o operador `/` continua a fazer divisão, mas também imprime um aviso de depreciação quando o faz. Os utilizadores deveriam trocar todas as divisões para usarem `math.div()`:

{% render 'doc_snippets/silence-deprecations' %}

{% codeExample 'math-div', false %}
  @use "sass:math";

  // ERRADO, não funcionará nas futuras versões da Sass.
  @debug (12px/4px); // 3

  // CERTO, funcionará nas futuras versões da Sass.
  @debug math.div(12px, 4px); // 3
  ===
  @use "sass:math"

  // ERRADO, não funcionará nas futuras versões da Sass.
  @debug (12px/4px) // 3

  // CERTO, funcionará nas futuras versões da Sass.
  @debug math.div(12px, 4px) // 3
{% endcodeExample %}

As listas separadas por barra também estarão disponíveis no período de transição. Uma vez que ainda não podem ser criadas com `/`, a função `list.slash()` será adicionada para criá-las. Tu também serás capaz de passar `"slash"` como o `$separator` para a [função `list.join()`][`list.join()` function] e a [função `list.append()`][`list.append()` function]:

[`list.join()` function]: /documentation/modules/list#join
[`list.append()` function]: /documentation/modules/list#append

{% codeExample 'slash-div-list' %}
  @use "sass:list";
  @use "sass:math";

  .item3 {
    $row: list.slash(span math.div(6, 2), 7);
    grid-row: $row;
  }
  ===
  @use "sass:list"
  @use "sass:math"

  .item3
    $row: list.slash(span math.div(6, 2), 7)
    grid-row: $row
{% endcodeExample %}

{% compatibility 'dart: "1.40.0"', 'libsass: false', 'ruby: false', 'feature: "calc() de primeira classe"' %}{% endcompatibility %}

Alternativamente, os utilizadores podem envolver os operadores de divisão dentro duma expressão de `calc()`, o qual a Sass simplificará para um único número:

{% codeExample 'slash-div-calc', false %}
  // ERRADO, não funcionará nas futuras versões da Sass.
  @debug (12px/4px); // 3

  // CERTO, funcionará nas futuras versões da Sass.
  @debug calc(12px / 4px); // 3
  ===
  // ERRADO, não funcionará nas futuras versões da Sass.
  @debug (12px/4px) // 3

  // CERTO, funcionará nas futuras versões da Sass.
  @debug calc(12px / 4px) // 3
{% endcodeExample %}

## Migração Automática {#automatic-migration}

Tu podes usar [o migrador da Sass][the Sass migrator] para atualizar automaticamente as tuas folhas de estilo para usarem `math.div()` e `list.slash()`.

[the Sass migrator]: https://github.com/sass/migrator#readme

```shellsession
$ npm install -g sass-migrator
$ sass-migrator division **/*.scss
```
