---
title: Regras Que Usam Arroba
introduction: >
  Muita da funcionalidade adicional da Sass vem na forma de novas [regras que usam arroba](https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule) que ela adiciona sobre a CSS.
---

* [`@use`](/documentation/at-rules/use) carrega as misturas, funções, e variáveis de outras folhas de estilo de Sass, e combina juntas a CSS de várias folhas de estilo.

* [`@forward`](/documentation/at-rules/forward) carrega uma folha de estilo de Sass e torna as suas misturas, funções, e variáveis disponíveis quando a tua folha de estilo for carregada com a regra `@use`.

* [`@import`](/documentation/at-rules/import) estende a regra de CSS que usa arroba para carregar estilos, misturas, funções, e variáveis de outras folhas de estilo.

* [`@mixin` e `@include`](/documentation/at-rules/mixin) torna fácil reutilizar pedaços de estilos.

* [`@function`](/documentation/at-rules/function) define funções personalizadas que podem ser usadas em [expressões de SassScript][SassScript expressions].

* [`@extend`](/documentation/at-rules/extend) permite os seletores herdarem estilos de outros seletores.

* [`@at-root`](/documentation/at-rules/at-root) coloca estilos dentro isto na raiz do documento de CSS.

* [`@error`](/documentation/at-rules/error) causa a falha de compilação com uma mensagem de erro.

* [`@warn`](/documentation/at-rules/warn) imprime um aviso sem interromper completamente a compilação.

* [`@debug`](/documentation/at-rules/debug) imprime uma mensagem para fins de depuração.

* As regras de controlo de fluxo como [`@if`][], [`@each`][], [`@for`][], e [`@while`][] controlam se ou quantas vezes os estilos são emitidos.

[SassScript expressions]: /documentation/syntax/structure#expressions
[`@if`]: /documentation/at-rules/control/if
[`@each`]: /documentation/at-rules/control/each
[`@for`]: /documentation/at-rules/control/for
[`@while`]: /documentation/at-rules/control/while

A Sass também algum comportamento especial para [regras de CSS simples que usam arroba][plain CSS at-rules]: elas podem conter [interpolação][interpolation], e podem ser encaixadas nas regras de estilo. Algumas delas, como [`@media`][] e [`@supports`][], também permitem a SassScript ser usada diretamente na própria regra sem interpolação.

[plain CSS at-rules]: /documentation/at-rules/css
[interpolation]: /documentation/interpolation
[`@media`]: /documentation/at-rules/css#media
[`@supports`]: /documentation/at-rules/css#supports
