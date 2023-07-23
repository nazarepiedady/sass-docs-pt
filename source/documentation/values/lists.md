---
title: Listas
table_of_contents: true
---

{% compatibility 'dart: true', 'libsass: "3.5.0"', 'ruby: "3.5.0"', 'feature: "Parênteses Reto"' %}
  Implementações antigas da LibSass e Sass de Ruby não suportavam listas com parênteses reto.
{% endcompatibility %}

As listas contém uma sequência de outros valores. Na Sass, os elementos na listas podem ser separados pos vírgulas (`Helvetica, Arial, sans-serif`), espaços (`10px 15px 0 0`), ou [barras][slashes] enquanto for consistente dentro da lista. Ao contrário da maioria das outras linguagens, listas em Sass não requerem parêntesis especiais; quaisquer [expressões][expressions] separados com espaços ou vírgulas contem como uma lista. No entanto, estás autorizado a escrever listas com parênteses reto (`[line1 line2]`), o que é útil quando usas [`grid-template-columns`].

[slashes]: #slash-separated-lists
[expressions]: /documentation/syntax/structure#expressions
[`grid-template-columns`]: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns

As listas de Sass podem conter um ou mesmo nenhum elemento. Uma lista de um único elemento pode ser escrito ou `(<expression>,)` ou `[<expression>]`, e uma lista de zero elemento pode ser escrito ou `()` ou `[]`. Além disto, todas [funções de lista][list functions] tratarão valores individuais que não estão nas listas como se estivessem as listas a conter aquele valor, o que significa que raramente precisas de explicitamente criar as listas de um único elemento.

[list functions]: /documentation/modules/list

{% headsUp %}
  As listas vazias sem parêntesis não são CSS válidos, assim a Sass não te permitirá usar uma num valor da propriedade.
{% endheadsUp %}

## Listas Separadas por Barra {#slash-separated-lists}

As listas na Sass podem ser separadas por barras, para representar os valores como a abreviação `font: 12px/30px` para definir a `font-size` e `line-height` ou a sintaxe `hsl(80 100% 50% / 0.5)` para criar uma color com um dado valor de opacidade. No entanto, as listas **separadas por barra** não podem atualmente ser escrito literalmente**. A Sass historicamente usava o carácter `/` para indicar a divisão, assim embora a transição das folhas de estilos existentes para usar [`math.div()`] as listas separadas por barra pode apenas ser escrita usando [`list.slash()`].

[`math.div()`]: /documentation/modules/math#div
[`list.slash()`]: /documentation/modules/list#slash

Para mais detalhes, consulte [Mudança de Rutura: Barra como Divisão][Breaking Change: Slash as Division].

[Breaking Change: Slash as Division]: /documentation/breaking-changes/slash-div

## Usando Listas {#using-lists}

A Sass fornece uma mão-cheia de [funções][functions] que torna possível usar listas para escrever bibliotecas de estilo poderosas, ou tornar a folha de estilo da tua aplicação mais clara e sustentáveis.

[functions]: /documentation/modules/list

## Índices {#indexes}

Muitas destas funções recebem ou retornam números, chamados *índices*, que fazem referência aos elementos numa lista. O índice 1 indica o primeiro elemento da lista. Nota que isto é diferente de muitas linguagens de programação onde os índices começam no 0! A Sass também torna fácil fazer referência ao final duma lista. O índice -1 faz referência ao último elemento numa lista, -2 faz referência ao penúltimo, e assim por diante.

## Acessar um Elemento {#access-an-element}

As listas não são de muito uso se não puderes receber valores delas. Tu podes usar a [função `list.nth($list, $n)`][`list.nth($list, $n)` function] para receber o elemento num dado índice numa lista. O primeiro argumento é a própria lista, e o segundo é o índice do valor que queres extrair:

[`list.nth($list, $n)` function]: /documentation/modules/list#nth

{% render 'code_snippets/example-list-nth' %}

## Fazer Algo com Todos os Elementos {#do-something-for-every-element}

Este na realidade não usa uma função, mas continua uma das maneiras mais comuns usar as listas. O [regra `@each`][`@each` rule] avalia um bloco de estilos por cada elemento numa lista, e atribui este elemento à uma variável:

[`@each` rule]: /documentation/at-rules/control/each

{% render 'code_snippets/example-each-list' %}

### Adicionar à uma Lista {#add-to-a-list}

