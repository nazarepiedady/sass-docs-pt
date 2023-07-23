---
title: "@function"
table_of_contents: true
introduction: >
  As funções permitem-te definir operações complexas sobre os [valores da SassScript](/documentation/values) que podes reutilizar ao longo da tua folha de estilo. Elas tornam fácil abstrair fórmulas e comportamentos de uma maneira legível.
---

As funções são definidas usando a regra que usa arroba `@function`, que é escrita como `@function <name>(<arguments...>) { ... }`. Um nome de função pode ser qualquer identificador de Sass. Também podem conter [declarações universais][universal statements], bem como a [regra que usa arroba `@return`][`@return` at-rule] que indica o valor à usar como resultado da chamada da função. As funções são chamadas usando a sintaxe de função de CSS normal.

[universal statements]: /documentation/syntax/structure#universal-statements
[`@return` at-rule]: #return

{% codeExample 'functions' %}
  @function pow($base, $exponent) {
    $result: 1;
    @for $_ from 1 through $exponent {
      $result: $result * $base;
    }
    @return $result;
  }

  .sidebar {
    float: left;
    margin-left: pow(4, 3) * 1px;
  }
  ===
  @function pow($base, $exponent)
    $result: 1
    @for $_ from 1 through $exponent
      $result: $result * $base

    @return $result


  .sidebar
    float: left
    margin-left: pow(4, 3) * 1px
{% endcodeExample %}

{% funFact %}
  Os nomes de função, como todos os identificadores de Sass, tratam os hífens e sublinhados como iguais. Isto significa que `scale-color` e `scale_color` ambos fazem referência a mesma função. Isto é um atraso histórico desde os primeiros dias da Sass, quando *apenas* permitia sublinhados nos nomes de identificador. Assim que a Sass adicionou suporte para hífens para corresponder a sintaxe da CSS, os dois foram tornados equivalentes para tornar a migração mais fácil.
{% endfunFact %}

{% headsUp %}
  Embora seja tecnicamente possível para funções ter efeitos colaterais como definir [variáveis globais][global variables], isto é fortemente desencorajado. Use [misturas][mixins] para efeitos colaterais, e use funções para calcular valores.

  [global variables]: /documentation/variables#scope
  [mixins]: /documentation/at-rules/mixin
{% endheadsUp %}

## Argumentos {#arguments}

{% comment %}
  When changing this section, don't forget to change the mixin arguments section as well!
{% endcomment %}

Os argumentos permitem que o comportamento das funções sejam personalizados cada vez que forem chamadas. Os argumentos são especificados na regra `@function` depois do nome da função, como uma lista de nomes de variável entre parênteses. A função deve ser chamada com o mesmo número de argumentos na forma de [expressões de SassScript][SassScript expressions]. Os valores destas expressões estão disponíveis dentro do corpo da função de acordo com as variáveis correspondentes.

[SassScript expressions]: /documentation/syntax/structure#expressions

{% funFact %}
  As listas de argumentos também podem ter vírgulas finais! Isto torna mais fácil evitar erros de sintaxe ao refatorar as tuas folhas de estilo.
{% endfunFact %}

### Argumentos Opcionais {#optional-arguments}

Normalmente, cada argumento que uma função declara deve ser passado quando esta função for incluída. No entanto, podes criar um argumento opcional definindo um *valor padrão* que será usado se aquele argumento não for passado. Os valores padrão usam a mesma sintaxe de [declarações de variáveis][variable declarations]: o nome da variável, seguido por um sinal de dois pontos e uma [expressão de SassScript][SassScript expression]. Isto torna fácil definir APIs de função flexíveis que podem ser usadas de maneiras simples ou complexas:

[variable declarations]: /documentation/variables
[SassScript expression]: /documentation/syntax/structure#expressions

{% codeExample 'optional-arguments' %}
  @function invert($color, $amount: 100%) {
    $inverse: change-color($color, $hue: hue($color) + 180);
    @return mix($inverse, $color, $amount);
  }

  $primary-color: #036;
  .header {
    background-color: invert($primary-color, 80%);
  }
  ===
  @function invert($color, $amount: 100%)
    $inverse: change-color($color, $hue: hue($color) + 180)
    @return mix($inverse, $color, $amount)


  $primary-color: #036
  .header
    background-color: invert($primary-color, 80%)
{% endcodeExample %}

