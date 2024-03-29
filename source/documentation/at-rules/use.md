---
title: "@use"
table_of_contents: true
eleventyComputed:
  before_introduction: >
    {% render 'doc_snippets/module-system-status' %}
introduction: >
  A regra `@use` carrega [misturas](/documentation/at-rules/mixin), [funções](/documentation/at-rules/function), e [variáveis](/documentation/variables) a partir das folhas de estilo de Sass, e combina junto a CSS a partir de várias folhas de estilo. As folhas de estilo carregadas pela `@use` são chamadas de "módulos". A Sass também fornece [módulos embutidos](/documentation/modules) cheios de funções úteis.
---

A regra `@use` mais simples é escrita com `@use "<url>"`, a qual carrega o módulo na dada URL. Quaisquer estilos carregado desta maneira será incluído exatamente uma vez na saída de CSS compilada, não importa quantas vezes estes estilos são carregados.

{% headsUp %}
  As regras `@use` duma folha de estilo deve vir antes de quaisquer regras exceto `@forward`, incluindo [regras de estilo][style rules]. No entanto, podes declarar as variáveis antes das regras `@use` para usares quando [configurares os módulos][configuring modules].

  [style rules]: /documentation/style-rules
  [configuring modules]: #configuration
{% endheadsUp %}

{% codeExample 'use' %}
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
  @use 'foundation/code';
  @use 'foundation/lists';
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
  @use 'foundation/code'
  @use 'foundation/lists'
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

## Carregando Membros {#loading-members}

Tu podes acessar variáveis, funções, e misturas dum outro módulo escrevendo `<namespace>.<variable>`, `<namespace>.<function>()`, ou `@include <namespace>.<mixin>()`. Por padrão, o espaço de nome é apenas o último componente da URL do módulo.

Os membros (variáveis, funções, e misturas) carregados com `@use` estão apenas visíveis na folha de estilo que carrega-os. Outras folhas de estilo precisarão de escrever suas próprias regras `@use` se também quiserem acessá-los. Isto ajuda a tornar fácil compreender exatamente de onde cada membro está a vir. Se quiseres carregar membros a partir de vários ficheiros de um vez, podes usar a [regra `@forward`][`@forward` rule] para expedi-los a todos a partir de um ficheiro partilhado.

[`@forward` rule]: /documentation/at-rules/forward

{% funFact %}
  Uma vez que `@use` adiciona espaços de nome aos nomes do membro, é seguro escolher nomes muito simples como `$radius` ou `$width` quando escreves uma folha de estilo. Isto é diferente de da antiga [regra `@import`][`@import` rule], que encorajava que os utilizadores escrevessem nomes longos como `$mat-corner-radius` para evitar conflitos com outras bibliotecas, e ajuda a manter as tuas folhas de estilo claras e fáceis de ler!

  [`@import` rule]: /documentation/at-rules/import
{% endfunFact %}

{% codeExample 'loading-members' %}
  // src/_corners.scss
  $radius: 3px;

  @mixin rounded {
    border-radius: $radius;
  }
  ---
  // style.scss
  @use "src/corners";

  .button {
    @include corners.rounded;
    padding: 5px + corners.$radius;
  }
  ===
  // src/_corners.sass
  $radius: 3px

  @mixin rounded
    border-radius: $radius
  ---
  // style.sass
  @use "src/corners"

  .button
    @include corners.rounded
    padding: 5px + corners.$radius
  ===
  .button {
    border-radius: 3px;
    padding: 8px;
  }
{% endcodeExample %}

### Escolhendo um Espaço de Nome {#choosing-a-namespace}

Por padrão, um espaço de nome do módulo é apenas o último componente da sua URL sem uma extensão de ficheiro. No entanto, algumas vezes podes querer escolher um espaço de nome diferente — podes querer usar um nome mais curto para um módulo que referes-te muito, ou podes estar a carregar vários módulos com o mesmo nome de ficheiro. Tu podes fazer isto escrevendo `@use "<url>" as <namespace>`:

