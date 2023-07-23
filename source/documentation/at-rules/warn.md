---
title: "@warn"
introduction: >
  Quando executas [misturas](/documentation/at-rules/mixin) e [funções](/documentation/at-rules/function), podes querer desencorajar os utilizadores de passarem certos argumentos ou valores. Eles podem estar a passar argumentos legados que agora estão depreciados, ou podem estar a chamar a tua API duma maneira que não é muito ideal.
---

A regra `@warn` é desenhada apenas para isto. É escrita como `@warn <expression>` e imprime o valor da [expressão][expression] (normalmente uma sequência de caracteres) para o utilizador, juntamente com um vestígio da pilha indicando como a mistura ou função atual foi executada. Ao contrário da [regra `@error`][`@error` rule], não para totalmente a Sass:

[expression]: /documentation/syntax/structure#expressions
[`@error` rule]: /documentation/at-rules/error

{% codeExample 'warn' %}
  $known-prefixes: webkit, moz, ms, o;

  @mixin prefix($property, $value, $prefixes) {
    @each $prefix in $prefixes {
      @if not index($known-prefixes, $prefix) {
        @warn "Unknown prefix #{$prefix}.";
      }

      -#{$prefix}-#{$property}: $value;
    }
    #{$property}: $value;
  }

  .tilt {
    // Oops, we typo'd "webkit" as "wekbit"!
    @include prefix(transform, rotate(15deg), wekbit ms);
  }
  ===
  $known-prefixes: webkit, moz, ms, o

  @mixin prefix($property, $value, $prefixes)
    @each $prefix in $prefixes
      @if not index($known-prefixes, $prefix)
        @warn "Unknown prefix #{$prefix}."


      -#{$prefix}-#{$property}: $value

    #{$property}: $value


  .tilt
    // Oops, we typo'd "webkit" as "wekbit"!
    @include prefix(transform, rotate(15deg), wekbit ms)
  ===
  .tilt {
    -wekbit-transform: rotate(15deg);
    -ms-transform: rotate(15deg);
    transform: rotate(15deg);
  }
{% endcodeExample %}

O formato exato do aviso e vestígio da pilha varia de implementação à implementação. Isto é como se parece na Sass de Dart:

```
Warning: Unknown prefix wekbit.
    example.scss 6:7   prefix()
    example.scss 16:3  root stylesheet
```
