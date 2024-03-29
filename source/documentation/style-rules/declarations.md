---
title: Declarações de Propriedade
table_of_contents: true
introduction: >
  Na Sass assim como na CSS, as declarações de propriedade definem como os elementos que correspondem um seletor são estilizados. Porém a Sass adiciona funcionalidades adicionais para torná-las mais fáceis de escrever e automatizar. Antes de mais, um valor da declaração pode ser qualquer [expressão de SassScript](/documentation/syntax/structure#expressions), que será avaliada e incluída no resultado.
---

{% codeExample 'declaration' %}
  .circle {
    $size: 100px;
    width: $size;
    height: $size;
    border-radius: $size * 0.5;
  }
  ===
  .circle
    $size: 100px
    width: $size
    height: $size
    border-radius: $size * 0.5
{% endcodeExample %}

## Interpolação {#interpolation}

Um nome de propriedade pode incluir [interpolação][interpolation], o que torna possível gerar dinamicamente as propriedades quando necessário. Tu podes mesmo interpolar o nome da propriedade inteira!

[interpolation]: /documentation/interpolation

{% codeExample 'interpolation' %}
  @mixin prefix($property, $value, $prefixes) {
    @each $prefix in $prefixes {
      -#{$prefix}-#{$property}: $value;
    }
    #{$property}: $value;
  }

  .gray {
    @include prefix(filter, grayscale(50%), moz webkit);
  }
  ===
  @mixin prefix($property, $value, $prefixes)
    @each $prefix in $prefixes
      -#{$prefix}-#{$property}: $value

    #{$property}: $value


  .gray
    @include prefix(filter, grayscale(50%), moz webkit)
{% endcodeExample %}

## Encaixamento {#nesting}

Muitas propriedades de CSS começam com o mesmo prefixo que agem como tipo de espaço de nome. Por exemplo, `font-family`, `font-size`, e `font-weight` todas começam com `font-`. A Sass torna isto mais fácil e menos redundante permitindo que as declarações de propriedade sejam encaixadas. Os nomes da propriedade externa são adicionados à interna, separados por um hífen:

{% codeExample 'nesting' %}
  .enlarge {
    font-size: 14px;
    transition: {
      property: font-size;
      duration: 4s;
      delay: 2s;
    }

    &:hover { font-size: 36px; }
  }
  ===
  .enlarge
    font-size: 14px
    transition:
      property: font-size
      duration: 4s
      delay: 2s

    &:hover
      font-size: 36px
{% endcodeExample %}

Algumas destas propriedades de CSS têm versões abreviadas que usam o espaço de nome de acordo com nome da propriedade. Para estas, podes escrever ambos valor abreviado *e* as versões encaixadas mais explícitas:

{% codeExample 'nesting-shorthand' %}
  .info-page {
    margin: auto {
      bottom: 10px;
      top: 2px;
    }
  }
  ===
  .info-page
    margin: auto
      bottom: 10px
      top: 2px
{% endcodeExample %}

## Declarações Escondidas {#hidden-declarations}

Algumas vezes só queres que uma declaração de propriedade apareça por algum tempo. Se o valor de uma declaração for [`null`][] ou [sequência de caracteres sem aspas][unquoted string] vazia, a Sass não compilará esta declaração para o CSS:

[`null`]: /documentation/values/null
[unquoted string]: /documentation/values/strings#unquoted

{% codeExample 'hidden-declarations' %}
  $rounded-corners: false;

  .button {
    border: 1px solid black;
    border-radius: if($rounded-corners, 5px, null);
  }
  ===
  $rounded-corners: false

  .button
    border: 1px solid black
    border-radius: if($rounded-corners, 5px, null)
{% endcodeExample %}

## Propriedades Personalizadas {#custom-properties}

{% compatibility 'dart: true', 'libsass: "3.5.0"', 'ruby: "3.5.0"', 'feature: "Sintaxe de SassScript"' %}
  As versões mais antigas de LibSass e Sass de Ruby analisavam as declarações de propriedade personalizadas tal como qualquer outra declaração de propriedade, permitindo a gama completa de expressões de SassScript como valores. Mesmo quando usares estas versões, é recomendado que uses a interpolação para injetar os valores de SassScript para compatibilidade para a frente.

  Consulte [a página de mudança de rutura][the breaking change page] por mais detalhes.

  [the breaking change page]: /documentation/breaking-changes/css-vars
{% endcompatibility %}

As [propriedades personalizadas de CSS][CSS custom properties], também conhecidas como variáveis de CSS, tem uma sintaxe de declaração invulgar: elas permitem praticamente qualquer texto valores das suas declarações. Além disto, estes valores são acessíveis ao JavaScript, então qualquer valor pode potencialmente ser relevante para o utilizador. Isto inclui valores que normalmente seriam analisados como SassScript.

[CSS Custom Properties]: https://developer.mozilla.org/en-US/docs/Web/CSS/--*

Por causa disto, a Sass analisa as declarações de propriedade personalizada de maneira diferente de outras declarações de propriedade. Todas as fichas, incluindo aqueles que se parecem com a SassScript, são passadas para CSS como são. A única exceção é [interpolação][interpolation], que é a única maneira de injetar valores dinâmicos para uma propriedade personalizada.

[interpolation]: /documentation/interpolation

{% codeExample 'custom-properties' %}
  $primary: #81899b;
  $accent: #302e24;
  $warn: #dfa612;

  :root {
    --primary: #{$primary};
    --accent: #{$accent};
    --warn: #{$warn};

    // Muito embora isto se pareça com uma variável de Sass,
    // é CSS válida então não é avaliada.
    --consumed-by-js: $primary;
  }
  ===
  $primary: #81899b
  $accent: #302e24
  $warn: #dfa612

  :root
    --primary: #{$primary}
    --accent: #{$accent}
    --warn: #{$warn}

    // Muito embora isto se pareça com uma variável de Sass,
    // é CSS válida então não é avaliada.
    --consumed-by-js: $primary
{% endcodeExample %}

{% headsUp %}
  Infelizmente, [interpolação][interpolation] remove as aspas das sequências de caracteres, o que a torna difícil usar sequências de caracteres com aspas como valores para propriedades personalizadas quando vêm das variáveis de Sass. Como uma maneira de dar a volta a isto, podes usar a [função `meta.inspect()`][`meta.inspect()` function] para preservar as aspas:

  [interpolation]: /documentation/interpolation
  [`meta.inspect()` function]: /documentation/modules/meta#inspect

  {% codeExample 'custom-properties-strings-meta' %}
    @use "sass:meta";

    $font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
    $font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas;

    :root {
      --font-family-sans-serif: #{meta.inspect($font-family-sans-serif)};
      --font-family-monospace: #{meta.inspect($font-family-monospace)};
    }
    ===
    @use "sass:meta"

    $font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto
    $font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas

    :root
      --font-family-sans-serif: #{meta.inspect($font-family-sans-serif)}
      --font-family-monospace: #{meta.inspect($font-family-monospace)}
  {% endcodeExample %}
{% endheadsUp %}
