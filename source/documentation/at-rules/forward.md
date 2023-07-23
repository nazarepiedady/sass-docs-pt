---
title: "@forward"
introduction: >
  A regra `@forward` carrega uma folha de estilo de Sass e torna suas [misturas](/documentation/at-rules/mixin), [funções](/documentation/at-rules/function), e [variáveis](/documentation/variables) disponíveis quando a tua folha de estilo for carregada com a [regra `@rule`](/documentation/at-rules/use). Isto torna possível organizar as bibliotecas de Sass através de vários ficheiros, enquanto permite os seus utilizadores carregarem um único ficheiro de ponto de entrada.
---

A regra é escrita como `@forward "<url>"`. Ela carrega o módulo numa dada URL tal como a `@use`, exceto que torna os membros [públicos][public] do módulo carregado disponíveis para os utilizadores do teu módulo como se estivessem definidos diretamente no teu módulo. Mesmo assim estes membros não estão disponíveis no teu módulo — se quiseres isto, precisarás também de escrever uma regra `@use`. Não te preocupes, apenas carregará o módulo uma vez!

[public]: /documentation/at-rules/use#private-members

Se *escreveres* tanto uma `@forward` como uma `@use` para o mesmo módulo no mesmo ficheiro, é sempre uma boa ideia escrever a `@forward` primeiro. Desta maneira, se os teus utilizadores quiserem [configurar o módulo expedido][configure the forwarded module], esta configuração será aplicada à `@forward` antes do tua `@use` carregá-lo sem qualquer configuração.

[configure the forwarded module]: /documentation/at-rules/use#configuration

{% funFact %}
  A regra `@forward` comporta-se tal como a `@use` quando se trata de uma CSS do módulo. Os estilos dum módulo expedido serão incluídos na saída da CSS compilada, e o módulo com a `@forward` pode [estendê-lo][extend], mesmo se também não for usada.

  [extend]: /documentation/at-rules/extend
{% endfunFact %}

{% codeExample 'forward' %}
  // src/_list.scss
  @mixin list-reset {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  ---
  // bootstrap.scss
  @forward "src/list";
  ---
  // styles.scss
  @use "bootstrap";

  li {
    @include bootstrap.list-reset;
  }
  ===
  // src/_list.sass
  @mixin list-reset
    margin: 0
    padding: 0
    list-style: none
  ---
  // bootstrap.sass
  @forward "src/list"
  ---
  // styles.sass
  @use "bootstrap"

  li
    @include bootstrap.list-reset
  ===
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
{% endcodeExample %}

## Adicionando um Prefixo {#adding-a-prefix}

Uma vez que os membros do módulo são normalmente usados com um [espaço de nome], curto e nomes simples são usualmente a opção mais legíveis. Mas estes nomes podem não fazer sentido fora do módulo one estão definidos, então a `@forward` tem a opção de adicionar um prefixo adicional à todos os membros que esta expedi.

Isto é escrito como `@forward "<url>" as <prefix>-*`, e adiciona o dado prefixo ao início de cada mistura, função, e nome de variável expedida pelo módulo. Por exemplo, se o módulo define um membro nomeado `reset` e é expedida `as list-*`, as folhas de estilo posteriores farão referência à esta como `list-reset`:

[a namespace]: /documentation/at-rules/use#loading-members

{% codeExample 'prefix' %}
  // src/_list.scss
  @mixin reset {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  ---
  // bootstrap.scss
  @forward "src/list" as list-*;
  ---
  // styles.scss
  @use "bootstrap";

  li {
    @include bootstrap.list-reset;
  }
  ===
  // src/_list.sass
  @mixin reset
    margin: 0
    padding: 0
    list-style: none
  ---
  // bootstrap.sass
  @forward "src/list" as list-*
  ---
  // styles.sass
  @use "bootstrap"

  li
    @include bootstrap.list-reset
  ===
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
{% endcodeExample %}

## Controlando a Visibilidade {#controlling-visibility}

Algumas vezes, não queres expedir *todo* membro dum módulo. Tu podes querer manter alguns membros privados para que apenas o teu pacote possa usá-los, ou podes querer exigir que os teus utilizadores carreguem alguns membros duma maneira diferente. Tu podes controlar exatamente quais membros são expedidos escrevendo `@forward "<url>" hide <members...>` ou `@forward "<url>" show <members...>`.

A forma `hide` significa que os membros listados não deveriam ser expedido, mas todo o resto deveria. A forma `show` significa que *apenas* os membros nomeados deveriam ser expedidos. Em ambas formas, listas os nomes das misturas, funções, ou variáveis (incluindo o `$`):

{% codeExample 'controlling-visibility', false %}
  // src/_list.scss
  $horizontal-list-gap: 2em;

  @mixin list-reset {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  @mixin list-horizontal {
    @include list-reset;

    li {
      display: inline-block;
      margin: {
        left: -2px;
        right: $horizontal-list-gap;
      }
    }
  }
  ---
  // bootstrap.scss
  @forward "src/list" hide list-reset, $horizontal-list-gap;
  ===
  // src/_list.sass
  $horizontal-list-gap: 2em

  @mixin list-reset
    margin: 0
    padding: 0
    list-style: none


  @mixin list-horizontal
    @include list-rest

    li
      display: inline-block
      margin:
        left: -2px
        right: $horizontal-list-gap
  ---
  // bootstrap.sass
  @forward "src/list" hide list-reset, $horizontal-list-gap
{% endcodeExample %}

## Configurando os Módulos {#configuring-modules}

{% compatibility 'dart: "1.24.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

A regra `@forward` também pode carregar um módulo com [configuração][configuration]. Isto na maior parte das vezes funciona da mesma maneira para `@use`, com uma adição: uma configuração da regra `@forward` pode usar a opção `!default` na sua configuração. Isto permite um módulo mudar os padrões duma folha de estilo ascendente enquanto continua a permitir folhas de estilo posteriores para as sobreporem:

[configuration]: /documentation/at-rules/use#configuration

{% codeExample 'configuration' %}
  // _library.scss
  $black: #000 !default;
  $border-radius: 0.25rem !default;
  $box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default;

  code {
    border-radius: $border-radius;
    box-shadow: $box-shadow;
  }
  ---
  // _opinionated.scss
  @forward 'library' with (
    $black: #222 !default,
    $border-radius: 0.1rem !default
  );
  ---
  // style.scss
  @use 'opinionated' with ($black: #333);
  ===
  // _library.sass
  $black: #000 !default
  $border-radius: 0.25rem !default
  $box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default

  code
    border-radius: $border-radius
    box-shadow: $box-shadow
  ---
  // _opinionated.sass
  @forward 'library' with ($black: #222 !default, $border-radius: 0.1rem !default)
  ---
  // style.sass
  @use 'opinionated' with ($black: #333)
  ===
  code {
    border-radius: 0.1rem;
    box-shadow: 0 0.5rem 1rem rgba(51, 51, 51, 0.15);
  }
{% endcodeExample %}
