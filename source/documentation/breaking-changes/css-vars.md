---
title: "Mudança de Rutura: Sintaxe de Variável de CSS"
introduction: >
  As versões mais antigas de LibSass e Sass de Ruby analisavam as declarações de propriedade personalizada tal como qualquer outra declaração de propriedade, permitindo a gama completa de [expressões de SassScript](/documentation/syntax/structure#expressions) como valores. Mas isto não era compatível com a CSS.
---

{% compatibility 'dart: true', 'libsass: "3.5.0"', 'ruby: "3.5.0"' %}{% endcompatibility %}

A especificação da CSS permite quase quaisquer caracteres de sequência de caracteres sejam usadas numa declaração de propriedade personalizada. Embora estes valores possam não ser importantes para qualquer propriedade de CSS, poderiam ser acessados através da JavaScript. Quando eram analisados como valores de SassScript, a sintaxe que teria sido CSS simples válida falha na analise. Por exemplo, a [Biblioteca Polymer][Polymer library] usava isto para suportar misturas de CSS simples:

[Polymer library]: https://polymer-library.polymer-project.org/3.0/docs/devguide/custom-css-properties#use-custom-css-mixins

{% codeExample 'css-vars', true, 'scss' %}
  :root {
    --flex-theme: {
      border: 1px solid var(--theme-dark-blue);
      font-family: var(--theme-font-family);
      padding: var(--theme-wide-padding);
      background-color: var(--theme-light-blue);
    };
  }
{% endcodeExample %}

Para fornecer a compatibilidade máxima com a CSS simples, versões mais recentes da Sass exigem que as expressões de SassScript em valores de propriedade personalizada sejam escritos dentro de [interpolação](/documentation/interpolation). A interpolação também funcionará para versões mais antigas da Sass, e assim é recomendado para todas as folhas de estilo:

{% codeExample 'css-vars-interpolation' %}
  $accent-color: #fbbc04;

  :root {
    // ERRADO, não funcionará em versões mais recentes da Sass.
    --accent-color-wrong: $accent-color;

    // CERTO, funcionará em todas as versões da Sass.
    --accent-color-right: #{$accent-color};
  }
  ===
  $accent-color: #fbbc04

  :root
    // ERRADO, não funcionará em versões mais recentes da Sass.
    --accent-color-wrong: $accent-color

    // CERTO, funcionará em todas as versões da Sass.
    --accent-color-right: #{$accent-color}
{% endcodeExample %}

{% headsUp %}
  Uma vez que a interpolação remove os sinais de aspas das sequências de caracteres entre aspas, pode ser necessário envolvê-las numa [função `meta.inspect()`][`meta.inspect()` function] para preservar as suas aspas:

  [`meta.inspect()` function]: /documentation/modules/meta#inspect

  {% codeExample 'css-vars-heads-up' %}
    @use "sass:meta";

    $font-family-monospace: Menlo, Consolas, "Courier New", monospace;

    :root {
      --font-family-monospace: #{meta.inspect($font-family-monospace)};
    }
    ===
    @use "sass:meta"

    $font-family-monospace: Menlo, Consolas, "Courier New", monospace

    :root
      --font-family-monospace: #{meta.inspect($font-family-monospace)}
  {% endcodeExample %}
{% endheadsUp %}
