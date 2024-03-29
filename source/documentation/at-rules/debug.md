---
title: "@debug"
introduction: >
  Algumas vezes é útil ver o valor duma [variável](/documentation/variables) ou [expressão](/documentation/syntax/structure#expressions) enquanto estás a desenvolver a tua folha de estilo. É para isto que a regra `@debug` serve: é escrita como `@debug <expression>`, e imprime o valor daquela expressão, juntamente com o nome do ficheiro e o número da linha.
---

{% codeExample 'debug', false %}
  @mixin inset-divider-offset($offset, $padding) {
    $divider-offset: (2 * $padding) + $offset;
    @debug "divider offset: #{$divider-offset}";

    margin-left: $divider-offset;
    width: calc(100% - #{$divider-offset});
  }
  ===
  @mixin inset-divider-offset($offset, $padding)
    $divider-offset: (2 * $padding) + $offset
    @debug "divider offset: #{$divider-offset}"

    margin-left: $divider-offset
    width: calc(100% - #{$divider-offset})
{% endcodeExample %}

O formato exato da message da depuração varia de implementação à implementação. Isto é como se parece na Sass de Dart:

```
test.scss:3 Debug: divider offset: 132px
```

{% funFact %}
  Tu podes passar qualquer valor para `@debug`, não apenas uma sequência de caracteres! Este imprime a mesma representação daquele valor de acordo com a [função `meta.inspect()`][`meta.inspect()` function].

  [`meta.inspect()` function]: /documentation/modules/meta#inspect
{% endfunFact %}
