---
title: Cores
---

{% compatibility 'dart: "1.14.0"', 'libsass: "3.6.0"', 'ruby: "3.6.0"', 'feature: "Sintaxe de Nível 4"' %}
  A LibSass e versões mais antigas da Sass de Dart ou Ruby não suportam [cores hexadecimais com um canal de alfa][hex colors with an alpha channel].

  [hex colors with an alpha channel]: https://drafts.csswg.org/css-color/#hex-notation
{% endcompatibility %}

A Sass tem suporte embutido para valores de cor. Tal como as cores de CSS, representam pontos no [espaço de cor da sRGB][sRGB color space], embora muitas [funções de cor][color functions] da Sass operam usando [coordenadas de HSL][HSL coordinates] (que são apenas uma outro maneira de expressar cores de sRGB). As cores de Sass podem ser escritas como códigos hexadecimais (`#f2ece4` ou `#b37399aa`), [nomes de cor de CSS][CSS color names] (`midnightblue`, `transparent`), ou as funções [`rgb()`][], [`rgba()`][], [`hsl()`][], e [`hsla()`][]:

[sRGB color space]: https://en.wikipedia.org/wiki/SRGB
[color functions]: /documentation/modules/color
[HSL coordinates]: https://en.wikipedia.org/wiki/HSL_and_HSV
[CSS color names]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#Color_keywords
[`rgb()`]: /documentation/modules#rgb
[`rgba()`]: /documentation/modules#rgba
[`hsl()`]: /documentation/modules#hsl
[`hsla()`]: /documentation/modules#hsla

{% codeExample 'colors', false %}
  @debug #f2ece4; // #f2ece4
  @debug #b37399aa; // rgba(179, 115, 153, 67%)
  @debug midnightblue; // #191970
  @debug rgb(204, 102, 153); // #c69
  @debug rgba(107, 113, 127, 0.8); // rgba(107, 113, 127, 0.8)
  @debug hsl(228, 7%, 86%); // #dadbdf
  @debug hsla(20, 20%, 85%, 0.7); // rgb(225, 215, 210, 0.7)
  ===
  @debug #f2ece4  // #f2ece4
  @debug #b37399aa  // rgba(179, 115, 153, 67%)
  @debug midnightblue  // #191970
  @debug rgb(204, 102, 153)  // #c69
  @debug rgba(107, 113, 127, 0.8)  // rgba(107, 113, 127, 0.8)
  @debug hsl(228, 7%, 86%)  // #dadbdf
  @debug hsla(20, 20%, 85%, 0.7)  // rgb(225, 215, 210, 0.7)
{% endcodeExample %}

{% funFact %}
  No importa como uma cor de Sass é originalmente escrita, ela pode ser usada com ambas funções baseadas em HSL e RGB!
{% endfunFact %}

A CSS suporta muitos formatos diferentes que podem todos representar a mesma cor: seu nome, seu código hexadecimal, e sua [notação funcional][functional notation]. Qual formato a Sass escolhe para compilar uma cor depende da própria cor, como foi escrita na folha de estilo original, e o modo de saída atual. Uma vez que pode variar muito, os autores da folha de estilo não deveriam depender de qualquer formato de saída particular para as cores que escrevem.

[functional notation]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value

A Sass suporta muitas [funções de cor][color functions] úteis que podem ser usadas para criar novas cores baseadas naquelas existentes [misturando as cores][mixing colors together] ou [aumentando a suas tonalidade, saturação, ou claridade][scaling their hue, saturation, or lightness]:

[mixing colors together]: /documentation/modules/color#mix
[scaling their hue, saturation, or lightness]: /documentation/modules/color#scale

{% codeExample 'color-formats', false %}
  $venus: #998099;

  @debug scale-color($venus, $lightness: +15%); // #a893a8
  @debug mix($venus, midnightblue); // #594d85
  ===
  $venus: #998099

  @debug scale-color($venus, $lightness: +15%)  // #a893a8
  @debug mix($venus, midnightblue)  // #594d85
{% endcodeExample %}
