---
title: sass:selector
---

{% render 'doc_snippets/built-in-module-status' %}

## Valores de Seletor {#selector-values}

As funções neste módulo inspecionam e manipulam os seletores. Sempre que retornam um seletor, é sempre uma [lista][list] separada por vírgula (a lista de seletor) que contém listas separadas por espaço (os seletores complexos) que contém [sequências de caracteres sem aspas][unquoted strings] (os seletores compostos). Por exemplo, o seletor `.main aside:hover, .sidebar p` seria retornado como:

[list]: /documentation/values/lists
[unquoted strings]: /documentation/values/strings#unquoted

```scss
@debug ((unquote(".main") unquote("aside:hover")),
        (unquote(".sidebar") unquote("p")));
// .main aside:hover, .sidebar p
```

Os argumentos de seletor para estas funções podem estar no mesmo formato, mas também podem apenas ser sequências de caracteres normais (com aspas ou sem aspas), ou uma combinação. Por exemplo, `".main aside:hover, .sidebar p"` é um argumento de seletor válido.

{% function 'selector.is-superselector($super, $sub)', 'is-superselector($super, $sub)', 'returns:boolean' %}
  Retorna verdadeiro se o seletor `$super` corresponder todos os elementos que o seletor `$sub` corresponder.

  Continua a retornar verdadeiro mesmo se `$super` corresponder *mais* elementos do que `$sub`.

  Os seletores `$super` e `$sub` podem conter [seletores de espaço reservado][placeholder selectors], mas não [seletores de pai][parent selectors]:

  [placeholder selectors]: /documentation/style-rules/placeholder-selectors
  [parent selectors]: /documentation/style-rules/parent-selector

  {% codeExample 'is-superselector', false %}
    @debug selector.is-superselector("a", "a.disabled"); // true
    @debug selector.is-superselector("a.disabled", "a"); // false
    @debug selector.is-superselector("a", "sidebar a"); // true
    @debug selector.is-superselector("sidebar a", "a"); // false
    @debug selector.is-superselector("a", "a"); // true
    ===
    @debug selector.is-superselector("a", "a.disabled")  // true
    @debug selector.is-superselector("a.disabled", "a")  // false
    @debug selector.is-superselector("a", "sidebar a")  // true
    @debug selector.is-superselector("sidebar a", "a")  // false
    @debug selector.is-superselector("a", "a")  // true
  {% endcodeExample %}
{% endfunction %}

