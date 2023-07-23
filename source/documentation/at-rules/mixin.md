---
title: "@mixin e @include"
table_of_contents: true
introduction: >
  As misturas permitem-te definir estilos que podem ser reutilizados ao longo da tua folha de estilo. Elas tornam fácil evitar o uso de classes que são semânticas como `.float-left`, e distribuir coleções dos estilos nas bibliotecas.
---

As misturas são definidas usando a regra de arroba `@mixin`, que é escrita com `@mixin <name> { ... }` ou `@mixin name(<arguments...>) { ... }`. Um nome de mistura pode ser qualquer identificador de Sass, e pode conter qualquer [declaração][statement] exceto [declarações de alto nível][top-level statements]. Elas podem ser usada para encapsular os estilos que podem ser reduzidos numa única [regra de estilo][style rule]; elas podem conter regras de estilo de si mesmas que podem ser encaixadas em outras regras de estilos ou incluídas no alto nível da folha de estilo; ou podem apenas servir para modificar variáveis.

[statement]: /documentation/syntax/structure#statements
[top-level statements]: /documentation/syntax/structure#top-level-statements
[style rule]: /documentation/style-rules

As misturas são incluídas no contexto atual usando a regra de arroba `@include`, que é escrita com `@include <name>` ou `@include <name>(<arguments...>)`, com o nome da mistura sendo incluído:

{% codeExample 'mixin-include' %}
  @mixin reset-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  @mixin horizontal-list {
    @include reset-list;

    li {
      display: inline-block;
      margin: {
        left: -2px;
        right: 2em;
      }
    }
  }

  nav ul {
    @include horizontal-list;
  }
  ===
  @mixin reset-list
    margin: 0
    padding: 0
    list-style: none


  @mixin horizontal-list
    @include reset-list

    li
      display: inline-block
      margin:
        left: -2px
        right: 2em




  nav ul
    @include horizontal-list
{% endcodeExample %}

{% funFact %}
  Os nomes de mistura, tal como todos os identificadores de Sass, tratam hiféns e sublinhados da mesma maneira. Isto significa que `reset-list` e `reset_list` ambas fazem referência à mesma mistura. Isto é um atraso histórico desde os primeiros dias da Sass, quando *apenas* permitia sublinhados como nomes de identificador. Uma vez que a Sass adicionou suporte para hífenes para corresponder a sintaxe da CSS, os dois foram tornados equivalentes para tornar a migração mais fácil.
{% endfunFact %}

## Argumentos {#arguments}

{% comment %}
  When changing this section, don't forget to change the function arguments section as well!
{% endcomment %}

As misturas também podem receber argumentos, o que permite que o seu comportamento seja personalizado cada vez que forem chamadas. Os argumentos são especificados na regra `@mixin` depois do nome da mistura, como uma lista de nomes de variáveis envolvidos por parênteses. A mistura deve então ser incluída com o mesmo número de argumentos na forma de [expressões de SassScript][SassScript expressions]. Os valores destas expressões estão disponíveis dentro do corpo da mistura de acordo com as variáveis correspondentes:

[SassScript expressions]: /documentation/syntax/structure#expressions

{% codeExample 'mixin-arguments' %}
  @mixin rtl($property, $ltr-value, $rtl-value) {
    #{$property}: $ltr-value;

    [dir=rtl] & {
      #{$property}: $rtl-value;
    }
  }

  .sidebar {
    @include rtl(float, left, right);
  }
  ===
  @mixin rtl($property, $ltr-value, $rtl-value)
    #{$property}: $ltr-value

    [dir=rtl] &
      #{$property}: $rtl-value



  .sidebar
    @include rtl(float, left, right)
{% endcodeExample %}

{% funFact %}
  As listas de argumentos também podem ter vírgulas finais! Isto torna mais fácil evitar erros de sintaxe quando refazes as tuas folhas de estilo.
{% endfunFact %}

### Argumentos Opcionais {#optional-arguments}

Normalmente, todo argumento que uma mistura declara deve ser passado quando esta mistura for incluída. No entanto, podes tornar um argumento opcional definindo um *valor padrão* que será usado se este argumento não for passado. Os valores padrão usam a mesma sintaxe que as [declarações de variáveis][variable declarations]: o nome da variável, seguido por dois pontos e uma [expressão de SassScript][SassScript expression]. Isto torna fácil definir APIs de mistura flexíveis que podem ser usadas de maneiras simples ou complexas:

[variable declarations]: /documentation/variables
[SassScript expression]: /documentation/syntax/structure#expressions

{% codeExample 'optional-arguments' %}
  @mixin replace-text($image, $x: 50%, $y: 50%) {
    text-indent: -99999em;
    overflow: hidden;
    text-align: left;

    background: {
      image: $image;
      repeat: no-repeat;
      position: $x $y;
    }
  }

  .mail-icon {
    @include replace-text(url("/images/mail.svg"), 0);
  }
  ===
  @mixin replace-text($image, $x: 50%, $y: 50%)
    text-indent: -99999em
    overflow: hidden
    text-align: left

    background:
      image: $image
      repeat: no-repeat
      position: $x $y

  .mail-icon
    @include replace-text(url("/images/mail.svg"), 0)
{% endcodeExample %}

