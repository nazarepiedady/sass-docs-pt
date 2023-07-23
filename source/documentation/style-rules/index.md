---
title: Regras de Estilo
table_of_contents: true
introduction: >
  As regras de estilo são os alicerces da Sass, tal como são para a CSS. E funcionam da mesma maneira: escolhes quais elementos estilizar com um seletor, e [declaras propriedades](/documentation/style-rules/declarations) que afetam a aparência destes elementos.

---

{% codeExample 'style-rules' %}
  .button {
    padding: 3px 10px;
    font-size: 12px;
    border-radius: 3px;
    border: 1px solid #e1e4e8;
  }
  ===
  .button
    padding: 3px 10px
    font-size: 12px
    border-radius: 3px
    border: 1px solid #e1e4e8
{% endcodeExample %}

## Encaixamento {#nesting}

Mas a Sass quer tornar a tua vida mais fácil. No lugar de repetir os mesmos seletores vezes sem conta, podes escrever um regra de estilo dentro de uma outra. A Sass combinará automaticamente o seletor da regra exterior com o da regra interior:

{% render 'code_snippets/example-nesting' %}

{% headsUp %}
  As regras encaixadas são super úteis, mas também podem tornar difícil visualizar o quanto de CSS estás de fato a gerar. Quanto mais fundo encaixares, mais largura de banda custa para ser a tua CSS e mais trabalho custa para o navegador desenhá-la. Mantenha estes seletores pouco profundo!
{% endheadsUp %}

### Listas de Seletor {#selector-lists}

As regras encaixadas são inteligentes sobre o lidar com listas de seletor (que são, seletores separados por vírgula). Cada seletor complexo (aqueles entre as vírgulas) é encaixado separadamente, e depois são combinados de volta em uma lista de seletor:

{% codeExample 'selector-lists' %}
  .alert, .warning {
    ul, p {
      margin-right: 0;
      margin-left: 0;
      padding-bottom: 0;
    }
  }
  ===
  .alert, .warning
    ul, p
      margin-right: 0
      margin-left: 0
      padding-bottom: 0
{% endcodeExample %}

<span id="selector-combinators"></span>
### Combinadores de Seletor

Tu também podes encaixar seletores que usam [combinadores][combinators]. Tu podes colocar o combinador no final do seletor externo, no início do seletor interno, ou mesmo todos em si mesmo entre os dois:

[combinators]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors#Combinators#Combinators

{% codeExample 'selector-combinators' %}
  ul > {
    li {
      list-style-type: none;
    }
  }

  h2 {
    + p {
      border-top: 1px solid gray;
    }
  }

  p {
    ~ {
      span {
        opacity: 0.8;
      }
    }
  }
  ===
  ul >
    li
      list-style-type: none



  h2
    + p
      border-top: 1px solid gray



  p
    ~
      span
        opacity: 0.8
{% endcodeExample %}

### Encaixamento Avançado {#advanced-nesting}

Se quiseres fazer mais com as tuas regras de estilo encaixadas do que apenas combiná-las em ordem com o combinador descendente (que é, uma espaço simples) separando-os, a Sass tem a tua solução. Consulte a [documentação de seletor de pai][parent selector documentation] por mais detalhes.

[parent selector documentation]: /documentation/style-rules/parent-selector

## Interpolação {#interpolation}

Tu podes usar [interpolação][interpolation] para injetar valores a partir de [expressões][expressions] como variáveis e chamadas de função para os teus seletores. Isto é particularmente útil quando estás a escrever [misturas][mixins], já que isto permite-te criar seletores a partir de parâmetros que os teus utilizadores passam:

[interpolation]: /documentation/interpolation
[expressions]: /documentation/syntax/structure#expressions
[mixins]: /documentation/at-rules/mixin

{% codeExample 'interpolation' %}
  @mixin define-emoji($name, $glyph) {
    span.emoji-#{$name} {
      font-family: IconFont;
      font-variant: normal;
      font-weight: normal;
      content: $glyph;
    }
  }

  @include define-emoji("women-holding-hands", "👭");
  ===
  @mixin define-emoji($name, $glyph)
    span.emoji-#{$name}
      font-family: IconFont
      font-variant: normal
      font-weight: normal
      content: $glyph



  @include define-emoji("women-holding-hands", "👭")
{% endcodeExample %}

{% funFact %}
  A Sass apenas analisa os seletores *depois* da interpolação ser resolvida. Isto significa que podes seguramente usar a interpolação para gerar qualquer parte do seletor sem preocupares-te que não analisará.
{% endfunFact %}

Tu podes combinar a interpolação com o seletor pai `&`, a [regra `@at-root`][`@at-root` rule], e as [funções de seletor][selector functions] para exercer algum poder sério quando geras dinamicamente os seletores. Para mais informações, consulte a [documentação do seletor de pai][parent selector documentation].

[`@at-root` rule]: /documentation/at-rules/at-root
[selector functions]: /documentation/modules/selector
[parent selector documentation]: /documentation/style-rules/parent-selector
