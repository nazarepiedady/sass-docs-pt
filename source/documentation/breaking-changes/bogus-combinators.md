---
title: "Mudança da Rutura: Combinadores Inválidos"
introduction: >
  A Sass tem sido historicamente muito permissiva sobre o uso de combinadores à esquerda, à direita, e repetidos nos seletores. Estes combinadores são a ser depreciado exceto onde são úteis para o encaixamento.
---

A Sass tem suportado historicamente três usos inválidos de combinadores:

* Combinadores à esquerda, como em `+ .error {color: red}`.

* Combinadores à direita, como em `.error + {color: red}`.

* Combinadores repetidos, como em `div > > .erro {color: red}`.

Nenhuma destas é CSS válida, e todos eles farão os navegadores ignorarem a regra de estilo em questão. O suporte delas adicionou um quantidade substancial de complexidade à implementação da Sass, e tornou particularmente difícil corrigir vários erros de programação relacionados a regra `@extend`. Como tal, [tomamos a decisão][made the decision] de remover o suporte para estes usos.

[made the decision]: https://github.com/sass/sass/issues/3340

**Existe uma exceção importante**: os combinadores à esquerda e à direita ainda podem ser usados para fins de encaixamento. Por exemplo, o seguinte código continua a ser muito suportado:

{% codeExample 'bogus-combinators' %}
  .sidebar > {
    .error {
      color: red;
    }
  }
  ===
  .sidebar >
    .error
      color: red
{% endcodeExample %}

A Sass apenas produzirá um erro se um seletor ainda tiver um combinador à esquerda ou à direita _depois do encaixamento for resolvido_. Os combinadores repetidos, por outro lado, sempre resultará em erros.

Para garantir as folhas de estilo existentes que (provavelmente por acidente) contêm combinadores inválidos, suportaremos um período de transição até o próximo lançamento principal da Sass de Dart.

## Período de Transição {#transition-period}

{% compatibility 'dart: "1.54.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

Primeiro, emitiremos avisos de depreciação para todos os combinadores duplos, bem como para os combinadores à esquerda ou à direita que terminam em seletores depois do encaixamento ser resolvido.

{% render 'doc_snippets/silence-deprecations' %}

Além disto, começaremos imediatamente a omitir os seletores que sabemos ser CSS inválidos da CSS compilada, com uma exceção: _não omitiremos_ os seletores que começam com um combinador à esquerda, visto que podem ser usados a partir duma regra `@import` encaixada ou mistura `meta.load-css()`. No entanto, não encorajamos este padrão e abandonaremos o suporte para isto na Sass de Dart 2.0.0.