{% funFact %}
  Os valores padrão podem ser qualquer expressão de SassScript, e podem até fazer referência à argumentos anteriores!
{% endfunFact %}

### Argumentos de Palavra-Chave {#keyword-arguments}

Quando uma função for chamada, os argumentos podem ser passados conforme o nome além de passá-los conforme sua posição na lista de argumento. Isto é especialmente útil para funções com vários argumentos opcionais, ou com argumentos [booleanos][boolean] cujos significados não são óbvios sem um nome ir com eles. Os argumentos de palavra-chave usam a mesma sintaxe de [declarações de variável][variable declarations] e [argumentos opcionais][optional arguments]:

[variable declarations]: /documentation/variables
[boolean]: /documentation/values/booleans
[optional arguments]: #optional-arguments

{% codeExample 'keyword-arguments' %}
  $primary-color: #036;
  .banner {
    background-color: $primary-color;
    color: scale-color($primary-color, $lightness: +40%);
  }
  ===
  $primary-color: #036
  .banner
    background-color: $primary-color
    color: scale-color($primary-color, $lightness: +40%)
{% endcodeExample %}

{% headsUp %}
  Uma vez que *qualquer* argumento pode ser passado pelo nome, tenha cuidado quando renomear os argumentos duma função... isto pode quebrar os teus utilizadores! Pode ser útil manter o nome antigo por perto como um [argumento opcional][optional argument] por uns tempos e imprimir um [aviso][warning] se alguém passá-lo, assim sabem para migrar para um novo argumento.

  [optional argument]: #optional-arguments
  [warning]: /documentation/at-rules/warn
{% endheadsUp %}

### Recebendo Argumentos Arbitrários {#taking-arbitrary-arguments}

Algumas vezes é útil para uma função ser capaz de receber qualquer número de argumentos. Se o último argumento numa declaração de `@function` terminar em `...`, então todos os argumentos adicionais para aquela função são passados para aquele argumento como uma [lista][list]. Este argumento é conhecido como uma [lista de argumento][argument list]:

[list]: /documentation/values/lists
[argument list]: /documentation/values/lists#argument-lists

{% codeExample 'taking-arbitrary-arguments' %}
  @function sum($numbers...) {
    $sum: 0;
    @each $number in $numbers {
      $sum: $sum + $number;
    }
    @return $sum;
  }

  .micro {
    width: sum(50px, 30px, 100px);
  }
  ===
  @function sum($numbers...)
    $sum: 0
    @each $number in $numbers
      $sum: $sum + $number

    @return $sum


  .micro
    width: sum(50px, 30px, 100px)
{% endcodeExample %}

#### Recebendo Argumentos de Palavra-Chave Arbitrários {#taking-arbitrary-keyword-arguments}

As listas de argumentos também podem ser usadas para receber argumentos de palavra-chave arbitrários. A [função `meta.keywords()`][`meta.keywords()` function] recebe uma lista de argumento e retorna quaisquer palavras-chaves adicionais que foram passadas para a função como [mapa][map] a partir dos nomes de argumento (sem incluir `$`) para aqueles valores dos argumentos.

[`meta.keywords()` function]: /documentation/modules/meta#keywords
[map]: /documentation/values/maps

{% funFact %}
  Se nunca passares uma lista de argumento para a [função `meta.keywords()`][`meta.keywords()` function], esta lista de argumento não permitirá argumentos de palavra-chave adicionais. Isto ajuda os chamadores da tua função a certificarem-se de que não escreveram acidentalmente incorretamente quaisquer nomes de argumento.

  [`meta.keywords()` function]: /documentation/modules/meta#keywords
{% endfunFact %}

#### Passando Argumentos Arbitrários {#passing-arbitrary-arguments}

Tal como as listas de argumentos permitem funções receber argumentos posicionais ou de palavra-chave arbitrários, a mesma sintaxe pode ser usada para *passar* argumentos posicionais e de palavra-chave para uma função. Se passares uma lista seguida por `...` como último argumento duma chamada de função, seus elementos serão tratados como argumentos posicionais adicionais. Similarmente, um mapa seguido por `...` será tratado como argumentos de palavra-chave adicionais. Tu podes até mesmo passar ambos de uma vez!

{% codeExample 'passing-arbitrary-arguments' %}
  $widths: 50px, 30px, 100px;
  .micro {
    width: min($widths...);
  }
  ===
  $widths: 50px, 30px, 100px
  .micro
    width: min($widths...)
{% endcodeExample %}

