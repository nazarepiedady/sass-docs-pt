---
title: "null"
introduction: >
  O valor `null` é o único valor do seu tipo. Ele representa a ausência de um valor, e é frequentemente retornado pelas [funções](/documentation/at-rules/function) para indicar a falta de um resultado.
---

{% codeExample 'null', false %}
  @use "sass:map";
  @use "sass:string";

  @debug string.index("Helvetica Neue", "Roboto"); // null
  @debug map.get(("large": 20px), "small"); // null
  @debug &; // null
  ===
  @use "sass:map"
  @use "sass:string"

  @debug string.index("Helvetica Neue", "Roboto")  // null
  @debug map.get(("large": 20px), "small")  // null
  @debug &  // null
{% endcodeExample %}

Se um [lista][list] conter um `null`, este `null` é omitido da CSS gerada.

[list]: /documentation/values/lists

{% codeExample 'null-lists' %}
  $fonts: ("serif": "Helvetica Neue", "monospace": "Consolas");

  h3 {
    font: 18px bold map-get($fonts, "sans");
  }
  ===
  $fonts: ("serif": "Helvetica Neue", "monospace": "Consolas")

  h3
    font: 18px bold map-get($fonts, "sans")
{% endcodeExample %}

Se um valor de propriedade for `null`, esta propriedade é omitida completamente.

{% codeExample 'null-value-omitted' %}
  $fonts: ("serif": "Helvetica Neue", "monospace": "Consolas");

  h3 {
    font: {
      size: 18px;
      weight: bold;
      family: map-get($fonts, "sans");
    }
  }
  ===
  $fonts: ("serif": "Helvetica Neue", "monospace": "Consolas")

  h3
    font:
      size: 18px
      weight: bold
      family: map-get($fonts, "sans")
{% endcodeExample %}

`null` também é [*falso*][*falsey*], o que significa que conta como `false` para quaisquer regras ou [operadores][operators] que recebem booleanos. Isto torna fácil usar valores que podem ser `null` como condições para [`@if`][] e [`if()`][]:

[*falsey*]: /documentation/at-rules/control/if#truthiness-and-falsiness
[operators]: /documentation/operators/boolean
[`@if`]: /documentation/at-rules/control/if
[`if()`]: /documentation/modules#if

{% render 'code_snippets/example-if-parent-selector' %}
