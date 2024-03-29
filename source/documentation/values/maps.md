---
title: Mapas
table_of_contents: true
---

Os mapas na Sass seguram pares de chaves e valores, tornam fácil o ato de procurar um valor através da sua chave correspondente. São escritos `(<expression>: <expression>, <expression>: <expression>)`. A [expressão](/documentation/syntax/structure#expressions) antes dos `:` é a chave, e a expressão depois é o valor associado aquela chave. As chaves devem ser únicas, mas os valores podem ser duplicados. Ao contrário das [listas](/documentation/values/lists), os mapas *devem* ser escritos com parênteses a sua volta. Um mapa sem pares é escrito como `()`.

{% funFact %}
  Os leitores astutos podem notar que um mapa vazio, `()`, é escrito da mesma maneira que uma lista vazia. Isto porque conta tanto como um mapa quanto uma lista. De fato, *todos* os mapas contam como listas! Cada mapa conta como uma lista que contém uma lista de dois elementos para cada par de chave e valor. Por exemplo, `(1: 2, 3: 4)` conta como `(1 2, 3 4)`.
{% endfunFact %}

Os mapas permitem quaisquer valores de Sass seja usados como suas chaves. O [operador `==`][`==` operator] é usado para determinar se duas chaves são iguais.

[`==` operator]: /documentation/operators/equality

{% headsUp %}
  A maior parte das vezes, é uma boa ideia usar [sequências de caracteres com aspas][quoted strings] ao invés de [sequências de caracteres sem aspas][unquoted strings] para as chaves do mapa. Isto é porque alguns valores, tais como nomes de cor, podem *parecer-se* com sequências de caracteres sem aspas mas na realidade serem outros tipos. Para evitares problemas confusos, apenas use aspas!

  [quoted strings]: /documentation/values/strings#quoted
  [unquoted strings]: /documentation/values/strings#unquoted
{% endheadsUp %}

## Usando Mapas {#using-maps}

Já que mapas não são valores de CSS válidos, não fazem muito de nada por conta própria. É por isto que a Sass fornece um grupo de [funções][functions] para criar os mapas e acessar os valores que contêm.

[functions]: /documentation/modules/map

### Procurar um Valor {#look-up-a-value}

Mapas são sobre a associação de chaves e valores, assim existe naturalmente uma maneira de receber o valor associado com uma chave: a [função `map.get($map. $key)`][`map.get($map, $key)` function]! Esta função retorna o valor no mapa associado com a dada chave. Ela retorna [`null`][] se o mapa não conter a chave:

[`map.get($map, $key)` function]: /documentation/modules/map#get
[`null`]: /documentation/values/null

{% render 'code_snippets/example-map-get' %}

### Fazer Algo com Todos Pares {#do-something-for-every-par}

Isto na realidade não usa uma função, mas continua a ser uma das maneiras mais comuns de usar os mapas. A [regra `@each`] avalia um bloco de estilos para cada par de chave e valor num mapa. A chave e o valor são atribuídos às variáveis assim podem facilmente ser acessadas no bloco:

[`@each` rule]: /documentation/at-rules/control/each

{% render 'code_snippets/example-each-map' %}

### Adicionar à um Mapa {#add-to-a-map}

É também útil adicionar novos pares à um mapa, ou substituir o valor para uma chave existente. a [função `map.set($map, $key, $value)`][`map.set($map, $key, $value)` function] faz isto: ela retorna uma cópia de `$map` com o valor em `$key` definido para `$value`:

[`map.set($map, $key, $value)` function]: /documentation/modules/map#set

{% codeExample 'maps', false %}
  @use "sass:map";

  $font-weights: ("regular": 400, "medium": 500, "bold": 700);

  @debug map.set($font-weights, "extra-bold", 900);
  // ("regular": 400, "medium": 500, "bold": 700, "extra-bold": 900)
  @debug map.set($font-weights, "bold", 900);
  // ("regular": 400, "medium": 500, "bold": 900)
  ===
  @use "sass:map"

  $font-weights: ("regular": 400, "medium": 500, "bold": 700)

  @debug map.set($font-weights, "extra-bold": 900)
  // ("regular": 400, "medium": 500, "bold": 700, "extra-bold": 900)
  @debug map.set($font-weights, "bold", 900)
  // ("regular": 400, "medium": 500, "bold": 900)
{% endcodeExample %}

Ao invés de definir valores um por um, podes também combinar dois mapas existentes usando [`map.merge($map1, $map2)`][`map.merge($map1, $map2)`]:

[`map.merge($map1, $map2)`]: /documentation/modules/map#merge

{% codeExample 'map-merge', false %}
  @use "sass:map";

  $light-weights: ("lightest": 100, "light": 300);
  $heavy-weights: ("medium": 500, "bold": 700);

  @debug map.merge($light-weights, $heavy-weights);
  // ("lightest": 100, "light": 300, "medium": 500, "bold": 700)
  ===
  @use "sass:map"

  $light-weights: ("lightest": 100, "light": 300)
  $heavy-weights: ("medium": 500, "bold": 700)

  @debug map.merge($light-weights, $heavy-weights)
  // ("lightest": 100, "light": 300, "medium": 500, "bold": 700)
{% endcodeExample %}

Se ambos mapas tiverem as mesmas chaves, os valores do segundo mapa são usados no mapa que for retornado:

{% codeExample 'map-same-keys', false %}
  @use "sass:map";

  $weights: ("light": 300, "medium": 500);

  @debug map.merge($weights, ("medium": 700));
  // ("light": 300, "medium": 700)
  ===
  @use "sass:map";

  $weights: ("light": 300, "medium": 500)

  @debug map.merge($weights, ("medium": 700))
  // ("light": 300, "medium": 700)
{% endcodeExample %}

Nota que uma vez que os mapas de Sass são [imutáveis][immutable], `map.set()` e `map.merge()` não modificam a lista original.

[immutable]: #immutability

## Imutabilidade {#immutability}

Os mapas na Sass são *imutáveis*, o que significa que o conteúdo dum valor do mapa nunca muda. As funções do mapa da Sass retornam todas novos mapas ao invés de modificarem os originais. A imutabilidade ajuda a evitar muitos erros de programação sorrateiros que podem infiltrar-se quando o mesmo mapa for partilhado através de diferentes partes da folha de estilos.

Mesmo assim podes continuar a atualizar o teu estado ao longo do tempo atribuindo novos mapas para a mesma variável. Isto é muitas vezes usado em funções e misturas para rastrear a configuração num mapa:

{% codeExample 'immutability', false %}
  @use "sass:map";

  $prefixes-by-browser: ("firefox": moz, "safari": webkit, "ie": ms);

  @mixin add-browser-prefix($browser, $prefix) {
    $prefixes-by-browser: map.merge($prefixes-by-browser, ($browser: $prefix)) !global;
  }

  @include add-browser-prefix("opera", o);
  @debug $prefixes-by-browser;
  // ("firefox": moz, "safari": webkit, "ie": ms, "opera": o)
  ===
  @use "sass:map"

  $prefixes-by-browser: ("firefox": moz, "safari": webkit, "ie": ms)

  @mixin add-browser-prefix($browser, $prefix)
    $prefixes-by-browser: map.merge($prefixes-by-browser, ($browser: $prefix)) !global


  @include add-browser-prefix("opera", o)
  @debug $prefixes-by-browser
  // ("firefox": moz, "safari": webkit, "ie": ms, "opera": o)
{% endcodeExample %}
