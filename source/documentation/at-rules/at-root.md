---
title: "@at-root"
introduction: >
  A regra `@at-root` é normalmente escrita como `@at-root <selector> { ... }` e causa que tudo dentro dela seja emitido na raiz do documento ao lugar de usar o encaixamento normal. É usada com mais frequência quando faz-se [encaixamento avançado](/documentation/style-rules/parent-selector#advanced-nesting) com o [seletor de pai](/documentation/style-rules/parent-selector#in-sassscript) e [funções de seletor](/documentation/modules/selector) da SassScript.
---

{% render 'code_snippets/example-advanced-nesting' %}

A regra `@at-root` é necessária neste contexto porque a Sass não sabe qual interpolação foi usada para gerar um seletor quando está a realizar encaixamento de seletor. Isto significa que adicionará automaticamente o seletor externo ao seletor interno *mesmo se* usaste `&` como uma expressão de SassScript. A regra `@at-root` diz explicitamente a Sass para não incluir o seletor externo.

{% funFact %}
  A regra `@at-root` também pode ser escrita como `@at-root { ... }` para colocar várias regras de estilo na raiz do documento. De fato, `@at-root <selector> { ... }` é apenas uma estenografia para `@at-root { <selector> { ... } }`!
{% endfunFact %}

## Além das Regras de Estilo {#beyond-style-rules}

Por si mesma, a `@at-root` apenas livra-se das [regras de estilo][style rules]. Quaisquer regras de arroba como [`@media`][] ou [`@supports`][] serão deixadas. Se isto não for o que quiseres, podes controlar exatamente qual incluir ou excluir usando sintaxe como as [funcionalidades de consulta de media][media query features], escrita como `@at-root (with: <rules...>) { ... }` ou `@at-root (without: <rules...>) { ... }`. A consulta `(without: ...)`  diz a Sass que as regras deveriam ser excluídas; a consulta `(with: ...)` exclui todas as regras *exceto* aquelas que são listas:

[style rules]: /documentation/style-rules
[`@media`]: /documentation/at-rules/css#media
[`@supports`]: /documentation/at-rules/css#supports
[media query features]: https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#Targeting_media_features

{% codeExample 'at-root' %}
  @media print {
    .page {
      width: 8in;

      @at-root (without: media) {
        color: #111;
      }

      @at-root (with: rule) {
        font-size: 1.2em;
      }
    }
  }
  ===
  @media print
    .page
      width: 8in

      @at-root (without: media)
        color: #111


      @at-root (with: rule)
        font-size: 1.2em
{% endcodeExample %}

Além dos nomes das regras de arroba, existem dois valores especiais que podem ser usados nas consultas:

* `rule` refere-se às regras de estilo. Por exemplo, `@at-root (with: rule)` exclui todas as regras de arroba mas preserva as regras de estilo.

* `all` refere-se a todas as regras de arrobas *e* regras de estilo que deveriam ser excluídas.
