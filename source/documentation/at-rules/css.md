---
title: Regras de Arroba da CSS
table_of_contents: true
---

{% compatibility 'dart: "1.15.0"', 'libsass: false', 'ruby: false', 'feature: "Interpolação do Nome"' %}
  A LibSas, Sass de Ruby, e versões mais antigas da Sass de Dart não suportam [interpolação][interpolation] nos nomes das regras que usam arroba. Elas suportam interpolação nos valores.

  [interpolation]: /documentation/interpolation
{% endcompatibility %}

A Sass suporta todas as regras de arroba que são parte da própria CSS. Para continuar flexível e compatível com as versões do futuro da CSS, a Sass tem suporte geral que cobre quase todas as regras de arroba por padrão. Um regra de arroba de CSS é escrito como `@<name> <value>`, `@<name> { ... }`, ou `@<name> <value> { ... }`. O nome deve ser um identificador, e o valor (se existir um) pode ser mais ou menos qualquer coisa. Tanto o nome e o valor podem conter [interpolação][interpolation]:

[interpolation]: /documentation/interpolation

{% codeExample 'css' %}
  @namespace svg url(http://www.w3.org/2000/svg);

  @font-face {
    font-family: "Open Sans";
    src: url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2");
  }

  @counter-style thumbs {
    system: cyclic;
    symbols: "\1F44D";
  }
  ===
  @namespace svg url(http://www.w3.org/2000/svg)

  @font-face
    font-family: "Open Sans"
    src: url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2")

  @counter-style thumbs
    system: cyclic
    symbols: "\1F44D"
{% endcodeExample %}

Se uma regra de arroba da CSS estiver encaixada dentro duma regra de estilo, as duas trocam automaticamente de posição para que a regra de arroba esteja no alto nível da saída de CSS e a regra de estilo esteja dentro dela. Isto torna fácil adicionar estilização condicional sem ter de reescrever o seletor da regra de estilo:

{% codeExample 'nested-css-at-rule' %}
  .print-only {
    display: none;

    @media print { display: block; }
  }
  ===
  .print-only
    display: none

    @media print
      display: block
{% endcodeExample %}

## `@media` {#media}

{% compatibility 'dart: "1.11.0"', 'libsass: false', 'ruby: "3.7.0"', 'feature: "Sintaxe de Limite"' %}
  A LibSass e versões mais antigas da Sass de Dart e Ruby não suportam consultas de media com funcionalidades escritas num [contexto de limite][range context]. Elas suportam outros padrão de consultas de media:

  [range context]: https://www.w3.org/TR/mediaqueries-4/#mq-range-context

  {% codeExample 'range-syntax' %}
    @media (width <= 700px) {
      body {
        background: green;
      }
    }
    ===
    @media (width <= 700px)
      body
        background: green
  {% endcodeExample %}
{% endcompatibility %}

A [regra `@media`][`@media` rule] faz tudo de cima e mais. Além de permitir interpolação, permite [expressões de SassScript][SassScript expressions] seja usada diretamente nas [consultas de funcionalidades][feature queries]:

[`@media` rule]: https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries
[SassScript expressions]: /documentation/syntax/structure#expressions
[feature queries]: https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#Targeting_media_features

{% codeExample 'media-rule' %}
  $layout-breakpoint-small: 960px;

  @media (min-width: $layout-breakpoint-small) {
    .hide-extra-small {
      display: none;
    }
  }
  ===
  $layout-breakpoint-small: 960px

  @media (min-width: $layout-breakpoint-small)
    .hide-extra-small
      display: none
{% endcodeExample %}

Quando possível, a Sass também combinará as consultas de media que são encaixadas dentro de umas das outras para facilitar o suporte de navegadores que ainda não suportam de maneira nativa as regras de `@media` encaixadas:

{% codeExample 'merge-media-queries' %}
  @media (hover: hover) {
    .button:hover {
      border: 2px solid black;

      @media (color) {
        border-color: #036;
      }
    }
  }
  ===
  @media (hover: hover)
    .button:hover
      border: 2px solid black

      @media (color)
        border-color: #036
{% endcodeExample %}

## `@supports` {#supports}

A [regra `@supports`][`@supports` rule] também permite que [expressões de SassScript][SassScript expressions] sejam usadas nas consultas de declaração:

[SassScript expressions]: /documentation/syntax/structure#expressions
[`@supports` rule]: https://developer.mozilla.org/en-US/docs/Web/CSS/@supports

{% codeExample 'support-at-rule' %}
  @mixin sticky-position {
    position: fixed;
    @supports (position: sticky) {
      position: sticky;
    }
  }

  .banner {
    @include sticky-position;
  }
  ===
  @mixin sticky-position
    position: fixed
    @supports (position: sticky)
      position: sticky



  .banner
    @include sticky-position
{% endcodeExample %}

## `@keyframes` {#keyframes}

A [regra `@keyframes`][`@keyframes` rule] funciona como uma regra de arroba normal, exceto que suas regras filho devem ser regras de `keyframe` válidas (`<number>%`, `from`, ou `to`) no lugar de seletores normais:

[`@keyframes` rule]: https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes

{% codeExample 'keyframes' %}
  @keyframes slide-in {
    from {
      margin-left: 100%;
      width: 300%;
    }

    70% {
      margin-left: 90%;
      width: 150%;
    }

    to {
      margin-left: 0%;
      width: 100%;
    }
  }
  ===
  @keyframes slide-in
    from
      margin-left: 100%
      width: 300%


    70%
      margin-left: 90%
      width: 150%


    to
      margin-left: 0%
      width: 100%
{% endcodeExample %}
