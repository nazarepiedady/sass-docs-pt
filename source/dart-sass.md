---
layout: has_no_sidebars
title: Sass de Dart
no_container: true
introduction: >
  A Sass de Dart é a implementação primária da Sass, o que significa que recebe as novas funcionalidades antes de qualquer outra implementação. É rápida, fácil de instalar, e compila para JavaScript puro que a torna fácil de integrar em fluxos de trabalhos de desenvolvimento da web moderna. Descubra mais ou ajude com seu desenvolvimento na [GitHub](https://github.com/sass/dart-sass).
---

<div class="sl-l-grid sl-l-grid--full sl-l-large-grid--fit sl-l-large-grid--gutters-large">
  <div class="sl-l-grid__column">

## Linha de Comando {#command-line}

O executável da linha de comando independente da Sass de Dart usa a extremamente rápida máquina virtual da Dart para compilar as tuas folhas de estilos. Para instalares a Sass de Dart na linha de comando, consulte as [instruções de instalação](/install). Assim que a tiveres executando, podes usá-la para compilar os ficheiros:

```shellsession
sass source/index.scss css/index.css
```

Consulte `sass --help` por informação adicional sobre a interface da linha de comando.

## Biblioteca de Dart {#dart-library}

Tu podes também usar a Sass de Dart como uma biblioteca de Dart para teres a velocidade da máquina virtual da Dart mais a habilidade de definir as tuas próprias funções e importadores. Para adicioná-la à um projeto existente:

1. [Instale a SDK de Dart][install]. Certifica-te de que o seu diretório `bin` está [no teu `PATH`][path].

  [install]: https://www.dartlang.org/install#automated-installation-and-updates
  [path]:    https://katiek2.github.io/path-doc/

2. Crie um ficheiro `pubspec.yaml` como este:

```yaml
name: my_project
dev_dependencies:
  sass: ^#{impl_version(:dart)}
```

3. Execute `dart pub get`.

4. Crie um ficheiro `compile-sass.dart` como este:

```dart
import 'dart:io';
import 'package:sass/sass.dart' as sass;

void main(List<String> arguments) {
  var result = sass.compileToResult(arguments[0]);
  new File(arguments[1]).writeAsStringSync(result.css);
}
```

5. Tu podes agora usar este para compilar ficheiros:

```shellsession
dart compile-sass.dart styles.scss styles.css
```

6. Saiba mais sobre a [escrita de código de Dart][dart] (é fácil!) e sobre a [API de Dart da Sass][sass].

  [dart]: https://www.dartlang.org/guides/language/language-tour
  [sass]: https://pub.dev/documentation/sass/latest/sass/compileToResult.html

</div>
<div class="sl-l-grid__column">

## Biblioteca de JavaScript {#javascript-library}

A Sass de Dart também é distribuída como [pacote de `sass`](https://npmjs.com/package/sass) de JavaScript pura na npm. A versão de JavaScript pura é mais lenta do que o executável independente, mas é fácil de integrar nos fluxos de trabalho existentes e permite-te definir funções e importadores personalizados na JavaScript. Tu podes adicioná-la ao teu projeto usando `npm install --save-dev sass` e importá-la como uma biblioteca:

```js
const sass = require('sass');

const result = sass.compile("style.scss");
console.log(result.css);

// OU

const result = await sass.compileAsync("style.scss");
console.log(result.css);
```

Quando instalada através de npm, a Sass de Dart suporta uma [API de JavaScript nova em folha][brand new JavaScript API], bem como uma [API legada][legacy API] que é completamente compatível com a antiga API de Sass de Node. Nota que quando usares o pacote `sass`, as funções de API síncronas são mais do que duas vezes mais rápidas do que API assíncrona, devido as despesas gerais das funções de respostas assíncronas.

[brand new JavaScript API]: https://sass-lang.com/documentation/js-api/
[legacy API]: https://sass-lang.com/documentation/js-api/#legacy-api

  </div>
</div>
