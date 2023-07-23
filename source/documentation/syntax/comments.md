---
title: Comentários
introduction: >
  A maneira que os comentários de Sass funcionam difere substancialmente entre a SCSS e a sintaxe indentada. Ambas sintaxes suportam dois tipos de comentários: comentários definidos usando `/* */` que são (usualmente) compilados para CSS, e os comentários definidos usando `//` que não são compilados.
---

## Na SCSS {#in-scss}

Os comentários na SCSS funcionam de maneira parecida aos comentários em outras linguagens como JavaScript. Os **comentários de uma linha** começam com `//`, e seguem até o final da linha. Nada num comentário de uma linha é emitido como CSS; no que diz respeito a Sass, eles podem também não existir. Também são chamados de **comentários silenciosos**, porque não produzem nenhum CSS.

Os **comentários de várias linhas** começam com `/*` e terminam no próximo `*/`. Se um comentário de várias linhas for escrito em algum lugar que uma [declaração][statement] é permitida, é compilado para um comentário de CSS. Também são chamados de **comentário ruidoso**, em contrapartida com os comentários silenciosos. Um comentário de várias linhas que é compilado para CSS pode conter [interpolação][interpolation], que será avaliada entes de comentário ser compilado.

Por padrão, os comentários de várias linhas serão arrancados da CSS compilada no [modo comprimido][compressed mode]. Se um comentário começar com `/*!`, sempre será incluído na saída de CSS:

[statement]: /documentation/syntax/structure#statements
[interpolation]: /documentation/interpolation
[compressed mode]: /documentation/cli/dart-sass/#style

{% codeExample 'scss-comment', true, 'scss' %}
  // Este comentário não será incluído na CSS.

  /* Mas este comentário será, exceto no modo comprimido. */

  /* Ele também pode conter interpolação:
   * 1 + 1 = #{1 + 1} */

  /*! Este comentário será incluído mesmo no modo comprimido. */

  p /* Os comentários de várias linhas podem ser escritos em qualquer parte
     * espaço em branco é permitido. */ .sans {
    font: Helvetica, // Os comentários de uma linha também podem.
          sans-serif;
  }
{% endcodeExample %}

## Na Sass {#in-sass}

Os comentários na sintaxe indentada funcionam um pouco diferente: são baseado em indentação, tal como o resto da sintaxe. Como a SCSS, os comentários silenciosos escritos com `//` nunca são emitidos como CSS, mas ao contrário da SCSS tudo indentado sob a `//` de abertura também é comentado.

Os comentários da sintaxe indentada que começam com `/*` funciona com indentação da mesma maneira, exceto que são compilados para CSS. Uma vez que a alcance do comentário é baseado na indentação, o `*/` de fechamento é opcional. Também como a SCSS, os comentários de `/*` podem conter [interpolação][interpolation] e podem começar com `/*!` para evitar serem arrancados no modo comprimido.

Os comentários também podem ser usados dentro de [expressões][expressions] na sintaxe indentada. Neste caso, têm exatamente a mesma sintaxe como fazem na SCSS:

[interpolation]: /documentation/interpolation
[expressions]: /documentation/syntax/structure#expressions

{% codeExample 'sass-comment', true, 'sass' %}
  // Este comentário não será incluída na CSS.
     Isto também é comentado.

  /* Mas este comentário será, exceto no modo comprimido.

  /* Ele também pode conter interpolação:
     1 + 1 = #{1 + 1}

  /*! Este comentário será incluído mesmo no modo comprimido.

  p .sans
    font: Helvetica, /* Comentários em linha devem ser fechados. */ sans-serif
<% end %>

## Comentários de Documentação {#documentation-comments}

Quando escreveres bibliotecas de estilo usando a Sass, podes usar comentários para documentar as [misturas][mixins], [funções][functions], [variáveis][variables], e [seletores de espaço reservado][placeholder selectors] que a tua biblioteca fornece, bem como a própria biblioteca. Estes comentários são lidos pela ferramenta [SassDoc][], que usa-os para gerar documentação bonita. Consulte a documentação do [motor de grade da Susy][susy] para vê-la em ação!

[mixins]: /documentation/at-rules/mixin
[functions]: /documentation/at-rules/function
[variables]: /documentation/variables
[placeholder selectors]: /documentation/style-rules/placeholder-selectors
[SassDoc]: http://sassdoc.com
[susy]: http://oddbird.net/susy/docs/index.html

Os comentários de documentação são comentários silenciosos, escritos com três barras (`///`) diretamente acima daquilo que estiveres a documentar. A SassDoc analisa o texto nos comentários como [Markdown][], e suporta muitas [anotações][annotations] úteis para descrevê-lo em detalhes:

[Markdown]: https://www.markdownguide.org/getting-started
[annotations]: http://sassdoc.com/annotations/

{% codeExample 'documentation-comment' %}
  /// Computes an exponent.
  ///
  /// @param {number} $base
  ///   The number to multiply by itself.
  /// @param {integer (unitless)} $exponent
  ///   The number of `$base`s to multiply together.
  /// @return {number} `$base` to the power of `$exponent`.
  @function pow($base, $exponent) {
    $result: 1;
    @for $_ from 1 through $exponent {
      $result: $result * $base;
    }
    @return $result;
  }
  ===
  /// Computes an exponent.
  ///
  /// @param {number} $base
  ///   The number to multiply by itself.
  /// @param {integer (unitless)} $exponent
  ///   The number of `$base`s to multiply together.
  /// @return {number} `$base` to the power of `$exponent`.
  @function pow($base, $exponent)
    $result: 1
    @for $_ from 1 through $exponent
      $result: $result * $base

    @return $result
{% endcodeExample %}
