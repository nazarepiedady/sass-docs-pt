---
title: sass:map
---

{% render 'doc_snippets/built-in-module-status' %}

{% funFact %}
  As bibliotecas e sistema de desenho da Sass tendem a partilhar e sobrepor configurações que são representadas como mapas encaixados (mapas que contêm mapas que contêm mapas).

  Para ajudar a trabalhar com mapas encaixados, algumas funções de mapa suportam operações profundas. Por exemplo, se passares várias chaves para `map.get()`, seguirão estas chaves para encontrar o mapa encaixado desejado:

  {% codeExample 'map', false %}
    $config: (a: (b: (c: d)));
    @debug map.get($config, a, b, c); // d
    ===
    $config: (a: (b: (c: d)))
    @debug map.get($config, a, b, c) // d
  {% endcodeExample %}
{% endfunFact %}


{% function 'map.deep-merge($map1, $map2)', 'returns:map' %}
  {% compatibility 'dart: "1.27.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

  Idêntico ao [`map.merge()`](#merge), exceto que os valores do mapa encaixado *também* são combinados recursivamente:

  {% codeExample 'map-deep-merge', false %}
    $helvetica-light: (
      "weights": (
        "lightest": 100,
        "light": 300
      )
    );
    $helvetica-heavy: (
      "weights": (
        "medium": 500,
        "bold": 700
      )
    );

    @debug map.deep-merge($helvetica-light, $helvetica-heavy);
    // (
    //   "weights": (
    //     "lightest": 100,
    //     "light": 300,
    //     "medium": 500,
    //     "bold": 700
    //   )
    // )
    @debug map.merge($helvetica-light, $helvetica-heavy);
    // (
    //   "weights": (
    //     "medium: 500,
    //     "bold": 700
    //   )
    // )
    ===
    $helvetica-light: ("weights": ("lightest": 100, "light": 300))
    $helvetica-heavy: ("weights": ("medium": 500, "bold": 700))

    @debug map.deep-merge($helvetica-light, $helvetica-heavy)
    // (
    //   "weights": (
    //     "lightest": 100,
    //     "light": 300,
    //     "medium": 500,
    //     "bold": 700
    //   )
    // )
    @debug map.merge($helvetica-light, $helvetica-heavy);
    // (
    //   "weights": (
    //     "medium: 500,
    //     "bold": 700
    //   )
    // )
  {% endcodeExample %}
{% endfunction %}


{% function 'map.deep-remove($map, $key, $keys...)', 'returns:map' %}
  {% compatibility 'dart: "1.27.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

  Se `$keys` estiver vazio, retorna uma cópia de `$map` sem um valor associado ao `$key`:

  {% codeExample 'map-deep-remove', false %}
    $font-weights: ("regular": 400, "medium": 500, "bold": 700);

    @debug map.deep-remove($font-weights, "regular");
    // ("medium": 500, "bold": 700)
    ===
    $font-weights: ("regular": 400, "medium": 500, "bold": 700)

    @debug map.deep-remove($font-weights, "regular")
    // ("medium": 500, "bold": 700)
  {% endcodeExample %}

  ---

  Se `$keys` não estiver vazio, segue o conjunto de chaves incluindo `$key` e excluindo a última chave em `$keys`, da esquerda para a direita, para encontrar o mapa encaixado apontado para a atualização.

  Retorna uma cópia de `$map` onde o mapa escolhido como alvo não tem um valor associado à última chave em `$keys`:

  {% codeExample 'map-deep-remove-2', false %}
    $fonts: (
      "Helvetica": (
        "weights": (
          "regular": 400,
          "medium": 500,
          "bold": 700
        )
      )
    );

    @debug map.deep-remove($fonts, "Helvetica", "weights", "regular");
    // (
    //   "Helvetica": (
    //     "weights: (
    //       "medium": 500,
    //       "bold": 700
    //     )
    //   )
    // )
    ===
    $fonts: ("Helvetica": ("weights": ("regular": 400, "medium": 500, "bold": 700)))

    @debug map.deep-remove($fonts, "Helvetica", "weights", "regular")
    // (
    //   "Helvetica": (
    //     "weights: (
    //       "medium": 500,
    //       "bold": 700
    //     )
    //   )
    // )
  {% endcodeExample %}
{% endfunction %}


{% function 'map.get($map, $key, $keys...)', 'map-get($map, $key, $keys...)' %}
  Se `$keys` estiver vazio, retorna o valor no `$map` associado ao `$key`.

  Se `$map` não tiver um valor associado ao `$key`, retorna [`null`][].

  [`null`]: /documentation/values/null

  {% render 'code_snippets/example-map-get' %}

  ---

  {% compatibility 'dart: "1.27.0"', 'libsass: false', 'ruby: false' %}
    Apenas Sass de Dart suporta chamar `map.get()` com mais de dois argumentos.
  {% endcompatibility %}

  Se `$keys` não estiver vazio, segue o conjunto de chaves incluindo `$kye` e excluindo a última chave no `$keys`, da esquerda para a direita, para encontrar o mapa encaixado apontado para a averiguação.

  Retorna o valor no mapa escolhido como alvo associado à última chave em `$keys`.

  Retorna [`null`][] se o mapa não tiver um valor associado à chave, ou se qualquer chave em `$keys` estiver em falta num mapa ou fizer referência a um valor que não é um mapa:

  [`null`]: /documentation/values/null

  {% codeExample 'map-deep-remove-2', false %}
    $fonts: (
      "Helvetica": (
        "weights": (
          "regular": 400,
          "medium": 500,
          "bold": 700
        )
      )
    );

    @debug map.get($fonts, "Helvetica", "weights", "regular"); // 400
    @debug map.get($fonts, "Helvetica", "colors"); // null
    ===
    $fonts: ("Helvetica": ("weights": ("regular": 400, "medium": 500, "bold": 700)))

    @debug map.get($fonts, "Helvetica", "weights", "regular") // 400
    @debug map.get($fonts, "Helvetica", "colors") // null
  {% endcodeExample %}
{% endfunction %}


{% function 'map.has-key($map, $key, $keys...)', 'map-has-key($map, $key, $keys...)', 'returns:boolean' %}
  Se `$keys` estive vazio, retorna verdadeiro se `$map` contiver um valor associando à `$key`:

  {% codeExample 'map-has-key', false %}
    $font-weights: ("regular": 400, "medium": 500, "bold": 700);

    @debug map.has-key($font-weights, "regular"); // true
    @debug map.has-key($font-weights, "bolder"); // false
    ===
    $font-weights: ("regular": 400, "medium": 500, "bold": 700)

    @debug map.has-key($font-weights, "regular") // true
    @debug map.has-key($font-weights, "bolder") // false
  {% endcodeExample %}

  ---

  {% compatibility 'dart: "1.27.0"', 'libsass: false', 'ruby: false' %}
    Apenas a Sass de Dart suporta chamar `map.has-key()` com mais de dois argumentos.
  {% endcompatibility %}

  Se `$keys` não estiver vazia, segue o conjunto de chaves incluindo `$key` e excluindo a última chave em `$keys`, da esquerda para a direita, para encontrar o mapa encaixado apontado para averiguação.

  Retorna verdadeiro se o mapa escolhido como alvo contiver um valor associado à última chave em `$keys`.

  Retorna falso se não contiver, ou se qualquer chave em `$keys` estiver em falta num mapa ou fizer referência a um valor que não estiver num mapa:

  {% codeExample 'map-has-key-2', false %}
    $fonts: (
      "Helvetica": (
        "weights": (
          "regular": 400,
          "medium": 500,
          "bold": 700
        )
      )
    );

    @debug map.has-key($fonts, "Helvetica", "weights", "regular"); // true
    @debug map.has-key($fonts, "Helvetica", "colors"); // false
    ===
    $fonts: ("Helvetica": ("weights": ("regular": 400, "medium": 500, "bold": 700)))

    @debug map.has-key($fonts, "Helvetica", "weights", "regular") // true
    @debug map.has-key($fonts, "Helvetica", "colors") // false
  {% endcodeExample %}
{% endfunction %}

{% function 'map.keys($map)', 'map-keys($map)', 'returns:list' %}
  Retorna uma lista separada por vírgula de todas as chaves no `$map`:

  {% codeExample 'map-keys', false %}
    $font-weights: ("regular": 400, "medium": 500, "bold": 700);

    @debug map.keys($font-weights); // "regular", "medium", "bold"
    ===
    $font-weights: ("regular": 400, "medium": 500, "bold": 700)

    @debug map.keys($font-weights)  // "regular", "medium", "bold"
  {% endcodeExample %}
{% endfunction %}


{% function 'map.merge($map1, $map2)', 'map-merge($map1, $map2)', 'map.merge($map1, $keys..., $map2)', 'map-merge($map1, $keys..., $map2)', 'returns:map' %}
  {% headsUp %}
    Na prática, os argumentos exatos para `map.merge($map1, $keys..., $map2)` são passados como `map.merge($map1, $args...)`. Eles são descritos aqui como `$map1, $keys..., $map2` apenas para fins de explicação.
  {% endheadsUp %}

  Se numa `$keys` forem passadas, retorna um novo mapa com todas as chaves e valores de ambos `$map1` e `$map2`.

  Se ambos `$map1` e `$map2` tiverem a mesma chave, o valor de `$map2` tem prioridade.

  Todas as chaves no mapa retorna que também aparecem em `$map1` têm a mesma ordem que em `$map1`. As novas chaves de `$map2` aparecem no final do mapa:

  {% codeExample 'map-merge', false %}
    $light-weights: ("lightest": 100, "light": 300);
    $heavy-weights: ("medium": 500, "bold": 700);

    @debug map.merge($light-weights, $heavy-weights);
    // ("lightest": 100, "light": 300, "medium": 500, "bold": 700)
    ===
    $light-weights: ("lightest": 100, "light": 300)
    $heavy-weights: ("medium": 500, "bold": 700)

    @debug map.merge($light-weights, $heavy-weights)
    // ("lightest": 100, "light": 300, "medium": 500, "bold": 700)
  {% endcodeExample %}

  ---

  {% compatibility 'dart: "1.27.0"', 'libsass: false', 'ruby: false' %}
    Apenas a Sass de Dart suporta chamar `map.merge` com mais de dois argumentos.
  {% endcompatibility %}

  Se `$keys` não estiver vazio, segue as `$keys` para encontrar o mapa encaixado apontado para a fusão. Se qualquer chave em `$keys` estiver em faltando num mapa ou fizer referência a um valor que não for um mapa, define o valor nessa chave para um mapa vazio.

  Retorna uma cópia de `$map1` onde o mapa escolhido como alvo é substituído por um mapa novo que contém todas as chaves e valores de ambos o mapa escolhido como alvo e `$map2`:

  {% codeExample 'map-merge-2', false %}
    $fonts: (
      "Helvetica": (
        "weights": (
          "lightest": 100,
          "light": 300
        )
      )
    );
    $heavy-weights: ("medium": 500, "bold": 700);

    @debug map.merge($fonts, "Helvetica", "weights", $heavy-weights);
    // (
    //   "Helvetica": (
    //     "weights": (
    //       "lightest": 100,
    //       "light": 300,
    //       "medium": 500,
    //       "bold": 700
    //     )
    //   )
    // )
    ===
    $fonts: ("Helvetica": ("weights": ("lightest": 100, "light": 300)))
    $heavy-weights: ("medium": 500, "bold": 700)

    @debug map.merge($fonts, "Helvetica", "weights", $heavy-weights)
    // (
    //   "Helvetica": (
    //     "weights": (
    //       "lightest": 100,
    //       "light": 300,
    //       "medium": 500,
    //       "bold": 700
    //     )
    //   )
    // )
  {% endcodeExample %}
{% endfunction %}

{% function 'map.remove($map, $keys...)', 'map-remove($map, $keys...)', 'returns:map' %}
  Retorna uma cópia de `$map` sem quaisquer valores associados às `$keys`.

  Se uma chave em `$keys` não tem um valor associado no `$map`, é ignorada:

  {% codeExample 'map-remove', false %}
    $font-weights: ("regular": 400, "medium": 500, "bold": 700);

    @debug map.remove($font-weights, "regular"); // ("medium": 500, "bold": 700)
    @debug map.remove($font-weights, "regular", "bold"); // ("medium": 500)
    @debug map.remove($font-weights, "bolder");
    // ("regular": 400, "medium": 500, "bold": 700)
    ===
    $font-weights: ("regular": 400, "medium": 500, "bold": 700)

    @debug map.remove($font-weights, "regular")  // ("medium": 500, "bold": 700)
    @debug map.remove($font-weights, "regular", "bold")  // ("medium": 500)
    @debug map.remove($font-weights, "bolder")
    // ("regular": 400, "medium": 500, "bold": 700)
  {% endcodeExample %}
{% endfunction %}

{% function 'map.set($map, $key, $value)', 'map.set($map, $keys..., $key, $value)', 'returns:map' %}
  {% headsUp %}
    Na prática, os argumentos exatos para `map.set($map, $keys..., $key, $value)` são passados como `map.set($map, $args...)`. Eles são descritos aqui como `$map, $keys..., $key, $value` apenas por fins de explicação.
  {% endheadsUp %}

  Se `$keys` não forem passadas, retorna uma cópia de `$map` com o valor na `$key` definida para `$value`:

  {% codeExample 'map-set', false %}
    $font-weights: ("regular": 400, "medium": 500, "bold": 700);

    @debug map.set($font-weights, "regular", 300);
    // ("regular": 300, "medium": 500, "bold": 700)
    ===
    $font-weights: ("regular": 400, "medium": 500, "bold": 700)

    @debug map.set($font-weights, "regular", 300)
    // ("regular": 300, "medium": 500, "bold": 700)
  {% endcodeExample %}

  ---

  {% compatibility 'dart: "1.27.0"', 'libsass: false', 'ruby: false' %}
    Apenas Sass de Dart suporta chamar `map.set()` com mais de três argumentos.
  {% endcompatibility %}

  Se `$keys` forem passadas, segue as `$keys` para encontrar o mapa encaixado apontado para atualização. Se qualquer chave em `$keys` estiver faltando num mapa ou fizer referência a um valor que não é um mapa, define o valor nesta chave para um mapa vazio.

  Retorna uma cópia de `$map` com o valor do mapa escolhido como alvo na `$key` definido para `$value`:

  {% codeExample 'map-set-2', false %}
    $fonts: (
      "Helvetica": (
        "weights": (
          "regular": 400,
          "medium": 500,
          "bold": 700
        )
      )
    );

    @debug map.set($fonts, "Helvetica", "weights", "regular", 300);
    // (
    //   "Helvetica": (
    //     "weights": (
    //       "regular": 300,
    //       "medium": 500,
    //       "bold": 700
    //     )
    //   )
    // )
    ===
    $fonts: ("Helvetica": ("weights": ("regular": 400, "medium": 500, "bold": 700)))

    @debug map.set($fonts, "Helvetica", "weights", "regular", 300)
    // (
    //   "Helvetica": (
    //     "weights": (
    //       "regular": 300,
    //       "medium": 500,
    //       "bold": 700
    //     )
    //   )
    // )
  {% endcodeExample %}
{% endfunction %}

{% function 'map.values($map)', 'map-values($map)', 'returns:list' %}
  Retorna uma lista separada por vírgula de todos os valores em `$map`.

  {% codeExample 'map-values', false %}
    $font-weights: ("regular": 400, "medium": 500, "bold": 700);

    @debug map.values($font-weights); // 400, 500, 700
    ===
    $font-weights: ("regular": 400, "medium": 500, "bold": 700)

    @debug map.values($font-weights)  // 400, 500, 700
  {% endcodeExample %}
{% endfunction %}
