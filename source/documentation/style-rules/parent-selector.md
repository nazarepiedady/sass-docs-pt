---
title: Seletor de Pai
introduction: >
  O seletor de pai, `&`, é um seletor especial inventado pela Sass que é usado nos [seletores encaixados](/documentation/style-rules#nesting) para referir-se ao seletor externo. Ele torna possível reutilizar o seletor externo de maneiras mais complexas, como adicionar uma [pseudo-classe](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) ou adicionar um seletor *antes* do pai.
---

Quando um seletor de pai é usado num seletor interno, é substituído pelo seletor externo correspondente. Isto acontece no lugar do comportamento de encaixamento normal:

{% codeExample 'parent-selector' %}
  .alert {
    // O seletor de pai pode ser usado para adicionar pseudo-classes ao
    // seletor externo.
    &:hover {
      font-weight: bold;
    }

    // Ele também pode ser usado para estilizar o seletor externo num certo contexto,
    // tal como um corpo definido para usar uma idioma de direita-para-esquerda.
    [dir=rtl] & {
      margin-left: 0;
      margin-right: 10px;
    }

    // Tu podes ainda usá-lo como um argumento para os seletores de pseudo-classe.
    :not(&) {
      opacity: 0.8;
    }
  }
  ===
  .alert
    // O seletor de pai pode ser usado para adicionar pseudo-classes ao
    // seletor externo.
    &:hover
      font-weight: bold


    // Ele também pode ser usado para estilizar o seletor externo num certo contexto,
    // tal como um corpo definido para usar uma idioma de direita-para-esquerda.
    [dir=rtl] &
      margin-left: 0
      margin-right: 10px


    // Tu podes ainda usá-lo como um argumento para os seletores de pseudo-classe.
    :not(&)
      opacity: 0.8
{% endcodeExample %}

{% headsUp %}
  Uma vez que o seletor de pai poderia ser substituído por um seletor de tipo como `h1`, apenas é permitido no início de seletores compostos onde um seletor de tipo também seria permitido. Por exemplo, `span&` não é permitido.

  Embora estejamos a examinar desprender esta restrição. Se gostarias de ajudar a fazer isto acontecer, consulte esta [questão da GitHub][this GitHub issue].

  [this GitHub issue]: https://github.com/sass/sass/issues/1425
{% endheadsUp %}

## Adicionando Sufixos {#adding-suffixes}

Tu podes também usar o seletor de pai para adicionar sufixos adicionais ao seletor externo. Isto é particularmente útil quando usas uma metodologia como [BEM][] que usa nomes de classe altamente estruturados. Enquanto o seletor externo termina com um nome alfanumérico (como classe, identificador, e seletores de elemento), podes usar o seletor de pai para anexar texto adicional:

[BEM]: http://getbem.com/

{% codeExample 'parent-selector-suffixes' %}
  .accordion {
    max-width: 600px;
    margin: 4rem auto;
    width: 90%;
    font-family: "Raleway", sans-serif;
    background: #f4f4f4;

    &__copy {
      display: none;
      padding: 1rem 1.5rem 2rem 1.5rem;
      color: gray;
      line-height: 1.6;
      font-size: 14px;
      font-weight: 500;

      &--open {
        display: block;
      }
    }
  }
  ===
  .accordion
    max-width: 600px
    margin: 4rem auto
    width: 90%
    font-family: "Raleway", sans-serif
    background: #f4f4f4

    &__copy
      display: none
      padding: 1rem 1.5rem 2rem 1.5rem
      color: gray
      line-height: 1.6
      font-size: 14px
      font-weight: 500

      &--open
        display: block
{% endcodeExample %}

## Na SassScript {#in-sassscript}

O seletor de pai também pode ser usado dentro da SassScript. É uma expressão especial que retorna o seletor pai atual no mesmo formato usado pelas [funções de seletor][selector functions]: uma lista separada por vírgula (a lista de seletor) que contém listas separadas por espaço (os seletores complexos) que contém sequências de caracteres sem aspas (os seletores compostos):

[selector functions]: /documentation/modules/selector#selector-values

{% codeExample 'parent-selector-sassscript' %}
  .main aside:hover,
  .sidebar p {
    parent-selector: &;
    // => ((unquote(".main") unquote("aside:hover")),
    //     (unquote(".sidebar") unquote("p")))
  }
  ===
  .main aside:hover,
  .sidebar p
    parent-selector: &
    // => ((unquote(".main") unquote("aside:hover")),
    //     (unquote(".sidebar") unquote("p")))
{% endcodeExample %}

Se a expressão `&` for usada fora de  quaisquer regras de estilo, retorna `null`. Já que `null` é [falso][falsey] isto significa que podes facilmente usá-lo para determinar se uma mistura está a ser ou não chamada numa regra de estilo:

[falsey]: /documentation/at-rules/control/if#truthiness-and-falsiness

{% render 'code_snippets/example-if-parent-selector' %}

### Encaixamento Avançado {#advanced-nesting}

Tu podes usar `&` como um expressão de SassScript normal, o que significa que podes passá-lo para funções ou incluí-lo na interpolação — mesmo em outros seletores! Usá-lo em conjunto com [funções de seletor][selector functions] e a [regra `@at-root`] permite-te encaixar seletores de maneiras muito poderosas:

[selector functions]: /documentation/modules/selector#selector-values
[`@at-root` rule]: /documentation/at-rules/at-root

{% render 'code_snippets/example-advanced-nesting' %}

{% headsUp %}
  Quando a Sass está a encaixar seletores, não sabe qual interpolação foi usada para gerá-los. Isto significa que adicionará automaticamente o seletor externo ao seletor interno *mesmo se* usaste `&` como uma expressão de SassScript. É por isto que precisas de usar explicitamente a [regra `@at-root`][`@at-root` rule] para dizeres a Sass para não incluir o seletor externo.

  [`@at-root` rule]: /documentation/at-rules/at-root
{% endheadsUp %}
