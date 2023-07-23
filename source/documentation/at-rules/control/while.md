---
title: "@while"
introduction: >
  A regra `@while`, escrita `@while <expression> { ... }`, avalia o seu bloco se sua [expressão](/documentation/syntax/structure#expressions) retornar `true`. Então, se sua expressão continuar a retornar `true`, avalia o seu bloco novamente. Isto continua até a expressão finalmente retornar `false`.
---

{% codeExample 'while' %}
  @use "sass:math";

  /// Divide `$value` por `$ratio` até estiver abaixo de `$base`.
  @function scale-below($value, $base, $ratio: 1.618) {
    @while $value > $base {
      $value: math.div($value, $ratio);
    }
    @return $value;
  }

  $normal-font-size: 16px;
  sup {
    font-size: scale-below(20px, 16px);
  }
  ===
  @use "sass:math"

  /// Divide `$value` por `$ratio` até estiver abaixo de `$base`.
  @function scale-below($value, $base, $ratio: 1.618)
    @while $value > $base
      $value: math.div($value, $ratio)
    @return $value



  $normal-font-size: 16px
  sup
    font-size: scale-below(20px, 16px)
{% endcodeExample %}

{% headsUp %}
  Embora `@while` é necessário para algumas folhas de estilos particularmente complexas, estarás melhor usando ou [`@each`][] ou [`@for`][] se qualquer um delas funcionar. São mais claras para o leitor, e frequentemente também mais rápido de compilar:

  [`@each`]: /documentation/at-rules/control/each
  [`@for`]: /documentation/at-rules/control/for
{% endheadsUp %}

{% render 'doc_snippets/truthiness-and-falsiness' %}
