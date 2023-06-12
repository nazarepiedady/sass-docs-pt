---
title: Sequências de Caracteres
table_of_contents: true
introduction: >
  As sequências de caracteres são o que seu nome diz, sequências de caracteres (especialmente [pontos de código unicode](https://en.wikipedia.org/wiki/Code_point)). A Sass suporta dois tipos de sequências de caracteres cujas estrutura interna é o mesmo mas que são interpretados de maneira diferente: [sequências de caracteres com aspas](#quoted), como `"Helvetica Neue"`, e [sequências de caracteres sem aspas](#unquoted) (também conhecidas como *identificadores*), como `bold`. Juntas, estas cobrem os diferentes tipos de texto que aparecem na CSS.
---

<% fun_fact do %>
  Tu podes converter uma sequência de caracteres com aspas para uma sequência de caracteres sem aspas usando a [função `string.unquote`][`string.unquote()` function], e podes converter uma sequência de caracteres sem aspas para uma sequência de caracteres com aspas usando a [função `string.quote()`].

  [`string.unquote()` function]: ../modules/string#unquote
  [`string.quote()` function]: ../modules/string#quote

  <% example(autogen_css: false) do %>
    @use "sass:string";

    @debug string.unquote(".widget:hover"); // .widget:hover
    @debug string.quote(bold); // "bold"
    ===
    @use "sass:string"

    @debug string.unquote(".widget:hover")  // .widget:hover
    @debug string.quote(bold)  // "bold"
  <% end %>
<% end %>

<span id="escapes"></span>
## Saídas

Todas as sequências de caracteres da Sass suportam os [códigos de saída][escape codes] da CSS padrão:

[escape codes]: https://developer.mozilla.org/en-US/docs/Web/CSS/string#Syntax

* Qualquer carácter que não seja uma letra de A à F ou um número de 0 à 9 (mesmo uma nova linha!) podem ser incluídos como parte de uma sequência de caracteres escrevendo `\` em frente a ele.

* Qualquer carácter podem ser incluído como parte de uma sequência de caracteres escrevendo `\` seguido pelo seu [número de ponto de código unicode][Unicode code point number] escrito em [hexadecimal][hexadecimal]. Tu podes opcionalmente incluir um espaço depois do número de ponto de código para indicar onde o número de unicode termina.

[Unicode code point number]: https://en.wikipedia.org/wiki/List_of_Unicode_characters
[hexadecimal]: https://en.wikipedia.org/wiki/Hexadecimal

<% example(autogen_css: false) do %>
  @debug "\""; // '"'
  @debug \.widget; // \.widget
  @debug "\a"; // "\a" (a string containing only a newline)
  @debug "line1\a line2"; // "line1\a line2"
  @debug "Nat + Liz \1F46D"; // "Nat + Liz 👭"
  ===
  @debug "\""  // '"'
  @debug \.widget  // \.widget
  @debug "\a"  // "\a" (a string containing only a newline)
  @debug "line1\a line2"  // "line1\a line2" (foo and bar are separated by a newline)
  @debug "Nat + Liz \1F46D"  // "Nat + Liz 👭"
<% end %>

<% fun_fact do %>
  Para os caracteres que são permitidos aparecerem em sequências de caracteres, escrever a saída de unicode produz exatamente a mesma sequência de caracteres que a escrita do próprio carácter.
<% end %>

<span id="quoted"></span>
## Com Aspas

As sequências de caracteres são escritas ou entre aspas simples ou entre aspas duplas, como em `"Helvetica Neue"`. Elas podem conter [interpolação][interpolation], bem como qualquer carácter cuja saída não foi tratada exceto para:


[interpolation]: ../interpolation

* `\`, que pode ser tratado como `\\`;
* `'` ou `"`, qualquer que foi usado para definir aquela sequência de caracteres, que pode podem ser tratadas como `\'` ou `\"`;
* novas linhas, que podem ser tratadas como `\a` (incluindo um espaço final).

As sequências de caracteres são asseguradas que sejam compiladas para sequências de caracteres de CSS que tem o mesmo conteúdo que as sequências de caracteres de Sass original. O formato exato pode variar baseado na implementação ou configuração—uma sequência de caracteres contendo uma aspas duplas pode ser compilada para `"\""` ou `'"'`, e um carácter [que não faz parte da tabela ASCII][ASCII] pode ou não ser escapado. Mas este deveria ser analisado da mesma forma nom qualquer implementação de CSS compatível com os padrões, incluindo todos navegadores.

[ASCII]: https://en.wikipedia.org/wiki/ASCII

<% example(autogen_css: false) do %>
  @debug "Helvetica Neue"; // "Helvetica Neue"
  @debug "C:\\Program Files"; // "C:\\Program Files"
  @debug "\"Don't Fear the Reaper\""; // "\"Don't Fear the Reaper\""
  @debug "line1\a line2"; // "line1\a line2"

  $roboto-variant: "Mono";
  @debug "Roboto #{$roboto-variant}"; // "Roboto Mono"
  ===
  @debug "Helvetica Neue"  // "Helvetica Neue"
  @debug "C:\\Program Files"  // "C:\\Program Files"
  @debug "\"Don't Fear the Reaper\""  // "\"Don't Fear the Reaper\""
  @debug "line1\a line2"  // "line1\a line2"

  $roboto-variant: "Mono"
  @debug "Roboto #{$roboto-variant}"  // "Roboto Mono"
<% end %>

<% fun_fact do %>
  Quando uma sequência de caracteres com aspas é injetada num outro valor através da interpolação, [suas aspas são removidas][its quotes are removed]! Isto torna fácil escrever sequências de caracteres contendo seletores, por exemplo, que pode ser injetada para regras de estilo sem adicionar aspas.

  [its quotes are removed]: ../interpolation#quoted-strings
<% end %>

<span id="unquoted"></span>
## Sem Aspas

As sequências de caracteres sem aspas são escritas como [identificadores][identifiers] de CSS, seguindo o diagrama de sintaxe abaixo. Eles podem incluir [interpolação][interpolation] em qualquer parte.

[identifiers]: https://drafts.csswg.org/css-syntax-3/#ident-token-diagram

<figure>
  <object type="image/svg+xml" data="/assets/img/illustrations/identifier-diagram.svg"></object>
  <figcaption class="copyright">Direitos de autor da Diagrama da Railroad © 2018 W3C<sup>®</sup> (MIT, ERCIM, Keio, Beihang). <a href="http://www.w3.org/Consortium/Legal/ipr-notice#Legal_Disclaimer">Responsabilidade</a>, <a href="http://www.w3.org/Consortium/Legal/ipr-notice#W3C_Trademarks">marca comercial</a> da W3C e as regras da <a href="http://www.w3.org/Consortium/Legal/2015/copyright-software-and-document">licença de documento permissiva</a> aplicam-se.
</figcaption>

<% example do %>
  @debug bold; // bold
  @debug -webkit-flex; // -webkit-flex
  @debug --123; // --123

  $prefix: ms;
  @debug -#{$prefix}-flex; // -ms-flex
  ===
  @debug bold  // bold
  @debug -webkit-flex  // -webkit-flex
  @debug --123  // --123

  $prefix: ms
  @debug -#{$prefix}-flex  // -ms-flex
<% end %>

<% heads_up do %>
  Nem todos os identificadores são analisados como sequências de caracteres sem aspas.

  * Os [nomes de cor de CSS][CSS color names] são analisados como [cores][colors].

  * `null` é analisado como [valor `null` da Sass][Sass's `null` value].

  * `true` e `false` são analisados como [booleanos][Booleans].

  * `not`, `and`, `or` são analisados como [operadores booleanos][Boolean operators].

  [CSS color names]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#Color_keywords
  [colors]: colors
  [Sass's `null` value]: null
  [Booleans]: booleans
  [Boolean operators]: ../operators/boolean

  Por causa disto, é geralmente uma boa ideia escrever sequências de caracteres com aspas a menos que estejas especificamente a escrever o valor de uma propriedade de CSS que usa sequências de caracteres sem aspas.
<% end %>

<span id="escapes-in-unquoted-strings"></span>
### Saídas em Sequências de Caracteres Sem Aspas

<% impl_status dart: '1.11.0', libsass: false, ruby: false, feature: 'Normalization' do %>
  A LibSass, Sass de Ruby, e versões antigas da Sass de Dart não normalizam as saídas nos identificadores. Ao invés disto, o texto na sequência de caracteres sem aspas é o preciso texto que o utilizador escreveu. Por exemplo, `\1F46D` e `👭` não são considerados equivalentes.
<% end %>

Quando uma sequência de caracteres sem aspas é analisada, o texto literal das saídas são analisadas como parte da sequência de caracteres. Por exemplo, `\a` é analisado como os caracteres `\`, `a`, e espaço. Para assegurar que as sequências de caracteres sem aspas que tem os mesmos significados na CSS sejam analisadas da mesma maneira, ainda que, estas saídas sejam *normalizadas*. Para cada ponto de código, ou é escapado ou não é escapado:

* Se for um carácter de identificador válido, é incluído sem ser escapado na sequência de caracteres sem aspas. Por exemplo `\1F46D` retorna a sequência de caracteres sem aspas `👭`.

* Se for um carácter imprimível que não seja uma nova linha ou uma tabulação, é incluído depois de um `\`. Por exemplo, `\21 ` retorna a sequência de caracteres sem aspas `\!`.

* De outro modo, a saída de unicode minúscula é incluída com um espaço intermédio. Por exemplo, `\7Fx` retorna a sequência de caracteres sem aspas `\7f x`.

<% example(autogen_css: false) do %>
  @use "sass:string";

  @debug \1F46D; // 👭
  @debug \21; // \!
  @debug \7Fx; // \7f x
  @debug string.length(\7Fx); // 5
  ===
  @use "sass:string"

  @debug \1F46D  // 👭
  @debug \21  // \!
  @debug \7Fx  // \7f x
  @debug string.length(\7Fx)  // 5
<% end %>

<span id="string-indexes"></span>
## Índices da Sequência de Caracteres

A Sass tem um número de [funções de sequência de caracteres][string functions] que recebem ou retornam números, chamados *índices*, que fazem referência aos caracteres numa sequência de caracteres. O índice 1 indica o primeiro carácter da sequência de caracteres. Nota que isto é diferente de muitas linguagens de programação onde os índices começam no 0! A Sass também torna fácil fazer referência ao final duma sequência de caracteres. O índice -1 faz referência ao último carácter numa sequência de caracteres, -2 faz referência ao penúltimo, e assim por diante.

[string functions]: ../modules/string

<% example(autogen_css: false) do %>
  @use "sass:string";

  @debug string.index("Helvetica Neue", "Helvetica"); // 1
  @debug string.index("Helvetica Neue", "Neue"); // 11
  @debug string.slice("Roboto Mono", -4); // "Mono"
  ===
  @use "sass:string"

  @debug string.index("Helvetica Neue", "Helvetica")  // 1
  @debug string.index("Helvetica Neue", "Neue")  // 11
  @debug string.slice("Roboto Mono", -4)  // "Mono"
<% end %>
