---
title: sass:string
---

{% render 'doc_snippets/built-in-module-status' %}

{% function 'string.quote($string)', 'quote($string)', 'returns:string' %}
  Retorna `$string` como uma sequência de caracteres com aspas.

  {% codeExample 'quote', false %}
    @debug string.quote(Helvetica); // "Helvetica"
    @debug string.quote("Helvetica"); // "Helvetica"
    ===
    @debug string.quote(Helvetica)  // "Helvetica"
    @debug string.quote("Helvetica")  // "Helvetica"
  {% endcodeExample %}
{% endfunction %}


{% function 'string.index($string, $substring)', 'str-index($string, $substring)', 'returns:number' %}
  Retorna o primeiro [índice][index] da `$substring` na `$string`, ou `null` se `$string` não contiver a `$substring`.

  [index]: /documentation/values/strings#string-indexes

  {% codeExample 'index', false %}
    @debug string.index("Helvetica Neue", "Helvetica"); // 1
    @debug string.index("Helvetica Neue", "Neue"); // 11
    ===
    @debug string.index("Helvetica Neue", "Helvetica")  // 1
    @debug string.index("Helvetica Neue", "Neue")  // 11
  {% endcodeExample %}
{% endfunction %}


{% function 'string.insert($string, $insert, $index)', 'str-insert($string, $insert, $index)', 'returns:string' %}
  Retorna uma cópia da `$string` com `$insert` inserido no [`$index`][].

  [`$index`]: /documentation/values/strings#string-indexes

  {% codeExample 'insert', false %}
    @debug string.insert("Roboto Bold", " Mono", 7); // "Roboto Mono Bold"
    @debug string.insert("Roboto Bold", " Mono", -6); // "Roboto Mono Bold"
    ===
    @debug string.insert("Roboto Bold", " Mono", 7)  // "Roboto Mono Bold"
    @debug string.insert("Roboto Bold", " Mono", -6)  // "Roboto Mono Bold"
  {% endcodeExample %}

  Se `$index` for maior do que o comprimento da `$string`, `$insert` é adicionado ao final. Se `$index` for menor do que o comprimento negativo da sequência de caracteres, `$insert` é adicionado ao início.

  {% codeExample 'insert-2', false %}
    @debug string.insert("Roboto", " Bold", 100); // "Roboto Bold"
    @debug string.insert("Bold", "Roboto ", -100); // "Roboto Bold"
    ===
    @debug string.insert("Roboto", " Bold", 100)  // "Roboto Bold"
    @debug string.insert("Bold", "Roboto ", -100)  // "Roboto Bold"
  {% endcodeExample %}
{% endfunction %}


{% function 'string.length($string)', 'str-length($string)', 'returns:number' %}
  Retorna o número de caracteres na `$string`.

  {% codeExample 'length', false %}
    @debug string.length("Helvetica Neue"); // 14
    @debug string.length(bold); // 4
    @debug string.length(""); // 0
    ===
    @debug string.length("Helvetica Neue")  // 14
    @debug string.length(bold)  // 4
    @debug string.length("")  // 0
  {% endcodeExample %}
{% endfunction %}


{% function 'string.slice($string, $start-at, $end-at: -1)', 'str-slice($string, $start-at, $end-at: -1)', 'returns:string' %}
  Retorna a fatia da `$string` começando no [índice][index] `$start-at` e terminando no índice `$end-at` (ambos inclusos).

  [index]: /documentation/values/strings#string-indexes

  {% codeExample 'slice', false %}
    @debug string.slice("Helvetica Neue", 11); // "Neue"
    @debug string.slice("Helvetica Neue", 1, 3); // "Hel"
    @debug string.slice("Helvetica Neue", 1, -6); // "Helvetica"
    ===
    @debug string.slice("Helvetica Neue", 11)  // "Neue"
    @debug string.slice("Helvetica Neue", 1, 3)  // "Hel"
    @debug string.slice("Helvetica Neue", 1, -6)  // "Helvetica"
  {% endcodeExample %}
{% endfunction %}


{% function 'string.split($string, $separator, $limit: null)', 'returns:list' %}
  {% compatibility 'dart: "1.57.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

  Retorna uma lista separada por vírgula de subsequência de caracteres de `$string` entre parênteses reto que são separados pelo `$separator`. Os `$separator` não são incluído nestas subsequência de caracteres.

  Se `$limit` for um número `1` ou superior, este separa no máximo de `$separator` (se então retorna no máximo sequências de caracteres de `$limit + 1`). A última subsequência de caracteres contém o resto da sequência de caracteres, incluindo quaisquer `$separator` restantes:

  {% codeExample 'split', false %}
    @debug string.split("Segoe UI Emoji", " "); // ["Segoe", "UI", "Emoji"]
    @debug string.split("Segoe UI Emoji", " ", $limit: 1); // ["Segoe", "UI Emoji"]
    ===
    @debug string.split("Segoe UI Emoji", " ")  // ["Segoe", "UI", "Emoji"]
    @debug string.split("Segoe UI Emoji", " ", $limit: 1)  // ["Segoe", "UI Emoji"]
  {% endcodeExample %}
{% endfunction %}


{% function 'string.to-upper-case($string)', 'to-upper-case($string)', 'returns:string' %}
  Retorna uma cópia de `$string` com as letras de [ASCII][] convertidas para maiúsculas.

  [ASCII]: https://en.wikipedia.org/wiki/ASCII

  {% codeExample 'to-upper-case', false %}
    @debug string.to-upper-case("Bold"); // "BOLD"
    @debug string.to-upper-case(sans-serif); // SANS-SERIF
    ===
    @debug string.to-upper-case("Bold")  // "BOLD"
    @debug string.to-upper-case(sans-serif)  // SANS-SERIF
  {% endcodeExample %}
{% endfunction %}


{% function 'string.to-lower-case($string)', 'to-lower-case($string)', 'returns:string' %}
  Retorna uma cópia de `$string` com as letras [ASCII][] convertidas para minúsculas.

  [ASCII]: https://en.wikipedia.org/wiki/ASCII

  {% codeExample 'to-lower-case', false %}
    @debug string.to-lower-case("Bold"); // "bold"
    @debug string.to-lower-case(SANS-SERIF); // sans-serif
    ===
    @debug string.to-lower-case("Bold")  // "bold"
    @debug string.to-lower-case(SANS-SERIF)  // sans-serif
  {% endcodeExample %}
{% endfunction %}


{% function 'string.unique-id()', 'unique-id()', 'returns:string' %}
  Retorna uma sequência de caracteres sem aspas gerada aleatoriamente que é garantido ser um identificador de CSS válido e ser único dentro da atual compilação de Sass.

  {% codeExample 'unique-id', false %}
    @debug string.unique-id(); // uabtrnzug
    @debug string.unique-id(); // u6w1b1def
    ===
    @debug string.unique-id(); // uabtrnzug
    @debug string.unique-id(); // u6w1b1def
  {% endcodeExample %}
{% endfunction %}


{% function 'string.unquote($string)', 'unquote($string)', 'returns:string' %}
  Retorna `$string` como uma sequência de caracteres sem aspas. Este pode produzir sequências de caracteres que não são CSS válidos, então use com cuidado.

  {% codeExample 'unquote', false %}
    @debug string.unquote("Helvetica"); // Helvetica
    @debug string.unquote(".widget:hover"); // .widget:hover
    ===
    @debug string.unquote("Helvetica")  // Helvetica
    @debug string.unquote(".widget:hover")  // .widget:hover
  {% endcodeExample %}
{% endfunction %}
