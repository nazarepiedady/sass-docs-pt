---
title: "@import"
table_of_contents: true
introduction: >
  A Sass estende a [regra `@import`](https://developer.mozilla.org/en-US/docs/Web/CSS/@import) da CSS com a habilidade de importar folhas de estilo de Sass e CSS, fornecendo acesso às [misturas](/documentation/at-rules/mixin), [funções](/documentation/at-rules/function), e [variáveis](/documentation/variables) e combinando vários ficheiros de folhas de estilo de CSS. Ao contrário das importações de CSS simples, que requerem que o navegador faça várias requisições de HTTP visto que desenha a tua página, as importações de Sass são manipuladas inteiramente durante a compilação.
---

As importações de Sass têm a mesma sintaxe que as importações de CSS, exceto que permitem que várias importações sejam separadas por vírgulas no lugar de exigir que cada uma tenha sua própria `@import`. Além disto, na [sintaxe indentada][indented syntax], as URLs importadas são não precisam estar entre aspas.

[indented syntax]: /documentation/syntax#the-indented-syntax

{% headsUp %}
  A equipa da Sass desencoraja o uso contínuo da regra `@import`. A Sass o [retirará gradualmente][gradually phase it out] durante os próximos poucos anos, e eventualmente o removerá da linguagem inteiramente. Prefira a [regra `@use`][`@use` rule]. (Nota que apenas a Sass de Dart atualmente suporta `@use`. Os utilizadores de outras implementações devem usar a regra `@import`).

  [gradually phase it out]: https://github.com/sass/sass/blob/main/accepted/module-system.md#timeline
  [`@use` rule]: /documentation/at-rules/use

  <h4>{{ "O Que Existe de Errado com a `@import`?" | markdown }}</h4>

  A regra `@import` tem um número de problemas sérios:

  * `@import` torna todas as variáveis, misturas, e funções globalmente acessíveis. Isto torna muito difícil para pessoas (ou ferramentas) dizerem onde alguma coisa é definida.

  * Uma vez que tudo é global, as bibliotecas devem adicionar um prefixo para todos os seus membros para evitar colisões de nomeação.

  * As [regras `@extend`] também são globais, o que a torna difícil predizer quais regras de estilo serão estendidas.

    [`@extend` rules]: /documentation/at-rules/extend

  * Cada folha de estilo é executada e sua CSS emitida *toda vez* que for importada com `@import`, o que aumenta o tempo de compilação e produz saída inchada.

  * Não existia maneira de definir membros privados ou seletores de espaço reservado que fossem inacessíveis às folhas de estilo posteriores.

  O novo sistema de módulo e a regra `@use` abordam todos estes problemas.

  <h4>{{ "Como Migro?" | markdown }}</h4>

  Escrevemos uma [ferramenta de migração][migration tool] que converte automaticamente a maioria do código baseado na `@import` para código baseado na `@use` num instante. Apenas aponte-a os teus pontos de entrada e deixe-a executar!

  [migration tool]: /documentation/cli/migrator
{% endheadsUp %}

{% codeExample 'import' %}
  // foundation/_code.scss
  code {
    padding: .25em;
    line-height: 0;
  }
  ---
  // foundation/_lists.scss
  ul, ol {
    text-align: left;

    & & {
      padding: {
        bottom: 0;
        left: 0;
      }
    }
  }
  ---
  // style.scss
  @import 'foundation/code', 'foundation/lists';
  ===
  // foundation/_code.sass
  code
    padding: .25em
    line-height: 0
  ---
  // foundation/_lists.sass
  ul, ol
    text-align: left

    & &
      padding:
        bottom: 0
        left: 0
  ---
  // style.sass
  @import foundation/code, foundation/lists
  ===
  code {
    padding: .25em;
    line-height: 0;
  }

  ul, ol {
    text-align: left;
  }
  ul ul, ol ol {
    padding-bottom: 0;
    padding-left: 0;
  }
{% endcodeExample %}

Quando a Sass importa um ficheiro, este ficheiro é avaliado como se seu conteúdo aparecesse diretamente no lugar da `@import`. Quaisquer [misturas][mixins], [funções][functions], e [variáveis][variables] do ficheiro importado são tornados disponíveis, e toda a sua CSS é incluída no ponto exato onde a `@import` foi escrita. Além disso, quaisquer misturas, funções, ou variáveis que foram definidas antes de `@import` (incluindo a partir de outras `@import`) estão disponíveis na folha de estilo importada.

[mixins]: /documentation/at-rules/mixin
[functions]: /documentation/at-rules/function
[variables]: /documentation/variables

{% headsUp %}
  Se a mesma folha de estilo for importada mais de uma vez, será avaliada novamente toda vez. Se apenas define funções e misturas, isto normalmente não é um grande coisa, mas se contiver regras de estilo serão compiladas para CSS mais de uma vez.
{% endheadsUp %}

## Encontrando o Ficheiro {#finding-the-file}

Não seria nada divertido escrever URLs absolutas para toda folha de estilo que importares, então o algoritmo da Sass para encontrar um ficheiro à importar torna-a um pouco mais fácil. Para começar, não tens de escrever explicitamente a extensão do ficheiro que quiseres importar; `@import "variables"` carregará automaticamente `variables.scss`, `variables.sass` ou `variables.css`.

{% headsUp %}
  Para garantir que as folhas de estilo funcionem em todos os sistemas operativos, a Sass importa os ficheiros pela *URL*, e não pelo *caminho do ficheiro*. Isto significa que precisas de usar barras oblíquas, não barras oblíquas invertidas, mesmo quando estiveres no Windows.
{% endheadsUp %}

### Caminhos de Carregamento {#load-paths}

Todas as implementações de Sass permitem os utilizadores fornecerem *caminhos de carregamentos*: caminhos no sistema de ficheiro que a Sass procurará quando estiver a resolver as importações. Por exemplo, se passares `node_modules/susy/sass` como um caminho de carregamento, podes usar `@import "susy"` para carregar `node_modules/susy/sass/susy.scss`.

As importações serão sempre resolvidas referente ao atual ficheiro primeiro. Os caminhos de carregamento apenas serão usados se não existir nenhum ficheiro relativo que corresponde a importação. Isto garante que não possas acidentalmente desarrumar as tuas importações relativas quando adicionares uma nova biblioteca.

{% funFact %}
  Ao contrário de algumas outras linguagens, a Sass não exige que uses `./` para importações relativas. As importações relativas estão sempre disponíveis.
{% endfunFact %}

### Parciais {#partials}

Como uma convenção, os ficheiros de Sass que apenas estão destinados a serem importados, e não compilados por si mesmos, começam com `_` (como em `_code.scss`). Estes são chamados de *parciais*, e dizem as ferramentas da Sass para não tentarem compilar estes ficheiros por si mesmos. Tu podes deixar de usar o `_` quando importas um parcial.

### Ficheiros de Índice {#index-files}

{% compatibility 'dart: true', 'libsass: "3.6.0"', 'ruby: "3.6.0"' %}{% endcompatibility %}

Se escreveres um `_index.scss` ou `_index.sass` numa pasta, quando a própria pasta for importada este ficheiro será carregado no seu lugar:

{% codeExample 'index-files' %}
  // foundation/_code.scss
  code {
    padding: .25em;
    line-height: 0;
  }
  ---
  // foundation/_lists.scss
  ul, ol {
    text-align: left;

    & & {
      padding: {
        bottom: 0;
        left: 0;
      }
    }
  }
  ---
  // foundation/_index.scss
  @import 'code', 'lists';
  ---
  // style.scss
  @import 'foundation';
  ===
  // foundation/_code.sass
  code
    padding: .25em
    line-height: 0
  ---
  // foundation/_lists.sass
  ul, ol
    text-align: left

    & &
      padding:
        bottom: 0
        left: 0
  ---
  // foundation/_index.sass
  @import code, lists
  ---
  // style.sass
  @import foundation
  ===
  code {
    padding: .25em;
    line-height: 0;
  }

  ul, ol {
    text-align: left;
  }
  ul ul, ol ol {
    padding-bottom: 0;
    padding-left: 0;
  }
{% endcodeExample %}

### Importadores Personalizados {#custom-importers}

Todas as implementações da Sass fornecem uma maneira de definir importadores personalizados, que controlam como as importações de `@import` localizam as folhas de estilos:

* A [Sass de Node][Node Sass] e [Sass de Dart na npm][Dart Sass on npm] fornecem uma [opção `importer`][`importer` option] como parte de suas API de JavaScript.

* A [Sass de Dart na pub][Dart Sass on pub] fornece uma [classe `Importer`][`Importer` class] abstrata que pode ser estendida por um importador personalizado.

* A [Sass de Ruby][Ruby Sass] fornece uma [classe `Importers::Base`][`Importers::Base` class] abstrata que pode ser estendida por um importador personalizado.

[Node Sass]: https://npmjs.com/package/node-sass
[Dart Sass on npm]: https://npmjs.com/package/sass
[`importer` option]: https://github.com/sass/node-sass#importer--v200---experimental
[Dart Sass on pub]: https://pub.dartlang.org/packages/sass
[`Importer` class]: https://pub.dartlang.org/documentation/sass/latest/sass/Importer-class.html
[Ruby Sass]: /ruby-sass
[`Importers::Base` class]: https://www.rubydoc.info/gems/sass/Sass/Importers/Base

## Encaixamento {#nesting}

As importações são normalmente escritas no alto nível duma folha de estilo, mas não têm de o ser. Elas também podem ser encaixadas dentro de [regras de estilo][style rules] ou [regras de arroba de CSS simples][plain CSS at-rules]. A CSS importada é encaixada naquele contexto, o que torna as importações encaixadas úteis para isolar um pedaço de CSS para um elemento especial ou consulta de media. Nota que as [misturas][mixins], [funções][functions], e [variáveis][variables] de alto nível definidas na importação encaixada ainda são definidas globalmente:

[style rules]: /documentation/style-rules
[plain CSS at-rules]: /documentation/at-rules/css
[mixins]: /documentation/at-rules/mixin
[functions]: /documentation/at-rules/function
[variables]: /documentation/variables

{% codeExample 'nesting' %}
  // _theme.scss
  pre, code {
    font-family: 'Source Code Pro', Helvetica, Arial;
    border-radius: 4px;
  }
  ---
  // style.scss
  .theme-sample {
    @import "theme";
  }
  ===
  // _theme.sass
  pre, code
    font-family: 'Source Code Pro', Helvetica, Arial
    border-radius: 4px
  ---
  // style.sass
  .theme-sample
    @import theme
  ===
  .theme-sample pre, .theme-sample code {
    font-family: 'Source Code Pro', Helvetica, Arial;
    border-radius: 4px;
  }
{% endcodeExample %}

{% funFact %}
  As importações encaixadas são muito úteis para isolar folhas de estilo de terceiro, mas se fores autor da folha de estilo que estás a importar, normalmente é uma melhor ideia escrever os teus estilos numa [mistura][mixin] e incluir esta mistura no contexto encaixado. Uma mistura pode ser usada de maneiras mais flexíveis, mas é mais claro quando olhas para a folha de estilo importada como está destinada a ser usada.

  [mixin]: /documentation/at-rules/mixin
{% endfunFact %}

{% headsUp %}
  A CSS nas importações encaixadas é avaliada como uma mistura, o que significa que quaisquer [seletores de pai][parent selectors] farão referência ao seletor no qual a folha de estilo está encaixada:

  [parent selectors]: /documentation/style-rules/parent-selector

  {% codeExample 'parent-selector' %}
    // _theme.scss
    ul li {
      $padding: 16px;
      padding-left: $padding;
      [dir=rtl] & {
        padding: {
          left: 0;
          right: $padding;
        }
      }
    }
    ---
    // style.scss
    .theme-sample {
      @import "theme";
    }
    ===
    // _theme.sass
    ul li
      $padding: 16px
      padding-left: $padding
      [dir=rtl] &
        padding:
          left: 0
          right: $padding
    ---
    // style.sass
    .theme-sample
      @import theme
    ===
    .theme-sample ul li {
      padding-left: 16px;
    }
    [dir=rtl] .theme-sample ul li {
      padding-left: 0;
      padding-right: 16px;
    }
  {% endcodeExample %}
{% endheadsUp %}

## Importando CSS {#importing-css}

{% compatibility 'dart: "1.11.0"', 'libsass: "partial"', 'ruby: false' %}
  A LibSass suporta a importação de ficheiros com extensão `.css`, mas contrário a especificação são tratadas como ficheiros de SCSS no lugar de serem analisadas como CSS. Este comportamento tem sido depreciado, e uma atualização está em curso para suportar o comportamento descrito abaixo.
{% endcompatibility %}

Além de importar ficheiros `.sass` e `.scss`, a Sass pode importar os velhos simples ficheiros `.css`. A única regra é que a importação *não deve* explicitamente incluir a extensão `.css`, porque isto costumava a indicar uma [importação de `@import` da CSS simples][plain CSS `@import`]:

[plain CSS `@import`]: #plain-css-imports

{% codeExample 'import-css' %}
  // code.css
  code {
    padding: .25em;
    line-height: 0;
  }
  ---
  // style.scss
  @import 'code';
  ===
  // code.css
  code {
    padding: .25em;
    line-height: 0;
  }
  ---
  // style.sass
  @import code
  ===
  code {
    padding: .25em;
    line-height: 0;
  }
{% endcodeExample %}

Os ficheiros de CSS importados pela Sass não permitem quaisquer funcionalidades de Sass especiais. Para garantir que os autores não escrevam acidentalmente a Sass na sua CSS, todas as funcionalidades de Sass que também não são CSS válidas produzirão erros. De outro modo, a CSS será compilada como está. Isto pode mesmo ser [estendido][extended]!

[extended]: /documentation/at-rules/extend

## Importações de `@import` de CSS simples {#plain-css-imports}

{% compatibility 'dart: true', 'libsass: "partial"', 'ruby: true' %}
  Por padrão, a LibSass lida com as importações de CSS simples corretamente. No entanto, quaisquer [importações personalizada][custom importers] aplicar-se-ão incorretamente às regras `@import` de CSS simples, tornado possível para estas regras carregar ficheiros de Sass.

  [custom importers]: /documentation/js-api/interfaces/LegacySharedOptions#importer
{% endcompatibility %}

Uma vez que `@import` também é definida na CSS, a Sass precisa duma maneira de compilar as importações de `@import` de CSS simples sem tentar importar os ficheiros em tempo de compilação. Para conseguir isto, e garantir que a SCSS seja um superconjunto da CSS tanto quanto possível, a Sass compilará quaisquer importações de `@import` com as seguintes características para as importações de CSS simples:

* Importações onde a URL termina com `.css`.
* Importações onde a URL começa com `http://` ou `https://`.
* Importações onde a URL é escrita como uma `url()`.
* Importações que tem consultas de media.

{% codeExample 'plain-css-imports' %}
  @import "theme.css";
  @import "http://fonts.googleapis.com/css?family=Droid+Sans";
  @import url(theme);
  @import "landscape" screen and (orientation: landscape);
  ===
  @import "theme.css"
  @import "http://fonts.googleapis.com/css?family=Droid+Sans"
  @import url(theme)
  @import "landscape" screen and (orientation: landscape)
{% endcodeExample %}

### Interpolação {#interpolation}

Embora as importações de Sass não podem usar [interpolação][interpolation] (para garantir seja sempre possível dizer de onde as [misturas][mixins], [funções][functions], e [variáveis][variables] vêm), as importações de CSS simples podem. Isto torna possível gerar dinamicamente importações, por exemplo baseadas nos parâmetros de mistura:

[interpolation]: /documentation/interpolation
[mixins]: /documentation/at-rules/mixin
[functions]: /documentation/at-rules/function
[variables]: /documentation/variables

{% codeExample 'interpolation' %}
  @mixin google-font($family) {
    @import url("http://fonts.googleapis.com/css?family=#{$family}");
  }

  @include google-font("Droid Sans");
  ===
  @mixin google-font($family)
    @import url("http://fonts.googleapis.com/css?family=#{$family}")


  @include google-font("Droid Sans")
{% endcodeExample %}

## Importação e Módulos {#import-and-modules}

{% render 'doc_snippets/module-system-status' %}

O [sistema de módulo][module system] da Sass integra-se perfeitamente com a `@import`, quer estejas a importar um ficheiro que contém regras `@use` ou a carregar um ficheiro que contém importações como um módulo. Nós queremos tornar a transição de `@import` para `@use` a mais suave possível.

[module system]: /documentation/at-rules/use

### Importando um Ficheiro de Sistema de Módulo {#importing-a-module-system-file}

Quando importas um ficheiro que contém regras `@use`, a importação do ficheiro tem acesso à todos os membros (mesmo os membros privados) definidos diretamente neste ficheiro, mas *não* quaisquer membros a partir dos módulos que o ficheiro tenha carregado. No entanto, se este ficheiro contiver [regras `@forward`][`@forward` rules], a importações de ficheiro terá acesso aos membros expedidos. Isto significa que podes importar uma biblioteca que foi escrita para ser usada com o sistema de módulo.

[`@forward` rules]: /documentation/at-rules/forward

{% headsUp %}
  Quando um ficheiro com as regras `@use` for importado, toda a CSS transitivamente carregada por estas for incluída na folha de estilo resultante, mesmo se já tivesse sido incluída por uma outra importação. Se não fores cuidadoso, isto pode resultar em saída de CSS inchada!
{% endheadsUp %}

#### Ficheiros só para Importação {#import-only-files}

Uma API que faz sentido para `@use` pode não fazer sentido para `@import`. Por exemplo, `@use` adiciona um espaço de nome para todos os membros por padrão assim podes seguramente usar nomes curtos, mas a `@import` não então podes precisar de algo mais longo. Se fores um autor de biblioteca, podes estar preocupado com o fato de, se atualizares a tua biblioteca para usar o novo sistema de módulo, os teus utilizadores baseados em `@import` existente quebrarão.

Para tornar isto mais fácil, a Sass também suporta *ficheiros só para importação*. Se nomeares um ficheiro `<name>.import.scss`, apenas será carregado para importações, não para os usos de `@use`. Desta maneira, podes reter compatibilidade para os utilizadores de `@import` enquanto ainda forneces uma boa API para os utilizadores do novo sistema de módulo:

{% codeExample 'import-only-files', false %}
  // _reset.scss

  // Os utilizadores do sistema de módulo escrevem `@include reset.list()`.
  @mixin list() {
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }
  }
  ---
  // _reset.import.scss

  // Os utilizadores da importação legada podem continuar a escrever `@include reset-list()`.
  @forward "reset" as reset-*;
  ===
  // _reset.sass

  // Os utilizadores do sistema de módulo escrevem `@include reset.list()`.
  @mixin list()
    ul
      margin: 0
      padding: 0
      list-style: none
  ---
  // _reset.import.sass

  // Os utilizadores da importação legada podem continuar a escrever `@include reset-list()`.
  @forward "reset" as reset-*
{% endcodeExample %}

