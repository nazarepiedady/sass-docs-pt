---
title: Cálculos
introduction: >
  Os cálculos são como a Sass representa a função `calc()`, bem como funções parecidas como `clamp()`, `min()`, e `max()`. A Sass simplificará estas o quanto for possível, mesmo se forem combinadas com uma outra.
---

{% compatibility 'dart: "1.40.0"', 'libsass: false', 'ruby: false' %}
  A LibSass, Sass de Ruby, e versões de Sass de Dart anteriores a 1.40.0 analisam a `calc()` como uma [função especial][special function] como `element()`.

  A LibSass, Sass de Ruby, e versões de Sass de Dart anteriores a 1.31.0 analisam `clamp()` como uma [função de CSS simples][plain CSS function] ao invés de suportar sintaxe especial dentro dela. As versões da Sass de Dart entre 1.31.0 e 1.40.0 analisam a `clamp` como uma [função especial][special function] como `element()`.

  [plain CSS function]: /documentation/syntax/special-functions#element-progid-and-expression
  [special function]: /documentation/at-rules/function/#plain-css-functions
{% endcompatibility %}

{% codeExample 'calculations', false %}
  @debug calc(400px + 10%); // calc(400px + 10%)
  @debug calc(400px / 2); // 200px
  @debug min(100px, calc(1rem + 10%)); // min(100px, 1rem + 10%)
  ===
  @debug calc(400px + 10%)  // calc(400px + 10%)
  @debug calc(400px / 2)  // 200px
  @debug min(100px, calc(1rem + 10%) ; // min(100px, 1rem + 10%)
{% endcodeExample %}

Os cálculos usam uma sintaxe especial que é diferente da SassScript normal. É a mesma sintaxe da `calc()` de CSS, mas com habilidade adicional para usar [variáveis de Sass][Sass variables] e chamar [funções de Sass][Sass functions]. Isto significa que `/` é sempre um operador de divisão dentro dum cálculo!

[Sass variables]: /documentation/variables
[Sass functions]: /documentation/modules

{% funFact %}
  Os argumentos para uma chamada de função de Sass usam a sintaxe de Sass normal, ao invés da sintaxe de cálculo especial!
{% endfunFact %}

Tu podes também usar a [interpolação][interpolation] num cálculo. No entanto, se fizeres, nada dentro dos parênteses que envolve esta interpolação será simplificado ou verificado o seu tipo, assim é fácil terminar com CSS verboso a mais ou mesmo inválido. No lugar de escrever `calc(10px + #{$var})`, apenas escreva `calc(10px + $var)`!

[interpolation]: /documentation/interpolation

## Simplificação {#simplification}

A Sass simplificará as operações adjacentes nos cálculos se usarem unidades que podem ser combinadas em tempo de compilação, tais como `1in + 10px` ou `5s * 2`. Se possível, até mesmo simplificará o cálculo inteiro para um único número — por exemplo, `clamp(0px, 30px, 20px)` retornará `20px`.

{% headsUp %}
  Isto significa que uma expressão de cálculo não retornarão sempre necessariamente um cálculo! Se estiveres a escrever uma biblioteca de Sass, podes sempre usar a função [`meta.type-of()`] para determinar com qual tipo estás a lidar.

 [`meta.type-of()`]: /documentation/modules/meta#type-of
{% endheadsUp %}

Os cálculos também serão simplificados dentro de outros cálculos. Em especial, se um `calc()` termina dentro de qualquer cálculo, a chamada de função será removida e será substituída por uma operação anterior simples:

{% codeExample 'simplification' %}
  $width: calc(400px + 10%);

  .sidebar {
    width: $width;
    padding-left: calc($width / 4);
  }
  ===
  $width: calc(400px + 10%)

  .sidebar
    width: $width
    padding-left: calc($width / 4)
{% endcodeExample %}

## Operações {#operations}

Tu não podes usar os cálculos com opções de SassScript normais como `+` e `*`. Se quiseres escrever algumas funções matemáticas que permitam cálculos apenas as escreva dentro sua própria expressões de `calc()` — Se forem passada uma mão-cheia de números com unidades compatíveis, retornarão números simples também, e se forem passados cálculos retornarão cálculos.

Esta restrição está no lugar para certificar-se que se os cálculos *não forem* desejados, lançam um erro o mesmo cedo possível. Os cálculos não podem ser usados em toda parte que os números simples podem: eles não podem ser injetados para os identificadores de CSS (tais como `.item-#{$n}`), por exemplo, não podem ser passados para as [funções matemáticas][math functions] embutidas da Sass. Reservar operações de SassScript para números simples esclarece exatamente onde os cálculos são permitidos e onde não são:

[math functions]: /documentation/modules/math

{% codeExample 'calc-operations', false %}
  $width: calc(100% + 10px);
  @debug $width * 2; // Error!
  @debug calc($width * 2); // calc((100% + 10px) * 2);
  ===
  $width: calc(100% + 10px);
  @debug $width * 2; // Error!
  @debug calc($width * 2); // calc((100% + 10px) * 2);
{% endcodeExample %}

## Constantes {#constants}

{% compatibility 'dart: "1.60.0"','libsass: false', 'ruby: false' %}{% endcompatibility %}

Os cálculos também podem conter constantes, que são escritas como identificadores de CSS. Para compatibilidade futura com as futuras especificações da CSS, *todos* os identificadores são permitidos, e por padrão são apenas tratados como sequências de caracteres sem aspas que são passadas como estão.

{% codeExample 'calc-constants', false %}
  @debug calc(h + 30deg); // calc(h + 30deg);
  ===
  @debug calc(h + 30deg)  // calc(h + 30deg);
{% endcodeExample %}

A Sass automaticamente resolve alguns nomes de constante especiais que são especificadas na CSS para números sem unidade:

* `pi` é uma abreviatura para a [constante matemática *π*][mathematical constant *π*].
  
  [mathematical constant *π*]: https://en.wikipedia.org/wiki/Pi

* `e` é uma abreviatura para a [constante matemática *e*][mathematical constant *e*].

  [mathematical constant *e*]: https://en.wikipedia.org/wiki/E_(mathematical_constant)

* `infinity`, `-infinity`, e `NaN` representam os valores de ponto flutuante correspondentes.

{% codeExample 'unitless-numbers', false %}
  @use 'sass:math';

  @debug calc(pi); // 3.1415926536
  @debug calc(e);  // 2.7182818285
  @debug calc(infinity) > math.$max-number;  // true
  @debug calc(-infinity) < math.$min-number; // true
  ===
  @use 'sass:math'

  @debug calc(pi)  // 3.1415926536
  @debug calc(e)   // 2.7182818285
  @debug calc(infinity) > math.$max-number   // true
  @debug calc(-infinity) < math.$min-number  // true
{% endcodeExample %}

## `min()` e `max()` {#min-and-max}

{% compatibility 'dart: ">=1.11.0 <1.42.0"', 'libsass: false', 'ruby: false', 'feature: "Sintaxe de Função Especial"' %}
  A LibSass, Sass de Ruby, e verões de Sass de Dart anteriores a 1.11.0 *sempre* analisam `min()` e `max()` como funções de Sass. Para criares uma chamada `min()` ou `max()` de CSS simples para estas implementações, podes escrever algo como `unquote("min(#{$padding}, env(safe-area-inset-left))")`.

  As versões da Sass de Dart entre 1.11.0 e 1.40.0, e entre 1.40.1 e 1.42.0 analisam as funções `min()` e `max()` como [funções especiais][special functions] se forem CSS simples válidos, mas as analisa como funções de Sass se conterem funcionalidades de Sass para além da interpolação, como variáveis ou chamadas de função.

  A Sass de Dart 1.41.0 analisa as funções `min()` e `max()` como cálculos, mas não permite que números sem unidade sejam combinados com números com unidades. Isto foi retro-incompatível com as funções `min()` e `max()` globais, assim este comportamento foi revertido.

  [special functions]: /documentation/syntax/special-functions
{% endcompatibility %}

A CSS adicionou suporte para as [funções `min()` e `max()`] no Nível 4 de Valores e Unidades, de onde foram rapidamente adotados pelo Safari [para suportar o iPhoneX][to support the iPhoneX]. Mas a Sass suportava suas próprias funções [`min()`] e [`max()`] muito antes disto, e precisava de ser retro-compatível com todas aquelas folhas de estilos existentes. Isto conduz para a necessidade de inteligência sintática muito especial.

[`min()` and `max()` functions]: https://drafts.csswg.org/css-values-4/#calc-notation
[to support the iPhoneX]: https://webkit.org/blog/7929/designing-websites-for-iphone-x/
[`min()`]: /documentation/modules/math#min
[`max()`]: /documentation/modules/math#max

Se uma chamada de função `min()` e `max()` é uma expressão de cálculo válida, será analisada como um cálculo. Mas logo que qualquer parte da chama conter uma funcionalidade de SassScript que não é suportado num cálculo, como o [operador modulo], é analisada como uma chamada para função `min()` ou `max()` principal.

Já que cálculos são simplificados aos números quando possível de qualquer modo, a única diferença de substantivo é que as funções de Sass apenas suportam unidades que podem ser combinadas em tempo de construção, assim `min(12px % 10, 10%)` lançarão um erro.

[modulo operator]: /documentation/operators/numeric

{% headsUp %}
  Outros cálculos não permitem que números sem unidades sejam adicionados a, subtraídos de, ou comparados aos números com as unidades. `min()` e `max()` são diferentes: para retro-compatibilidade com as funções `min()` e `max()` de Sass globais que permitem unidade/sem unidade misturando por razões históricas, estas unidades podem ser misturada enquanto são contidos diretamente dentro dum cálculo de `min()` ou `max()`.
{% endheadsUp %}

{% codeExample 'min-max' %}
  $padding: 12px;

  .post {
    // Já que estas chamadas de max() são expressões de cálculos válidos,
    // são analisadas como cálculos.
    padding-left: max($padding, env(safe-area-inset-left));
    padding-right: max($padding, env(safe-area-inset-right));
  }

  .sidebar {
    // Já que estes usam o operador modulo exclusivo de SassScript,
    // são analisados como chamadas da função de SassScript.
    padding-left: max($padding % 10, 20px);
    padding-right: max($padding % 10, 20px);
  }
  ===
  $padding: 12px

  .post
    // Já que estas chamadas max() são expressões de cálculos válidos,
    // são analisados como cálculos.
    padding-left: max($padding, env(safe-area-inset-left))
    padding-right: max($padding, env(safe-area-inset-right))


  .sidebar
    // Já que estes usam o operador modulo exclusivo de SassScript,
    // são analisados como chamadas da função de SassScript.
    padding-left: max($padding % 10, 20px)
    padding-right: max($padding % 10, 20px)
{% endcodeExample %}
