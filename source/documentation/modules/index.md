---
title: Módulos Embutidos
eleventyComputed:
  before_introduction: >
    {% render 'doc_snippets/built-in-module-status' %}
introduction: >
  A Sass fornece muitos módulos embutidos os quais contém funções úteis (e a mistura ocasional). Estes módulos podem ser carregados com a [regra `@use`](/documentation/at-rules/use) como qualquer folha de estilo definida pelo utilizador, e suas funções podem ser chamadas [como qualquer outro membro do módulo](/documentation/at-rules/use#loading-members). Todas as URLs de módulo embutido começam com `sass:` to indicar que são parte da própria Sass.
overview: true
---

{% headsUp %}
  Antes do sistema de módulo da Sass ser introduzido, todas as funções de Sass estavam disponíveis globalmente o tempo todo. Muitas funções continuam a ter pseudónimo global (estas são listas nas suas documentações). A equipa da Sass desencoraja o seu uso e eventualmente as depreciará, mas por agora continuam disponíveis por questões de compatibilidade com versões de Sass mais antigas e com a LibSass (que ainda não suporta o sistema de módulo).

  [Algumas funções][A few functions] *apenas* estão disponíveis globalmente até mesmo no novo sistema de módulo, seja porque tem comportamento de avaliação especial ([`if()`][]) ou porque adicionam comportamento adicional sobre as funções de CSS embutidas ([`rgb()`][] e [`hsl()`][]). Estas não serão depreciadas e podem ser usadas livremente.

  [a few functions]: #global-functions
  [`if()`]: #if
  [`rgb()`]: #rgb
  [`hsl()`]: #hsl
{% endheadsUp %}

{% codeExample 'modules' %}
  @use "sass:color";

  .button {
    $primary-color: #6b717f;
    color: $primary-color;
    border: 1px solid color.scale($primary-color, $lightness: 20%);
  }
  ===
  @use "sass:color"

  .button
    $primary-color: #6b717f
    color: $primary-color
    border: 1px solid color.scale($primary-color, $lightness: 20%)
{% endcodeExample %}

A Sass fornece os seguintes módulos embutidos:

* O [módulo `sass:math`][`sass:math` module] fornece funções que operam sobre os [números][numbers].

* O [módulo `sass:string`][`sass:string` module] que torna fácil combinar, procurar, ou dividir [sequências de caracteres][strings].

* O [módulo `sass:color`][`sass:color` module] gera novas [cores][colors] baseadas naquelas que existem, tornando fácil construir temas de color.

* O [módulo `sass:list`][`sass:list` module] permite-te acessar e modificar valores em [listas][lists].

* O [módulo `sass:map`][`sass:map` module] torna possível procurar o valor associado com uma chave num [mapa][map], e muito mais.

* O [módulo `sass:seletor`] fornece acesso ao poderoso motor de seletor da Sass.

* O [módulo `sass:meta`][`sass:meta` module] expõe os detalhes do funcionamento interno da Sass.

[`sass:math` module]: /documentation/modules/math
[numbers]: /documentation/values/numbers
[`sass:string` module]: /documentation/modules/string
[strings]: /documentation/values/strings
[`sass:color` module]: /documentation/modules/color
[colors]: /documentation/values/colors
[`sass:list` module]: /documentation/modules/list
[lists]: /documentation/values/lists
[`sass:map` module]: /documentation/modules/map
[map]: /documentation/values/maps
[`sass:selector` module]: /documentation/modules/selector
[`sass:meta` module]: /documentation/modules/meta

## Funções Globais {#global-functions}

{% function 'hsl($hue $saturation $lightness)', 'hsl($hue $saturation $lightness / $alpha)', 'hsl($hue, $saturation, $lightness, $alpha: 1)', 'hsla($hue $saturation $lightness)', 'hsla($hue $saturation $lightness / $alpha)', 'hsla($hue, $saturation, $lightness, $alpha: 1)', 'returns:color' %}
  {% compatibility 'dart: "1.15.0"', 'libsass: false', 'ruby: false', 'feature: "Sintaxe de Nível 4"' %}
    A LibSass e Sass de Ruby apenas suportam as seguintes assinaturas:

    * `hsl($hue, $saturation, $lightness)`
    * `hsla($hue, $saturation, $lightness, $alpha)`

    Nota que para estas implementações, o argumento `$alpha` é *obrigatório* se o nome de função `hsla()` for usado, e *proibido* se o nome de função `hsl()` for usado.
  {% endcompatibility %}

  {% compatibility 'dart: true', 'libsass: false', 'ruby: "3.7.0"', 'feature: "Alfa Por Cento"' %}
    A LibSass e versões mais antigas da Sass de Ruby não suportam valores de alfa especificado como percentagens.
  {% endcompatibility %}

  Retorna um cor com o dado [tonalidade, saturação, e claridade][hue, saturation, and lightness] e o dado canal de alfa.

  [hue, saturation, and lightness]: https://en.wikipedia.org/wiki/HSL_and_HSV

  A tonalidade é um número entre `0deg` e `360deg` (inclusivo) e pode estar sem unidade. A saturação e claridade são números entre `0%` e `100%` (inclusivo) e não pode estar sem unidade. O canal de alfa pode ser especificado como seja um número sem unidade entre 0 e 1 (inclusivo), ou como uma percentagem entre `0%` e `100%` (inclusivo).


  {% funFact %}
    Tu podes passar [funções especiais][special functions] como `calc()` ou `var()` no lugar de qualquer argumento para `hsl()`. Tu podes até mesmo usar `var()` no lugar de vários argumentos, já que poderia ser substituída por vários valores! Quando uma função de cor é chamada desta maneira, retorna uma sequência de caracteres sem aspas usando a mesma assinatura com qual foi chamada.

    [special functions]: /documentation/syntax/special-functions

    {% codeExample 'hsl-special', false %}
      @debug hsl(210deg 100% 20% / var(--opacity)); // hsl(210deg 100% 20% / var(--opacity))
      @debug hsla(var(--peach), 20%); // hsla(var(--peach), 20%)
      ===
      @debug hsl(210deg 100% 20% / var(--opacity))  // hsl(210deg 100% 20% / var(--opacity))
      @debug hsla(var(--peach), 20%)  // hsla(var(--peach), 20%)
    {% endcodeExample %}
  {% endfunFact %}

  {% headsUp %}
    As [regras de analise especiais][special parsing rules] da Sass para valores separados por barra torna difícil passar variáveis para `$lightness` ou `$alpha` quando usas a assinatura `hsl($hue $saturation $lightness / $alpha)`. Ao invés disto considere usar `hsl($hue, $saturation, $lightness, $alpha)`.

    [special parsing rules]: /documentation/operators/numeric#slash-separated-values
  {% endheadsUp %}

  {% codeExample 'hsl', false %}
    @debug hsl(210deg 100% 20%); // #036
    @debug hsl(34, 35%, 92%); // #f2ece4
    @debug hsl(210deg 100% 20% / 50%); // rgba(0, 51, 102, 0.5)
    @debug hsla(34, 35%, 92%, 0.2); // rgba(242, 236, 228, 0.2)
    ===
    @debug hsl(210deg 100% 20%) // #036
    @debug hsl(34, 35%, 92%) // #f2ece4
    @debug hsl(210deg 100% 20% / 50%)  // rgba(0, 51, 102, 0.5)
    @debug hsla(34, 35%, 92%, 0.2)  // rgba(242, 236, 228, 0.2)
  {% endcodeExample %}
{% endfunction %}


{% function 'if($condition, $if-true, $if-false)' %}
  Retorna `$if-true` se a `$condition` for [verdadeira][truthy], e de outro modo `$if-false`.

  Esta função é especial de tal maneira que nem avalia o argumento que não é retornado, então é seguro chamar mesmo se o argumento que não é usado lançaria um erro.

  [truthy]: /documentation/at-rules/control/if#truthiness-and-falsiness

  {% codeExample 'debug', false %}
    @debug if(true, 10px, 15px); // 10px
    @debug if(false, 10px, 15px); // 15px
    @debug if(variable-defined($var), $var, null); // null
    ===
    @debug if(true, 10px, 15px)  // 10px
    @debug if(false, 10px, 15px)  // 15px
    @debug if(variable-defined($var), $var, null)  // null
  {% endcodeExample %}
{% endfunction %}


{% function 'rgb($red $green $blue)', 'rgb($red $green $blue / $alpha)', 'rgb($red, $green, $blue, $alpha: 1)', 'rgb($color, $alpha)', 'rgba($red $green $blue)', 'rgba($red $green $blue / $alpha)', 'rgba($red, $green, $blue, $alpha: 1)', 'rgba($color, $alpha)', 'returns:color' %}
  {% compatibility 'dart: "1.15.0"', 'libsass: false', 'ruby: false', 'feature: "Sintaxe de Nível 4"' %}
    A LibSass e Sass de Ruby apenas suportam as seguintes assinaturas:

    * `rgb($red, $green, $blue)`
    * `rgba($red, $green, $blue, $alpha)`
    * `rgba($color, $alpha)`

    Nota que para estas implementações, o argumento `$alpha` é *obrigatório* se o nome de função `rgba()` for usado, e *proibido* se o nome de função `rgb()` for usado.
  {% endcompatibility %}

  {% compatibility 'dart: true', 'libsass: false', 'ruby: "3.7.0"', 'feature: "Alfa Por Cento"' %}
    A LibSass e versões mais antigas da Sass de Ruby não suportam valores de alfa especificados como percentagens.
  {% endcompatibility %}

  Se `$red`, `$green`, `$blue`, e opcionalmente `$alpha` forem passados, retorna uma cor com os dados canais de vermelho, verde, azul, e alfa.

  Cada canal pode ser especificado ou como um número [sem unidade][unitless] entre 0 e 255 (inclusivo), ou uma percentagem entre `0%` e `100%` (inclusive). O canal de alfa pode ser especificado ou como um número sem unidade entre 0 e 1 (inclusivo), ou uma percentagem entre `0%` e `100%` (inclusivo).

  [unitless]: /documentation/values/numbers#units

  {% funFact %}
    Tu podes passar [funções especiais][special functions] como `calc()` ou `var()` no lugar de qualquer argumento para `rgb()`. Tu podes até mesmo usar `var()` no lugar de vários argumentos, já que poderia ser substituída por vários valores! Quando uma função de cor é chamada desta maneira, retorna uma sequência de caracteres sem aspas usando a mesma assinatura com qual foi chamada.

    [special functions]: /documentation/syntax/special-functions

    {% codeExample 'rgb-special', false %}
      @debug rgb(0 51 102 / var(--opacity)); // rgb(0 51 102 / var(--opacity))
      @debug rgba(var(--peach), 0.2); // rgba(var(--peach), 0.2)
      ===
      @debug rgb(0 51 102 / var(--opacity))  // rgb(0 51 102 / var(--opacity))
      @debug rgba(var(--peach), 0.2)  // rgba(var(--peach), 0.2)
    {% endcodeExample %}
  {% endfunFact %}

  {% headsUp %}
    As [regras de analise especiais][special parsing rules] da Sass para valores separados por barra torna difícil passar variáveis para `$blue` ou `$alpha` quando usas a assinatura `rgb($red $green $blue / $alpha)`. Ao invés disto considere usar `rgb($red, $green, $blue, $alpha)`.

    [special parsing rules]: /documentation/operators/numeric#slash-separated-values
  {% endheadsUp %}

  {% codeExample 'rgb', false %}
    @debug rgb(0 51 102); // #036
    @debug rgb(95%, 92.5%, 89.5%); // #f2ece4
    @debug rgb(0 51 102 / 50%); // rgba(0, 51, 102, 0.5)
    @debug rgba(95%, 92.5%, 89.5%, 0.2); // rgba(242, 236, 228, 0.2)
    ===
    @debug rgb(0 51 102)  // #036
    @debug rgb(95%, 92.5%, 89.5%)  // #f2ece4
    @debug rgb(0 51 102 / 50%)  // rgba(0, 51, 102, 0.5)
    @debug rgba(95%, 92.5%, 89.5%, 0.2)  // rgba(242, 236, 228, 0.2)
  {% endcodeExample %}

  ---

  Se `$color` e `$alpha` forem passados, este retorna `$color` com o dado canal `$alpha` ao invés do seu canal alfa original.

  {% codeExample 'color-and-alpha', false %}
    @debug rgb(#f2ece4, 50%); // rgba(242, 236, 228, 0.5);
    @debug rgba(rgba(0, 51, 102, 0.5), 1); // #003366
    ===
    @debug rgb(#f2ece4, 50%)  // rgba(242, 236, 228, 0.5)
    @debug rgba(rgba(0, 51, 102, 0.5), 1)  // #003366
  {% endcodeExample %}
{% endfunction %}
