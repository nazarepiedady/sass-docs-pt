---
title: Seletores de Espaço Reservado
introduction: >
  A Sass tem um tipo especial de seletor conhecido como “placeholder”. Ele se parece e comporta-se muito como um seletor de classe, mas começa com um `%` e não é incluído na saída de CSS. De fato, qualquer seletor complexo (aqueles entre as vírgulas) que ainda *contém* um seletor de espaço reservado não é incluído na CSS, nem qualquer regra de estilo cujos seletores todos contém espaços reservados.
---

{% render 'code_snippets/example-placeholder' %}

Qual é o uso dum seletor que não é emitido? Ele ainda pode ser [estendido][extended]! Ao contrário dos seletores de classe, os espaços reservados não atravancam a CSS se não forem estendidas e não exigem que os utilizadores duma biblioteca usem nomes de classe específicos para o seu HTML:

[extended]: /documentation/at-rules/extend

{% codeExample 'extended-selector' %}
  %toolbelt {
    box-sizing: border-box;
    border-top: 1px rgba(#000, .12) solid;
    padding: 16px 0;
    width: 100%;

    &:hover { border: 2px rgba(#000, .5) solid; }
  }

  .action-buttons {
    @extend %toolbelt;
    color: #4285f4;
  }

  .reset-buttons {
    @extend %toolbelt;
    color: #cddc39;
  }
  ===
  %toolbelt
    box-sizing: border-box
    border-top: 1px rgba(#000, .12) solid
    padding: 16px 0
    width: 100%

    &:hover
      border: 2px rgba(#000, .5) solid

  .action-buttons
    @extend %toolbelt
    color: #4285f4


  .reset-buttons
    @extend %toolbelt
    color: #cddc39
{% endcodeExample %}

Os seletores de espaço reservado são úteis quando escreves uma biblioteca de Sass onde cada regra de estilo pode ou não ser usada. Como uma boa regra, se estiveres a escrever uma folha de estilo só para a tua própria aplicação, muitas vezes é melhor apenas estender um seletor de classe se um estiver disponível.