{% function 'selector.append($selectors...)', 'selector-append($selectors...)', 'returns:selector' %}
  Combina `$selectors` sem os [combinadores de descendente][descendant combinators] — que está, sem espaço em branco entre eles.

  [descendant combinators]: https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_selectors

  Se qualquer seletor em `$selectors` for uma lista de seletor, cada seletor complexo é combinado separadamente.

  O `$selectors` pode conter [seletores de espaço reservado][placeholder selectors], mas não [seletores de pai][parent selectors].

  [placeholder selectors]: /documentation/style-rules/placeholder-selectors
  [parent selectors]: /documentation/style-rules/parent-selector

  Consulte também [`selector.nest()`](#nest).

  {% codeExample 'append', false %}
    @debug selector.append("a", ".disabled"); // a.disabled
    @debug selector.append(".accordion", "__copy"); // .accordion__copy
    @debug selector.append(".accordion", "__copy, __image");
    // .accordion__copy, .accordion__image
    ===
    @debug selector.append("a", ".disabled")  // a.disabled
    @debug selector.append(".accordion", "__copy")  // .accordion__copy
    @debug selector.append(".accordion", "__copy, __image")
    // .accordion__copy, .accordion__image
  {% endcodeExample %}
{% endfunction %}


{% function 'selector.extend($selector, $extendee, $extender)', 'selector-extend($selector, $extendee, $extender)', 'returns:selector' %}
  Estende `$selector` de acordo com a [regra `@extend`].

  [`@extend` rule]: /documentation/at-rules/extend

  Retorna uma cópia de `$seletor` modificado com a seguinte regra `@extend`:

  ```scss
  #{$extender} {
    @extend #{$extendee};
  }
  ```

  Em outras palavras, substitui todas as instâncias de `$extendee` no `$selector` com `$extendee, $extender`. Se `$selector` não contém `$extendee`, retorna-o como está.

  Os seletores `$selector`, `$extendee`, e `$extender` podem conter [seletores de espaço reservado][placeholder selectors] , mas não [seletores de pai][parent selectors].

  [placeholder selectors]: /documentation/style-rules/placeholder-selectors
  [parent selectors]: /documentation/style-rules/parent-selector

  Consulte também [`selector.replace()`](#replace).

  {% codeExample 'extend', false %}
    @debug selector.extend("a.disabled", "a", ".link"); // a.disabled, .link.disabled
    @debug selector.extend("a.disabled", "h1", "h2"); // a.disabled
    @debug selector.extend(".guide .info", ".info", ".content nav.sidebar");
    // .guide .info, .guide .content nav.sidebar, .content .guide nav.sidebar
    ===
    @debug selector.extend("a.disabled", "a", ".link")  // a.disabled, .link.disabled
    @debug selector.extend("a.disabled", "h1", "h2")  // a.disabled
    @debug selector.extend(".guide .info", ".info", ".content nav.sidebar")
    // .guide .info, .guide .content nav.sidebar, .content .guide nav.sidebar
  {% endcodeExample %}
{% endfunction %}

{% function 'selector.nest($selectors...)', 'selector-nest($selectors...)', 'returns:selector' %}
  Combina `$selectors` como se estivessem encaixados dentro dum do outro na folha de estilo.

  O `$selectors` pode conter [seletores de espaço reservado][placeholder selectors]. Ao contrário de outras funções de seletor, todas elas exceto a primeira também podem conter [seletores de pai][parent selectors].

  [placeholder selectors]: /documentation/style-rules/placeholder-selectors
  [parent selectors]: /documentation/style-rules/parent-selector

  Consulte também [`selector.append()`](#append).

  {% codeExample 'nest', false %}
    @debug selector.nest("ul", "li"); // ul li
    @debug selector.nest(".alert, .warning", "p"); // .alert p, .warning p
    @debug selector.nest(".alert", "&:hover"); // .alert:hover
    @debug selector.nest(".accordion", "&__copy"); // .accordion__copy
    ===
    @debug selector.nest("ul", "li")  // ul li
    @debug selector.nest(".alert, .warning", "p")  // .alert p, .warning p
    @debug selector.nest(".alert", "&:hover")  // .alert:hover
    @debug selector.nest(".accordion", "&__copy")  // .accordion__copy
  {% endcodeExample %}
{% endfunction %}

{% function 'selector.parse($selector)', 'selector-parse($selector)', 'returns:selector' %}
  Retorna `$selector` no formato do [valor do seletor](#selector-values):

  {% codeExample 'parse', false %}
    @debug selector.parse(".main aside:hover, .sidebar p");
    // ((unquote(".main") unquote("aside:hover")),
    //  (unquote(".sidebar") unquote("p")))
    ===
    @debug selector.parse(".main aside:hover, .sidebar p")
    // ((unquote(".main") unquote("aside:hover")),
    //  (unquote(".sidebar") unquote("p")))
  {% endcodeExample %}
{% endfunction %}

{% function 'selector.replace($selector, $original, $replacement)', 'selector-replace($selector, $original, $replacement)', 'returns:selector' %}
  Retorna uma cópia de `$selector` com todas as instâncias de `$original` substituídas pelo `$replacement`.

  Isto usa a [unificação inteligente][intelligent unification] da [regra `@extend`][`@extend` rule] para garantir que `$replacement` é integrado de maneira transparente ao `$selector`. Se `$selector` não contiver `$original`, retorna-o como está.

  [`@extend` rule]: /documentation/at-rules/extend
  [intelligent unification]: /documentation/at-rules/extend#how-it-works

  Os seletores `$selector`, `$original`, e `$replacement` podem conter [seletores de espaço reservado][placeholder selectors], mas nao [seletores de pai][parent selectors].

  [placeholder selectors]: /documentation/style-rules/placeholder-selectors
  [parent selectors]: /documentation/style-rules/parent-selector

  Consulte também [`selector.extend()`](#extend).

  {% codeExample 'replace', false %}
    @debug selector.replace("a.disabled", "a", ".link"); // .link.disabled
    @debug selector.replace("a.disabled", "h1", "h2"); // a.disabled
    @debug selector.replace(".guide .info", ".info", ".content nav.sidebar");
    // .guide .content nav.sidebar, .content .guide nav.sidebar
    ===
    @debug selector.replace("a.disabled", "a", ".link")  // .link.disabled
    @debug selector.replace("a.disabled", "h1", "h2")  // a.disabled
    @debug selector.replace(".guide .info", ".info", ".content nav.sidebar")
    // .guide .content nav.sidebar, .content .guide nav.sidebar
  {% endcodeExample %}
{% endfunction %}

{% function 'selector.unify($selector1, $selector2)', 'selector-unify($selector1, $selector2)', 'returns:selector | null' %}
  Retorna um seletor que corresponde apenas os elementos correspondidos por *ambos* `$selector1` e `$selector2`.

  Retorna `null` se `$selector1` e `$selector2` não correspondem nenhum dos mesmos elementos, ou se não existir seletor que pode expressar suas sobreposições.

  Tal como os seletores gerados pela [regra `@extend`][`@extend` rule], o seletor retornado não dá garantia de corresponder *todos* os elementos correspondidos por ambos `$selector1` e `$selector2` se forem ambos seletores complexos:

  [`@extend` rule]: /documentation/at-rules/extend#html-heuristics

  {% codeExample 'unify', false %}
    @debug selector.unify("a", ".disabled"); // a.disabled
    @debug selector.unify("a.disabled", "a.outgoing"); // a.disabled.outgoing
    @debug selector.unify("a", "h1"); // null
    @debug selector.unify(".warning a", "main a"); // .warning main a, main .warning a
    ===
    @debug selector.unify("a", ".disabled")  // a.disabled
    @debug selector.unify("a.disabled", "a.outgoing")  // a.disabled.outgoing
    @debug selector.unify("a", "h1")  // null
    @debug selector.unify(".warning a", "main a")  // .warning main a, main .warning a
  {% endcodeExample %}
{% endfunction %}

{% function 'selector.simple-selectors($selector)', 'simple-selectors($selector)', 'returns:list' %}
  Retorna uma lista de seletores simples no `$selector`.

  O `$seletor` deve ser uma única sequência de caracteres que contém um seletor composto. Isto significa que não pode conter combinadores (incluindo espaços) ou vírgulas.

  A lista retornada é separada por vírgula, e os seletores simples são sequências de caracteres sem aspas:

  {% codeExample 'simple-selectors', false %}
    @debug selector.simple-selectors("a.disabled"); // a, .disabled
    @debug selector.simple-selectors("main.blog:after"); // main, .blog, :after
    ===
    @debug selector.simple-selectors("a.disabled")  // a, .disabled
    @debug selector.simple-selectors("main.blog:after")  // main, .blog, :after
  {% endcodeExample %}
{% endfunction %}