{% codeExample 'namespace' %}
  // src/_corners.scss
  $radius: 3px;

  @mixin rounded {
    border-radius: $radius;
  }
  ---
  // style.scss
  @use "src/corners" as c;

  .button {
    @include c.rounded;
    padding: 5px + c.$radius;
  }
  ===
  // src/_corners.sass
  $radius: 3px

  @mixin rounded
    border-radius: $radius
  ---
  // style.sass
  @use "src/corners" as c

  .button
    @include c.rounded
    padding: 5px + c.$radius
  ===
  .button {
    border-radius: 3px;
    padding: 8px;
  }
{% endcodeExample %}

Tu podes mesmo carregar um módulo *sem* um espaço de nome escrevendo `@use "<url>" as *`. Mesmo assim nós recomendamos-te apenas fazer isto para folhas de estilo escritas por ti; de outro modo, podem introduzir novos membros que causam conflitos de nome!

{% codeExample 'use-url' %}
  // src/_corners.scss
  $radius: 3px;

  @mixin rounded {
    border-radius: $radius;
  }
  ---
  // style.scss
  @use "src/corners" as *;

  .button {
    @include rounded;
    padding: 5px + $radius;
  }
  ===
  // src/_corners.sass
  $radius: 3px

  @mixin rounded
    border-radius: $radius
  ---
  // style.sass
  @use "src/corners" as *

  .button
    @include rounded
    padding: 5px + $radius
  ===
  .button {
    border-radius: 3px;
    padding: 8px;
  }
{% endcodeExample %}

### Membros Privados {#private-members}

Como um autor de folha de estilo, podes não querer todos os membros que defines para estarem disponíveis fora da tua folha de estilo. A Sass torna fácil definir um membro privado começando o seu nome com ou `-` ou `_`. Estes membros funcionarão tal como o normal dentro da folha de estilo que as define, mas serão parte duma API pública do módulo. Isto significa que as folhas de estilo que carregam o teu módulo não podem vê-las!

{% funFact %}
  Se quiseres tornar um membro privado para um *pacote* inteiro em vez de apenas um único módulo, é só não [expedir o seu módulo][forward its module] a partir de quaisquer pontos de entrada do pacote (as folhas de estilo que dizes aos teus utilizadores carregarem para usarem o teu pacote). Tu podes mesmo [esconder este membro][hide that member] enquanto expedis o resto do seu módulo!

  [forward its module]: /documentation/at-rules/forward
  [hide that member]: /documentation/at-rules/forward#controlling-visibility
{% endfunFact %}

{% codeExample 'private-members', false %}
  // src/_corners.scss
  $-radius: 3px;

  @mixin rounded {
    border-radius: $-radius;
  }
  ---
  // style.scss
  @use "src/corners";

  .button {
    @include corners.rounded;

    // Isto é um erro! `$-radius` não é visível fora de `_corners.scss`.
    padding: 5px + corners.$-radius;
  }
  ===
  // src/_corners.sass
  $-radius: 3px

  @mixin rounded
    border-radius: $-radius
  ---
  // style.sass
  @use "src/corners"

  .button
    @include corners.rounded

    // Isto é um erro! `$-radius` não é visível fora de `_corners.sass`.
    padding: 5px + corners.$-radius
{% endcodeExample %}

## Configuração {#configuration}

Um folha estilo pode definir variáveis com a [opção `!default`][`!default` flag] para torná-las configuráveis. Para carregar um módulo com configuração, escreve `@use <url> with (<variable>: <value>, <variable>: <value>)`. Os valores configurados sobreporão os valores padrão das variáveis:

[`!default` flag]: /documentation/variables#default-values

{% render 'code_snippets/example-use-with' %}

### Com as Misturas {#with-mixins}

Configurar módulos com `@use ... with` pode ser muito útil, especialmente quando usas bibliotecas que foram originalmente escritas para trabalharem com a [regra `@import`][`@import` rule]. Mas não é particularmente flexível, e não o recomendamos para casos de uso mais avançados. Se encontrares-te a ti mesmo querendo configurar muitas variáveis de uma vez, passe os [mapas][maps] como configuração, ou atualize a configuração depois do módulo for carregado, considere escrever uma mistura que configure as tuas variáveis e uma outra mistura que injete os teus estilos:

[`@import` rule]: /documentation/at-rules/import
[maps]: /documentation/values/maps

{% codeExample 'with-mixins' %}
  // _library.scss
  $-black: #000;
  $-border-radius: 0.25rem;
  $-box-shadow: null;

  /// Se o utilizador configurou `$-box-shadow`, retorna o seu valor configurado.
  /// De outro modo retorna um valor derivado de `$-black`.
  @function -box-shadow() {
    @return $-box-shadow or (0 0.5rem 1rem rgba($-black, 0.15));
  }

  @mixin configure($black: null, $border-radius: null, $box-shadow: null) {
    @if $black {
      $-black: $black !global;
    }
    @if $border-radius {
      $-border-radius: $border-radius !global;
    }
    @if $box-shadow {
      $-box-shadow: $box-shadow !global;
    }
  }

  @mixin styles {
    code {
      border-radius: $-border-radius;
      box-shadow: -box-shadow();
    }
  }
  ---
  // style.scss
  @use 'library';

  @include library.configure(
    $black: #222,
    $border-radius: 0.1rem
  );

  @include library.styles;
  ===
  // _library.sass
  $-black: #000
  $-border-radius: 0.25rem
  $-box-shadow: null

  /// Se o utilizador configurou `$-box-shadow`, retorna o seu valor configurado.
  /// De outro modo retorna um valor derivado de `$-black`.
  @function -box-shadow()
    @return $-box-shadow or (0 0.5rem 1rem rgba($-black, 0.15))


  @mixin configure($black: null, $border-radius: null, $box-shadow: null)
    @if $black
      $-black: $black !global
    @if $border-radius
      $-border-radius: $border-radius !global
    @if $box-shadow
      $-box-shadow: $box-shadow !global


  @mixin styles
    code
      border-radius: $-border-radius
      box-shadow: -box-shadow()
  ---
  // style.sass
  @use 'library'
  @include library.configure($black: #222, $border-radius: 0.1rem)
  @include library.styles
  ===
  code {
    border-radius: 0.1rem;
    box-shadow: 0 0.5rem 1rem rgba(34, 34, 34, 0.15);
  }
{% endcodeExample %}

### Reatribuindo Variáveis {#reassigning-variables}

Depois de carregar um módulo, podes reatribuir as suas variáveis:

{% codeExample 'reassigning-variables', false %}
  // _library.scss
  $color: red;
  ---
  // _override.scss
  @use 'library';
  library.$color: blue;
  ---
  // style.scss
  @use 'library';
  @use 'override';
  @debug library.$color;  //=> blue
  ===
  // _library.sass
  $color: red
  ---
  // _override.sass
  @use 'library'
  library.$color: blue
  ---
  // style.sass
  @use 'library'
  @use 'override'
  @debug library.$color  //=> blue
{% endcodeExample %}

Isto funciona mesmo se importares um módulo sem um espaço de nome usando `as *`. Atribuir para um nome de variável definido neste módulo sobrescreverá o seu valor neste módulo.

{% headsUp %}
  As variáveis de módulo embutido (tais como [`math.$pi`]) não podem ser reatríbuidas.

  [`math.$pi`]: /documentation/modules/math#$pi
{% endheadsUp %}

## Encontrando o Módulo {#finding-the-module}

Não seria divertido de maneira alguma escrever URLs absolutas para cada folha de estilo que carregas, então o algoritmo da Sass para encontrar um módulo torná-o um pouco mais fácil. Para começar, não tens de explicitamente escrever a extensão do ficheiro que quiseres carregar; `@use "variables"` carregará automaticamente `variables.scss`, `variables.sass`, ou `@variables.css`.

{% headsUp %}
  Para garantir que as folhas de estilo funcionem em todos os sistemas operativos, a Sass carrega os ficheiros pela *URL*, e não pelo *caminho do ficheiro*. Isto significa que precisas de usar barras inclinadas para a direita, e não barras inclinadas para esquerdas, mesmo no Windows.
{% endheadsUp %}

### Caminhos de Carregamento {#load-paths}

Todas as implementações de Sass permitem os utilizadores fornecerem *caminhos de carregamento*: os caminhos no sistema de ficheiro que a Sass espreitará ao localizar os módulos. Por exemplo, se passas `node_modules/susy/sass` como um caminho de carregamento, podes usar `@use "susy"` para carregar `node_modules/susy/sass/susy.scss`.

Mesmo assim, os módulos sempre serão carregados primeiro relativo ao ficheiro atual. Os caminhos de carregamento apenas são usados se nenhum ficheiro relativo existir que corresponde a URL do módulo. Isto garante que não possas acidentalmente fazer asneira com as tuas importações relativas quando adicionares uma nova biblioteca.

{% funFact %}
  Ao contrário de outras linguagens, a Sass não exige que uses `./` para importações relativas. As importações relativas estão sempre disponíveis.
{% endfunFact %}

### Parciais {#partials}

Como uma convenção, os ficheiros de Sass que estão apenas destinados a serem carregados como módulos, e não compilados por si mesmos, começam com `_` (como em `_code.scss`). Estes são chamados de *parciais*, e dizem as ferramentas da Sass para não tentarem compilar estes ficheiros por si mesmos. Tu podes deixar de usar o `_` quando importares um parcial.

### Ficheiros de índice {#index-files}

Se escrever um `_index.scss` ou `_index.sass` numa pasta, o ficheiro de índice será carregado automaticamente quando carregares a URL para a própria pasta:

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
  @use 'code';
  @use 'lists';
  ---
  // style.scss
  @use 'foundation';
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
  @use 'code'
  @use 'lists'
  ---
  // style.sass
  @use 'foundation'
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

## Carregando CSS {#loading-css}

Além de carregar ficheiros `.sass` e `.scss`, a Sass pode carregar antigos e simples ficheiros `.css`:

{% codeExample 'loading-css' %}
  // code.css
  code {
    padding: .25em;
    line-height: 0;
  }
  ---
  // style.scss
  @use 'code';
  ===
  // code.css
  code {
    padding: .25em;
    line-height: 0;
  }
  ---
  // style.sass
  @use 'code'
  ===
  code {
    padding: .25em;
    line-height: 0;
  }
{% endcodeExample %}

Os ficheiros de CSS carregados como módulos não permitem quaisquer funcionalidades de Sass especiais e então não podem expor quaisquer variáveis, funções, ou misturas de Sass. No sentido de certificar-se que os autores não escrevam acidentalmente Sass nos seus CSS, todas as funcionalidades de Sass que também não forem CSS válidas produzirão erros. De outro modo, a CSS será desenhada como está. Ela pode até mesmo ser [estendida][extended]!

[extended]: /documentation/at-rules/extend

## Diferenças da `@import` {#differences-from-import}

A regra `@use` está destinada a substituir a antiga [regra `@import`][`@import` rule], mas está intencionalmente desenhada para funcionar de maneira diferente. Cá estão algumas das diferenças principais entre as duas:

* `@use` apenas torna variáveis, funções, e misturas disponíveis dentro do âmbito do atual ficheiro. Ela nunca adiciona-os ao âmbito de aplicação global. Isto torna fácil compreender de onde cada nome das referências do teu ficheiro de Sass vêm, e significa que podes usar nomes mais curtos sem qualquer risco de colisão.

* `@use` só nunca carrega cada ficheiro de uma vez. Isto garante que não termines acidentalmente duplicando a CSS das tuas dependências muitas vezes até ao fim.

* `@use` deve aparecer no início do teu ficheiro, e não pode ser encaixado nas regras de estilo.

* Cada regra `@use` pode apenas ter uma URL.

* `@use` exige aspas em torno da sua URL, mesmo quando usas a [sintaxe indentada][indented syntax].

[`@import` rule]: /documentation/at-rules/import
[indented syntax]: /documentation/syntax#the-indented-syntax
