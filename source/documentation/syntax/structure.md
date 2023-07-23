---
title: Estrutura duma Folha de Estilo
table_of_contents: true
introduction: >
  Tal como na CSS, a maioria das folhas de estilos da Sass são principalmente compostas por regras de estilo que contém declarações de propriedade. Mas as folhas de estilos de Sass têm muito mais funcionalidades que podem existir junto destes.
---

## Declarações {#statements}

Um folha de estilo de Sass é composta por uma série de *declarações*, que são avaliadas em ordem para construir a CSS resultante. Algumas declarações podem ter *blocos*, definidos usando `{` e `}`, que contém outras declarações. Por exemplo, uma regra de estilo é uma declaração com um bloco. Este bloco contém outras declarações, tais como declarações de propriedade.

Na SCSS, as declarações são separadas por pontos e vírgulas (que são opcionais se a declaração usar um bloco). Na sintaxe indentada, são apenas separados por novas linhas.

### Declarações Universais {#universal-statements}

Estes tipos de declarações podem ser usadas em qualquer parte numa folha de estilo de Sass:

* [Declarações de variável](/documentation/variables), como `$var: value`.

* [Regras de arroba de controlo de fluxo](/documentation/at-rules/control), como `@if` e `@each`.

* As regras [`@error`](/documentation/at-rules/error), [`@warn`](/documentation/at-rules/warn), e [`@debug`](/documentation/at-rules/debug).

### Declarações de CSS {#css-statements}

Estas declarações produzem CSS. Elas podem ser usadas em qualquer parte exceto dentro numa `@function`:

* [Regras de estilo](/documentation/style-rules), como `h1 { /* ... */ }`.

* [Regras de CSS que usam arroba](/documentation/at-rules/css), como `@media` e `@font-face`.

* [Usos de mistura](/documentation/at-rules/mixin) usando `@include`.

* A [regra `@at-root`](/documentation/at-rules/at-root).

### Declarações de Alto Nível {#top-level-statements}

Estas declarações apenas podem ser usadas no início duma folha de estilo, ou encaixadas dentro numa declaração de CSS no início:

* [Carregamentos de módulo](/documentation/at-rules/use), usando `@use`.

* [Importações](/documentation/at-rules/import), usando `@import`.

* [Definições de mistura](/documentation/at-rules/mixin) usando `@mixin`.

* [Definições de função](/documentation/at-rules/function) usando `@function`.

### Outras Declarações {#other-statements}

* [Definições de propriedade](/documentation/style-rules/declarations) como `width: 100px` apenas podem ser usadas dentro de regras de estilo e algumas regras que usam arroba de CSS.

* A [regra `@extend`](/documentation/at-rules/extend) apenas pode ser usada dentro das folhas de estilo.

## Expressões {#expressions}

Uma *expressão* é qualquer coisa que fica no lado direito duma propriedade ou declaração de variável. Cada expressão produz um *[valor][value]*. Qualquer valor de propriedade de CSS válido também é uma expressão de Sass, mas expressões de Sass são muito mais poderosas do que valores de CSS simples. São passadas como argumentos para [misturas][mixins] e [funções][functions], usada pelo controlo de fluxo com a [regra `@if`][`@if` rule], e manipuladas usando [aritmética][arithmetic]. Nós chamamos a sintaxe de expressão da Sass de *SassScript*.

[value]: /documentation/values
[mixins]: /documentation/at-rules/mixin
[functions]: /documentation/at-rules/function
[`@if` rule]: /documentation/at-rules/control/if
[arithmetic]: /documentation/operators/numeric

### Literais {#literals}

As expressões mais simples apenas representam valores estáticos:

* [Números](/documentation/values/numbers), que podem ou não ter unidades, como `12` ou `100px`.

* [Sequências de Caracteres](/documentation/values/strings), que podem ou não ter aspas, como `"Helvetica Neue"` ou `bold`.

* [Cores](/documentation/values/colors), que podem ser referenciadas pelas suas representações hexadecimal ou pelo nome, como `#c6538c` ou `blue`.

* O literais de [booleano](/documentation/values/booleans) `true` ou `false`.

* O [`null`](/documentation/values/null).

* [Listas de valores](/documentation/values/lists), que podem ser separados por espaços ou vírgulas e que podem ser cercadas ou não em parênteses retos, como `1.5em 1em 0 2em`, `Helvetica, Arial, sans-serif`, ou `[col1-start]`.

* [Mapas](/documentation/values/maps) que associam valores com chaves, como `("background": red, "foreground": pink)`.

### Operações {#operations}

A Sass define a sintaxe para um número de operações:

{% render 'doc_snippets/operator-list', parens: true %}

### Outras Expressões {#other-expressions}

* [Variáveis](/documentation/variables), como `$var`.

* [Chamadas de função](/documentation/at-rules/function), como `nth($list, 1)` ou `var(--main-bg-color)`, que podem chamar funções da biblioteca do núcleo da Sass ou funções definidas pelo utilizador, ou que podem ser compiladas diretamente para CSS.

* [Funções especiais](/documentation/syntax/special-functions), como `calc(1px + 100%)` ou `url(http://myapp.com/assets/logo.png)`, que têm suas próprias únicas regras de analise.

* [O seletor de pai](/documentation/style-rules/parent-selector), `&`.

* O valor `!important`, que analisado como sequência de caracteres sem aspas.