{% funFact %}
  Uma vez que uma [lista de argumento][argument list] preserva o rastro de ambos argumentos posicionais e de palavra-chave, use-a para passar ambos de uma vez para uma outra função. Isto torna muitíssimo fácil definir um pseudónimo para uma função!

  [argument list]: /documentation/values/lists#argument-lists

  {% codeExample 'passing-arbitrary-arguments-fun-fact' %}
    @function fg($args...) {
      @warn "The fg() function is deprecated. Call foreground() instead.";
      @return foreground($args...);
    }
    ===
    @function fg($args...)
      @warn "The fg() function is deprecated. Call foreground() instead."
      @return foreground($args...)
  {% endcodeExample %}
{% endfunFact %}

## `@return` {#return}

A regra de arroba `@return` indica o valor à usar como resultado da chamada duma função. É apenas permitido dentro dum corpo de `@function`, e cada `@function` deve terminar com uma `@return`.

Quando uma `@return` for encontrada, termina imediatamente a função e retorna o seu resultado. Retornar cedo pode ser útil para manipular casos extremos ou casos onde um algoritmo mais eficiente estiver disponível sem embrulhar a função inteira num [bloco `@else`][`@else` block]:

[`@else` block]: control/if#else

{% codeExample 'return', false %}
  @use "sass:string";

  @function str-insert($string, $insert, $index) {
    // Avoid making new strings if we don't need to.
    @if string.length($string) == 0 {
      @return $insert;
    }

    $before: string.slice($string, 0, $index);
    $after: string.slice($string, $index);
    @return $before + $insert + $after;
  }
  ===
  @use "sass:string"

  @function str-insert($string, $insert, $index)
    // Avoid making new strings if we don't need to.
    @if string.length($string) == 0
      @return $insert


    $before: string.slice($string, 0, $index)
    $after: string.slice($string, $index)
    @return $before + $insert + $after
{% endcodeExample %}

## Outras Funções {#other-functions}

Além da função definida pelo utilizador, a Sass fornece uma sólida [biblioteca principal][core library] de funções embutidas que estão sempre disponíveis para uso. As implementações de Sass também tornam possível definir [funções personalizadas][custom functions] na linguagem hospedeira. E claro, sempre podes chamar [funções de CSS simples][plain CSS functions] (mesmo aquelas com [sintaxe esquisita][weird syntax]).

[core library]: /documentation/modules
[custom functions]: /documentation/js-api/interfaces/LegacySharedOptions#functions
[plain CSS functions]: #plain-css-functions
[weird syntax]: /documentation/syntax/special-functions

### Funções de CSS Simples {#plain-css-functions}

Qualquer chamada de função que não for duma função definida pelo utilizador ou [embutida](/documentation/modules) é compilada para uma função de CSS simples (a menos que use a [sintaxe de argumento da Sass](/documentation/at-rules/function/#arguments)). Os argumentos serão compilados para a CSS e incluídos como está na chamada de função. Isto garante que a Sass suporta todas as funções de CSS sem precisar de lançar novas versões toda vez que uma nova for adicionada:

{% codeExample 'plain-css-functions', false %}
  @debug var(--main-bg-color); // var(--main-bg-color)

  $primary: #f2ece4;
  $accent: #e1d7d2;
  @debug radial-gradient($primary, $accent); // radial-gradient(#f2ece4, #e1d7d2)
  ===
  @debug var(--main-bg-color)  // var(--main-bg-color)

  $primary: #f2ece4
  $accent: #e1d7d2
  @debug radial-gradient($primary, $accent)  // radial-gradient(#f2ece4, #e1d7d2)
{% endcodeExample %}

{% headsUp %}
  Uma vez que nenhuma função desconhecida será compilada para CSS, é fácil não reparar em quando escreves incorretamente nome duma função. Considere executar uma [analisador de código de CSS][CSS linter] no resultado da tua folha de estilo para seres notificado quando isto acontecer!

  [CSS linter]: https://stylelint.io/
{% endheadsUp %}

{% funFact %}
  Algumas funções de CSS, como `calc()` e `element()` têm sintaxe invulgar. A Sass [analisa estas funções especialmente][parses these functions specially] como [sequências de caracteres sem aspas][unquoted strings].

  [parses these functions specially]: /documentation/syntax/special-functions
  [unquoted strings]: /documentation/values/strings#unquoted
{% endfunFact %}
