---
title: Variáveis
table_of_contents: true
introduction: >
  As variáveis da Sass são simples: atribuis um valor à um nome que começa com `$`, e depois podes fazer referência àquele nome ao lugar do próprio valor. Mas apesar da sua simplicidade, são uma das ferramentas mais úteis que a Sass trás para a mesa. As variáveis tornam possível reduzir a repetição, fazer cálculos complexos, configurar bibliotecas, e muito mais.
---

Uma declaração de variável parece-se muito com uma [declaração de propriedade][property declaration]: é escrita `<variable>: <expression>`. Diferente duma propriedade, a qual pode apenas ser declarada numa regra de estilo ou regra que usa arroba, as variáveis podem ser declaradas em qualquer parte que quiseres. Para usares uma variável, apenas inclua-a num valor:

[property declaration]: /documentation/style-rules/declarations

{% codeExample 'variable' %}
  $base-color: #c6538c;
  $border-dark: rgba($base-color, 0.88);

  .alert {
    border: 1px solid $border-dark;
  }
  ===
  $base-color: #c6538c
  $border-dark: rgba($base-color, 0.88)

  .alert
    border: 1px solid $border-dark
{% endcodeExample %}

{% headsUp %}
  A CSS tem [suas próprias variáveis][variables of its own], as quais são totalmente diferentes das variáveis de Sass. Conheça as diferenças!

  [variables of its own]: /documentation/style-rules/declarations#custom-properties

  * As variáveis de Sass são compiladas pela Sass. As variáveis de CSS são incluídas na saída de CSS.

  * As variáveis de CSS podem ter valores diferentes para elementos diferentes, mas as variáveis de Sass apenas têm um valor de cada vez.

  * As variáveis de Sass são *imperativas*, o que significa que se usas uma variável e depois mudares o seu valor, o uso anterior continuará o mesmo. As variáveis de CSS são *declarativas*, o que significa se mudares o valor, afetará tanto o uso anteriores e posteriores.

  {% codeExample 'variable-heads-up' %}
    $variable: value 1;
    .rule-1 {
      value: $variable;
    }

    $variable: value 2;
    .rule-2 {
      value: $variable;
    }
    ===
    $variable: value 1
    .rule-1
      value: $variable


    $variable: value 2
    .rule-2
      value: $variable
  {% endcodeExample %}
{% endheadsUp %}

{% funFact %}
  As variáveis de Sass, tal como todos os identificadores de Sass, tratam os hífens e sublinhados como idênticos. Isto significa que ambos `$font-size` e `$font_size` referem-se a mesma variável. Isto é um comportamento histórico que vem desde os primeiros dias da Sass, quando *apenas* permitia sublinhados como nomes de identificador. Assim que a Sass adicionou suporte para hífens para corresponder a sintaxe da CSS, os dois foram tornados equivalentes para tornar a migração mais fácil.
{% endfunFact %}

## Valores Padrão {#default-values}

Normalmente quando atribuímos um valor para uma variável, se esta variável já tiver um valor, o seu valor anterior é sobrescrito. Mas se estiveres a escrever uma biblioteca de Sass, podes querer permitir que os teus utilizadores configurem as variáveis da tua biblioteca antes de usá-las para gerar o CSS.

Para tornar isto possível, a Sass fornece a opção `!default`. Esta atribui um valor à uma variável *apenas se* esta variável não estiver definida ou seu valor for [`null`][]. De outro modo, o valor existente será usado.

[`null`]: /documentation/values/null

### Configurando Módulos {#configuring-modules}

{% render 'doc_snippets/module-system-status' %}

As variáveis definidas com `!default` podem ser configuradas quando carregas um módulo com a [regra `@use`][`@use` rule]. As bibliotecas de Sass frequentemente usam variáveis `!default` para permitir seus utilizadores configurarem a CSS da biblioteca.

[`@use` rule]: /documentation/at-rules/use

Para carregares um módulo com configuração, escreve `@use <url> com (<variable>: <value>, <variable>: <value>)`. Os valores configurados sobreporão as os valores padrão da variáveis. Apenas variáveis escritas no alto nível da folha de estilo com a palavra-chave `!default` podem ser configuradas.

{% render 'code_snippets/example-use-with' %}

## Variáveis Embutidas {#built-in-variables}

As variáveis que são definidas por um [módulo embutido][built-in module] não podem ser modificadas.

[built-in module]: /documentation/modules

{% codeExample 'built-in-variables', false %}
  @use "sass:math" as math;

  // Esta atribuição falhará.
  math.$pi: 0;
  ===
  @use "sass:math" as math

  // Esta atribuição falhará.
  math.$pi: 0
{% endcodeExample %}

## Âmbito {#scope}

As variáveis declaras no alto nível de uma folha de estilo são *globais*. Isto significa que são acessadas em qualquer parte nos seus módulos depois terem sido declaradas. Mas isto não é verdade para todas as variáveis. Aquelas variáveis declaradas nos blocos (chavetas na SCSS ou código indentado na Sass) são normalmente *locais*, e podem apenas ser acessadas dentro do bloco que foram declaradas.

{% codeExample 'scope' %}
  $global-variable: global value;

  .content {
    $local-variable: local value;
    global: $global-variable;
    local: $local-variable;
  }

  .sidebar {
    global: $global-variable;

    // Isto falharia, porque $local-variable não está no âmbito:
    // local: $local-variable;
  }
  ===
  $global-variable: global value

  .content
    $local-variable: local value
    global: $global-variable
    local: $local-variable


  .sidebar
    global: $global-variable

    // Isto falharia, porque $local-variable não está no âmbito:
    // local: $local-variable
{% endcodeExample %}

