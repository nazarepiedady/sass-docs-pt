---
title: "@error"
introduction: >
  Quando escreves [misturas](/documentation/at-rules/mixin) e [funções](/documentation/at-rules/function) que recebem argumentos, normalmente queres garantir que estes argumentos têm os tipos e formatos que a tua API espera. Se tiverem, o utilizador precisa ser notificado e a tua mistura ou função precisa parar a execução.
---

A Sass torna isto fácil com a regra `@error`, que é escrita como `@error <expression>`. Ela imprime o valor da [expressão][expression] (normalmente uma sequência de caracteres) juntamente com um vestígio da pilha indicando como a mistura ou função atual foi chamada. Assim que o erro for imprimido, a Sass para a compilação da folha de estilo e diz ao seja qual for o sistema que estiver a executá-la que um erro ocorreu:

[expression]: /documentation/syntax/structure#expressions

{% codeExample 'error', false %}
  @mixin reflexive-position($property, $value) {
    @if $property != left and $property != right {
      @error "Property #{$property} must be either left or right.";
    }

    $left-value: if($property == right, initial, $value);
    $right-value: if($property == right, $value, initial);

    left: $left-value;
    right: $right-value;
    [dir=rtl] & {
      left: $right-value;
      right: $left-value;
    }
  }

  .sidebar {
    @include reflexive-position(top, 12px);
    //       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Error: Property top must be either left or right.
  }
  ===
  @mixin reflexive-position($property, $value)
    @if $property != left and $property != right
      @error "Property #{$property} must be either left or right."


    $left-value: if($property == right, initial, $value)
    $right-value: if($property == right, $value, initial)

    left: $left-value
    right: $right-value
    [dir=rtl] &
      left: $right-value
      right: $left-value



  .sidebar
    @include reflexive-position(top, 12px)
    //       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Error: Property top must be either left or right.
{% endcodeExample %}

O formato exato do erro e vestígio da pilha varia de implementação à implementação, e também pode depender do teu sistema de construção. Isto é como se parece na Sass de Dart quando executado a partir da linha de comando:

```
Error: "Property top must be either left or right."
  ╷
3 │     @error "Property #{$property} must be either left or right.";
  │     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  ╵
  example.scss 3:5   reflexive-position()
  example.scss 19:3  root stylesheet
```
