---
title: Sintaxe
introduction: >
  A Sass suporta dois sintaxes diferentes. Cada uma pode carregar a outra, está contigo e com a tua equipa a decisão de qual escolher.
---

## SCSS {#scss}

A sintaxe de SCSS usa a extensão de ficheiro `.scss`. Com algumas poucas exceções, é um superconjunto de CSS, o que significa que essencialmente **toda CSS válida também é uma SCSS válida**. Por causa da sua semelhança com a CSS, é a sintaxe mais fácil de habituar-se e a mais popular.

A SCSS parece-se com isto:

```scss
@mixin button-base() {
  @include typography(button);
  @include ripple-surface;
  @include ripple-radius-bounded;

  display: inline-flex;
  position: relative;
  height: $button-height;
  border: none;
  vertical-align: middle;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    color: $mdc-button-disabled-ink-color;
    cursor: default;
    pointer-events: none;
  }
}
```

## A Sintaxe Indentada {#the-indented-syntax}

A sintaxe indentada foi a sintaxe original da Sass, e usa a extensão de ficheiro `.sass`. Por causa desta extensão, algumas vezes é apenas chamada de "Sass".
A sintaxe indentada suporta todas as mesmas funcionalidades que a SCSS suporta, porém usa a indentação ao invés de chavetas e pontos e vírgulas para descrever o formato do documento.

Em geral, em qualquer altura que escreveres chavetas na CSS ou SCSS, podes apenas indentar um nível de profundidade na sintaxe indentada. E em qualquer altura que uma linha terminar, isto conta como um ponto e vírgula. Existem também algumas diferenças adicionais na sintaxe indentada que são enfatizadas ao longo da referência.

{% headsUp %}
  A sintaxe indentada atualmente não suporta expressões que envolvem várias linhas. Consulte a [issue #216].

  [issue #216]: https://github.com/sass/sass/issues/216
{% endheadsUp %}

A sintaxe indentada parece-se com isto:

```sass
@mixin button-base()
  @include typography(button)
  @include ripple-surface
  @include ripple-radius-bounded

  display: inline-flex
  position: relative
  height: $button-height
  border: none
  vertical-align: middle

  &:hover
    cursor: pointer

  &:disabled
    color: $mdc-button-disabled-ink-color
    cursor: default
    pointer-events: none
```
