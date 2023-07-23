---
title: Funções Especiais
table_of_contents: true
introduction: >
  A CSS define muitas funções, e a maioria delas funcionam muito bem com a sintaxe de função normal da Sass. São analisadas como chamadas de função, resolvidas para [funções de CSS simples](../at-rules/function#plain-css-functions), e compiladas como estão para CSS. Embora existem algumas exceções, que têm sintaxe especial que não podem apenas ser analisadas como uma [expressão de SassScript](structure#expressions). Todas chamadas de função especial retornam [sequências de caracteres sem aspas](../values/strings#unquoted).
---

## `url()`

A [função `url()`][`url()` function] é comummente usada na CSS, mas sua sintaxe é diferente de outras funções: pode receber uma URL com *ou* sem aspas. Uma vez que uma URL sem aspas não é uma expressão de SassScript válida, a Sass precisa de lógica especial para analisá-lo.

[`url()` function]: https://developer.mozilla.org/en-US/docs/Web/CSS/url

Se o argumento da `url()` for uma URL sem aspas válida, a Sass analisa-o como está, ainda que a [interpolação][interpolation] possa também ser usada para injetar valores de SassScript. Se não for uma URL sem aspas válida — por exemplo, se contém [variáveis][variables] ou [chamadas de função][function calls] — é analisada como uma [chamada de função de CSS simples][plain CSS function call] normal.

[interpolation]: ../interpolation
[variables]: ../variables
[function calls]: ../at-rules/function
[plain CSS function call]: ../at-rules/function#plain-css-functions

<% example do %>
  $roboto-font-path: "../fonts/roboto";

  @font-face {
      // Isto é analisado como uma chamada de função normal que recebe sequência de caracteres com aspas.
      src: url("#{$roboto-font-path}/Roboto-Thin.woff2") format("woff2");

      font-family: "Roboto";
      font-weight: 100;
  }

  @font-face {
      // Isto é analisado como uma chamada de função normal que recebe uma expressão aritmética.
      src: url($roboto-font-path + "/Roboto-Light.woff2") format("woff2");

      font-family: "Roboto";
      font-weight: 300;
  }

  @font-face {
      // Isto é analisado como uma função especial interpolada.
      src: url(#{$roboto-font-path}/Roboto-Regular.woff2) format("woff2");

      font-family: "Roboto";
      font-weight: 400;
  }
  ===
  $roboto-font-path: "../fonts/roboto"

  @font-face
      // Isto é analisado como uma chamada de função normal que recebe sequência de caracteres com aspas.
      src: url("#{$roboto-font-path}/Roboto-Thin.woff2") format("woff2")

      font-family: "Roboto"
      font-weight: 100


  @font-face
      // Isto é analisado como uma chamada de função normal que recebe uma expressão aritmética.
      src: url($roboto-font-path + "/Roboto-Light.woff2") format("woff2")

      font-family: "Roboto"
      font-weight: 300


  @font-face
      // Isto é analisado como uma função especial interpolada.
      src: url(#{$roboto-font-path}/Roboto-Regular.woff2) format("woff2")

      font-family: "Roboto"
      font-weight: 400
<% end %>

## `element()`, `progid:...()`, and `expression()`

<% impl_status dart: "<1.40.0", libsass: false, ruby: false, feature: "calc()" do %>
  As versões de LibSass, Sass de Ruby, e Sass de Dart anterior a 1.40.0 analisam `calc()` como função sintática especial como `element()`.

  As versões de Sass de Dart 1.40.0 e adiante analisam `cal()` como um [cálculo][calculation].

  [calculation]: ../values/calculations
<% end %>

<% impl_status dart: ">=1.31.0 <1.40.0", libsass: false, ruby: false, feature: "clamp()" do %>
  As versões de LibSass, Sass de Ruby, e Sass de Dart anterior a 1.31.0 analisam `clamp()` como uma [função de CSS simples][plain CSS function] ao invés de suportar a sintaxe especial dentro dela.

  [plain CSS function]: ../at-rules/function#plain-css-functions

  As versões de Sass de Dart entre 1.31.0 e 1.40.0 analisam `clamp()` como função sintática especial como `element()`.

  As versões de Sass de Dart 1.40.0 e adiante analisam `clamp()` como um [cálculo][calculation].

  [calculation]: ../values/calculations
<% end %>

A função [`element()`] é definida na especificação de CSS, e já que seus identificadores poderiam ser analisados como cores, precisam de analise especial.

[`element()`]: https://developer.mozilla.org/en-US/docs/Web/CSS/element

A [`expression()`][] e funções começando com [`progid:`][] são funcionalidades de Internet Explorer legados que usam sintaxe não padronizada. Embora não sejam mais suportadas por navegadores recentes, a Sass continua a analisá-los por questões de retrocompatibilidade.

[`expression()`]: https://blogs.msdn.microsoft.com/ie/2008/10/16/ending-expressions/
[`progid:`]: https://blogs.msdn.microsoft.com/ie/2009/02/19/the-css-corner-using-filters-in-ie8/

A Sass permite *qualquer texto* nestas chamadas de função, incluindo parênteses encaixados. Nada é interpretado como uma expressão de SassScript, com a exceção de que a [interpolação][interpolation] pode ser usada para injetar valores dinâmicos.

<% example do %>
  $logo-element: logo-bg;

  .logo {
    background: element(##{$logo-element});
  }
  ===
  $logo-element: logo-bg

  .logo
    background: element(##{$logo-element})
  ===
  .logo {
    background: element(#logo-bg);
  }
<% end %>
