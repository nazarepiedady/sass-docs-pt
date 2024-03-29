---
title: Operadores de Igualdade
---

{% compatibility 'dart: true', 'libsass: false', 'ruby: "4.0.0 (unreleased)"', 'feature: "Igualdade Sem Unidade"'%}
  A LibSass e versões antigas de Sass de Ruby consideram números sem unidades como iguais aos números com quaisquer unidades. Este comportamento foi depreciado e tem sido removido dos lançamentos mais recentes porque viola a [transatividade][transitivity].

  [transitivity]: https://en.wikipedia.org/wiki/Transitive_relation
{% endcompatibility %}

Os operadores de igualdade retornam se dois valores são ou não iguais. São escritos `<expression> == <expression>`, que retorna se duas [expressões][expression] são iguais, e `<expression> != <expression>`, que retorna se duas expressões *não* forem iguais. Os dois valores são considerados iguais se forem do mesmo tipo *e* se forem o mesmo valor, o que significa coisas diferentes para tipos diferentes:

[expressions]: /documentation/syntax/structure#expressions

* [Números][Numbers] são iguais se tiverem o mesmo valor *e* a mesma unidade, ou se os seus valores forem iguais quando suas unidades forem convertidas mutuamente entre si.

* [Sequências de Caracteres][Strings] são invulgares em que sequências de caracteres [sem aspas][unquoted] e [com aspas][quoted] com o mesmo conteúdo são consideradas iguais.

* [Cores][Colors] são iguais se tiverem os mesmos valores de vermelho, verde, azul, e alfa.

* [Listas][Lists] são iguais se seus conteúdos forem iguais. As listas separadas por vírgulas não são iguais as listas separadas por espaço, e listas entre parêntesis não são iguais as sem parêntesis.

* [Mapas][Maps] são iguais se suas chaves e valores forem ambas iguais.

* [Cálculos][Calculations] são iguais se seus nomes e argumentos forem todos iguais. Os argumentos da operação são comparados textualmente.

* [`true`, `false`][], e [`null`][] apenas são iguais a si mesmos.

* [Funções][Functions] são iguais a mesma função. As funções são comparadas *por referência*, então mesmo se duas funções tiverem o mesmo nome e definição são consideradas diferentes se não forem definidas no mesmo lugar.

[Numbers]: /documentation/values/numbers
[Strings]: /documentation/values/strings
[quoted]: /documentation/values/strings#quoted
[unquoted]: /documentation/values/strings#unquoted
[Colors]: /documentation/values/colors
[Lists]: /documentation/values/lists
[`true`, `false`]: /documentation/values/booleans
[`null`]: /documentation/values/null
[Maps]: /documentation/values/maps
[Calculations]: /documentation/values/calculations
[Functions]: /documentation/values/functions

{% codeExample 'equality', false %}
  @debug 1px == 1px; // true
  @debug 1px != 1em; // true
  @debug 1 != 1px; // true
  @debug 96px == 1in; // true

  @debug "Helvetica" == Helvetica; // true
  @debug "Helvetica" != "Arial"; // true

  @debug hsl(34, 35%, 92.1%) == #f2ece4; // true
  @debug rgba(179, 115, 153, 0.5) != rgba(179, 115, 153, 0.8); // true

  @debug (5px 7px 10px) == (5px 7px 10px); // true
  @debug (5px 7px 10px) != (10px 14px 20px); // true
  @debug (5px 7px 10px) != (5px, 7px, 10px); // true
  @debug (5px 7px 10px) != [5px 7px 10px]; // true

  $theme: ("venus": #998099, "nebula": #d2e1dd);
  @debug $theme == ("venus": #998099, "nebula": #d2e1dd); // true
  @debug $theme != ("venus": #998099, "iron": #dadbdf); // true

  @debug true == true; // true
  @debug true != false; // true
  @debug null != false; // true

  @debug get-function("rgba") == get-function("rgba"); // true
  @debug get-function("rgba") != get-function("hsla"); // true
  ===
  @debug 1px == 1px  // true
  @debug 1px != 1em  // true
  @debug 1 != 1px  // true
  @debug 96px == 1in  // true

  @debug "Helvetica" == Helvetica  // true
  @debug "Helvetica" != "Arial"  // true

  @debug hsl(34, 35%, 92.1%) == #f2ece4  // true
  @debug rgba(179, 115, 153, 0.5) != rgba(179, 115, 153, 0.8)  // true

  @debug (5px 7px 10px) == (5px 7px 10px)  // true
  @debug (5px 7px 10px) != (10px 14px 20px)  // true
  @debug (5px 7px 10px) != (5px, 7px, 10px)  // true
  @debug (5px 7px 10px) != [5px 7px 10px]  // true

  $theme: ("venus": #998099, "nebula": #d2e1dd)
  @debug $theme == ("venus": #998099, "nebula": #d2e1dd)  // true
  @debug $theme != ("venus": #998099, "iron": #dadbdf)  // true

  @debug calc(10px + 10%) == calc(10px + 10%)  // true
  @debug calc(10% + 10px) == calc(10px + 10%)  // false

  @debug true == true  // true
  @debug true != false  // true
  @debug null != false  // true

  @debug get-function("rgba") == get-function("rgba")  // true
  @debug get-function("rgba") != get-function("hsla")  // true
{% endcodeExample %}
