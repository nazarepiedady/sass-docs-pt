---
title: "@extend"
table_of_contents: true
introduction: >
  Frequentemente existem casos quando desenhas uma página quando uma classe deveria ter todos os estilos duma outra classe, bem como seus próprios estilos específicos. Por exemplo, a [metodologia BEM](http://getbem.com/naming/) encoraja classes de modificador que ligam-se aos mesmos elementos como classes de bloco ou elemento. Mas isto pode criar HTML atravancado, é propenso à erros de esquecer de incluir ambas classes, e pode trazer preocupações de estilo não semânticos para a tua marcação.
---

<%# TODO(jina): I think these code blocks should be side-by-side %>

```html
<div class="error error--serious">
  Oh no! You've been hacked!
</div>
```

```css
.error {
  border: 1px #f00;
  background-color: #fdd;
}

.error--serious {
  border-width: 3px;
}
```

A regra `@extend` da Sass soluciona isto. É escrita como `@extend <selector>`, e diz que a Sass que aquele seletor deve herdar os estilos dum outro:

{% codeExample 'extend' %}
  .error {
    border: 1px #f00;
    background-color: #fdd;

    &--serious {
      @extend .error;
      border-width: 3px;
    }
  }
  ===
  .error
    border: 1px #f00
    background-color: #fdd

    &--serious
      @extend .error
      border-width: 3px
{% endcodeExample %}

Quando uma classe estende uma outra, a Sass estiliza todos os elementos que correspondem ao extensor como se adicionasses a classe estendida à todos elementos na tua HTML que já tinha a classe em extensão. Tu podes apenas escrever `class="error--serious"`, e a Sass certificar-se-á de que é estilizada como se também tivesse `class="error"`.

Claro, os seletores não são apenas usados em suas próprias regras de estilo. A Sass sabe estender *em toda parte* que o seletor for usado. Isto garante que os teus elementos são estilizados exatamente como se correspondessem o seletor estendido:

{% codeExample 'extended-selector' %}
  .error:hover {
    background-color: #fee;
  }

  .error--serious {
    @extend .error;
    border-width: 3px;
  }
  ===
  .error:hover
    background-color: #fee


  .error--serious
    @extend .error
    border-width: 3px
{% endcodeExample %}

{% headsUp %}
  As extensões são resolvidas depois do resto da tua folha de estilo for compilado. Em particular, isto acontecer depois dos [seletores de pai][parent selectors] serem resolvidos. Isto significa que se fizeres `@extend .error`, não surtirá efeito no seletor interno em `.error { &__icon { ... } }`. Isto também significa que os [seletores de pai na SassScript][parent selectors in SassScript] não podem ver os resultados da extensão.

  [parent selectors]: /documentation/style-rules/parent-selector
  [parent selectors in SassScript]: /documentation/style-rules/parent-selector#in-sassscript
{% endheadsUp %}

## Como Isto Funciona {#how-it-works}

Ao contrário das [misturas][mixins], que copiam os estilos para a atual regra de estilo, `@extend` atualiza as regras de estilo que contém o seletor estendido para que também contenham o seletor estendido. Quando estendes os seletores, a Sass faz a *unificação inteligente*:

[mixins]: /documentation/at-rules/mixin

* Ela nunca gera seletores como `#main#footer` que possivelmente não podem corresponder quaisquer elementos.

* Ela garante que seletores complexos sejam intercalados para que funcionem não importa qual ordem os elementos da HTML são encaixados.

* Ela corta seletores redundantes o máximo possível, embora ainda garanta que a especificidade seja maior do que ou igual à aquela do extensor.

* Ela sabe quando um seletor corresponde tudo que um outro faz, e pode combiná-los entre si.

* Ela manipula inteligentemente [combinadores][combinators], [seletores universais][universal selectors], e [pseudo-classes que contêm seletores][pseudo-classes that contain selectors].

[combinators]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors#Combinators
[pseudo-classes that contain selectors]: https://developer.mozilla.org/en-US/docs/Web/CSS/:not
[universal selectors]: https://developer.mozilla.org/en-US/docs/Web/CSS/Universal_selectors

{% codeExample 'how-it-works' %}
  .content nav.sidebar {
    @extend .info;
  }

  // Isto não será estendido, porque `p` é incompatível com `nav`.
  p.info {
    background-color: #dee9fc;
  }

  // Não existe maneira de saber se `<div class="guide">` estará dentro ou
  // fora do `<div class="content">`, assim a Sass gera ambos por segurança.
  .guide .info {
    border: 1px solid rgba(#000, 0.8);
    border-radius: 2px;
  }

  // A Sass sabe que todo elemento correspondendo "main.content" também corresponde `.content`
  // e evita gerar seletores intercalados desnecessários.
  main.content .info {
    font-size: 0.8em;
  }
  ===
  .content nav.sidebar
    @extend .info


  // Isto não será estendido, porque `p` é incompatível com `nav`.
  p.info
    background-color: #dee9fc


  // Não existe maneira de saber se `<div class="guide">` estará dentro ou
  // fora do `<div class="content">`, assim a Sass gera ambos por segurança.
  .guide .info
    border: 1px solid rgba(#000, 0.8)
    border-radius: 2px


  // A Sass sabe que todo elemento correspondendo "main.content" também corresponde `.content`
  // e evita gerar seletores intercalados desnecessários.
  main.content .info
    font-size: 0.8em
{% endcodeExample %}

{% funFact %}
  Tu podes acessar diretamente a unificação inteligente da Sass usando [funções de seletor][selector functions]! A [função `selector.unify()`][`selector.unify()` function] retorna um seletor que corresponde a interseção de dois seletores, enquanto a [função `seletor.extend()`][`selector.extend()` function] funciona tal como `@extend`, mas sobre um único seletor.

  [selector functions]: /documentation/modules/selector
  [`selector.unify()` function]: /documentation/modules/selector#unify
  [`selector.extend()` function]: /documentation/modules/selector#extend
{% endfunFact %}

{% headsUp %}
  Uma vez que `@extend` atualiza as regras de estilo que contém o seletor estendido, suas regras têm precedência [na cascata][the cascade] baseado em onde as regras de estilo do seletor estendido aparecem, *não* baseados em onde a `@extend` aparece. Isto pode ser confuso, mas apenas lembre: isto é a mesma precedência que estas regras teriam se adicionasses a classe estendida ao teu HTML!

  [the cascade]: https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade
{% endheadsUp %}

## Seletores de Espaço Reservado {#placeholder-selectors}

Algumas vezes queres escrever uma regra de estilo que está *apenas* destinada a ser estendida. Neste caso, podes usar os [seletores de espaço reservado][placeholder selectors], que se parecerem com seletores de classe que começam com `%` ao invés de `.`. Quaisquer seletores que incluem espaços reservados não são incluídos na saída de CSS, mas os seletores que as estendem são:

[placeholder selectors]: /documentation/style-rules/placeholder-selectors

{% render 'code_snippets/example-placeholder' %}

### Espaços Reservados Privados {#private-placeholders}

Tal como os [membros do módulo][module members], um seletor de espaço reservado pode ser marcado como privado ao iniciar o seu nome ou com `-` ou `_`. Um seletor de espaço reservado privado apenas pode ser estendido dentro da folha de estilo que o define. Para quaisquer outras folhas de estilo, parecerá como se este seletor não existisse.

[module members]: /documentation/at-rules/use#private-members

## Âmbito de Extensão {#extension-scope}

Quando uma folha de estilo estende um seletor, esta extensão apenas afetará as regras de estilo escritas módulos *ascendentes* — isto é, os módulos que são carregados por esta folha de estilo usando a [regra `@use`][`@use` rule] ou a [regra `@forward`][`@forward` rule], módulos carregados por *estes* módulos, e assim por diante. Isto ajuda a tornar as regras de `@extend` mais previsíveis, garantindo que afetam apenas os estilos que estavam cientes de quando as escrevestes-

[`@use` rule]: /documentation/at-rules/use
[`@forward` rule]: /documentation/at-rules/forward

{% headsUp %}
  As extensões não são limitadas ao todo se estiveres a usar a [regra `@import`][`@import` rule]. Não apenas afetarão todas as folhas de estilo que importas, afetarão todas as folhas de estilo que importam a tua folha de estilo, todo o resto que estas folhas de estilo importam, e assim por diante. Sem `@use`, as extensões são *globais*.

  [`@import` rule]: /documentation/at-rules/import
{% endheadsUp %}

## Extensões Obrigatórias e Opcionais {#mandatory-and-optional-extends}

Normalmente, se uma `@extend` não corresponder quaisquer seletores na folha de estilo, Sass produzirá um erro. Isto ajuda proteger de erros de digitação ou de renomear um seletor sem renomear os seletores que herdam deste. Extensões que exigem que o seletor estendido exista são *obrigatória*.

Isto pode não ser sempre o que queres. Se quiseres que a `@extend` não faça nada se o seletor estendido não existir, apenas adicione `!optional` no final.

## Extensões ou Misturas? {#extends-or-mixins}

As extensões e [misturas][mixins] são ambas maneiras de encapsular e reutilizar estilos na Sass, o que naturalmente levanta a questão de quando usar uma ou outra. As misturas são obviamente necessárias quando precisas de configurar os estilos usando [argumentos][arguments], mas e se forem apenas um pedaço de estilos?

[mixins]: /documentation/at-rules/mixin
[arguments]: /documentation/at-rules/mixin/#arguments

Como regra de ouro, extensões são a melhor opção quando estás a expressar uma relação entre classes semânticas (ou outros seletores semânticos). Uma vez que um elemento com a classe `.error--serious` *é um* erro, faz sentido para ele estender `.error`. Mas para coleções não semânticas de estilos, escrever uma mistura pode evitar dores de cabeças de cascata e torna mais fácil configurar.

{% funFact %}
  A maioria dos servidores da Web compactam a CSS que servem usando um algoritmo que é muito bom em lidar com pedaços repetidos de texto idêntico. Isto significa que, embora as misturas possam produzir mais CSS do que as extensões, provavelmente não acrescentará substancialmente a quantidade que os teus utilizadores precisam descarregar. Então escolha a funcionalidade que faz mais sentido para o teu caso de uso, não aquele que gera menos CSS!

  [gzip]: https://en.wikipedia.org/wiki/Gzip
{% endfunFact %}

## Limitações {#limitations}

### Seletores Desautorizados {#disallowed-selectors}

{% compatibility 'dart: true', 'libsass: false', 'ruby: false', 'feature: "No Compound Extensions"' %}
  A LibSass e Sass de Ruby atualmente permite que seletores compostos como `.message.info` sejam estendidos. No entanto, este comportamento não corresponde a definição de `@extend`: ao invés de estilizar elementos que correspondem o seletor estendendo como se tivesse `class="message info"`, o que seria afetado pelas regras de estilo que incluíam ou `.message` *ou* `.info`, este apenas os estilizou com regras que incluíam ambas `.message` *e* `.info`.

  Para manter a definição de `@extend` clara e compreensível, e manter a implementação clara e eficiente, este comportamento agora está depreciada e será removida das versões futuras.

  Consulte [a página de mudança de rutura][the breaking change page] por mais detalhes.

  [the breaking change page]: /documentation/breaking-changes/extend-compound
{% endcompatibility %}

Apenas *seletores simples* — seletores de individuais como `.info` ou `a` — podem ser estendidos. Se `.message.info` poderia ser estendido, a definição de `@extend` diz que os elementos correspondendo o extensor seriam estilizados como se correspondesse `.message.info`. Isto apenas é o mesmo que corresponder ambas `.message` e `.info`, assim não existiriam qualquer beneficio em escrever esta no lugar de `@extend .message, .info`.

De maneira semelhante, se `.main .info` pudessem ser estendidos, faria (quase) a mesma coisa como estender `.info` por si mesmo. As diferenças subtis não são dignas da confusão de parecer que está a fazer algo substancialmente diferente, assim isto não é permitido:

{% codeExample 'disallowed-selectors', false %}
  .alert {
    @extend .message.info;
    //      ^^^^^^^^^^^^^
    // Error: Write @extend .message, .info instead.

    @extend .main .info;
    //      ^^^^^^^^^^^
    // Error: write @extend .info instead.
  }
  ===
  .alert
    @extend .message.info
    //      ^^^^^^^^^^^^^
    // Error: Write @extend .message, .info instead.

    @extend .main .info
    //      ^^^^^^^^^^^
    // Error: write @extend .info instead.
{% endcodeExample %}

### Heurísticas da HTML {#html-heuristics}

Quando a `@extend` [seletores complexos intercalados][interleaves complex selectors], não gera todas as combinações possíveis de seletores ancestrais. Muitos dos seletores que poderia gerar são pouco prováveis que na realidade correspondam a HTML real, gerá-los tornaria as folhas de estilo muito grande para um valor real muito pequeno. Ao invés disto, usa uma [heurística][heuristic]: supõe que cada ancestral do seletor será autosuficiente, sem ser intercalado com quaisquer outros ancestrais do seletor:

[interleaves complex selectors]: #how-it-works
[heuristic]: https://en.wikipedia.org/wiki/Heuristic

{% codeExample 'html-heuristics' %}
  header .warning li {
    font-weight: bold;
  }

  aside .notice dd {
    // Sass doesn't generate CSS to match the <dd> in
    //
    // <header>
    //   <aside>
    //     <div class="warning">
    //       <div class="notice">
    //         <dd>...</dd>
    //       </div>
    //     </div>
    //   </aside>
    // </header>
    //
    // because matching all elements like that would require us to generate nine
    // new selectors instead of just two.
    @extend li;
  }
  ===
  header .warning li
    font-weight: bold


  aside .notice dd
    // Sass doesn't generate CSS to match the <dd> in
    //
    // <header>
    //   <aside>
    //     <div class="warning">
    //       <div class="notice">
    //         <dd>...</dd>
    //       </div>
    //     </div>
    //   </aside>
    // </header>
    //
    // because matching all elements like that would require us to generate nine
    // new selectors instead of just two.
    @extend li
{% endcodeExample %}

### Estender em `@media` {#extend-in-media}

Embora `@extend` seja permitido dentro da [`@media` e outras regras de arroba da CSS][`@media` and other CSS at-rules], não é permitido estender seletores que aparecem fora da sua regra de arroba. Isto porque estender seletor apenas aplicasse dentro do contexto duma dada media, e não existe maneira de garantir que a restrição está preservada no seletor gerado sem duplicar a regra de estilo inteira:

[`@media` and other CSS at-rules]: /documentation/at-rules/css

{% codeExample 'extend-media', false %}
  @media screen and (max-width: 600px) {
    .error--serious {
      @extend .error;
      //      ^^^^^^
      // Error: ".error" was extended in @media, but used outside it.
    }
  }

  .error {
    border: 1px #f00;
    background-color: #fdd;
  }
  ===
  @media screen and (max-width: 600px)
    .error--serious
      @extend .error
      //      ^^^^^^
      // Error: ".error" was extended in @media, but used outside it.



  .error
    border: 1px #f00
    background-color: #fdd
{% endcodeExample %}
