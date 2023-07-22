---
layout: has_no_sidebars
title: Instalar a Sass
no_container: true
---

<div class="sl-l-grid sl-l-grid--full sl-l-large-grid--fit sl-l-large-grid--gutters-large">
<div class="sl-l-grid__column">

## Aplicações {#applications}

![Mouse](illustrations/mouse.svg)

Existem muitas boas aplicações que ajudar-te-ão a executar e trabalhar com a Sass em alguns minutos para Mac, Windows e Linux. Tu podes descarregar a maioria das aplicações gratuitamente e algumas delas tens que pagar por elas <small>(mas valem a pena)</small>.

- [CodeKit](https://codekitapp.com/) (Paga) Mac
- [Prepros](https://prepros.io/) (Paga) Mac Windows Linux


## Bibliotecas {#libraries}

A equipa da Sass mantêm dois pacotes de Node.js para Sass, ambos dos quais suportam a [API de JavaScript padrão][the standard JavaScript API]. O [pacote `sass`][`sass` package] é JavaScript puro, o qual é um pouco mais lento mas pode ser instalado em todas as plataformas que suportam a Node.js. O [pacote `sass-embedded`][`sass-embedded` package] envolve a API de JavaScript em torno da Máquina Virtual da Dart, assim é mais rápido mas apenas suporta Windows, Mac Os e Linux.

[the standard JavaScript API]: /documentation/js-api
[`sass` package]: https://www.npmjs.com/package/sass
[`sass-embedded` package]: https://www.npmjs.com/package/sass-embedded

Também existem invólucros mantidos pela comunidade para as seguinte linguagens:

- [Ruby](https://github.com/ntkme/sass-embedded-host-ruby#readme)
- [Swift](https://github.com/johnfairh/swift-sass#readme)
- [Java](https://mvnrepository.com/artifact/de.larsgrefer.sass), incluindo:
  - Um [extensão de Gradle](https://docs.freefair.io/gradle-plugins/current/reference/#_embedded_sass).
  - Uma leve [extensão de Maven envolvendo a interface da linha de comando da Sass](https://github.com/HebiRobotics/sass-cli-maven-plugin). Ela especifica a versão da Sass à usar. Os argumentos da interface da linha de comando são passados com uma lista de `<args>`.
  - Uma [extensão de baterias inclusas de Maven envolvendo a Sass de Dart](https://github.com/cleydyr/dart-sass-maven-plugin). Ela empacota um versão de `dart-sass` fixa. Os argumentos da interface da linha de comando são expostos como parâmetros de Maven.

</div>
<div class="sl-l-grid__column">

## Linha de Comando {#command-line}

![Keyboard](illustrations/keyboard.svg)

Quando instalares o Sass na linha de comando, serás capaz de executar o executável `sass` para compilar os ficheiros `.sass` e `.scss` para ficheiros `.css`. Por exemplo:

```shellsession
sass source/stylesheets/index.scss build/stylesheets/index.css
```

Primeiro instale o Sass usando uma das opções abaixo, depois execute `sass --version` para teres a certeza de que foi instalada corretamente. Se feita, isto incluirá `#{impl_version(:dart)}`. Tu também podes executar `sass --help` para mais informações sobre a interface da linha de comando.


Uma vez que tudo estiver configurado, <strong>vai e experimente</strong>. Se fores novato para a Sass definimos alguns recursos para ajudar-te aprender muito rapidamente.

[Saiba Mais Sobre a Sass](/guide){.sl-c-button .sl-c-button--primary}

Instalar em Qualquer Lugar (Autónomo)

: Tu podes instalar o Sass no Windows, Mac, ou Linux descarregando o pacote para o teu sistema operacional [a partir da GitHub](https://github.com/sass/dart-sass/releases/tag/1.57.1) e [adicionando-o ao teu `PATH`](https://katiek2.github.io/path-doc/). É tudo — não existem dependências externas e não precisas de instalar nada mais.

Instalar em Qualquer Lugar (npm)

: Se usas a Node.js, também podes instalar o Sass usando o [npm](https://www.npmjs.com/) executando:

```shellsession
npm install -g sass
```

**No entanto, nota** que isto instalará a implementação de JavaScript pura de Sass, o qual executa um tanto mais lento do que as opções listadas aqui. Mas tem a mesma interface, então será fácil trocar por uma outra implementação mais tarde se precisares de um pouco mais de velocidade!

Instalar no Windows (Chocolatey)

: Se usas o [o gestor de pacote Chocolatey](https://chocolatey.org/) para Windows, podes instalar a implementação de Dart de Sass executando:

```shellsession
choco install sass
```

Instalar no Mac OS X ou Linux (Homebrew)

: Se usas o [gestor de pacote Homebrew](https://brew.sh/) para Mac Os X ou Linux, podes instalar a implementação de Dart de Sass executando:

```shellsession
brew install sass/sass/sass
```

  </div>
</div>
