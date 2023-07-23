---
title: "@if e @else"
table_of_contents: true
introduction: >
  Se a regra `@if` for escrita `@if <expression> { ... }`, e controlar se o seu bloco é ou não avaliado (incluindo emissões de quaisquer estilos como CSS). A [expressão](/documentation/syntax/structure#expressions) normalmente retorna ou [`true` ou `false`](/documentation/values/booleans) — se a expressão retornar `true`, o bloco é avaliado, e se a expressão retornar `false` não.
---

{% render 'code_snippets/example-if' %}

## `@else` {#else}

Uma regra `@if` pode opcionalmente será seguido por uma regra `@else`, escrita `@else { ... }`. Este bloco da regra é avaliado se a expressão de `@if` retornar `false`:

{% codeExample 'if' %}
  $light-background: #f2ece4;
  $light-text: #036;
  $dark-background: #6b717f;
  $dark-text: #d2e1dd;

  @mixin theme-colors($light-theme: true) {
    @if $light-theme {
      background-color: $light-background;
      color: $light-text;
    } @else {
      background-color: $dark-background;
      color: $dark-text;
    }
  }

  .banner {
    @include theme-colors($light-theme: true);
    body.dark & {
      @include theme-colors($light-theme: false);
    }
  }
  ===
  $light-background: #f2ece4
  $light-text: #036
  $dark-background: #6b717f
  $dark-text: #d2e1dd

  @mixin theme-colors($light-theme: true)
    @if $light-theme
      background-color: $light-background
      color: $light-text
    @else
      background-color: $dark-background
      color: $dark-text



  .banner
    @include theme-colors($light-theme: true)
    body.dark &
      @include theme-colors($light-theme: false)
{% endcodeExample %}

As expressões condicionais pode conter [operadores booleanos][boolean operators][boolean operators] (`and`, `or`, `not`).

[boolean operators]: /documentation/operators/boolean

### `@else if` {#else-if}

Tu também podes escolher se avalia um bloco da regra `@else` escrevendo-o `@else if <expression> { ... }`. Se fizeres, o bloco é avaliado somente se a expressão da `@if` precedente retornar `false` *e* a expressão da `@else if` retornar `true`.

Na realidade, podes acorrentar tantos `@else if` quiseres depois dum `@if`. O primeiro bloco na cadeia cuja expressão retorna `true` será avaliado, e os outros não. Se existir um `@else` simples no final da cadeia, o seu bloco será avaliado se todos os outros blocos falharem:

{% codeExample 'else' %}
  @use "sass:math";

  @mixin triangle($size, $color, $direction) {
    height: 0;
    width: 0;

    border-color: transparent;
    border-style: solid;
    border-width: math.div($size, 2);

    @if $direction == up {
      border-bottom-color: $color;
    } @else if $direction == right {
      border-left-color: $color;
    } @else if $direction == down {
      border-top-color: $color;
    } @else if $direction == left {
      border-right-color: $color;
    } @else {
      @error "Unknown direction #{$direction}.";
    }
  }

  .next {
    @include triangle(5px, black, right);
  }
  ===
  @use "sass:math"

  @mixin triangle($size, $color, $direction)
    height: 0
    width: 0

    border-color: transparent
    border-style: solid
    border-width: math.div($size, 2)

    @if $direction == up
      border-bottom-color: $color
    @else if $direction == right
      border-left-color: $color
    @else if $direction == down
      border-top-color: $color
    @else if $direction == left
      border-right-color: $color
    @else
      @error "Unknown direction #{$direction}."



  .next
    @include triangle(5px, black, right)
{% endcodeExample %}

{% render 'doc_snippets/truthiness-and-falsiness' %}
