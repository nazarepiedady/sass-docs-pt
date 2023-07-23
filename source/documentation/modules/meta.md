-
title: sass:meta
---

{% render 'doc_snippets/built-in-module-status' %}

## Misturas {#mixins}

{% function 'meta.load-css($url, $with: null)' %}
  {% compatibility 'dart: "1.23.0"', 'libsass: false', 'ruby: false' %}
    Apenas a Sass de Dart atualmente suporta esta mistura.
  {% endcompatibility %}

  Carrega o [módulo][module] na `$url` e inclui o seu CSS como se estivesse escrito como conteúdo desta mistura. O parâmetro `$with` fornece [configuração][configuration] para os módulos; se for passada, deve ser um mapa dos nomes de variáveis (sem `$`) para os valores destas variáveis à usar no módulo carregado.

  [module]: /documentation/at-rules/use
  [configuration]: /documentation/at-rules/use#configuration

  Se `$url` for relativa, é interpretada como relativa ao ficheiro no qual `meta.load-css()` está incluída.

  **Tal como a [regra `@use`][`@use` rule]**:

  [`@use` rule]: /documentation/at-rules/use

  * Isto apenas avaliará o dado módulo uma vez, mesmo se for carregado várias vezes de maneiras diferentes.

  * Este não pode fornecer configuração para um módulo que já foi carregado, se já foi ou não carregado com configuração.

  **Ao contrário da [regra `@use`][`@use` rule]**:

  * Este não torna quaisquer membros do módulo carregado disponíveis no módulo atual.

  * Este pode ser usado em qualquer parte numa folha de estilo. Pode mesmo ser encaixada dentro das regras de estilos para criar estilos encaixados!

  * A URL do módulo sendo carregado pode vir duma variável e incluir [interpolação][interpolation].

    [interpolation]: /documentation/interpolation

  {% headsUp %}
    O parâmetro `$url` deveria ser uma sequência de caracteres contendo uma URL como passarias para a regra `@use`. Não deveria ser uma `url()` de CSS!
  {% endheadsUp %}

  {% codeExample 'load-css', false %}
    // dark-theme/_code.scss
    $border-contrast: false !default;

    code {
      background-color: #6b717f;
      color: #d2e1dd;
      @if $border-contrast {
        border-color: #dadbdf;
      }
    }
    ---
    // style.scss
    @use "sass:meta";

    body.dark {
      @include meta.load-css("dark-theme/code",
          $with: ("border-contrast": true));
    }
    ===
    // dark-theme/_code.sass
    $border-contrast: false !default

    code
      background-color: #6b717f
      color: #d2e1dd
      @if $border-contrast
        border-color: #dadbdf
    ---
    // style.sass
    @use "sass:meta"

    body.dark
      $configuration: ("border-contrast": true)
      @include meta.load-css("dark-theme/code", $with: $configuration)
    ===
    body.dark code {
      background-color: #6b717f;
      color: #d2e1dd;
      border-color: #dadbdf;
    }
  {% endcodeExample %}
{% endfunction %}

## Funções {#functions}