#### Configurando Módulos Através de Importações {#configuring-modules-through-imports}

{% compatibility 'dart: "1.24.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

Tu podes [configurar módulos][configure modules] que são carregados através duma `@import` definindo variáveis globais antes da `@import` que carrega este módulo pela primeira vez:

[configure modules]: /documentation/at-rules/use#configuration

{% codeExample 'configuring-modules' %}
  // _library.scss
  $color: blue !default;

  a {
    color: $color;
  }
  ---
  // _library.import.scss
  @forward 'library' as lib-*;
  ---
  // style.sass
  $lib-color: green;
  @import "library";
  ===
  $color: blue !default

  a
    color: $color
  ---
  // _library.import.sass
  @forward 'library' as lib-*
  ---
  // style.sass
  $lib-color: green
  @import "library"
  ===
  a {
    color: green;
  }
{% endcodeExample %}

{% headsUp %}
  Os módulos apenas são carregados uma vez, assim se mudares a configuração depois de importares um módulo com `@import` pela primeira vez (mesmo que indiretamente), a mudança será ignorada se importares o módulo com `@import` novamente.
{% endheadsUp %}

### Carregando um Módulo que Contém Importações {#loading-a-module-that-contains-imports}

Quando usas `@use` (ou `@forward`) para carregar um módulo que usa `@import`, este módulo conterá todos os membros públicos definidos pela folha de estilo que carregas *e* tudo que a folha de estilo transitivamente importa. Em outras palavras, tudo que é importado é tratado como se estivessem escritos em uma grande folha de estilo.

Isto facilita a conversão e o começo do uso de `@use` numa folha de estilo mesmo antes de todas as bibliotecas das quais dependem terem convertido para o novo sistema de módulo. Esteja atento, que se elas converterem suas APIs também podem mudar!
