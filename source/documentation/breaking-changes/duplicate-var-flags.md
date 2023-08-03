---
title: 'Mudança de Rutura: Sinalizadores de Variável Duplicadas'
introduction: >
  As variáveis apenas permitirão um sinalizador `!global` ou `!default`. Os sinalizadores duplicados nunca tiveram efeito adicional, isto apenas garante que as folhas de estilo sejam mais consistentes.
---

## Fase 1 {#phase-1}

{% compatibility 'dart: "2.0.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

Desde a Sass de Dart 2.0.0, se uma única declaração de variável tiver mais de um de cada sinalizador `!global` ou `!default`, isto será um erro de sintaxe. Isto significa que `$var: value !default !default` será proibido. `$var: value !global !default` ainda será permitido.

## Período de Transição {#transition-period}

{% compatibility 'dart: "1.62.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

Até a Sass de Dart 2.0.0 ser lançada, várias cópias dum sinalizador apenas produzem avisos de depreciação.