{% function 'meta.calc-args($calc)', 'returns:list' %}
  {% compatibility 'dart: "1.40.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

  Retorna os argumentos para o dado [cálculo][calculation].

  [calculation]: /documentation/values/calculations

  Se um argumento for um número ou um cálculo encaixado, é retornado como este tipo. De outro modo, é retornado como uma sequência de caracteres sem aspas.

  {% codeExample 'calc-args', false %}
    @debug meta.calc-args(calc(100px + 10%)); // unquote("100px + 10%")
    @debug meta.calc-args(clamp(50px, var(--width), 1000px)); // 50px, unquote("var(--width)"), 1000px
    ===
    @debug meta.calc-args(calc(100px + 10%))  // unquote("100px + 10%")
    @debug meta.calc-args(clamp(50px, var(--width), 1000px))  // 50px, unquote("var(--width)"), 1000px
  {% endcodeExample %}
{% endfunction %}

{% function 'meta.calc-name($calc)', 'returns:quoted string' %}
  {% compatibility 'dart: "1.40.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

  Retorna o nome do dado [cálculo][calculation].

  [calculation]: ../values/calculations

  {% codeExample 'calc-name', false %}
    @debug meta.calc-name(calc(100px + 10%)); // "calc"
    @debug meta.calc-name(clamp(50px, var(--width), 1000px)); // "clamp"
    ===
    @debug meta.calc-name(calc(100px + 10%))  // "calc"
    @debug meta.calc-name(clamp(50px, var(--width), 1000px))  // "clamp"
  {% endcodeExample %}
{% endfunction %}

{% function 'meta.call($function, $args...)', 'call($function, $args...)' %}
  {% render 'doc_snippets/call-impl-status' %}

  Invoca a `$function` com os `$args` e retorna o resultado.

  A `$function` deve ser uma [função][function] retornada pelo [`meta.get-function()`][].

  [function]: /documentation/values/functions
  [`meta.get-function()`]: #get-function

  {% render 'code_snippets/example-first-class-function' %}
{% endfunction %}


{% function 'meta.content-exists()', 'content-exists()', 'returns:boolean' %}
  Retorna verdadeiro se um [bloco `@content`][`@content` block] foi passado à mistura atual.

  [`@content` block]: /documentation/at-rules/mixin#content-blocks

  Lança um erro se chamada fora duma mistura.

  {% codeExample 'content-exists', false %}
    @mixin debug-content-exists {
      @debug meta.content-exists();
      @content;
    }

    @include debug-content-exists; // false
    @include debug-content-exists { // true
      // Content!
    }
    ===
    @mixin debug-content-exists
      @debug meta.content-exists()
      @content


    @include debug-content-exists  // false
    @include debug-content-exists   // true
      // Content!
  {% endcodeExample %}
{% endfunction %}

{% function 'meta.feature-exists($feature)', 'feature-exists($feature)', 'returns:boolean' %}
  Retorna verdadeiro se a implementação de Sass atual suporta a `$feature`.

  A `$feature` deve ser uma sequência de caracteres. As funcionalidades atualmente reconhecidas são:

  * `global-variable-shadowing`, que significa que uma variável local [obscurecerá][shadow] uma variável global a menos que tenha a opção `!global`.

  * `extend-selector-pseudoclass`, que significa que a [regra `@extend`][`@extend` rule] afetará os seletores encaixados nas pseudo-classes como `:not()`.

  * `units-level3`, que significa que [aritmética de unidades][unit arithmetic] suporta unidades definidas nos [Valores de CSS e Unidades de Nível 3][CSS Values and Units Level 3].

  * `at-error`, que significa que a [regra `@error`][`@error` rule] é suportada.

  * `custom-property`, que significa que valores de [declaração de propriedade personalizada][custom property declaration] não suportam quaisquer [expressões][expressions] além da [interpolação][interpolation].

  [shadow]: /documentation/variables#shadowing
  [`@extend` rule]: /documentation/at-rules/extend
  [unit arithmetic]: /documentation/values/numbers#units
  [CSS Values and Units Level 3]: http://www.w3.org/TR/css3-values
  [`@error` rule]: /documentation/at-rules/error
  [custom property declaration]: /documentation/style-rules/declarations#custom-properties
  [expressions]: /documentation/syntax/structure#expressions
  [interpolation]: /documentation/interpolation

  Retorna `false` para qualquer `$feature` não reconhecida.

  {% codeExample 'feature-exists', false %}
    @debug meta.feature-exists("at-error"); // true
    @debug meta.feature-exists("unrecognized"); // false
    ===
    @debug meta.feature-exists("at-error")  // true
    @debug meta.feature-exists("unrecognized")  // false
  {% endcodeExample %}
{% endfunction %}

{% function 'meta.function-exists($name, $module: null)', 'function-exists($name)', 'returns:boolean' %}
  Retorna verdadeiro se uma função nomeada `$name` for definida, ou como uma função embutida ou uma função definida pelo utilizador.

  Se `$module` for passado, este também verifica o módulo nomeado `$module` para a definição de função. `$module` deve ser uma sequência de caracteres correspondendo o espaço de nome numa [regra `@use`][`@use` rule] no ficheiro atual.

  [`@use` rule]: /documentation/at-rules/use

  {% codeExample 'function-exists', false %}
    @use "sass:math";

    @debug meta.function-exists("div", "math"); // true
    @debug meta.function-exists("scale-color"); // true
    @debug meta.function-exists("add"); // false

    @function add($num1, $num2) {
      @return $num1 + $num2;
    }
    @debug meta.function-exists("add"); // true
    ===
    @use "sass:math"

    @debug meta.function-exists("div", "math")  // true
    @debug meta.function-exists("scale-color")  // true
    @debug meta.function-exists("add")  // false

    @function add($num1, $num2)
      @return $num1 + $num2

    @debug meta.function-exists("add")  // true
  {% endcodeExample %}
{% endfunction %}

{% function 'meta.get-function($name, $css: false, $module: null)', 'get-function($name, $css: false, $module: null)', 'returns:function' %}
  Retorna a [função][function] nomeada `$name`.

  [function]: /documentation/values/functions

  Se `$module` for `null`, este retorna a função nomeada `$name` sem um espaço de nome (incluindo [funções embutidas globais][global built-in functions]). De outro modo, `$module` deve ser uma sequência de caracteres correspondendo o espaço de nome duma [regra `@use`][`@use` rule] no ficheiro atual, no qual caso este retorna a função neste módulo nomeado `$name`.

  [global built-in functions]: /documentation/modules#global-functions
  [`@use` rule]: /documentation/at-rules/use

  Por padrão, este lança um erro se `$name` não referir-se à função de Sass. No entanto, se `$css` for `true`, retorna uma [função de CSS simples][plain CSS function].

  [user-defined]: /documentation/at-rules/function
  [plain CSS function]: /documentation/at-rules/function/#plain-css-functions

  A função retornada pode ser chamada usando [`meta.call()`](#call).

  {% render 'code_snippets/example-first-class-function' %}
{% endfunction %}

{% function 'meta.global-variable-exists($name, $module: null)', 'global-variable-exists($name, $module: null)', 'returns:boolean' %}
  Retorna verdadeiro se uma [variável global][global variable] nomeada `$name` (sem o `$`) existir.

  [global variable]: /documentation/variables#scope

  Se `$module` for `null`, este retorna verdadeiro se uma variável nomeada `$name` sem um espaço de nome existir. De outro modo, `$module` deve ser uma sequência de caracteres correspondendo o espaço de nome duma [regra `@use`][`@use` rule] no ficheiro atual, no qual caso este retorna verdadeiro se este módulo tiver uma variável nomeada `$name`.

  [`@use` rule]: /documentation/at-rules/use

  Consulte também [`meta.variable-exists()`](#variable-exists).

  {% codeExample 'global-variable-exists', false %}
    @debug meta.global-variable-exists("var1"); // false

    $var1: value;
    @debug meta.global-variable-exists("var1"); // true

    h1 {
      // $var2 is local.
      $var2: value;
      @debug meta.global-variable-exists("var2"); // false
    }
    ===
    @debug meta.global-variable-exists("var1")  // false

    $var1: value
    @debug meta.global-variable-exists("var1")  // true

    h1
      // $var2 is local.
      $var2: value
      @debug meta.global-variable-exists("var2")  // false
  {% endcodeExample %}
{% endfunction %}

{% function 'meta.inspect($value)', 'inspect($value)', 'returns:unquoted string' %}
  Retorna uma representação de sequência de caracteres do `$value`.

  Retorna uma representação de *qualquer* valor de Sass, e não apenas aqueles que podem ser representados na CSS. Como tal, o seu valor de retorno não garante ser CSS válido.

  {% headsUp %}
    Esta função está destinada para depuração; seu formato de saída não garante consistência através das versões ou implementações de Sass.
  {% endheadsUp %}

  {% codeExample 'inspect', false %}
    @debug meta.inspect(10px 20px 30px); // unquote("10px 20px 30px")
    @debug meta.inspect(("width": 200px)); // unquote('("width": 200px)')
    @debug meta.inspect(null); // unquote("null")
    @debug meta.inspect("Helvetica"); // unquote('"Helvetica"')
    ===
    @debug meta.inspect(10px 20px 30px)  // unquote("10px 20px 30px")
    @debug meta.inspect(("width": 200px))  // unquote('("width": 200px)')
    @debug meta.inspect(null)  // unquote("null")
    @debug meta.inspect("Helvetica")  // unquote('"Helvetica"')
  {% endcodeExample %}
{% endfunction %}

{% function 'meta.keywords($args)', 'keywords($args)', 'returns:map' %}
  Retorna as palavras-chave passadas à uma mistura ou função que recebe [argumentos arbitrários][arbitrary arguments]. O argumento `$args` deve ser uma [lista de argumento][argument list].

  [arbitrary arguments]: /documentation/at-rules/mixin#taking-arbitrary-arguments
  [argument list]: /documentation/values/lists#argument-lists

  As palavras-chave são retornadas como um mapa a partir dos nomes de argumento como sequências de caracteres sem aspas (sem incluir `$`) aos valores destes argumentos.

  {% render 'code_snippets/example-mixin-arbitrary-keyword-arguments' %}
{% endfunction %}

{% function 'meta.mixin-exists($name, $module: null)', 'mixin-exists($name, $module: null)', 'returns:boolean' %}
  Retorna verdadeiro se uma [mistura][mixin] nomeada `$name` existir.

  [mixin]: /documentation/at-rules/mixin

  Se `$module` for `null`, este retorna verdadeiro se uma mistura nomeada `$name` sem um espaço de nome existir. De outro modo, `$module` deve ser uma sequência de caracteres correspondendo o espaço de nome duma [regra `@use`][`@use` rule] no ficheiro atual, no qual caso este retorna verdadeiro se este módulo tiver uma mistura nomeada `$name`.

  [`@use` rule]: /documentation/at-rules/use

  {% codeExample 'mixin-exists', false %}
    @debug meta.mixin-exists("shadow-none"); // false

    @mixin shadow-none {
      box-shadow: none;
    }

    @debug meta.mixin-exists("shadow-none"); // true
    ===
    @debug meta.mixin-exists("shadow-none")  // false

    @mixin shadow-none
      box-shadow: none


    @debug meta.mixin-exists("shadow-none")  // true
  {% endcodeExample %}
{% endfunction %}


{% function 'meta.module-functions($module)', 'returns:map' %}
  {% render 'doc_snippets/module-system-function-status' %}

  Retorna todas as funções definidas num módulo, como um mapa a partir dos nomes de função aos [valores de função][function values]

  [function values]: /documentation/values/functions

  O parâmetro `$module` deve ser uma sequência de caracteres correspondendo o espaço de nome duma [regra `@use`][`@use` rule] no ficheiro atual.

  [`@use` rule]: /documentation/at-rules/use

  {% codeExample 'module-functions', false %}
    // _functions.scss
    @function pow($base, $exponent) {
      $result: 1;
      @for $_ from 1 through $exponent {
        $result: $result * $base;
      }
      @return $result;
    }
    ---
    @use "sass:map";
    @use "sass:meta";

    @use "functions";

    @debug meta.module-functions("functions"); // ("pow": get-function("pow"))

    @debug meta.call(map.get(meta.module-functions("functions"), "pow"), 3, 4); // 81
    ===
    // _functions.sass
    @function pow($base, $exponent)
      $result: 1
      @for $_ from 1 through $exponent
        $result: $result * $base

      @return $result
    ---
    @use "sass:map"
    @use "sass:meta"

    @use "functions"

    @debug meta.module-functions("functions") // ("pow": get-function("pow"))

    @debug meta.call(map.get(meta.module-functions("functions"), "pow"), 3, 4) // 81
  {% endcodeExample %}
{% endfunction %}

{% function 'meta.module-variables($module)', 'returns:map' %}
  {% render 'doc_snippets/module-system-function-status' %}

  Retorna todas as variáveis definidas num módulo, como um mapa a partir dos nomes de variáveis (sem `$`) aos valores destas variáveis.

  O parâmetro `$module` deve ser uma sequência de caracteres correspondendo o espaço de nome duma [regra `@use`][`@use` rule] no ficheiro atual.

  [`@use` rule]: /documentation/at-rules/use

  {% codeExample 'module-variables', false %}
    // _variables.scss
    $hopbush: #c69;
    $midnight-blue: #036;
    $wafer: #e1d7d2;
    ---
    @use "sass:meta";

    @use "variables";

    @debug meta.module-variables("variables");
    // (
    //   "hopbush": #c69,
    //   "midnight-blue": #036,
    //   "wafer": #e1d7d2
    // )
    ===
    // _variables.sass
    $hopbush: #c69
    $midnight-blue: #036
    $wafer: #e1d7d2
    ---
    @use "sass:meta"

    @use "variables"

    @debug meta.module-variables("variables")
    // (
    //   "hopbush": #c69,
    //   "midnight-blue": #036,
    //   "wafer": #e1d7d2
    // )
  {% endcodeExample %}
{% endfunction %}

{% function 'meta.type-of($value)', 'type-of($value)', 'returns:unquoted string' %}
  Retorna o tipo de `$value`.

  Esta pode retornar os seguintes valores:

  * [`number`](/documentation/values/numbers)
  * [`string`](/documentation/values/strings)
  * [`color`](/documentation/values/colors)
  * [`list`](/documentation/values/lists)
  * [`map`](/documentation/values/maps)
  * [`calculation`](/documentation/values/calculations)
  * [`bool`](/documentation/values/booleans)
  * [`null`](/documentation/values/null)
  * [`function`](/documentation/values/functions)
  * [`arglist`](/documentation/values/lists#argument-lists)

  Possíveis novos valores podem ser adicionados no futuro. Pode retornar ou `list` ou `map` para `()`, dependendo de se foi ou não retornado por uma [função de mapa][map function].

  [map function]: /documentation/modules/map

  {% codeExample 'type-of', false %}
    @debug meta.type-of(10px); // number
    @debug meta.type-of(10px 20px 30px); // list
    @debug meta.type-of(()); // list
    ===
    @debug meta.type-of(10px)  // number
    @debug meta.type-of(10px 20px 30px)  // list
    @debug meta.type-of(())  // list
  {% endcodeExample %}
{% endfunction %}

{% function 'meta.variable-exists($name)', 'variable-exists($name)', 'returns:boolean' %}
  Retorna verdadeiro se uma variável nomeada `$name` (sem o `$`) existir no [âmbito][scope] atual.

  [scope]: /documentation/variables#scope

  Consulte também [`meta.global-variable-exists()`](#global-variable-exists).

  {% codeExample 'variable-exists', false %}
    @debug meta.variable-exists("var1"); // false

    $var1: value;
    @debug meta.variable-exists("var1"); // true

    h1 {
      // $var2 is local.
      $var2: value;
      @debug meta.variable-exists("var2"); // true
    }
    ===
    @debug meta.variable-exists("var1")  // false

    $var1: value
    @debug meta.variable-exists("var1")  // true

    h1
      // $var2 is local.
      $var2: value
      @debug meta.variable-exists("var2")  // true
  {% endcodeExample %}
{% endfunction %}
