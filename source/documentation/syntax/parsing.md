---
title: Analisando uma Folha de Estilo
introduction: >
  Uma folha de estilo de Sass é analisado a partir duma sequência de pontos de código de unicode. É analisado diretamente, sem primeiro ser convertida para uma corrente simbólico.
---

## Codificação da Entrada {#input-encoding}

{% compatibility 'dart: false', 'libsass: true', 'ruby: true' %}
  A Sass de Dart atualmente *apenas* suporta a codificação UTF-8. Como tal, é mais seguro codificar todas as folhas de estilos de Sass como UTF-8.
{% endcompatibility %}

É frequentemente o caso de que um documento está inicialmente disponível apenas como uma sequência de bytes, que deve ser descodificado para Unicode. A Sass realiza esta descodificação como se segue:

* Se a sequência de bytes começar com a codificação UTF-8 ou UTF-16 da MARCA DE ORDEM DE BYTE U+FEFF, a codificação correspondente é usada.

* Se a sequência de bytes começar com a sequência de caracteres ASCII simples `@charset`, a Sass determina a codificação usado a etapa 2 do algoritmo de CSS para [determinar a codificação de retorno][determining the fallback encoding].

  [determining the fallback encoding]: https://drafts.csswg.org/css-syntax-3/#input-byte-stream

* De outro modo, a UTF-8 é usada.

## Erros de Analise {#parse-errors}

Quando a Sass deparar-se com sintaxe inválida numa folha de estilos, a analise falhará e um erro será apresentado ao utilizador com a informação sobre a localização da sintaxe inválida e o motivo que fez dela inválida.

Nota que isto é diferente da CSS, que especifica como recuperar da maioria dos erros ao invés de falhar imediatamente. Isto é um dos poucos casos onde a SCSS não é *estritamente* um super conjunto de CSS. No entanto, é muito mais útil para os utilizadores de Sass ver os erros imediatamente, no lugar de tê-los passados para saída de CSS.

A localização dos erros de analise pode ser acessada através das APIs específicas da implementação. Por exemplo, na Sass de Dart podes acessar [`SassException.span`][], e na API de JavaScript da Sass de Node e Sass podes acessar as propriedades [`file`, `line`, e `column`][js error].

[`SassException.span`]: https://pub.dartlang.org/documentation/sass/latest/sass/SassException/span.html
[js error]: https://github.com/sass/node-sass#error-object
