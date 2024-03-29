---
title: Operadores Numéricos
table_of_contents: true
introduction: >
  A Sass suporta o conjunto padrão de operadores matemáticos para [números](/documentation/values/numbers). Eles são convertidos automaticamente entre unidades compatíveis.
---

* `<expression> + <expression>` adiciona o primeiro valor da [expressão][expression] ao segundo.
* `<expression> - <expression>` subtrai o primeiro valor da [expressão][expression] do segundo.
* `<expression> * <expression>` multiplica o primeiro valor da [expressão][expression] pelo segundo.
* `<expression> % <expression>` retorna o resto do valor da primeira [expressão][expression] dividido pelo segundo. Este é conhecido como [operador *modulo*][*modulo* operator].

[expression]: /documentation/syntax/structure#expressions
[*modulo* operator]: https://en.wikipedia.org/wiki/Modulo_operation

{% codeExample 'numeric', false %}
  @debug 10s + 15s; // 25s
  @debug 1in - 10px; // 0.8958333333in
  @debug 5px * 3px; // 15px*px
  @debug 1in % 9px; // 0.0625in
  ===
  @debug 10s + 15s  // 25s
  @debug 1in - 10px  // 0.8958333333in
  @debug 5px * 3px  // 15px*px
  @debug 1in % 9px  // 0.0625in
{% endcodeExample %}

Números sem unidade podem ser usados com números de qualquer unidade:

{% codeExample 'unitless-numbers', false %}
  @debug 100px + 50; // 150px
  @debug 4s * 10; // 40s
  ===
  @debug 100px + 50  // 150px
  @debug 4s * 10  // 40s
{% endcodeExample %}

Números com unidades incompatíveis não podem ser usados com adição, subtração, ou modulo:

{% codeExample 'incompatible-units', false %}
  @debug 100px + 10s;
  //     ^^^^^^^^^^^
  // Error: Incompatible units px and s.
  ===
  @debug 100px + 10s
  //     ^^^^^^^^^^^
  // Error: Incompatible units px and s.
{% endcodeExample %}

## Operadores Unários {#unary-operators}

Tu podes também escrever `+` e `-` como operadores unários, que recebem apenas um valor:

* `+<expression>` retorna o valor da expressão sem mudá-lo.
* `-<expression>` retorna a versão negativa do valor da expressão.

{% codeExample 'unary-operators', false %}
  @debug +(5s + 7s); // 12s
  @debug -(50px + 30px); // -80px
  @debug -(10px - 15px); // 5px
  ===
  @debug +(5s + 7s)  // 12s
  @debug -(50px + 30px)  // -80px
  @debug -(10px - 15px)  // 5px
{% endcodeExample %}

{% headsUp %}
  Uma vez que `-` pode fazer referência a ambos subtração e negação unária, pode ser confuso distinguir numa lista separada por espaço. Para estar a salvo:

  * Sempre escreva espaços nos ambos lados de `-` quando subtraíres.
  * Escreva uma espaço antes `-` mas não depois para um número negativo ou uma negação unária.
  * Envolva a negação unária em parêntesis se estiver numa lista separada por espaço.

  Os diferentes significados de `-` na Sass assumem precedência na seguinte ordem:

  1. `-` como parte dum identificador. A única exceção são unidades; A Sass normalmente permite qualquer identificador válido ser usado como um identificador, mas as unidades não podem conter um hífen seguido por dígito.
  2. `-` entre um expressão e um número literal sem espaço em branco, que é analisado como subtração.
  3. `-` no início dum número literal, que é analisado como um número negativo.
  4. `-` entre dois números apesar do espaço em branco, que é analisado como uma subtração.
  5. `-` antes de um valor senão um número literal, que é analisado como negação unária.

  {% codeExample 'heads-up-subtraction-unary-negation', false %}
    @debug a-1; // a-1
    @debug 5px-3px; // 2px
    @debug 5-3; // 2
    @debug 1 -2 3; // 1 -2 3

    $number: 2;
    @debug 1 -$number 3; // -1 3
    @debug 1 (-$number) 3; // 1 -2 3
    ===
    @debug a-1  // a-1
    @debug 5px-3px  // 2px
    @debug 5-3  // 2
    @debug 1 -2 3  // 1 -2 3

    $number: 2
    @debug 1 -$number 3  // -1 3
    @debug 1 (-$number) 3  // 1 -2 3
  {% endcodeExample %}
{% endheadsUp %}

## Divisão {#division}

{% compatibility 'dart: "1.33.0"', 'libsass: false', 'ruby: false', 'feature: "math.div()"' %}{% endcompatibility %}

Ao contrário dos outros operadores matemáticos, a divisão na Sass é feita com a função [`math.div()`]. Embora muitas linguagens de programação usem `/` como um operador de divisão, na CSS `/` é usada como um separador (como em `font: 15px/32px` ou `hsl(120 100% 50% / 0.8)`). Ainda que a Sass suporte o uso de `/` como um operador de divisão, este está depreciado e [será removido][will be removed] numa versão futura.

[`math.div()`]: /documentation/modules/math#div
[will be removed]: /documentation/breaking-changes/slash-div

### Valores Separados Por Barra {#slash-separated-values}

Por agora ainda que a Sass continue a suportar `/` como um operador de divisão, tem de ter uma maneira de desambiguar entre `/` como um separador e `/` como divisão. Para fazer isto funcionar, se dois números forem separados por `/`, a Sass imprimirá o resultado como separado por barra no lugar de dividido a menos que uma destas condições seja cumprida:

* Uma ou outra expressão não é nada senão um número literal.
* O resultado é armazenado numa variável ou retornado por uma função.
* A operação é envolvida por parêntesis, a menos que estes parêntesis estejam no lado de fora duma lista que contém a operação.
* O resultado é usado como parte duma outra operação (que não `/`).
* O resultado é retornado por um [cálculo][calculation].

Tu podes usar [`list.slash()`] para forçar `/` ser usado como um separador.

[`list.slash()`]: /documentation/modules/list#slash
[calculation]: /documentation/values/calculations

{% codeExample 'slash-separated-values', false %}
  @use "sass:list";

  @debug 15px / 30px; // 15px/30px
  @debug (10px + 5px) / 30px; // 0.5
  @debug list.slash(10px + 5px, 30px); // 15px/30px

  $result: 15px / 30px;
  @debug $result; // 0.5

  @function fifteen-divided-by-thirty() {
    @return 15px / 30px;
  }
  @debug fifteen-divided-by-thirty(); // 0.5

  @debug (15px/30px); // 0.5
  @debug (bold 15px/30px sans-serif); // bold 15px/30px sans-serif
  @debug 15px/30px + 1; // 1.5
  ===
  @use "sass:list";

  @debug 15px / 30px  // 15px/30px
  @debug (10px + 5px) / 30px  // 0.5
  @debug list.slash(10px + 5px, 30px)  // 15px/30px

  $result: 15px / 30px
  @debug $result  // 0.5

  @function fifteen-divided-by-thirty()
    @return 15px / 30px

  @debug fifteen-divided-by-thirty()  // 0.5

  @debug (15px/30px)  // 0.5
  @debug (bold 15px/30px sans-serif)  // bold 15px/30px sans-serif
  @debug 15px/30px + 1  // 1.5
{% endcodeExample %}

{% render 'doc_snippets/number-units' %}
