---
title: sass:color
---

{% render 'doc_snippets/built-in-module-status' %}

{% capture color_adjust %}
  color.adjust($color,
    $red: null, $green: null, $blue: null,
    $hue: null, $saturation: null, $lightness: null,
    $whiteness: null, $blackness: null,
    $alpha: null)
{% endcapture %}

{% function color_adjust, 'adjust-color(...)', 'returns:color' %}
  {% compatibility 'dart: "1.28.0"', 'libsass: false', 'ruby: false', 'feature: "$whiteness and $blackness"' %}{% endcompatibility %}

  Aumenta ou diminui um ou mais propriedades da `$color` por quantidades fixas.

  Adiciona o valor passado para cada argumento de palavra-chave para a propriedade correspondente da cor, e retorna a cor ajustada. É um erro especificar uma propriedade de RGB (`$red`, `$green`, e ou `$blue`) ao mesmo tempo como uma propriedade de HSL (`$hue`, `$saturation`, e ou `$lightness`), ou nenhum destes ao mesmo tempo como uma propriedade de [HWB][] (`$hue`, `$whiteness`, e ou `$blackness`).

  [HWB]: https://en.wikipedia.org/wiki/HWB_color_model

  Todos os argumentos opcionais devem ser números. Os argumentos `$red`, `$green`, e `$blue` devem estar [sem unidade][unitless] e entre -255 e 255 (inclusivo). O argumento `$hue` deve ter ou a unidade `deg` ou nenhuma unidade. Os argumentos `$saturation`, `$lightness`, `$whiteness`, e `$blackness` devem estar entre `-100%` e `100%` (inclusivo), e pode não ter unidade. O argumento `$alpha` deve estar sem unidade e entre -1 e 1 (inclusivo).

  [unitless]: /documentation/values/numbers#units

  Consulte também:

  * [`color.scale()`](#scale) para escalar de maneira fluida as propriedades duma cor.
  * [`color.change()`](#change) para definir as propriedades duma cor.

  {% codeExample 'adjust-color', false %}
    @debug color.adjust(#6b717f, $red: 15); // #7a717f
    @debug color.adjust(#d2e1dd, $red: -10, $blue: 10); // #c8e1e7
    @debug color.adjust(#998099, $lightness: -30%, $alpha: -0.4); // rgba(71, 57, 71, 0.6)
    ===
    @debug color.adjust(#6b717f, $red: 15)  // #7a717f
    @debug color.adjust(#d2e1dd, $red: -10, $blue: 10)  // #c8e1e7
    @debug color.adjust(#998099, $lightness: -30%, $alpha: -0.4)  // rgba(71, 57, 71, 0.6)
  {% endcodeExample %}
{% endfunction %}

{% function 'adjust-hue($color, $degrees)', 'returns:color' %}
  Aumenta ou diminui a tonalidade da `$color`.

  A `$hue` deve ser um número entre `'360deg` e `360deg` (inclusivo) para adicionar à tonalidade da `$color`. Pode estar [sem unidade][unitless] mas não pode ter nenhuma unidade exceto `deg`.

  [unitless]: /documentation/values/numbers#units

  Consulte também [`color.adjust()`](#adjust), que pode ajustar qualquer propriedade duma cor.

  {% headsUp %}
    Uma vez que `adjust-hue()` é redundante com [`adjust()`](#adjust), não está incluído diretamente no novo sistema de módulo. No lugar de `adjust-hue($color, $amount)`, podes escrever [`color.adjust($color, $hue: $amount)`](#adjust).
  {% endheadsUp %}

  {% codeExample 'adjust-hue', false %}
    // 222deg de tonalidade torna-se 282deg.
    @debug adjust-hue(#6b717f, 60deg); // #796b7f

    // 164deg de tonalidade torna-se 104deg.
    @debug adjust-hue(#d2e1dd, -60deg); // #d6e1d2

    // 210deg de tonalidade torna-se 255deg.
    @debug adjust-hue(#036, 45); // #1a0066
    ===
    // 222deg de tonalidade torna-se 282deg.
    @debug adjust-hue(#6b717f, 60deg)  // #796b7f

    // 164deg de tonalidade torna-se 104deg.
    @debug adjust-hue(#d2e1dd, -60deg)  // #d6e1d2

    // 210deg de tonalidade torna-se 255deg.
    @debug adjust-hue(#036, 45)  // #1a0066
  {% endcodeExample %}
{% endfunction %}

{% function 'color.alpha($color)', 'alpha($color)', 'opacity($color)', 'returns:number' %}
  Retorna o canal de alfa da `$color` como um número entre 0 e 1.

  Como um caso especial, isto suporta a sintaxe do Internet Explorer `alpha(opacity=20)`, para qual retorna uma [sequência de caracteres sem aspas][unquoted string].

  [unquoted string]: /documentation/values/strings#unquoted

  Consulte também:

  * [`color.red()`](#red) para obter o canal de vermelho duma cor.
  * [`color.green()`](#green) para obter o canal de verde duma cor.
  * [`color.blue()`](#blue) para obter o canal de azul duma cor.
  * [`color.hue()`](#hue) para obter a tonalidade duma cor.
  * [`color.saturation()`](#saturation) para obter a saturação duma cor.
  * [`color.lightness()`](#lightness) para obter a claridade duma cor.

  {% codeExample 'color-alpha', false %}
    @debug color.alpha(#e1d7d2); // 1
    @debug color.opacity(rgb(210, 225, 221, 0.4)); // 0.4
    @debug alpha(opacity=20); // alpha(opacity=20)
    ===
    @debug color.alpha(#e1d7d2)  // 1
    @debug color.opacity(rgb(210, 225, 221, 0.4))  // 0.4
    @debug alpha(opacity=20)  // alpha(opacity=20)
  {% endcodeExample %}
{% endfunction %}

{% function 'color.blackness($color)', 'returns:number' %}
  {% compatibility 'dart: "1.28.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

  Retorna a negrura de [HWB][] da `$color` como um número entre `0%` e `100%`.

  [HWB]: https://en.wikipedia.org/wiki/HWB_color_model

  Consulte também:

  * [`color.red()`](#red) para obter o canal de vermelho duma cor.
  * [`color.green()`](#green) para obter o canal de verde duma cor.
  * [`color.hue()`](#hue) para obter a tonalidade duma cor.
  * [`color.saturation()`](#saturation) para obter a saturação duma cor.
  * [`color.lightness()`](#lightness) para obter a claridade duma cor.
  * [`color.whiteness()`](#whiteness) para obter a brancura duma cor.
  * [`color.alpha()`](#alpha) para obter o canal de alfa duma cor.

  {% codeExample 'color-blackness', false %}
    @debug color.blackness(#e1d7d2); // 11.7647058824%
    @debug color.blackness(white); // 0%
    @debug color.blackness(black); // 100%
    ===
    @debug color.blackness(#e1d7d2)  // 11.7647058824%
    @debug color.blackness(white)  // 0%
    @debug color.blackness(black)  // 100%
  {% endcodeExample %}
{% endfunction %}

{% function 'color.blue($color)', 'blue($color)', 'returns:number' %}
  Retorna o canal de azul da `$color` como um número entre 0 e 255.

  Consulte também:

  * [`color.red()`](#red) para obter o canal de vermelho duma cor.
  * [`color.green()`](#green) para obter o canal de verde duma cor.
  * [`color.hue()`](#hue) para obter a tonalidade duma cor.
  * [`color.saturation()`](#saturation) para obter a saturação duma cor.
  * [`color.lightness()`](#lightness) para obter a claridade duma cor.
  * [`color.whiteness()`](#whiteness) para obter a brancura duma cor.
  * [`color.blackness()`](#blackness) para obter a negrura duma cor.
  * [`color.alpha()`](#alpha) para obter o canal de alfa duma cor.

  {% codeExample 'color-blue', false %}
    @debug color.blue(#e1d7d2); // 210
    @debug color.blue(white); // 255
    @debug color.blue(black); // 0
    ===
    @debug color.blue(#e1d7d2)  // 210
    @debug color.blue(white)  // 255
    @debug color.blue(black)  // 0
  {% endcodeExample %}
{% endfunction %}

{% capture color_change %}
  color.change($color,
    $red: null, $green: null, $blue: null,
    $hue: null, $saturation: null, $lightness: null,
    $whiteness: null, $blackness: null,
    $alpha: null)
{% endcapture %}

{% function color_change, 'change-color(...)', 'returns:color' %}
  {% compatibility 'dart: "1.28.0"', 'libsass: false', 'ruby: false', 'feature: "$whiteness and $blackness"' %}{% endcompatibility %}

  Define um ou mais propriedades duma cor para novos valores.

  Usa o valor passado para cada argumento de palavra-chave no lugar da propriedade correspondente da cor, e retorna a cor modificada. É um erro especificar um propriedade de RGB (`$red`, `$green`, e ou `$blue`) ao mesmo tempo como uma propriedade de HSL (`$hue`, `$saturation`, e ou `$lightness`), ou nenhuma destas ao mesmo tempo como uma propriedade de [HWB][] (`$hue`, `$whiteness`, e ou `$blackness`).

  [HWB]: https://en.wikipedia.org/wiki/HWB_color_model

  Todos os argumentos opcionais devem ser números. Os argumentos `$red`, `$green`, e `$blue` devem estar [sem unidade][unitless] e entre -255 e 255 (inclusivo). O argumento `$hue` deve ter ou a unidade `deg` ou nenhuma unidade. Os argumentos `$saturation`, `$lightness`, `$whiteness`, e `$blackness` devem estar entre `-100%` e `100%` (inclusivo), e pode não ter unidade. O argumento `$alpha` deve estar sem unidade e entre -1 e 1 (inclusivo).

  [unitless]: /documentation/values/numbers#units

  consulte também:

  * [`color.scale()`](#scale) para escalar de maneira fluida as propriedades duma cor.
  * [`color.adjust()`](#adjust) para ajustar as propriedades duma cor por quantidades fixas.

  {% codeExample 'color-change', false %}
    @debug color.change(#6b717f, $red: 100); // #64717f
    @debug color.change(#d2e1dd, $red: 100, $blue: 50); // #64e132
    @debug color.change(#998099, $lightness: 30%, $alpha: 0.5); // rgba(85, 68, 85, 0.5)
    ===
    @debug color.change(#6b717f, $red: 100)  // #64717f
    @debug color.change(#d2e1dd, $red: 100, $blue: 50)  // #64e132
    @debug color.change(#998099, $lightness: 30%, $alpha: 0.5)  // rgba(85, 68, 85, 0.5)
  {% endcodeExample %}
{% endfunction %}

{% function 'color.complement($color)', 'complement($color)', 'returns:color' %}
  Retorna o [complemento][complement] de RGB da `$color`.

  Isto é idêntico ao [`color.adjust($color, $hue: 180deg)`](#adjust).

  [complement]: https://en.wikipedia.org/wiki/Complementary_colors

  {% codeExample 'color-complement', false %}
    // 222deg de tonalidade torna-se 42deg.
    @debug color.complement(#6b717f); // #7f796b

    // 164deg de tonalidade torna-se 344deg.
    @debug color.complement(#d2e1dd); // #e1d2d6

    // 210deg de tonalidade torna-se 30deg.
    @debug color.complement(#036); // #663300
    ===
    // 222deg de tonalidade torna-se 42deg.
    @debug color.complement(#6b717f)  // #7f796b

    // 164deg de tonalidade torna-se 344deg.
    @debug color.complement(#d2e1dd)  // #e1d2d6

    // 210deg de tonalidade torna-se 30deg.
    @debug color.complement(#036)  // #663300
  {% endcodeExample %}
{% endfunction %}

{% function 'darken($color, $amount)', 'returns:color' %}
  Torna a `$color` mais escura.

  A `$amount` deve ser um número entre `0%` e `100%` (inclusivo). Diminui a claridade de HSL da `$color` por esta quantidade.

  {% headsUp %}
    A função `darken()` diminui a claridade por uma quantidade fixa, que é frequentemente o efeito não desejado. Para tornar uma cor uma certa percentagem mais escura do que era antes, use [`color.scale()`](#scale).

    Uma vez que `darken()` não é normalmente a melhor maneira de tornar uma cor mais escura, não está incluída diretamente no novo sistema de módulo. No entanto, se precisas preservar o comportamento existente, `darken($color, $amount)` pode ser escrita como [`color.adjust($color, $lightness: -$amount)`](#adjust).

    {% codeExample 'color-darken', false %}
      // #036 tem 20% de claridade, assim quando darken() subtrai 30% só retorna preto.
      @debug darken(#036, 30%); // black

      // scale() torna-a 30% mais escura do que era originalmente.
      @debug color.scale(#036, $lightness: -30%); // #002447
      ===
      // #036 tem 20% de claridade, assim quando darken() subtrai 30% só retorna preto.
      @debug darken(#036, 30%)  // black

      // scale() torna-a 30% mais escura do que era originalmente.
      @debug color.scale(#036, $lightness: -30%)  // #002447
    {% endcodeExample %}
  {% endheadsUp %}

  {% codeExample 'color-darken-2', false %}
    // 92% de claridade torna-se 72%.
    @debug darken(#b37399, 20%); // #7c4465

    // 85% de claridade torna-se 45%.
    @debug darken(#f2ece4, 40%); // #b08b5a

    // 20% de claridade torna-se 0%.
    @debug darken(#036, 30%); // black
    ===
    // 92% de claridade torna-se 72%.
    @debug darken(#b37399, 20%)  // #7c4465

    // 85% de claridade torna-se 45%.
    @debug darken(#f2ece4, 40%)  // #b08b5a

    // 20% de claridade torna-se 0%.
    @debug darken(#036, 30%)  // black
  {% endcodeExample %}
{% endfunction %}

{% function 'desaturate($color, $amount)', 'returns:color' %}
  Torna a `$color` menos saturada.

  A `$amount` deve ser um número entre `0%` e `100%` (inclusivo). Diminui a saturação de HSL da `$color` por esta quantidade.

  {% headsUp %}
    A função `desaturate()` diminui a saturação por uma quantidade fixa, que é frequentemente o efeito não desejado. Para tornar uma cor uma certa percentagem menos saturada do que era antes, use [`color.scale()`](#scale).

    Uma vez que `desaturate()` não é normalmente a melhor maneira de tornar uma cor menos saturada, não está incluída diretamente no novo sistema de módulo. No entanto, se tiveres de preserver o comportamento existente, `desaturate($color, $amount)` pode ser escrita como [`color.adjust($color, $saturation: -$amount)`](#adjust).

    {% codeExample 'color-desaturate', false %}
      // #d2e1dd tem 20% saturação, então quando desaturate() subtrai 30%
      // apenas retorna cinzento.
      @debug desaturate(#d2e1dd, 30%); // #dadada

      // scale() torna-a 30% menos saturada do que era originalmente.
      @debug color.scale(#6b717f, $saturation: -30%); // #6e727c
      ===
      // #d2e1dd tem 20% saturação, então quando desaturate() subtrai 30%
      // apenas retorna cinzento.
      @debug desaturate(#d2e1dd, 30%)  // #dadada

      // scale() torna-a 30% menos saturada do que era originalmente.
      @debug color.scale(#6b717f, $saturation: -30%)  // #6e727c
    {% endcodeExample %}
  {% endheadsUp %}

  {% codeExample 'color-desaturate-2', false %}
    // 100% de saturação torna-se 80%.
    @debug desaturate(#036, 20%); // #0a335c

    // 35% de saturação torna-se 15%.
    @debug desaturate(#f2ece4, 20%); // #eeebe8

    // 20% de saturação torna-se 0%.
    @debug desaturate(#d2e1dd, 30%); // #dadada
    ===
    // 100% de saturação torna-se 80%.
    @debug desaturate(#036, 20%)  // #0a335c

    // 35% de saturação torna-se 15%.
    @debug desaturate(#f2ece4, 20%)  // #eeebe8

    // 20% de saturação torna-se 0%.
    @debug desaturate(#d2e1dd, 30%)  // #dadada
  {% endcodeExample %}
{% endfunction %}

{% function 'color.grayscale($color)', 'grayscale($color)', 'returns:color' %}
  Retorna uma cor cinzenta com a mesma claridade da `$color`.

  Isto é idêntico ao [`color.change($color, $saturation: 0%)`](#change).

  {% codeExample 'color-grayscale', false %}
    @debug color.grayscale(#6b717f); // #757575
    @debug color.grayscale(#d2e1dd); // #dadada
    @debug color.grayscale(#036); // #333333
    ===
    @debug color.grayscale(#6b717f)  // #757575
    @debug color.grayscale(#d2e1dd)  // #dadada
    @debug color.grayscale(#036)  // #333333
  {% endcodeExample %}
{% endfunction %}

{% function 'color.green($color)', 'green($color)', 'returns:number' %}
  Retorna o canal de verde da `$color` como um número entre 0 e 255.

  Consulte também:

  * [`color.red()`](#red) para obter o canal de vermelho duma cor.
  * [`color.blue()`](#blue) para obter o canal de azul duma cor.
  * [`color.hue()`](#hue) para obter a tonalidade duma cor.
  * [`color.saturation()`](#saturation) para obter a saturação duma cor.
  * [`color.lightness()`](#lightness) para obter a claridade duma cor.
  * [`color.whiteness()`](#whiteness) para obter a brancura duma cor.
  * [`color.blackness()`](#blackness) para obter a negrura duma cor.
  * [`color.alpha()`](#alpha) para obter o canal de alfa duma cor.

  {% codeExample 'color-green', false %}
    @debug color.green(#e1d7d2); // 215
    @debug color.green(white); // 255
    @debug color.green(black); // 0
    ===
    @debug color.green(#e1d7d2)  // 215
    @debug color.green(white)  // 255
    @debug color.green(black)  // 0
  {% endcodeExample %}
{% endfunction %}

{% function 'color.hue($color)', 'hue($color)', 'returns:number' %}
  Retorna a tonalidade da `$color` como um número entre `0deg` e `360deg`.

  Consulte também:

  * [`color.red()`](#red) para obter o canal de vermelho duma cor.
  * [`color.green()`](#green) para obter o canal de verde duma cor.
  * [`color.blue()`](#blue) para obter o canal de azul duma cor.
  * [`color.saturation()`](#saturation) para obter a saturação duma cor.
  * [`color.lightness()`](#lightness) para obter a claridade duma cor.
  * [`color.whiteness()`](#whiteness) para obter a brancura duma cor.
  * [`color.blackness()`](#blackness) para obter a negrura duma cor.
  * [`color.alpha()`](#alpha) para obter o canal de alfa duma cor.

  {% codeExample 'color-hue', false %}
    @debug color.hue(#e1d7d2); // 20deg
    @debug color.hue(#f2ece4); // 34.2857142857deg
    @debug color.hue(#dadbdf); // 228deg
    ===
    @debug color.hue(#e1d7d2)  // 20deg
    @debug color.hue(#f2ece4)  // 34.2857142857deg
    @debug color.hue(#dadbdf)  // 228deg
  {% endcodeExample %}
{% endfunction %}

{% function 'color.hwb($hue $whiteness $blackness)', 'color.hwb($hue $whiteness $blackness / $alpha)', 'color.hwb($hue, $whiteness, $blackness, $alpha: 1)', 'returns:color' %}
  {% compatibility 'dart: "1.28.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

  Retorna um cor com a dada [tonalidade, brancura, e negrura][hue, whiteness, and blackness] e dado canal de alfa.

  [hue, whiteness, and blackness]: https://en.wikipedia.org/wiki/HWB_color_model

  A tonalidade é um número entre `0deg` e `360deg` (inclusivo). A brancura e negrura são números entre `0%` e `100%` (inclusivo). A tonalidade pode estar [sem unidade][unitless], mas a brancura e negrura devem ter unidade `%`. O canal de alfa pode ser especificado ou como um número sem unidade entre 0 e 1 (inclusivo), ou uma percentagem entre `0%` e `100%` (inclusivo).

  [unitless]: /documentation/values/numbers#units

 {% headsUp %}
    As [regras de analise especial][special parsing rules] da Sass para valores separados por barra torna difícil passar variáveis para `$blackness` ou `$alpha` quando usamos a assinatura `color.hwb($hue $whiteness $blackness / $alpha)`. Considere usar `color.hwb($hue, $whiteness, $blackness, $alpha)`.

    [special parsing rules]: /documentation/operators/numeric#slash-separated-values
  {% endheadsUp %}

  {% codeExample 'color-hwb', false %}
    @debug color.hwb(210, 0%, 60%); // #036
    @debug color.hwb(34, 89%, 5%); // #f2ece4
    @debug color.hwb(210 0% 60% / 0.5); // rgba(0, 51, 102, 0.5)
    ===
    @debug color.hwb(210, 0%, 60%)  // #036
    @debug color.hwb(34, 89%, 5%)  // #f2ece4
    @debug color.hwb(210 0% 60% / 0.5)  // rgba(0, 51, 102, 0.5)
  {% endcodeExample %}
{% endfunction %}

{% function 'color.ie-hex-str($color)', 'ie-hex-str($color)', 'returns:unquoted string' %}
  Retorna uma sequência de caracteres sem aspas que representa `$color` no formato `#AARRGGBB` esperado pela propriedade [`-ms-filter`][] do Internet Explorer.

  [`-ms-filter`]: https://developer.mozilla.org/en-US/docs/Web/CSS/-ms-filter

  {% codeExample 'color-ie-hex-str', false %}
    @debug color.ie-hex-str(#b37399); // #FFB37399
    @debug color.ie-hex-str(#808c99); // #FF808C99
    @debug color.ie-hex-str(rgba(242, 236, 228, 0.6)); // #99F2ECE4
    ===
    @debug color.ie-hex-str(#b37399); // #FFB37399
    @debug color.ie-hex-str(#808c99); // #FF808C99
    @debug color.ie-hex-str(rgba(242, 236, 228, 0.6)); // #99F2ECE4
  {% endcodeExample %}
{% endfunction %}

{% function 'color.invert($color, $weight: 100%)', 'invert($color, $weight: 100%)', 'returns:color' %}
  Retorna o inverso ou [negativo][negative] da `$color`.

  [negative]: https://en.wikipedia.org/wiki/Negative_(photography)

  O `$weight` deve ser um número entre `0%` e `100%` (inclusivo). Um peso superior significa que o resultado será mais próximo de negativo, e um peso inferior significa que será mais próximo da `$color`. `50%` de peso sempre produzirá `#808080`.

  {% codeExample 'color-invert', false %}
    @debug color.invert(#b37399); // #4c8c66
    @debug color.invert(black); // white
    @debug color.invert(#550e0c, 20%); // #663b3a
    ===
    @debug color.invert(#b37399)  // #4c8c66
    @debug color.invert(black)  // white
    @debug color.invert(#550e0c, 20%)  // #663b3a
  {% endcodeExample %}
{% endfunction %}


{% function 'lighten($color, $amount)', 'returns:color' %}
  Torna `$color` mais clara.

  A `$amount` deve ser um número entre `0%` e `100%` (inclusivo). Aumenta a claridade de HSL da `$color` por esta quantidade.

  {% headsUp %}
    A função `lighten()` aumenta a claridade por uma quantidade fixa, que é frequentemente o efeito não desejado. Para tornar uma cor uma certa percentagem mais clara do que era antes, use [`scale()`](#scale).

    Uma vez que `lighten()` não é normalmente a melhor maneira de tornar uma cor mais clara, não está incluída diretamente no novo sistema de módulo. No entanto, se tiveres de preservar o comportamento existente, `lighten($color, $amount)` pode ser escrito como [`adjust($color, $lightness: $amount)`](#adjust).

    {% codeExample 'color-lighten', false %}
      // #e1d7d2 tem 85% de claridade, então quando lighten() adiciona 30% só retorna branco.
      @debug lighten(#e1d7d2, 30%); // white

      // scale() torna-a 30% mas claro do que era originalmente.
      @debug color.scale(#e1d7d2, $lightness: 30%); // #eae3e0
      ===
      // #e1d7d2 tem 85% de claridade, então quando lighten() adiciona 30% só retorna branco.
      @debug lighten(#e1d7d2, 30%)  // white

      // scale() torna-a 30% mas claro do que era originalmente.
      @debug color.scale(#e1d7d2, $lightness: 30%)  // #eae3e0
    {% endcodeExample %}
  {% endheadsUp %}

  {% codeExample 'color-lighten-2', false %}
    // 46% de claridade torna-se 66%.
    @debug lighten(#6b717f, 20%); // #a1a5af

    // 20% de claridade torna-se 80%.
    @debug lighten(#036, 60%); // #99ccff

    // 85% de claridade torna-se 100%.
    @debug lighten(#e1d7d2, 30%); // white
    ===
    // 46% de claridade torna-se 66%.
    @debug lighten(#6b717f, 20%)  // #a1a5af

    // 20% de claridade torna-se 80%.
    @debug lighten(#036, 60%)  // #99ccff

    // 85% de claridade torna-se 100%.
    @debug lighten(#e1d7d2, 30%)  // white
  {% endcodeExample %}
{% endfunction %}

{% function 'color.lightness($color)', 'lightness($color)', 'returns:number' %}
  Retorna a claridade de HSL da `$color` como um número entre `0%` e `100%`.

  Consulte também:

  * [`color.red()`](#red) para obter o canal de vermelho duma cor.
  * [`color.green()`](#green) para obter o canal de verde duma cor.
  * [`color.blue()`](#hue) para obter o canal de azul duma cor.
  * [`color.hue()`](#hue) para obter a tonalidade duma cor.
  * [`color.saturation()`](#saturation) para obter a saturação duma cor.
  * [`color.whiteness()`](#whiteness) para obter a brancura duma cor.
  * [`color.blackness()`](#blackness) para obter a negrura duma cor.
  * [`color.alpha()`](#alpha) para obter o canal de alfa duma cor.

  {% codeExample 'color-lightness', false %}
    @debug color.lightness(#e1d7d2); // 85.2941176471%
    @debug color.lightness(#f2ece4); // 92.1568627451%
    @debug color.lightness(#dadbdf); // 86.4705882353%
    ===
    @debug color.lightness(#e1d7d2)  // 85.2941176471%
    @debug color.lightness(#f2ece4)  // 92.1568627451%
    @debug color.lightness(#dadbdf)  // 86.4705882353%
  {% endcodeExample %}
{% endfunction %}

{% function 'color.mix($color1, $color2, $weight: 50%)', 'mix($color1, $color2, $weight: 50%)', 'returns:color' %}
  Retorna uma cor que é uma mistura de `$color1` e `$color2`.

  Ambos o `$weight` e opacidade relativa de cada cor determina o quanto de cada cor está no resultado. O `$weight` deve ser um número entre `0%` e `100%` (inclusivo). Um peso muito maior indica que mais de `$color1` deveria ser usada, e um peso muito menor indica que mais de `$color2` deveria ser usada.

  {% codeExample 'color-mix', false %}
    @debug color.mix(#036, #d2e1dd); // #698aa2
    @debug color.mix(#036, #d2e1dd, 75%); // #355f84
    @debug color.mix(#036, #d2e1dd, 25%); // #9eb6bf
    @debug color.mix(rgba(242, 236, 228, 0.5), #6b717f); // rgba(141, 144, 152, 0.75)
    ===
    @debug color.mix(#036, #d2e1dd)  // #698aa2
    @debug color.mix(#036, #d2e1dd, 75%)  // #355f84
    @debug color.mix(#036, #d2e1dd, 25%)  // #9eb6bf
    @debug color.mix(rgba(242, 236, 228, 0.5), #6b717f)  // rgba(141, 144, 152, 0.75)
  {% endcodeExample %}
{% endfunction %}

{% function 'opacify($color, $amount)', 'fade-in($color, $amount)', 'returns:color' %}
  Torna `$color` mais opaca.

  A `$amount` deve ser um número entre `0` e `1` (inclusivo). Aumenta o canal de alfa da `$color` por esta quantidade.

  {% headsUp %}
    A função `opacify()` aumenta o canal de alfa por uma quantidade fixa, que é frequentemente o efeito não desejado. Para tornar uma cor uma certa percentagem mais opaca do que era antes, use [`scale()`](#scale).

    Uma vez que `opacify()` normalmente não é a melhor maneira de tornar uma cor mais opaca, não está incluída diretamente no novo sistema de módulo. No entanto, se tiveres de preservar o comportamento existente, `opacify($color, $amount)` pode ser escrita como [`adjust($color, $alpha: -$amount)`](#adjust).

    {% codeExample 'color-opacify', false %}
      // rgba(#036, 0.7) tem 0.7 de alfa, então quando opacify() adiciona 0.3
      // apenas retorna um cor completamente opaca.
      @debug opacify(rgba(#036, 0.7), 0.3); // #036

      // scale() torna-a 30% mais opaca do que era originalmente.
      @debug color.scale(rgba(#036, 0.7), $alpha: 30%); // rgba(0, 51, 102, 0.79)
      ===
      // rgba(#036, 0.7) tem 0.7 de alfa, então quando opacify() adiciona 0.3
      // apenas retorna um cor completamente opaca.
      @debug opacify(rgba(#036, 0.7), 0.3)  // #036

      // scale() torna-a 30% mais opaca do que era originalmente.
      @debug color.scale(rgba(#036, 0.7), $alpha: 30%)  // rgba(0, 51, 102, 0.79)
    {% endcodeExample %}
  {% endheadsUp %}

  {% codeExample 'color-opacify-2', false %}
    @debug opacify(rgba(#6b717f, 0.5), 0.2); // rgba(107, 113, 127, 0.7)
    @debug fade-in(rgba(#e1d7d2, 0.5), 0.4); // rgba(225, 215, 210, 0.9)
    @debug opacify(rgba(#036, 0.7), 0.3); // #036
    ===
    @debug opacify(rgba(#6b717f, 0.5), 0.2)  // rgba(107, 113, 127, 0.7)
    @debug fade-in(rgba(#e1d7d2, 0.5), 0.4)  // rgba(225, 215, 210, 0.9)
    @debug opacify(rgba(#036, 0.7), 0.3)  // #036
  {% endcodeExample %}
{% endfunction %}


{% function 'color.red($color)', 'red($color)', 'returns:number' %}
  Retorna o canal de vermelho da `$color` como um número entre 0 e 255.

  Consulte também:

  * [`color.green()`](#green) para obter o canal de verde duma cor.
  * [`color.blue()`](#blue) para obter o canal de azul duma cor.
  * [`color.hue()`](#hue) para obter a tonalidade duma cor.
  * [`color.saturation()`](#saturation) para obter a saturação duma cor.
  * [`color.lightness()`](#lightness) para obter a claridade duma cor.
  * [`color.whiteness()`](#whiteness) para obter a brancura duma cor.
  * [`color.blackness()`](#blackness) para obter a negrura duma cor.
  * [`color.alpha()`](#alpha) para obter o canal de alfa duma cor.

  {% codeExample 'color-red', false %}
    @debug color.red(#e1d7d2); // 225
    @debug color.red(white); // 255
    @debug color.red(black); // 0
    ===
    @debug color.red(#e1d7d2)  // 225
    @debug color.red(white)  // 255
    @debug color.red(black)  // 0
  {% endcodeExample %}
{% endfunction %}

{% function 'color.saturate($color, $amount)', 'saturate($color, $amount)', 'returns:color' %}
  Torna `$color` mais saturada.

  A `$amount` deve ser um número entre `0%` e `100%` (inclusivo). Aumenta a saturação de HSL da `$color` por esta quantidade.

  {% headsUp %}
    A função `saturate()` aumenta a saturação por uma quantidade fixa, que é frequentemente o efeito não desejado. Para tornar uma cor uma certa percentagem mais saturada do que era antes, use [`scale()`](#scale).

    Uma vez que `saturate()` normalmente não é a melhor maneira de tornar uma cor mais saturada, não está incluída diretamente no novo sistema de módulo. No entanto, se tiveres de preservar o comportamento existente, `saturate($color, $amount)` pode ser escrita como [`adjust($color, $saturation: $amount)`](#adjust).

    {% codeExample 'color-saturate', false %}
      // #0e4982 tem 80% saturação, então quando saturate() adiciona 30%
      // apenas torna-se completamente saturada.
      @debug saturate(#0e4982, 30%); // #004990

      // scale() torna-a 30% mais saturada do que era originalmente.
      @debug color.scale(#0e4982, $saturation: 30%); // #0a4986
      ===
      // #0e4982 tem 80% saturação, então quando saturate() adiciona 30%
      // apenas torna-se completamente saturada.
      @debug saturate(#0e4982, 30%)  // #004990

      // scale() torna-a 30% mais saturada do que era originalmente.
      @debug color.scale(#0e4982, $saturation: 30%)  // #0a4986
    {% endcodeExample %}
  {% endheadsUp %}

  {% codeExample 'color-saturate-2', false %}
    // 50% de saturação torna-se 70%.
    @debug saturate(#c69, 20%); // #e05299

    // 35% de saturação torna-se 85%.
    @debug desaturate(#f2ece4, 50%); // #ebebeb

    // 80% de saturação torna-se 100%.
    @debug saturate(#0e4982, 30%)  // #004990
    ===
    // 50% de saturação torna-se 70%.
    @debug saturate(#c69, 20%); // #e05299

    // 35% de saturação torna-se 85%.
    @debug desaturate(#f2ece4, 50%); // #ebebeb

    // 80% de saturação torna-se 100%.
    @debug saturate(#0e4982, 30%)  // #004990
  {% endcodeExample %}
{% endfunction %}

{% function 'color.saturation($color)', 'saturation($color)', 'returns:number' %}
  Retorna a saturação de HSL da `$color` como um número entre `0%` e `100%`.

  Consulte também:

  * [`color.red()`](#red) para obter o canal de vermelho duma cor.
  * [`color.green()`](#green) para obter o canal de verde duma cor.
  * [`color.blue()`](#blue) para obter o canal de azul duma cor.
  * [`color.hue()`](#hue) para obter a tonalidade duma cor.
  * [`color.lightness()`](#lightness) para obter a claridade duma cor.
  * [`color.whiteness()`](#whiteness) para obter a brancura duma cor.
  * [`color.blackness()`](#blackness) para obter a negrura duma cor.
  * [`color.alpha()`](#alpha) para obter o canal de alfa duma cor.

  {% codeExample 'color-saturation', false %}
    @debug color.saturation(#e1d7d2); // 20%
    @debug color.saturation(#f2ece4); // 30%
    @debug color.saturation(#dadbdf); // 7.2463768116%
    ===
    @debug color.saturation(#e1d7d2)  // 20%
    @debug color.saturation(#f2ece4)  // 30%
    @debug color.saturation(#dadbdf)  // 7.2463768116%
  {% endcodeExample %}
{% endfunction %}

{% capture color_scale %}
  color.scale($color,
    $red: null, $green: null, $blue: null,
    $saturation: null, $lightness: null,
    $whiteness: null, $blackness: null,
    $alpha: null)
{% endcapture %}

{% function color_scale, 'scale-color(...)', 'returns:color' %}
  {% compatibility 'dart: "1.28.0"', 'libsass: false', 'ruby: false', 'feature: "$whiteness and $blackness"' %}{% endcompatibility %}

  Escala de maneira fluida um ou mais propriedades da `$color`.

  Cada argumento de palavra-chave deve ser um número entre `-100%` e `100%` (inclusivo). Isto indica quão longe a propriedade correspondente deveria ser movida da sua posição original em direção ao máximo (se o argumento for positivo) ou o mínimo (se o argumento for negativo). Isto significa que, por exemplo, `$lightness: 50%` tornará todas as cores `50%` mais próximas da claridade máxima sem torná-las completamente branca.

  É um erro especificar uma propriedade de RGB (`$red`, `$green`, e ou `$blue`) ao mesmo tempo como uma propriedade de HSL (`$saturation`, e ou `$lightness`), ou nenhuma estas ao mesmo tempo como uma propriedade de [HWB][] (`$whiteness`, e ou `$blackness`).

  [HWB]: https://en.wikipedia.org/wiki/HWB_color_model

  Consulte também:

  * [`color.adjust()`](#adjust) para mudar as propriedades duma cor por quantidades fixas.
  * [`color.change()`](#change) para definir as propriedades duma cor.

  {% codeExample 'color-scale', false %}
    @debug color.scale(#6b717f, $red: 15%); // #81717f
    @debug color.scale(#d2e1dd, $lightness: -10%, $saturation: 10%); // #b3d4cb
    @debug color.scale(#998099, $alpha: -40%); // rgba(153, 128, 153, 0.6)
    ===
    @debug color.scale(#6b717f, $red: 15%)  // #81717f
    @debug color.scale(#d2e1dd, $lightness: -10%, $saturation: 10%)  // #b3d4cb
    @debug color.scale(#998099, $alpha: -40%)  // rgba(153, 128, 153, 0.6)
  {% endcodeExample %}
{% endfunction %}

{% function 'transparentize($color, $amount)', 'fade-out($color, $amount)', 'returns:color' %}
  Torna `$color` mais transparente.

  A `$amount` deve ser um número entre `0` e `1` (inclusivo). Diminui o canal de alfa da `$color` por esta quantidade.

  {% headsUp %}
    A função `transparentize()` diminui o canal de alfa por uma quantidade fixa, que é frequentemente o efeito não desejado. Para tornar uma cor uma certa percentagem mais transparente do que era antes, use [`color.scale()`](#scale).

    Uma vez que `transparentize()` normalmente não é a melhor maneira de tornar uma cor mais transparente, não está incluída diretamente no novo sistema de módulo. No entanto, se tiveres de preservar o comportamento existente, `transparentize($color, $amount)` pode ser escrita como [`color.adjust($color, $alpha: -$amount)`](#adjust).

    {% codeExample 'transparentize', false %}
      // rgba(#036, 0.3) tem 0.3 de alfa, então quando transparentize() subtrai 0.3
      // retorna uma cor completamente transparente.
      @debug transparentize(rgba(#036, 0.3), 0.3); // rgba(0, 51, 102, 0)

      // scale() torna-a 30% mais transparente do que era originalmente.
      @debug color.scale(rgba(#036, 0.3), $alpha: -30%); // rgba(0, 51, 102, 0.21)
      ===
      // rgba(#036, 0.3) tem 0.3 de alfa, então quando transparentize() subtrai 0.3
      // retorna uma cor completamente transparente.
      @debug transparentize(rgba(#036, 0.3), 0.3)  // rgba(0, 51, 102, 0)

      // scale() torna-a 30% mais transparente do que era originalmente.
      @debug color.scale(rgba(#036, 0.3), $alpha: -30%)  // rgba(0, 51, 102, 0.21)
    {% endcodeExample %}
  {% endheadsUp %}

  {% codeExample 'transparentize-2', false %}
    @debug transparentize(rgba(#6b717f, 0.5), 0.2)  // rgba(107, 113, 127, 0.3)
    @debug fade-out(rgba(#e1d7d2, 0.5), 0.4)  // rgba(225, 215, 210, 0.1)
    @debug transparentize(rgba(#036, 0.3), 0.3)  // rgba(0, 51, 102, 0)
    ===
    @debug transparentize(rgba(#6b717f, 0.5), 0.2)  // rgba(107, 113, 127, 0.3)
    @debug fade-out(rgba(#e1d7d2, 0.5), 0.4)  // rgba(225, 215, 210, 0.1)
    @debug transparentize(rgba(#036, 0.3), 0.3)  // rgba(0, 51, 102, 0)
  {% endcodeExample %}
{% endfunction %}

{% function 'color.whiteness($color)', 'returns:number' %}
  {% compatibility 'dart: "1.28.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

  Retorna a brancura de [HWB][] da `$color` como um número entre `0%` e `100%`.

  [HWB]: https://en.wikipedia.org/wiki/HWB_color_model

  Consulte também:

  * [`color.red()`](#red) para obter o canal de vermelho duma cor.
  * [`color.green()`](#green) para obter o canal de verde duma cor.
  * [`color.hue()`](#hue) para obter a tonalidade duma cor.
  * [`color.saturation()`](#saturation) para obter a saturação duma cor.
  * [`color.lightness()`](#lightness) para obter a claridade duma cor.
  * [`color.blackness()`](#blackness) para obter a negrura duma cor.
  * [`color.alpha()`](#alpha) para obter o canal de alfa duma cor.

  {% codeExample 'color-whiteness', false %}
    @debug color.whiteness(#e1d7d2); // 82.3529411765%
    @debug color.whiteness(white); // 100%
    @debug color.whiteness(black); // 0%
    ===
    @debug color.whiteness(#e1d7d2)  // 82.3529411765%
    @debug color.whiteness(white)  // 100%
    @debug color.whiteness(black)  // 0%
  {% endcodeExample %}
{% endfunction %}