{% funFact %}
  Os valores padrão podem ser qualquer expressão de SassScript, e podem mesmo fazer referência à argumentos anteriores!
{% endfunFact %}

### Argumentos de Palavra-Chave {#keyword-arguments}

Quando uma mistura é incluída, os argumentos podem ser passados pelo nome além de passá-los pelas suas posições na lista de argumento. Isto é especialmente útil para misturas com vários argumentos opcionais, ou com argumentos [booleanos][boolean] cujos significados não são óbvios sem um nome ir com eles. Os argumentos de palavra-chave usa a mesma sintaxe que as [declarações de variáveis][variable declarations] e [argumentos opcionais][optional arguments]:

[variable declarations]: /documentation/variables
[boolean]: /documentation/values/booleans
[optional arguments]: #optional-arguments

{% codeExample 'keyword-arguments' %}
  @mixin square($size, $radius: 0) {
    width: $size;
    height: $size;

    @if $radius != 0 {
      border-radius: $radius;
    }
  }

  .avatar {
    @include square(100px, $radius: 4px);
  }
  ===
  @mixin square($size, $radius: 0)
    width: $size
    height: $size

    @if $radius != 0
      border-radius: $radius



  .avatar
    @include square(100px, $radius: 4px)
{% endcodeExample %}

{% headsUp %}
  Uma vez que *qualquer* argumento pode ser passado pelo nome, seja cuidadoso quando renomeares os argumentos duma mistura... pode quebrar os teus utilizadores! Pode ser prestável manter o nome antigo por perto como um [argumento opcional][optional argument] por enquanto e imprimir um [aviso][warning] se alguém passá-lo, assim sabem que devem migrar para o novo argumento.

  [optional argument]: #optional-arguments
  [warning]: /documentation/at-rules/warn
{% endheadsUp %}

### Recebendo Argumentos Arbitrários {#taking-arbitrary-arguments}

Algumas vezes é útil para uma mistura ser capaz de receber qualquer número de argumentos. Se o último argumento numa declaração de `@mixin` terminar em `...`, então todos argumentos adicionais para esta mistura são passado para este argumento como uma [lista][list]. Este argumento é conhecido como uma [lista de argumento][argument list]:

[list]: /documentation/values/lists
[argument list]: /documentation/values/lists#argument-lists

{% codeExample 'arbitrary-arguments' %}
  @mixin order($height, $selectors...) {
    @for $i from 0 to length($selectors) {
      #{nth($selectors, $i + 1)} {
        position: absolute;
        height: $height;
        margin-top: $i * $height;
      }
    }
  }

  @include order(150px, "input.name", "input.address", "input.zip");
  ===
  @mixin order($height, $selectors...)
    @for $i from 0 to length($selectors)
      #{nth($selectors, $i + 1)}
        position: absolute
        height: $height
        margin-top: $i * $height




  @include order(150px, "input.name", "input.address", "input.zip")
{% endcodeExample %}

#### Recebendo Argumentos de Palavra-Chave Arbitrários {#taking-arbitrary-keyword-arguments}

As listas de argumentos também podem ser usadas para receber argumentos de palavra-chave arbitrários. A [função `meta.keywords()`][`meta.keywords()` function] recebe uma lista de argumento e retorna quaisquer palavras-chave adicionais que foram passadas para a mistura como um [mapa][map] a partir dos nomes de argumento (sem incluir `$`) à estes valores dos argumentos:

[`meta.keywords()` function]: /documentation/modules/meta#keywords
[map]: /documentation/values/maps

{% render 'code_snippets/example-mixin-arbitrary-keyword-arguments' %}

{% funFact %}
  Se nunca passares um argumento de lista à [função `meta.keywords()`][`meta.keywords()` function], esta lista de argumento não permitirá argumentos de palavra-chave adicionais. Isto ajuda os chamadores da tua mistura a certificarem-se de que não escreveram mal acidentalmente quaisquer nomes.

 [`meta.keywords()` function]: /documentation/modules/meta#keywords
{% endfunFact %}

#### Passando Argumentos Arbitrários {#passing-arbitrary-arguments}

Tais como as listas de argumentos permitem as misturas receber argumentos posicionais arbitrários ou de palavra-chave, a mesma sintaxe pode ser usada para *passar* argumentos posicionais e de palavra-chave à uma mistura. Se passares uma lista seguida por `...` como último argumento duma inclusão, os seus elementos serão tratados como argumentos posicionais adicionais. De maneira semelhante, um mapa seguido por `...` será tratado como argumentos de palavra-chave adicionais. Tu podes mesmo passar ambos duma vez!

