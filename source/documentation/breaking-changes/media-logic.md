---
title: "Mudança de Rutura: Consultas de Media de Nível 4"
introduction: >
  A Sass adicionou suporte para as especificações de Consultas de Media de Nível 4 da CSS. Isto originalmente entrava em conflito com alguma sintaxe específica de Sass, assim esta sintaxe foi depreciada e agora é interpretada de acordo com o padrão da CSS.
---

{% compatibility 'dart: "1.56.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

Uma vez que a Sass suporta quase qualquer expressão de Sass em condições de media entre parênteses, existiam algumas construções cujo significado foi mudado adicionado suporte completo para Consultas de Media de Nível 4. Especificamente:

* `@media (not (foo))` era historicamente interpretada pela Sass como significando `@media (#{not (foo)})`, e então compilada para `@media (false)`.

* `@media ((foo) and (bar))` e `@media ((foo) or (bar))` eram de maneira semelhante interpretadas como operadores lógicos da SassScript, compilando para `@media (bar)` e `@media (foo)` respetivamente.

Felizmente, estes vieram a tornar-se pouco frequentes na prática.

## Período de Transição {#transition-period}

{% compatibility 'dart: "1.54.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

Primeiro, emitimos os avisos de depreciação para os anteriores casos ambíguos. Estes terão sugestões para como preservar o comportamento existente ou como usar a nova sintaxe de CSS.
