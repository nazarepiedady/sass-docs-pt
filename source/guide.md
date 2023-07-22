---
layout: has_navigation
title: Fundamentos da Sass
introduction: >
  Antes de poderes usar a Sass, precisas de configurar o teu projeto. Se quiseres apenas pesquisar aqui, vá em frente, mas recomendamos-te primeiro ir instalar a Sass. [Siga para aqui](/install) se quiseres aprender a como ter tudo configurado.
navigation: |
  <h3>Tópicos</h3>
  <nav class="sl-c-list-navigation-wrapper">
    - [Pré-Processamento](#preprocessing)
    - [Variáveis](#variables)
    - [Encaixamento](#nesting)
    - [Parciais](#partials)
    - [Módulos](#modules)
    - [Misturas](#mixins)
    - [Herança](#inheritance)
    - [Operadores](#operators)
  </nav>
---


<section id="preprocessing">
{%- # retain older link -%}
<span id="topic-1"></span>

## Pré-Processamento

A CSS em si mesma pode ser divertida, mas as folhas de estilos estão a ficar maiores, mais complexas, e mais difíceis de manter. É aqui onde um pré-processador pode ajudar. A Sass tem funcionalidades que não existem na CSS ainda como encaixamento, misturas, herança, e outras fantásticas guloseimas que ajudam-te a escrever CSS robusto e sustentável.

Assim que começares a emendar com a Sass, ela receberá o teu ficheiro de Sass pré-processado e guarda-lo-á como ficheiro de CSS normal que podes usar na tua página.

A maneira mais direta de fazer isto acontecer é no teu terminal. Assim que a Sass estiver instalada, podes compilar o teu Sass para CSS usando o comando `sass`. Precisarás de dizer a Sass o ficheiro a partir do qual construirás, e para onde produzirá a CSS. Por exemplo, executar `sass input.scss output.css` a partir do teu terminal receberia um único ficheiro de Sass, `input.scss`, e compila este ficheiro para `output.css`.

Tu podes também observar ficheiros ou diretórios individuais com a opção `--watch`. A opção observar fiz a Sass para observar os teus ficheiros de fonte por mudanças, e recompilar a CSS cada vez que guardares a teu ficheiro de Sass. Se querias observar (no lugar de construir manualmente) o teu ficheiro `input.scss`, apenas adicionarias a opção observar ao teu comando, desta maneira:

```shellsession
sass --watch input.scss output.css
```

Tu podes observar e produzir para os diretórios usando caminhos de pasta como a tua entrada e saída, e separá-los com um sinal de dois pontos. Neste exemplo:

```shellsession
sass --watch app/sass:public/stylesheets
```

A Sass observaria todos os ficheiros na pasta `app/sass` por mudanças, e compilaria a CSS para a pasta `public/stylesheets`.

{% funFact %}
  A Sass tem duas sintaxes! A sintaxe de SCSS (`.scss`) é a mais comummente usada. É um superconjunto de CSS, o que significa que todo CSS válido também é SCSS válido. A sintaxe indentada (`.sass`) é mais rara: usa indentação no lugar de chavetas para encaixar declarações, e novas linhas no lugar de sinais de pontos e vírgulas para separá-los. Todos os nossos exemplos estão disponíveis em ambas sintaxes.
{% endfunFact %}

</section>

<hr>

<section id="variables">
{%- # retain older link -%}
<span id="topic-2"></span>
## Variáveis

Pense em variáveis como uma maneira de armazenar informação que queres reutilizar ao longo da tua folha de estilo. Tu podes armazenar coisas como cores, pilhas de fonte, ou qualquer valor de CSS que pensas em reutilizar. A Sass usa o símbolo `$` para tornar algo numa variável. Cá está um exemplo:

{% codeExample 'variables' %}
  $font-stack: Helvetica, sans-serif;
  $primary-color: #333;
  
  body {
    font: 100% $font-stack;
    color: $primary-color;
  }
  ===
  $font-stack: Helvetica, sans-serif
  $primary-color: #333

  body
    font: 100% $font-stack
    color: $primary-color
{% endcodeExample %}


Quando a Sass for processada, recebe as variáveis que definimos para a `$font-stack` e `$primary-color` e gera CSS normal com os valores da nossa variável colocados na CSS. Isto pode ser extremamente poderoso quando trabalhamos com cores de marca  e procuramos mantê-las consistentes ao longo da página.

</section>

<hr>

<section id="nesting">
{%- # retain older link -%}
<span id="topic-3"></span>

## Encaixamento

Quando escreves HTML provavelmente tens reparado que tem um hierarquia visual clara e encaixada. A CSS por outro lado, não tem.

A Sass permitir-te-á encaixar os teus seletores de CSS de uma maneira que segue a mesma hierarquia visual do teu HTML. Esteja ciente de que regras demasiadamente encaixadas resultarão em CSS muito qualificado que poderiam provar-se difícil de manter e é geralmente considerado má prática.

Com isto em mente, cá está um exemplo de alguns estilos normais para uma navegação da página:

{% codeExample 'nesting' %}
  nav {
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    li { display: inline-block; }

    a {
      display: block;
      padding: 6px 12px;
      text-decoration: none;
    }
  }
  ===
  nav
    ul
      margin: 0
      padding: 0
      list-style: none

    li
      display: inline-block

    a
      display: block
      padding: 6px 12px
      text-decoration: none
{% endcodeExample %}

Notarás que os seletores `ul`, `li`, e `a` são encaixados dentro do seletor `nav`. Isto é uma excelente maneira de organizar a tua CSS e torná-la mais legível.

</section>

<hr>

<section id="partials">
{%- # retain older link -%}
<span id="topic-4"></span>

## Parciais

Tu podes criar ficheiros de Sass parciais que contêm pequenos trechos de CSS que podes incluir em outros ficheiros de Sass. Isto é uma excelente maneira de organizar em módulos a tua CSS e ajuda a manter as coisas mais fácil de manter. Um parcial é um ficheiro de Sass nomeado com um sublinhado antes do nome. Tu podes nomear algo como `_partial.scss`. O sublinhado permite que Sass saiba que o ficheiro é apenas um ficheiro parcial e que não deveria ser gerado num ficheiro de CSS. Os parciais de Sass são usados com a regra `@use`.

</section>

<hr>

<section id="modules">
{%- # retain older link -%}
<span id="topic-5"></span>

## Módulos

{% render 'doc_snippets/module-system-status' %}

Tu não tens de escrever todo o teu código de Sass num único ficheiro. Tu podes separá-lo de qualquer modo que quiseres com a regra `@use`. Esta regra carrega um outro ficheiro de Sass como um *módulo*, o que significa que podes fazer referência as suas variáveis, [misturas][mixins], e [funções][functions] no teu ficheiro de Sass com um espaço de nome baseado no nome do ficheiro. Usar um ficheiro também incluirá o CSS que gera no tua saída compilada:

[mixins]: #topic-6
[functions]: documentation/at-rules/function

{% codeExample 'modules' %}
  // _base.scss
  $font-stack: Helvetica, sans-serif;
  $primary-color: #333;

  body {
    font: 100% $font-stack;
    color: $primary-color;
  }
  ---
  // styles.scss
  @use 'base';

  .inverse {
    background-color: base.$primary-color;
    color: white;
  }
  ===
  // _base.sass
  $font-stack: Helvetica, sans-serif
  $primary-color: #333

  body
    font: 100% $font-stack
    color: $primary-color
  ---
  // styles.sass
  @use 'base'

  .inverse
    background-color: base.$primary-color
    color: white
  ===
  body {
    font: 100% Helvetica, sans-serif;
    color: #333;
  }

  .inverse {
    background-color: #333;
    color: white;
  }
{% endcodeExample %}

Repara que usamos `@use 'base';` no ficheiro `styles.scss`. Quando usas um ficheiro não precisas de incluir a extensão do ficheiro. A Sass é inteligente e compreenderá por ti.

</section>

<hr>

<section id="mixins">
{%- # retain older link -%}
<span id="topic-6"></span>

## Misturas

Algumas coisas na CSS são um pouco tediosas de escrever, especialmente com a CSS3 e os muitos prefixos ambulantes que existem. Uma mistura permite-te fazer grupos de declarações de CSS que queres reduzir ao longo da tua página. Ela ajuda a manter tua Sass limpa segundo a prática do não repetir-se ou DRY. Tu podes mesmo passar valores para tornar a tua mistura mais flexível. Cá está um exemplo para `theme`:

{% codeExample 'mixins' %}
  @mixin theme($theme: DarkGray) {
    background: $theme;
    box-shadow: 0 0 1px rgba($theme, .25);
    color: #fff;
  }

  .info {
    @include theme;
  }
  .alert {
    @include theme($theme: DarkRed);
  }
  .success {
    @include theme($theme: DarkGreen);
  }
  ===
  @mixin theme($theme: DarkGray)
    background: $theme
    box-shadow: 0 0 1px rgba($theme, .25)
    color: #fff

  .info
    @include theme

  .alert
    @include theme($theme: DarkRed)

  .success
    @include theme($theme: DarkGreen)
{% endcodeExample %}

Para criares uma mistura usas a diretiva `@mixin` e dás-lhe um nome. Nomeamos a nossa mistura de `theme`. Também estamos a usar a variável `$theme` dentro dos parêntesis assim podemos passar um `theme` de qualquer coisa que quisermos. Depois de criares a tua mistura, podes então usá-la como declaração de CSS começando com `@include` seguida pelo nome da mistura.

</section>

<hr>

<section id="inheritance">
{%- # retain older link -%}
<span id="topic-7"></span>

## Extensão / Herança

O uso de `@extend` permite-te partilhar um conjunto de propriedades de CSS de um seletor para um outro. No nosso exemplo criaremos um série simples de mensagens para erros, avisos e sucessos usando uma outra funcionalidade que adam de mãos dadas com estender, classes de espaço reservado. Uma classe de espaço reservado é um tipo especial de classe que apenas imprime quando for estendida, e pode ajudar a manter o teu CSS compilado arrumado e limpo:

{% codeExample 'extend-inheritance' %}
  /* This CSS will print because %message-shared is extended. */
  %message-shared {
    border: 1px solid #ccc;
    padding: 10px;
    color: #333;
  }

  // This CSS won't print because %equal-heights is never extended.
  %equal-heights {
    display: flex;
    flex-wrap: wrap;
  }

  .message {
    @extend %message-shared;
  }

  .success {
    @extend %message-shared;
    border-color: green;
  }

  .error {
    @extend %message-shared;
    border-color: red;
  }

  .warning {
    @extend %message-shared;
    border-color: yellow;
  }
  ===
  /* This CSS will print because %message-shared is extended. */
  %message-shared
    border: 1px solid #ccc
    padding: 10px
    color: #333

  // This CSS won't print because %equal-heights is never extended.
  %equal-heights
    display: flex
    flex-wrap: wrap

  .message
    @extend %message-shared

  .success
    @extend %message-shared
    border-color: green

  .error
    @extend %message-shared
    border-color: red

  .warning
    @extend %message-shared
    border-color: yellow
{% endcodeExample %}

O que o código acima faz é dizer `.message`, `.success`, `.error`, e `.warning` para comportarem-se tal como `%message-shared`. Isto significa que em qualquer parte que `%message-shared` aparecer, `.message`, `.success`, `.error`, e `.warning` também aparecerão. A magia acontece no CSS gerado, onde cada uma destas classes receberão as propriedades de CSS que `%message-shared` recebe. Isto ajuda-te a evitar ter de escrever vários nomes de classe sobre elementos de HTML.

Tu podes estender a maioria dos seletores de CSS simples além das classes de espaço reservado na Sass, mas usar os espaços reservados é a maneira mais fácil de garantir que não estás a estender uma classe que é encaixada noutro lado no teus estilos, o que pode resultar em seletores não intencionados no teu CSS.

Nota que a CSS no `%equal-heights` não é gerada, porque `%equal-heights` nunca foi estendida.

</section>

<hr>

<section id="operators">
{%- # retain older link -%}
<span id="topic-8"></span>

## Operadores

Fazer cálculos no teu CSS é muito útil. A Sass tem um mão-cheia de operadores matemáticos padrão como `+`, `-`, `*`, `math.div()`, e `%`. No nosso exemplo faremos alguns cálculos simples para calcular as larguras para um `article` e `aside`:

{% codeExample 'operators' %}
  @use "sass:math";

  .container {
    display: flex;
  }

  article[role="main"] {
    width: math.div(600px, 960px) * 100%;
  }

  aside[role="complementary"] {
    width: math.div(300px, 960px) * 100%;
    margin-left: auto;
  }
  ===
  @use "sass:math"

  .container
    display: flex

  article[role="main"]
    width: math.div(600px, 960px) * 100%

  aside[role="complementary"]
    width: math.div(300px, 960px) * 100%
    margin-left: auto
{% endcodeExample %}

Criamos uma grade fluída muito simples, baseada nm 960px. As operações na Sass permitem-nos fazer algo como pegar valores em píxeis e convertê-los em percentagens sem muita complicação.

</section>
