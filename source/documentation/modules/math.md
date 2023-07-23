---
title: sass:math
---

{% render 'doc_snippets/built-in-module-status' %}

## Variáveis {#variables}

{% function 'math.$e' %}
  {% compatibility 'dart: "1.25.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

  Igual ao valor da [constante matemática *e*][mathematical constant *e*].

  [mathematical constant *e*]: https://en.wikipedia.org/wiki/E_(mathematical_constant)

  {% codeExample 'math-e', false %}
    @debug math.$e; // 2.7182818285
    ===
    @debug math.$e  // 2.7182818285
  {% endcodeExample %}
{% endfunction %}

{% function 'math.$epsilon' %}
  {% compatibility 'dart: "1.55.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}
  A diferença entre 1 e o menor número de ponto flutuante de 64-bit maior do que 1 de acordo com as comparações de ponto flutuante. Por causa da [precisão de 10 dígitos](/documentation/values/numbers) dos números da Sass, em muitos casos isto parecerá ser 0.
{% endfunction %}

{% function 'math.$max-number' %}
  {% compatibility 'dart: "1.55.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

  O máximo número finito que pode ser representado como um número de ponto flutuante de 64-bit.

  {% codeExample 'math-max-number', false %}
    @debug math.$max-number; // 179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
    ===
    @debug math.$max-number  // 179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
  {% endcodeExample %}
{% endfunction %}

{% function 'math.$max-safe-integer' %}
  {% compatibility 'dart: "1.55.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

  O máximo `n` inteiro tal que ambos `n` e `n + 1` pode ser precisamente representado como um número de ponto flutuante de 64-bit.

  {% codeExample 'math-max-safe-integer', false %}
    @debug math.$max-safe-integer; // 9007199254740991
    ===
    @debug math.$max-safe-integer  // 9007199254740991
  {% endcodeExample %}
{% endfunction %}

{% function 'math.$min-number' %}
  {% compatibility 'dart: "1.55.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

  O menor número positivo que pode ser representado como um número de ponto flutuante de 64-bit. Por causa da [precisão de 10 dígitos](/documentation/values/numbers) dos números da Sass, em muitos casos isto parecerá ser 0. 
{% endfunction %}

{% function 'math.$min-safe-integer' %}
  {% compatibility 'dart: "1.55.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

  O mínimo `n` inteiro tal que ambos `n` e `n + 1` pode ser precisamente representado como um número de ponto flutuante de 64-bit.

  {% codeExample 'math-min-safe-integer', false %}
    @debug math.$min-safe-integer; // -9007199254740991
    ===
    @debug math.$min-safe-integer  // -9007199254740991
  {% endcodeExample %}
{% endfunction %}

{% function 'math.$pi' %}
  {% compatibility 'dart: "1.25.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

  O mais próxima aproximação de ponto flutuante de 64-bit da [constante matemática *π*][mathematical constant *π*].

  [mathematical constant *π*]: https://en.wikipedia.org/wiki/Pi

  {% codeExample 'math-pi', false %}
    @debug math.$pi; // 3.1415926536
    ===
    @debug math.$pi  // 3.1415926536
  {% endcodeExample %}
{% endfunction %}


## Funções de Limites {#bounding-functions}

{% function 'math.ceil($number)', 'ceil($number)', 'returns:number' %}
  Arredonda `$number` para cima para o próximo maior número inteiro.

  {% codeExample 'math-ceil', false %}
    @debug math.ceil(4); // 4
    @debug math.ceil(4.2); // 5
    @debug math.ceil(4.9); // 5
    ===
    @debug math.ceil(4)  // 4
    @debug math.ceil(4.2)  // 5
    @debug math.ceil(4.9)  // 5
  {% endcodeExample %}
{% endfunction %}


{% function 'math.clamp($min, $number, $max)', 'returns:number' %}
  {% compatibility 'dart: "1.25.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

  Reduz `$number` para o limite entre `$min` e `$max`. Se `$number` for menor do que `$min` este retorna `$min`, e se for maior do que `$max` este retorna `$max`.

  `$min`, `$number`, e `$max` devem ter unidades compatíveis, ou ser todos sem unidade.

  {% codeExample 'math-clamp', false %}
    @debug math.clamp(-1, 0, 1); // 0
    @debug math.clamp(1px, -1px, 10px); // 1px
    @debug math.clamp(-1in, 1cm, 10mm); // 10mm
    ===
    @debug math.clamp(-1, 0, 1) // 0
    @debug math.clamp(1px, -1px, 10px) // 1px
    @debug math.clamp(-1in, 1cm, 10mm) // 10mm
  {% endcodeExample %}
{% endfunction %}


{% function 'math.floor($number)', 'floor($number)', 'returns:number' %}
  Arredonda `$number` para baixo para o próximo menor número inteiro.

  {% codeExample 'math-floor', false %}
    @debug math.floor(4); // 4
    @debug math.floor(4.2); // 4
    @debug math.floor(4.9); // 4
    ===
    @debug math.floor(4)  // 4
    @debug math.floor(4.2)  // 4
    @debug math.floor(4.9)  // 4
  {% endcodeExample %}
{% endfunction %}


{% function 'math.max($number...)', 'max($number...)', 'returns:number' %}
  Retorna o maior de um ou mais números.

  {% codeExample 'math-max', false %}
    @debug math.max(1px, 4px); // 4px

    $widths: 50px, 30px, 100px;
    @debug math.max($widths...); // 100px
    ===
    @debug math.max(1px, 4px)  // 4px

    $widths: 50px, 30px, 100px
    @debug math.max($widths...)  // 100px
  {% endcodeExample %}
{% endfunction %}

{% function 'math.min($number...)', 'min($number...)', 'returns:number' %}
  Retorna o menor de um ou mais números.

  {% codeExample 'math-min', false %}
    @debug math.min(1px, 4px); // 1px

    $widths: 50px, 30px, 100px;
    @debug math.min($widths...); // 30px
    ===
    @debug math.min(1px, 4px)  // 1px

    $widths: 50px, 30px, 100px
    @debug math.min($widths...)  // 30px
  {% endcodeExample %}
{% endfunction %}

{% function 'math.round($number)', 'round($number)', 'returns:number' %}
  Arredonda `$number` para o mais próximo número inteiro.

  {% codeExample 'math-round', false %}
    @debug math.round(4); // 4
    @debug math.round(4.2); // 4
    @debug math.round(4.9); // 5
    ===
    @debug math.round(4)  // 4
    @debug math.round(4.2)  // 4
    @debug math.round(4.9)  // 5
  {% endcodeExample %}
{% endfunction %}

## Funções de Distâncias {#distance-functions}

{% function 'math.abs($number)', 'abs($number)', 'returns:number' %}
  Retorna o [valor absoluto][absolute value] de `$number`. Se `$number` for negativo, este retorna `-$number`, e se `$number` for positivo, retorna `$number` como está.

  [absolute value]: https://en.wikipedia.org/wiki/Absolute_value

  {% codeExample 'math-abs', false %}
    @debug math.abs(10px); // 10px
    @debug math.abs(-10px); // 10px
    ===
    @debug math.abs(10px) // 10px
    @debug math.abs(-10px) // 10px
  {% endcodeExample %}
{% endfunction %}

{% function 'math.hypot($number...)', 'returns:number' %}
  {% compatibility 'dart: "1.25.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

  Retorna o comprimento do [vetor][vector] de *n*-dimensão que tem componentes iguais a cada `$number`. Por exemplo, para três números *a*, *b*, e *c*, este retorna a raiz quadrada de *a² + b² + c²*.

  Os números devem ou todos ter unidades compatíveis, ou ser todos sem unidade. E uma vez que as unidades dos números podem diferir, a saída recebe a unidade do primeiro número.

  [vector]: https://en.wikipedia.org/wiki/Euclidean_vector

  {% codeExample 'math-hypot', false %}
    @debug math.hypot(3, 4); // 5

    $lengths: 1in, 10cm, 50px;
    @debug math.hypot($lengths...); // 4.0952775683in
    ===
    @debug math.hypot(3, 4) // 5

    $lengths: 1in, 10cm, 50px
    @debug math.hypot($lengths...) // 4.0952775683in
  {% endcodeExample %}
{% endfunction %}

## Funções Exponenciais {#exponential-functions}

{% function 'math.log($number, $base: null)', 'returns:number' %}
  {% compatibility 'dart: "1.25.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

  Retorna o [logaritmo][logarithm] de `$number` com respeito a `$base`. Se `$base` é `null`, o [logaritmo natural][natural log] é calculado.

  `$number` e `$base` devem ser sem unidade.

  [logarithm]: https://en.wikipedia.org/wiki/Logarithm
  [natural log]: https://en.wikipedia.org/wiki/Natural_logarithm

  {% codeExample 'math-log', false %}
    @debug math.log(10); // 2.302585093
    @debug math.log(10, 10); // 1
    ===
    @debug math.log(10) // 2.302585093
    @debug math.log(10, 10) // 1
  {% endcodeExample %}
{% endfunction %}

{% function 'math.pow($base, $exponent)', 'returns:number' %}
  {% compatibility 'dart: "1.25.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

  Eleva `$base` [à potência de][to the power of] `$exponent`.

  `$base` e `$exponent` devem ser sem unidade.

  [to the power of]: https://en.wikipedia.org/wiki/Exponentiation

  {% codeExample 'math-pow', false %}
    @debug math.pow(10, 2); // 100
    @debug math.pow(100, math.div(1, 3)); // 4.6415888336
    @debug math.pow(5, -2); // 0.04
    ===
    @debug math.pow(10, 2) // 100
    @debug math.pow(100, math.div(1, 3)) // 4.6415888336
    @debug math.pow(5, -2) // 0.04
  {% endcodeExample %}
{% endfunction %}


{% function 'math.sqrt($number)', 'returns:number' %}
  {% compatibility 'dart: "1.25.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

  Retorna a [raiz quadrada][square root] de `$number`.

  `$number` deve ser sem unidade.

  [square root]: https://en.wikipedia.org/wiki/Square_root

  {% codeExample 'math-sqrt', false %}
    @debug math.sqrt(100); // 10
    @debug math.sqrt(math.div(1, 3)); // 0.5773502692
    @debug math.sqrt(-1); // NaN
    ===
    @debug math.sqrt(100) // 10
    @debug math.sqrt(math.div(1, 3)) // 0.5773502692
    @debug math.sqrt(-1) // NaN
  {% endcodeExample %}
{% endfunction %}


## Funções Trigonométricas {#trigonometric-functions}

{% function 'math.cos($number)', 'returns:number' %}
  {% compatibility 'dart: "1.25.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

  Retorna o [cosseno][cosine] de `$number`.

  `$number` deve ser um ângulo (sua unidade deve ser compatível com `deg`) ou sem unidade. Se `$number` não tiver nenhuma unidade, assume-se que está em `rad`.

  [cosine]: https://en.wikipedia.org/wiki/Trigonometric_functions#Right-angled_triangle_definitions

  {% codeExample 'math-cos', false %}
    @debug math.cos(100deg); // -0.1736481777
    @debug math.cos(1rad); // 0.5403023059
    @debug math.cos(1); // 0.5403023059
    ===
    @debug math.cos(100deg) // -0.1736481777
    @debug math.cos(1rad) // 0.5403023059
    @debug math.cos(1) // 0.5403023059
  {% endcodeExample %}
{% endfunction %}

{% function 'math.sin($number)', 'returns:number' %}
  {% compatibility 'dart: "1.25.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

  Retorna o [seno][sine] de `$number`.

  `$number` deve ser um ângulo (sua unidade deve ser compatível com `deg`) ou sem unidade. Se `$number` não tiver nenhuma unidade, assume-se que está em `rad`.

  [sine]: https://en.wikipedia.org/wiki/Trigonometric_functions#Right-angled_triangle_definitions

  {% codeExample 'math-sin', false %}
    @debug math.sin(100deg); // 0.984807753
    @debug math.sin(1rad); // 0.8414709848
    @debug math.sin(1); // 0.8414709848
    ===
    @debug math.sin(100deg) // 0.984807753
    @debug math.sin(1rad) // 0.8414709848
    @debug math.sin(1) // 0.8414709848
  {% endcodeExample %}
{% endfunction %}


{% function 'math.tan($number)', 'returns:number' %}
  {% compatibility 'dart: "1.25.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

  Retorna o [tangente][tangent] de `$number`.

  `$number` deve ser um ângulo (sua unidade deve ser compatível com `deg`) ou sem unidade. Se `$number` não tiver nenhuma unidade, assume-se que está em `rad`.

  [tangent]: https://en.wikipedia.org/wiki/Trigonometric_functions#Right-angled_triangle_definitions

  {% codeExample 'math-tan', false %}
    @debug math.tan(100deg); // -5.6712818196
    @debug math.tan(1rad); // 1.5574077247
    @debug math.tan(1); // 1.5574077247
    ===
    @debug math.tan(100deg) // -5.6712818196
    @debug math.tan(1rad) // 1.5574077247
    @debug math.tan(1) // 1.5574077247
  {% endcodeExample %}
{% endfunction %}

{% function 'math.acos($number)', 'returns:number' %}
  {% compatibility 'dart: "1.25.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

  Retorna o [arco-cosseno][arccosine] de `$number` em `deg`.

  `$number` deve estar sem unidade.

  [arccosine]: https://en.wikipedia.org/wiki/Inverse_trigonometric_functions#Basic_properties

  {% codeExample 'math-acos', false %}
    @debug math.acos(0.5); // 60deg
    @debug math.acos(2); // NaNdeg
    ===
    @debug math.acos(0.5) // 60deg
    @debug math.acos(2) // NaNdeg
  {% endcodeExample %}
{% endfunction %}

{% function 'math.asin($number)', 'returns:number' %}
  {% compatibility 'dart: "1.25.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

  Retorna o [arco-seno][arcsine] de `$number`

  `$number` deve estar sem unidade.

  [arcsine]: https://en.wikipedia.org/wiki/Inverse_trigonometric_functions#Basic_properties

  {% codeExample 'math-asin', false %}
    @debug math.asin(0.5); // 30deg
    @debug math.asin(2); // NaNdeg
    ===
    @debug math.asin(0.5) // 30deg
    @debug math.asin(2) // NaNdeg
  {% endcodeExample %}
{% endfunction %}

{% function 'math.atan($number)', 'returns:number' %}
  {% compatibility 'dart: "1.25.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

  Retorna o [arco-tangente][arctangent] de `$number` em `deg`.

  `$number` deve estar sem unidade.

  [arctangent]: https://en.wikipedia.org/wiki/Inverse_trigonometric_functions#Basic_properties

  {% codeExample 'math-atan', false %}
    @debug math.atan(10); // 84.2894068625deg
    ===
    @debug math.atan(10) // 84.2894068625deg
  {% endcodeExample %}
{% endfunction %}

{% function 'math.atan2($y, $x)', 'returns:number' %}
  {% compatibility 'dart: "1.25.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

  Retorna o [arco-tangente de dois argumentos][2-argument arctangent] de `$y` e `$x` em `deg`.

  `$y` e `$x` devem ter unidades compatíveis ou ser sem unidade.

  [2-argument arctangent]: https://en.wikipedia.org/wiki/Atan2

  {% funFact %}
    `math.atan2($y, $x)` é distinto de `atan(math.div($y, $x))` porque preserva o quadrante do ponto em questão. Por exemplo, `math.atan2(1, -1)` corresponde ao ponto `(-1, 1)` e retorna `135deg`. Em contrapartida, `math.atan(math.div(1, -1))` e `math.atan(math.div(-1, 1))` resolve primeiro para `atan(-1)`, assim ambos retornam `-45deg`.
  {% endfunFact %}

  {% codeExample 'math-atan2', false %}
    @debug math.atan2(-1, 1); // 135deg
    ===
    @debug math.atan2(-1, 1) // 135deg
  {% endcodeExample %}
{% endfunction %}


## Funções de Unidade {#unit-functions}

{% function 'math.compatible($number1, $number2)', 'comparable($number1, $number2)', 'returns:boolean' %}
  Retorna verdadeiro se `$number1` e `$number2` tiverem unidades compatíveis.

  Se este retornar `true`, `$number1` e `$number2` pode seguramente ser [adicionado][added], [subtraído][subtracted], e [comparado][compared]. De outro modo, produzirá erros.

  [added]: ../operators/numeric
  [subtracted]: ../operators/numeric
  [compared]: ../operators/relational

  {% headsUp %}
    O nome global desta função é <code>compa<strong>ra</strong>ble</code>, mas quando foi adicionada ao módulo `sass:math` o nome foi mudado para <code>compa<strong>ti</strong>ble</code> para transmitir mais claramente o que a função faz.
  {% endheadsUp %}

  {% codeExample 'math-compatible', false %}
    @debug math.compatible(2px, 1px); // true
    @debug math.compatible(100px, 3em); // false
    @debug math.compatible(10cm, 3mm); // true
    ===
    @debug math.compatible(2px, 1px)  // true
    @debug math.compatible(100px, 3em)  // false
    @debug math.compatible(10cm, 3mm)  // true
  {% endcodeExample %}
{% endfunction %}


{% function 'math.is-unitless($number)', 'unitless($number)', 'returns:boolean' %}
  Retorna verdadeiro se `$number` não tiver nenhuma unidade.

  {% codeExample 'math-is-unitless', false %}
    @debug math.is-unitless(100); // true
    @debug math.is-unitless(100px); // false
    ===
    @debug math.is-unitless(100)  // true
    @debug math.is-unitless(100px)  // false
  {% endcodeExample %}
{% endfunction %}


{% function 'math.unit($number)', 'unit($number)', 'returns:quoted string' %}
  Retorna uma representação de sequência de caracteres da unidade do `$number`.

  {% headsUp %}
    Esta função está destinada para depuração; não é garantido que formato da sua saída seja consistente com as versões ou implementações da Sass.
  {% endheadsUp %}

  {% codeExample 'math-unitless', false %}
    @debug math.unit(100); // ""
    @debug math.unit(100px); // "px"
    @debug math.unit(5px * 10px); // "px*px"
    @debug math.unit(math.div(5px, 1s)); // "px/s"
    ===
    @debug math.unit(100)  // ""
    @debug math.unit(100px)  // "px"
    @debug math.unit(5px * 10px)  // "px*px"
    @debug math.unit(math.div(5px, 1s))  // "px/s"
  {% endcodeExample %}
{% endfunction %}

## Outras Funções {#other-functions}

{% function 'math.div($number1, $number2)', 'returns:number' %}
  {% compatibility 'dart: "1.33.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

  Retorna o resultado da divisão de `$number1` por `$number2`.

  Quaisquer unidades partilhada por ambos números serão canceladas. As unidades em `$number1` que não estiverem em `$number2` terminarão no numerador do valor retornado, e as unidades em `$number2` que não estiverem em `$number1` terminarão no seu denominador.

  {% headsUp %}
    Para fins de retro-compatibilidade, este retorna o *exato mesmo resultado* que o [o operador `/` depreciado][the deprecated `/` operator], inclusive concatenando duas sequências de caracteres com um carácter `/` entre elas. No entanto, este comportamento será removido eventualmente e não deveria ser usado em novas folhas de estilo.

    [the deprecated `/` operator]: /documentation/breaking-changes/slash-div
  {% endheadsUp %}

  {% codeExample 'math-div', false %}
    @debug math.div(1, 2); // 0.5
    @debug math.div(100px, 5px); // 20
    @debug math.div(100px, 5); // 20px
    @debug math.div(100px, 5s); // 20px/s
    ===
    @debug math.div(1, 2)  // 0.5
    @debug math.div(100px, 5px)  // 20
    @debug math.div(100px, 5)  // 20px
    @debug math.div(100px, 5s)  // 20px/s
  {% endcodeExample %}
{% endfunction %}


{% function 'math.percentage($number)', 'percentage($number)', 'returns:number' %}
  Converte um `$number` sem unidades (usualmente um decimal entre 0 e 1) para uma percentagem.

  {% funFact %}
    Esta função é idêntica ao `$number * 100%`.
  {% endfunFact %}

  {% codeExample 'math-percentage', false %}
    @debug math.percentage(0.2); // 20%
    @debug math.percentage(math.div(100px, 50px)); // 200%
    ===
    @debug math.percentage(0.2)  // 20%
    @debug math.percentage(math.div(100px, 50px))  // 200%
  {% endcodeExample %}
{% endfunction %}


{% function 'math.random($limit: null)', 'random($limit: null)', 'returns:number' %}
  Se `$limit` for `null`, retorna um número decimal aleatório entre 0 e 1.

  {% codeExample 'math-random', false %}
    @debug math.random(); // 0.2821251858
    @debug math.random(); // 0.6221325814
    ===
    @debug math.random()  // 0.2821251858
    @debug math.random()  // 0.6221325814
  {% endcodeExample %}

  * * *

  Se `$limit` for um número maior do que ou igual à 1, retorna um número inteiro aleatório entre 1 e `$limit`.

  {% headsUp %}
    `random()` ignora as unidades no `$limit`. [Este comportamento está depreciado][This behavior is deprecated] e `random($limit)` retornará um inteiro aleatório com a mesma unidade que o argumento `$limit`.

    [This behavior is deprecated]: /documentation/breaking-changes/function-units

    {% codeExample 'math-random-warning', false %}
      @debug math.random(100px); // 42
      ===
      @debug math.random(100px)  // 42
    {% endcodeExample %}
  {% endheadsUp %}

  {% codeExample 'math-random-limit', false %}
    @debug math.random(10); // 4
    @debug math.random(10000); // 5373
    ===
    @debug math.random(10)  // 4
    @debug math.random(10000)  // 5373
  {% endcodeExample %}
{% endfunction %}
