---
title: "Mudança de Rutura: -moz-document"
introduction: >
  O Firefox costumava ter uma regra `@-moz-document` exigindo analise especial. Já que o suporte foi removido do Firefox, Sass está no processo de remover o suporte de sua analise.
---

A Sass tem historicamente suportado uma analise especial para a regra `@-moz-document`. Como o [Firefox desistiu do suporte delas], a Sass também desistirá do suporte da analise especial e a tratará como uma regra de arroba desconhecida.

[Firefox dropped support for them]: https://web.archive.org/web/20200528221656/https://www.fxsitecompat.dev/en-CA/docs/2018/moz-document-support-has-been-dropped-except-for-empty-url-prefix/


**Existe uma exceção**: uma função de prefixo de url vazia ainda é permitida, já que é usada num malabarismo destinado ao Firefox:

{% codeExample 'moz-document' %}
  @-moz-document url-prefix() {
    .error {
      color: red;
    }
  }
  ===
  @-moz-document url-prefix()
    .error
      color: red
{% endcodeExample %}

## Período de Transição {#transition-period}

{% compatibility 'dart: "1.7.2"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

Primeiro, emitiremos avisos de depreciação para todos os usos de `@-moz-document` exceto para o malabarismo de prefixo de url vazia.

Na Sass de Dart 2.9, `@-moz-document` será tratada como uma regra de arroba desconhecida.
