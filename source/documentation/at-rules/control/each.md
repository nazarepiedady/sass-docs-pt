---
title: "@each"
introduction: >
  A regra `@each` torna fácil emitir estilos ou avaliar código para cada elemento duma [lista](/documentation/values/lists) ou cada par dum [mapa][map](/documentation/values/maps)). É excelente para estilos repetitivos que só têm poucas variações entre eles. É normalmente escrito `@each <variable> in <expression> { ... }`, onde a [expressão](/documentation/syntax/structure#expressions) retorna uma lista. O bloco é avaliado para cada elemento da lista como consequência, que é atribuído ao dado nome de variável.
---

{% render 'code_snippets/example-each-list' %}

## Com Mapas {#with-maps}

Tu também podes usar `@each` para iterar sobre cada par de chave e valor num mapa escrevendo `@each <variable>, <variable> in <expression> { ... }`. A chave é atribuída ao primeiro nome de variável, e o elemento é atribuído ao segundo:

{% render 'code_snippets/example-each-map' %}

## Desestruturação {#destructuring}

Se tiveres uma lista de listas, podes usar `@each` para atribuir automaticamente variáveis para cada um dos valores das listas internas escrevendo `@each <variable...> in <expression> { ... }`. Isto é conhecido como *desestruturação*, visto que a variável corresponde a estrutura de listas internas. Cada nome de variável é atribuído ao valor na posição correspondente na lista, ou [`null`][] se a lista não tiver valores suficientes:

[`null`]: /documentation/values/null

{% codeExample 'each' %}
  $icons:
    "eye" "\f112" 12px,
    "start" "\f12e" 16px,
    "stop" "\f12f" 10px;

  @each $name, $glyph, $size in $icons {
    .icon-#{$name}:before {
      display: inline-block;
      font-family: "Icon Font";
      content: $glyph;
      font-size: $size;
    }
  }
  ===
  $icons: "eye" "\f112" 12px, "start" "\f12e" 16px, "stop" "\f12f" 10px




  @each $name, $glyph, $size in $icons
    .icon-#{$name}:before
      display: inline-block
      font-family: "Icon Font"
      content: $glyph
      font-size: $size
{% endcodeExample %}

{% funFact %}
  Uma vez que `@each` suporta desestruturação e [mapas contam como lista de listas][maps count as lists of lists], o suporte de mapa de `@each` funciona sem precisar de suporte especial para mapas em particular.

  [maps count as lists of lists]: /documentation/values/maps
{% endfunFact %}