É também útil adicionar elementos à uma lista. A [função `list.append($list, $val)`][`list.append($list, $val)` function] recebe uma lista e um valor, e retorna uma cópia da lista com o valor adicionado ao final. Nota que uma vez as listas de Sass são [imutáveis][immutable], isto não modifica a lista original:

[`list.append($list, $val)` function]: /documentation/modules/list#append
[immutable]: #immutability

{% codeExample 'lists', false %}
  @debug append(10px 12px 16px, 25px); // 10px 12px 16px 25px
  @debug append([col1-line1], col1-line2); // [col1-line1, col1-line2]
  ===
  @debug append(10px 12px 16px, 25px)  // 10px 12px 16px 25px
  @debug append([col1-line1], col1-line2)  // [col1-line1, col1-line2]
{% endcodeExample %}

### Encontrar um Elemento numa Lista {#find-an-element-in-a-list}

Se precisas de verificar se um elemento está numa lista ou descobrir em qual índice se encontra, use a [função `list.index($list, $value)`][`list.index($list, $value)` function]. Esta recebe uma lista e um valor à localizar nesta lista, e retorna o índice deste valor:

[`list.index($list, $value)` function]: /documentation/modules/list#index

{% render 'code_snippets/example-list-index' %}

Se o valor não estiver na lista, `list.index()` retorna [`null`][`null`]. Já que `null` é [falso][falsey], podes usar `list.index()` com [`@if`][] ou [`if()`][] para verificar se uma lista contém ou não contém um dado valor:

[`null`]: /documentation/values/null
[falsey]: /documentation/at-rules/control/if#truthiness-and-falsiness
[`@if`]: /documentation/at-rules/control/if
[`if()`]: /documentation/modules#if

{% codeExample 'list-index', false %}
  @use "sass:list";

  $valid-sides: top, bottom, left, right;

  @mixin attach($side) {
    @if not list.index($valid-sides, $side) {
      @error "#{$side} is not a valid side. Expected one of #{$valid-sides}.";
    }

    // ...
  }
  ===
  @use "sass:list"

  $valid-sides: top, bottom, left, right

  @mixin attach($side)
    @if not list.index($valid-sides, $side)
      @error "#{$side} is not a valid side. Expected one of #{$valid-sides}."


    // ...
{% endcodeExample %}

## Imutabilidade {#immutability}

As listas na Sass são *imutáveis*, o que significa que o conteúdo dum valor de lista nunca muda. As funções de lista da Sass retornam todas novas listas ao invés de modificar os originais. A imutabilidade ajuda a evitar muitos erros de programação sorrateiros que podem infiltrar-se quando a mesma lista for partilhada através de diferentes partes da folha de estilos.

Tu podes continuar a atualizar o teu estado ao longo do tempo atribuindo novas listas para a mesma variável. Isto é muitas vezes usado em funções e misturas para colecionar um grupo de valores em uma lista:

{% codeExample 'immutability', false %}
  @use "sass:list";
  @use "sass:map";

  $prefixes-by-browser: ("firefox": moz, "safari": webkit, "ie": ms);

  @function prefixes-for-browsers($browsers) {
    $prefixes: ();
    @each $browser in $browsers {
      $prefixes: list.append($prefixes, map.get($prefixes-by-browser, $browser));
    }
    @return $prefixes;
  }

  @debug prefixes-for-browsers("firefox" "ie"); // moz ms
  ===
  @use "sass:list"
  @use "sass:map"

  $prefixes-by-browser: ("firefox": moz, "safari": webkit, "ie": ms)

  @function prefixes-for-browsers($browsers)
    $prefixes: ()
    @each $browser in $browsers
      $prefixes: list.append($prefixes, map.get($prefixes-by-browser, $browser))

    @return $prefixes


  @debug prefixes-for-browsers("firefox" "ie")  // moz ms
{% endcodeExample %}

## Listas de Argumento {#argument-lists}

Quando declaras uma mistura ou função que recebe [argumentos arbitrário][arbitrary arguments], o valor que recebes é uma lista especial conhecida como um *lista de argumento*. Ela age apenas como uma lista que contém todos os argumentos passados às misturas ou função, com uma funcionalidade adicional: se o utilizador passou argumentos de palavra-chave, podem ser acessados como um mapa passando a lista de argumento a [função `meta.keywords()`][`meta.keywords()` function]:

[arbitrary arguments]: /documentation/at-rules/mixin#taking-arbitrary-arguments
[`meta.keywords()` function]: /documentation/modules/meta#keywords

{% render 'code_snippets/example-mixin-arbitrary-keyword-arguments' %}