### Sombreando {#shadowing}

As variáveis locais podem mesmo ser declaradas com o mesmo nome como uma variável global. Se isto acontecer, existem na realidade dois variáveis diferentes com o mesmo nome: uma local e uma global. Isto ajuda a garantir que um autor escrevendo uma variável local não muda acidentalmente o valor de uma variável global de que não estão consciente:

{% codeExample 'shadowing' %}
  $variable: global value;

  .content {
    $variable: local value;
    value: $variable;
  }

  .sidebar {
    value: $variable;
  }
  ===
  $variable: global value

  .content
    $variable: local value
    value: $variable


  .sidebar
    value: $variable
{% endcodeExample %}

Se precisares de definir um valor da variável global de dentro de um âmbito local (tal como numa mistura), podes usar a palavra-chave `!global`. Uma declaração de variável marcada como `!global` *sempre* atribuirá para o âmbito global.

{% codeExample 'global-variable' %}
  $variable: first global value;

  .content {
    $variable: second global value !global;
    value: $variable;
  }

  .sidebar {
    value: $variable;
  }
  ===
  $variable: first global value

  .content
    $variable: second global value !global
    value: $variable


  .sidebar
    value: $variable
{% endcodeExample %}

{% headsUp %}
  {% compatibility 'dart: "2.0.0"', 'libsass: false', 'ruby: false' %}
    As versões mais antigas da Sass permitiam que a `!global` fosse usada para uma variável que ainda não existe. Este comportamento foi depreciado garantir que cada folha de estilo declara a mesma variável não importa como é executado.
  {% endcompatibility %}

  A palavra-chave `!global` apenas pode ser usada para definir uma variável que já foi declarada no alto nível dum ficheiro. Esta *não pode* ser usada para declarar uma nova variável.

{% endheadsUp %}

## Âmbito de Controlo de Fluxo {#flow-control-scope}

As variáveis declaradas nas [regras de controlo de fluxo][flow control rules] têm regras definição de âmbito especiais: não sombreiam as variáveis no mesmo nível como regra de controlo de fluxo. Ao invés disto, apenas atribuem para estas variáveis. Isto torna muito mais fácil de condicionalmente atribuir um valor para uma variável, ou construir um valor como parte de um laço.

[flow control rules]: /documentation/at-rules/control

{% codeExample 'flow-control' %}
  $dark-theme: true !default;
  $primary-color: #f8bbd0 !default;
  $accent-color: #6a1b9a !default;

  @if $dark-theme {
    $primary-color: darken($primary-color, 60%);
    $accent-color: lighten($accent-color, 60%);
  }

  .button {
    background-color: $primary-color;
    border: 1px solid $accent-color;
    border-radius: 3px;
  }
  ===
  $dark-theme: true !default
  $primary-color: #f8bbd0 !default
  $accent-color: #6a1b9a !default

  @if $dark-theme
    $primary-color: darken($primary-color, 60%)
    $accent-color: lighten($accent-color, 60%)


  .button
    background-color: $primary-color
    border: 1px solid $accent-color
    border-radius: 3px
{% endcodeExample %}

{% headsUp %}
  As variáveis no âmbito do controlo de fluxo podem atribuir para variáveis existentes no âmbito externo, mas novas variáveis declaradas no controlo de fluxo não serão acessíveis no âmbito externo. Certifica-te de que a variável já foi declarada antes de atribuires à ela, mesmo se precisares de declará-la como `null`.
{% endheadsUp %}

## Funções de Variável Avançadas {#advanced-variable-functions}

A biblioteca fundamental da Sass fornece algumas funções avançadas para trabalhar com variáveis. A [função `meta.variable-exists()`][`meta.variable-exists()` function] retorna se uma variável com o dado nome existe no âmbito atual, e a [função `meta.global-variable-exists()`][`meta.global-variable-exists()` function] faz o mesmo mas apenas para o âmbito global.

[`meta.variable-exists()` function]: /documentation/modules/meta#variable-exists
[`meta.global-variable-exists()` function]: /documentation/modules/meta#global-variable-exists

{% headsUp %}
  Os utilizadores querem ocasionalmente usar interpolação para definir um nome de variável baseada em uma outra variável. A Sass não permite isto, porque torna muito mais difícil dizer de relance quais variáveis são definidas onde. O que *podes* fazer, é definir um [mapa][map] a partir dos nomes para as variáveis que podes depois acessar usando variáveis.

  [map]: /documentation/values/maps

  {% codeExample 'advanced-variable-functions' %}
    @use "sass:map";

    $theme-colors: (
      "success": #28a745,
      "info": #17a2b8,
      "warning": #ffc107,
    );

    .alert {
      // No lugar de $theme-color-#{warning}
      background-color: map.get($theme-colors, "warning");
    }
    ===
    @use "sass:map"

    $theme-colors: ("success": #28a745, "info": #17a2b8, "warning": #ffc107)

    .alert
      // No lugar de $theme-color-#{warning}
      background-color: map.get($theme-colors, "warning")
    ===
    .alert {
      background-color: #ffc107;
    }
  {% endcodeExample %}
{% endheadsUp %}
