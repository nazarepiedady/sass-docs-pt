---
layout: has_both_sidebars
title: LibSass
introduction: >
  A LibSass é uma implementação de Sass em C/C++, desenhada para ser fácil de integrar em muitas diferentes linguagens. No entanto, a medida que o tempo passava lentamente terminou moroso atrás da [Sass de Dart](dart-sass) em funcionalidades e compatibilidade de CSS. A **LibSass está agora depreciada** — os novos projetos devem usar a Sass de Dart.
navigation:  |
  <h2>Invólucros</h2>

  <nav class="sl-c-list-navigation-wrapper">

  - [SassC](#sassc)
  - [Crystal](#crystal)
  - [Go](#go)
  - [Java](#java)
  - [JavaScript](#javascript)
  - [Lua](#lua)
  - [.NET](#net)
  - [Node](#node)
  - [Perl](#perl)
  - [PHP](#php)
  - [Python](#python)
  - [Ruby](#ruby)
  - [R](#r)
  - [Rust](#rust)
  - [Scala](#scala)

  </nav>
complementary_content: |
  <h2>Recursos</h2>

  - [Compilação de Sass rápida como relâmpago com a libsass, Node-sass e Grunt-sass](https://benfrain.com/lightning-fast-sass-compiling-with-libsass-node-sass-and-grunt-sass/)
    --- por Ben Frain, August 2013
---


## Invólucros {#wrappers}

A LibSass é apenas uma biblioteca. Para executares o código localmente (por exemplo, para compilares os teus folhas de estilos), precisas de um implementador, ou "invólucro". Existem um número de outros invólucros para LibSass. Nós encorajamos-te a escrever o teu próprio invólucros --- o objetivo da LibSass é precisamente que queremos levar a Sass para outras linguagens, não apenas Ruby!

Abaixo estão invólucros de LibSass que estamos atualmente consciente. Algumas vezes existem vários invólucros por linguagem – nestes casos, colocamos primeiro o mais recentemente atualizado invólucro.

- <h3 id="sassc">Sass C</h3>

  [SassC](https://github.com/sass/sassc) (percebeste?) é um invólucro escrito em C.

  Para executares o compilador na tua máquina local, precisas de construir a SassC. Para construíres a SassC, deves ter ou uma cópia local da fonte da LibSass ou deve estar instalada no teu sistema. Para desenvolvimento, use a versão da fonte. Tu deves então configurar uma variável de ambiente apontando para a pasta da LibSass, por exemplo:

  ```shellsession
  export SASS_LIBSASS_PATH=/Users/hampton/path/libsass
  ```

  
  O executável estará na pasta `bin/`. Para o executares, tente algo como:

  ```shellsession
  ./bin/sassc [input file] > output.css
  ```

- <h3 id="crystal">Crystal</h3>

  [sass.cr](https://github.com/straight-shoota/sass.cr) é um invólucro de LibSass para a [linguagem de programação Crystal](https://crystal-lang.org/).

- <h3 id="go">Go</h3>

  [go-libsass](https://github.com/wellington/go-libsass) tem o mais ativo invólucro de GoLang. [gosass](https://github.com/moovweb/gosass) é um outro invólucro de LibSass.

  [C6](https://github.com/c9s/c6) é uma implementação compatível Sass 3.2 escrito na GoLang pura que tem por objetivo estender a Sass.
  [wellington/sass](https://github.com/wellington/sass) é um léxico, analisador, e compilador de Sass de Go puro em progresso.

- <h3 id="java">Java</h3>

  Existe um invólucro de Java --- [jsass](https://github.com/bit3/jsass).
  Existe também um extensão para Maven --- [extensão de Maven de LibSass](https://gitlab.com/haynes/libsass-maven-plugin).

- <h3 id="javascript">JavaScript</h3>

  O projeto [sass.js](https://github.com/medialize/sass.js) torna a LibSass disponível como JavaScript puro. Existe também uma maneira de [testá-lo no navegador](http://medialize.github.io/playground.sass.js/).

- <h3 id="lua">Lua</h3>

  O invólucro de Lua é encontrado na [lua-sass](https://github.com/craigbarnes/lua-sass).

- <h3 id="net">.NET</h3>

  [LibSass Host](https://github.com/Taritsyn/LibSassHost) é regularmente atualizado, e é provavelmente a melhor aposta. Existe também [libsass-net](https://github.com/darrenkopp/libsass-net) ou [NSass](https://github.com/TBAPI-0KA/NSass), embora não tem sido atualizado por algum tempo.

- <h3 id="node">Node</h3>

  O projeto [node-sass](https://github.com/sass/node-sass) provou-se ser popular, e levamos-o para o principal repositório da GitHub da Sass. Consulte a página do seu pacote [nesta ligação](https://www.npmjs.org/package/node-sass), e [existe uma conta de twitter dedicado](https://twitter.com/nodesass) por atualizações.

- <h3 id="perl">Perl</h3>

  O projeto [CSS::Sass](https://github.com/sass/perl-libsass) é atualizado regularmente. Existe o projeto [Text-Sass-XS](https://github.com/ysasaki/Text-Sass-XS), também, embora não tenha sido atualizado por algum tempo.

- <h3 id="php">PHP</h3>

  O projeto [SassPHP](https://github.com/absalomedia/sassphp) é uma bifurcação atualizada duma [versão de PHP mais antigo](https://github.com/jamierumbelow/sassphp).

- <h3 id="python">Python</h3>

  O projeto [libsass-python](https://github.com/sass/libsass-python) é atualizado regularmente. Existem muitos detalhes na [sua própria página](https://sass.github.io/libsass-python/).

  Outros três projetos de Python, [python-scss](https://github.com/pistolero/python-scss), [pylibsass](https://github.com/rsenk330/pylibsass) e [SassPython](https://github.com/marianoguerra/SassPython), não tem sido atualizados por algum tempo.


- <h3 id="ruby">Ruby</h3>

  A LibSass também tem sido transportada de volta para a Ruby para o projeto [sassc-ruby](https://github.com/sass/sassc-ruby).

- <h3 id="r">R</h3>

  O [pacote de Sass](https://github.com/rstudio/sass) de [R](https://www.r-project.org/) envolve a LibSass com métodos de empacotamento e armazenamento de consulta imediata adicionais. [Documentação estendida](https://rstudio.github.io/sass/).

- <h3 id="rust">Rust</h3>

  A caixa [`sass_rs`](https://github.com/compass-rs/sass-rs) é um invólucro de LibSass e é atualizado regularmente.

- <h3 id="scala">Scala</h3>

  O único projeto de Scala, [Sass-Scala](https://github.com/kkung/Sass-Scala), não tem sido atualizado por alguns anos.

## Sobre a LibSass {#about-libsass}

Este projeto é a criação de [Hampton Catlin](http://twitter.com/hcatlin), o criador original de Sass. [Aaron Leung](http://github.com/akhleung) é o programador primário.

<figure>
  <img alt="Logótipo da LibSass" width="640" height="320" src="/assets/img/logos/libsass.png">
</figure>