{% codeExample 'passing-arbitrary-arguments', false %}
  $form-selectors: "input.name", "input.address", "input.zip" !default;

  @include order(150px, $form-selectors...);
  ===
  $form-selectors: "input.name", "input.address", "input.zip" !default

  @include order(150px, $form-selectors...)
{% endcodeExample %}

{% funFact %}
  Uma vez que uma [lista de argumento][argument list] continua a rastrear os argumentos posicionais e de palavra-chave, use-a para passar ambos duma vez à uma outra mistura. Isto torna super fácil definir um pseudónimo para uma mistura!

  [argument list]: /documentation/values/lists#argument-lists

  {% codeExample 'passing-arbitrary-arguments-fun-fact' %}
    @mixin btn($args...) {
      @warn "The btn() mixin is deprecated. Include button() instead.";
      @include button($args...);
    }
    ===
    @mixin btn($args...)
      @warn "The btn() mixin is deprecated. Include button() instead."
      @include button($args...)
  {% endcodeExample %}
{% endfunFact %}

## Blocos de Conteúdo {#content-blocks}

Além de receber argumentos, uma mistura pode receber um bloco inteiro de estilos, conhecido como um *bloco de conteúdo*. Uma mistura pode declarar que recebe um bloco de conteúdo incluindo a regra de arroba `@content` no seu corpo. O bloco de conteúdo é passado usando chavetas como qualquer outro bloco na Sass, e é injetado no lugar da regra `@content`:

{% codeExample 'content-blocks' %}
  @mixin hover {
    &:not([disabled]):hover {
      @content;
    }
  }

  .button {
    border: 1px solid black;
    @include hover {
      border-width: 2px;
    }
  }
  ===
  @mixin hover
    &:not([disabled]):hover
      @content



  .button
    border: 1px solid black
    @include hover
      border-width: 2px
{% endcodeExample %}

{% funFact %}
  Um mistura pode incluir várias regras de arroba `@content`. Se o fizer, o bloco de conteúdo será incluído separadamente para cada `@content`.
{% endfunFact %}

{% headsUp %}
  Um bloco de conteúdo é *lexicalmente isolado*, o que significa que apenas pode ver [variáveis locais][local variables] no âmbito onde a mistura está incluída. Não pode ver quaisquer variáveis que são definidas onde a mistura é passada, mesmo se forem definidas antes do bloco de conteúdo ser invocado.

  [local variables]: /documentation/variables#scope
{% endheadsUp %}

### Passando Argumentos aos Blocos de Conteúdo {#passing-arguments-to-content-blocks}

{% compatibility 'dart: "1.15.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

Uma mistura pode passar argumentos ao seu bloco de conteúdo da mesma maneira que passaria argumentos à uma outra mistura escrevendo `@content(<arguments...>)`. O utilizador escrevendo o bloco de conteúdo pode aceitar argumentos escrevendo `@include <name> using (<arguments...>)`. A lista de argumentos para um bloco de conteúdo funciona tal como uma lista de argumento duma mistura, e os argumentos passados para ele por `@content` funcionam tal como a passagem de argumentos à uma mistura.

{% headsUp %}
  Se uma mistura passar argumentos ao seu bloco de conteúdo, este bloco de conteúdo *deve* declarar que aceita estes argumentos. Isto significa que é uma boa ideia apenas passar argumentos por posição (ao invés por nome), e significa que a passagem de mais argumentos é uma mudança de rutura.

  Se quiseres ser flexível em qual informação passas para um bloco de conteúdo, considere passar um [mapa][map] que contém informação que talvez precise!

  [map]: /documentation/values/maps
{% endheadsUp %}

{% codeExample 'passing-arguments-to-content-blocks' %}
  @mixin media($types...) {
    @each $type in $types {
      @media #{$type} {
        @content($type);
      }
    }
  }

  @include media(screen, print) using ($type) {
    h1 {
      font-size: 40px;
      @if $type == print {
        font-family: Calluna;
      }
    }
  }
  ===
  @mixin media($types...)
    @each $type in $types
      @media #{$type}
        @content($type)




  @include media(screen, print) using ($type)
    h1
      font-size: 40px
      @if $type == print
        font-family: Calluna
{% endcodeExample %}

## Sintaxe de Mistura Indentada {#indented-mixin-syntax}

A [sintaxe indentada][indented syntax] tem uma sintaxe especial para definir e usar misturas, além da padrão `@mixin` e `@include`. As misturas são definidas usando o carácter `=`, e são incluídas usando `+`. Embora esta sintaxe seja mais concisa, é também mais difícil de entender a primeira vista e os utilizadores são encorajados a evitá-la:

[indented syntax]: /documentation/syntax#the-indented-syntax

{% codeExample 'indented-syntax', true, 'sass' %}
  =reset-list
    margin: 0
    padding: 0
    list-style: none

  =horizontal-list
    +reset-list

    li
      display: inline-block
      margin:
        left: -2px
        right: 2em

  nav ul
    +horizontal-list
{% endcodeExample %}
