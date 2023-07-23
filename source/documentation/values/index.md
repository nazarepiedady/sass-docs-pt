---
title: Valores
introduction: >
  A Sass suporta um número de tipos de valor, a maioria dos quais vêm diretamente da CSS. Toda [expressão](/documentation/syntax/structure#expressions) produz um valor, as [variáveis](/documentation/variables) seguram valores. A maioria dos tipos de valor vêm diretamente da CSS:
overview: true
---

* [Números](/documentation/values/numbers), os quais podem ter ou não ter unidades, como `12` ou `100px`.

* [Sequências de Caracteres](/documentation/values/strings), as quais podem ter ou não ter aspas, como `"Helvetica Neue"` ou `bold`.

* [Cores](/documentation/values/colors), as quais podem ser referenciadas pelas suas representações em hexadecimal ou pelos seus nomes, como `#c6538c` ou `blue`, ou retornadas de funções, como `rgb(107, 113, 127)` ou `hsl(210, 100%, 20%)`.

* [Listas de Valores](/documentation/values/lists), as quais podem ser separadas por espaços ou vírgulas e que podem ser envolvidas ou não de todo em parêntesis reto, como `1.5em 1em 0 2em`, `Helvetica, Arial, sans-serif`, ou `[col1-start]`.

Um pouco mais que são específicas à Sass:

* Os valores [booleanos](/documentation/values/booleans) `true` e `false`.

* O valor [`null`](/documentation/values/null) autossuficiente.

* [Mapas](/documentation/values/maps) que associam valores com chaves, como `("background": red, "foreground": pink)`.

* [Referências de função](/documentation/values/functions) retornadas pela [`get-function()`][] e chamadas com a [`call()`][].

  [`get-function()`]: /documentation/modules/meta#get-function
  [`call()`]: /documentation/modules/meta#call
