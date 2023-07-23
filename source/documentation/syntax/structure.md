---
title: Estrutura duma Folha de Estilo
table_of_contents: true
introduction: >
  Tal como na CSS, a maioria das folhas de estilos da Sass são principalmente compostas por regras de estilo que contém declarações de propriedade. Mas as folhas de estilos de Sass têm muito mais funcionalidades que podem existir junto destes.
---

<span id="statements"></span>
## Declarações

Um folha de estilo de Sass é composta por uma série de *declarações*, que são avaliadas em ordem para construir a CSS resultante. Algumas declarações podem ter *blocos*, definidos usando `{` e `}`, que contém outras declarações. Por exemplo, uma regra de estilo é uma declaração com um bloco. Este bloco contém outras declarações, tais como declarações de propriedade.

Na SCSS, as declarações são separadas por pontos e vírgulas (que são opcionais se a declaração usar um bloco). Na sintaxe indentada, são apenas separados por novas linhas.

<span id="universal-statements"></span>
### Declarações Universais

Estes tipos de declarações podem ser usadas em qualquer parte numa folha de estilo de Sass:

* [Declarações de variável](../variables), como `$var: value`.

* [Regras de arroba de controlo de fluxo](../at-rules/control), como `@if` e `@each`.

* As regras [`@error`](../at-rules/error), [`@warn`](../at-rules/warn), e [`@debug`](../at-rules/debug).

<span id="css-statements"></span>
### Declarações de CSS

Estas declarações produzem CSS. Elas podem ser usadas em qualquer parte exceto dentro numa `@function`:

* [Regras de estilo](../style-rules), como `h1 { /* ... */ }`.

* [Regras de CSS que usam arroba](../at-rules/css), como `@media` e `@font-face`.

* [Usos de mistura](../at-rules/mixin) usando `@include`.

* A [regra `@at-root`](../at-rules/at-root).

<span id="top-level-statements"></span>
### Declarações de Alto Nível

Estas declarações apenas podem ser usadas no início duma folha de estilo, ou encaixadas dentro numa declaração de CSS no início:

* [Carregamentos de módulo](../at-rules/use), usando `@use`.

* [Importações](../at-rules/import), usando `@import`.

* [Definições de mistura](../at-rules/mixin) usando `@mixin`.

* [Definições de função](../at-rules/function) usando `@function`.

<span id="other-statements"></span>
### Outras Declarações

* [Definições de propriedade](../style-rules/declarations) como `width: 100px` apenas podem ser usadas dentro de regras de estilo e algumas regras que usam arroba de CSS.

* A [regra `@extend`](../at-rules/extend) apenas pode ser usada dentro das folhas de estilo.

<span id="expressions"></span>
## Expressões

Uma *expressão* é qualquer coisa que fica no lado direito duma propriedade ou declaração de variável. Cada expressão produz um *[valor][value]*. Qualquer valor de propriedade de CSS válido também é uma expressão de Sass, mas expressões de Sass são muito mais poderosas do que valores de CSS simples. São passadas como argumentos para [misturas][mixins] e [funções][functions], usada pelo controlo de fluxo com a [regra `@if`][`@if` rule], e manipuladas usando [aritmética][arithmetic]. Nós chamamos a sintaxe de expressão da Sass de *SassScript*.

[value]: ../values
[mixins]: ../at-rules/mixin
[functions]: ../at-rules/function
[`@if` rule]: ../at-rules/control/if
[arithmetic]: ../operators/numeric

<span id="literals"></span>
### Literais

As expressões mais simples apenas representam valores estáticos:

* [Números](../values/numbers), que podem ou não ter unidades, como `12` ou `100px`.

* [Sequências de Caracteres](../values/strings), que podem ou não ter aspas, como `"Helvetica Neue"` ou `bold`.

* [Cores](../values/colors), que podem ser referenciadas pelas suas representações hexadecimal ou pelo nome, como `#c6538c` ou `blue`.

* O literais de [booleano](../values/booleans) `true` ou `false`.

* O [`null`](../values/null).

* [Listas de valores](../values/lists), que podem ser separados por espaços ou vírgulas e que podem ser cercadas ou não em parênteses retos, como `1.5em 1em 0 2em`, `Helvetica, Arial, sans-serif`, ou `[col1-start]`.

* [Mapas](../values/maps) que associam valores com chaves, como `("background": red, "foreground": pink)`.

<span id="operations"></span>
### Operações

A Sass define a sintaxe para um número de operações:

<%= partial 'documentation/snippets/operator-list', locals: {parens: true} %>

<span id="other-expressions"></span>
### Outras Expressões

* [Variáveis](../variables), como `$var`.

* [Chamadas de função](../at-rules/function), como `nth($list, 1)` ou `var(--main-bg-color)`, que podem chamar funções da biblioteca do núcleo da Sass ou funções definidas pelo utilizador, ou que podem ser compiladas diretamente para CSS.

* [Funções especiais](special-functions), como `calc(1px + 100%)` ou `url(http://myapp.com/assets/logo.png)`, que têm suas próprias únicas regras de analise.

* [O seletor de pai](../style-rules/parent-selector), `&`.

* O valor `!important`, que analisado como sequência de caracteres sem aspas.
