---
title: Interpolação
table_of_contents: true
introduction: >
  A interpolação pode ser usada praticamente em qualquer parte numa folha de estilo de Sass para fixar o resultado duma [expressão de SassScript](/documentation/syntax/structure#expressions) em um pedaço de CSS. Apenas envolva uma expressão em `#{}` em alguns dos seguintes lugares:
---

* [Seletores nas Regras de Estilo](/documentation/style-rules#interpolation)

* [Nomes de Propriedade nas Declarações](/documentation/style-rules/declarations#interpolation)

* [Valores de Propriedade Personalizada](/documentation/style-rules/declarations#custom-properties)

* [Regras de CSS que Usam Arroba](/documentation/at-rules/css)

* [`@extend`s](/documentation/at-rules/extend)

* [`@import`s Simples de CSS](/documentation/at-rules/import#plain-css-imports)

* [Sequências de Caracteres Com Aspas ou Sem Aspas](/documentation/values/strings)

* [Funções Especiais](/documentation/syntax/special-functions)

* [Nomes de Função de CSS Simples](/documentation/at-rules/function#plain-css-functions)

* [Comentários Ruidosos](/documentation/syntax/comments)

{% codeExample 'interpolation' %}
  @mixin corner-icon($name, $top-or-bottom, $left-or-right) {
    .icon-#{$name} {
      background-image: url("/icons/#{$name}.svg");
      position: absolute;
      #{$top-or-bottom}: 0;
      #{$left-or-right}: 0;
    }
  }

  @include corner-icon("mail", top, left);
  ===
  @mixin corner-icon($name, $top-or-bottom, $left-or-right)
    .icon-#{$name}
      background-image: url("/icons/#{$name}.svg")
      position: absolute
      #{$top-or-bottom}: 0
      #{$left-or-right}: 0



  @include corner-icon("mail", top, left)
{% endcodeExample %}

## Na SassScript {#in-sassscript}

{% compatibility 'dart: true', 'libsass: false', 'ruby: "4.0.0 (unreleased)"', 'feature: "Sintaxe Moderna"' %}
  A LibSass e a Sass de Ruby atualmente usam uma sintaxe mais antiga para analise de interpolação em SassScript. Para os propósitos mais práticos funciona da mesma maneira, mas pode comportar-se estranhamente em volta dos [operadores][operators]. Consulte [este documento][this document] por detalhes.

  [operators]: /documentation/operators
  [this document]:  https://github.com/sass/sass/blob/main/accepted/free-interpolation.md#old-interpolation-rules
{% endcompatibility %}

A interpolação pode ser usada na SassScript para injetar SassScript para [sequências de caracteres sem aspas][unquoted strings]. Isto é particularmente útil quando geramos os nomes dinamicamente (por exemplo, para animações), ou quando usamos [valores separados por barra][slash-separated values]. Nota que a interpolação na SassScript sempre retornam um sequência de caracteres sem aspas.

[unquoted strings]: /documentation/values/strings#unquoted
[slash-separated values]: /documentation/operators/numeric#slash-separated-values

<!-- Add explicit CSS here to prevent diffs due to the use of unique-id -->

{% codeExample 'interpolation-sass-script' %}
  @mixin inline-animation($duration) {
    $name: inline-#{unique-id()};

    @keyframes #{$name} {
      @content;
    }

    animation-name: $name;
    animation-duration: $duration;
    animation-iteration-count: infinite;
  }

  .pulse {
    @include inline-animation(2s) {
      from { background-color: yellow }
      to { background-color: red }
    }
  }
  ===
  @mixin inline-animation($duration)
    $name: inline-#{unique-id()}

    @keyframes #{$name}
      @content


    animation-name: $name
    animation-duration: $duration
    animation-iteration-count: infinite


  .pulse
    @include inline-animation(2s)
      from
        background-color: yellow
      to
        background-color: red
  ===
  .pulse {
    animation-name: inline-uifpe6h;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }
  @keyframes inline-uifpe6h {
    from {
      background-color: yellow;
    }
    to {
      background-color: red;
    }
  }
{% endcodeExample %}

{% funFact %}
  A interpolação é útil para injeção de valores em sequências de caracteres, mas outro senão este é raramente necessário nas expressões de SassScript. Tu definitivamente *não* precisas disto para apenas usar uma variável num valor de propriedade. Ao invés de escrever `color: #{$accent}`, podes apenas escrever `color: $accent`!
{% endfunFact %}

{% headsUp %}
  É praticamente sempre uma má ideia usar interpolação com números. A interpolação retorna sequências de caracteres sem aspas que não podem ser usadas para nenhuma matemática adiante, e impedi as salvaguardas embutidas da Sass de garantir que as unidades são usadas corretamente.

  A Sass tem poderosa [unidade aritmética][unit arithmetic] que podes usar. Por exemplo, ao invés de escrever `#{$width}px`, escreva `$width * 1px`—ou melhor ainda, declare a variável `$width` em termos de `px` para começar. Desta maneira se `$width` já tem unidades, receberás um boa mensagem de erro ao invés de compilar CSS fictícia.

  [unit arithmetic]: /documentation/values/numbers#units
{% endheadsUp %}

## Sequências de Caracteres Com Aspas {#quoted-strings}

Na maioria dos casos, a interpolação injeta o mesmo exato texto que seria usado se a expressão fosse usada como um [valor de propriedade][property value]. Mas existe uma exceção: as aspas envolta das sequências de caracteres com aspas são removidas (mesmo se estas sequências de caracteres com aspas estiverem em listas). Isto torna possível escrever sequências de caracteres com aspas que contém sintaxe que não é permitida na SassScript (como seletores) e interpole-os em regras de estilo.

[property value]: /documentation/style-rules/declarations

{% codeExample 'quoted-strings' %}
  .example {
    unquoted: #{"string"};
  }
  ===
  .example
    unquoted: #{"string"}
{% endcodeExample %}

{% headsUp %}
  Embora seja tentador usar esta funcionalidade para converter sequências de caracteres com aspas em sequências de caracteres sem aspas, é muito mais claro usar a [função `string.unquote()`][`string.unquote()` function]. No lugar de `#{$string}`, escreva `string.unquote($string)`!

  [`string.unquote()` function]: /documentation/modules/string#unquote
{% endheadsUp %}
