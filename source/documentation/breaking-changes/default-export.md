---
title: "Mudança de Rutura: Exportações Padrão"
introduction: |
  Por padrão, a Node.js permite [Módulos de CommonJS][CommonJS modules] serem carregados a partir de módulos de ECMAScript usando a sintaxe `import sass from 'sass'`. Isto está agora depreciado; Os utilizadores de [Módulos de ECMAScript][ECMAScript modules] devem usar `import * as sass from 'sass'`.

  [CommonJS modules]: https://nodejs.org/docs/latest/api/modules.html#modules-commonjs-modules
  [ECMAScript modules]: https://nodejs.org/api/esm.html#modules-ecmascript-modules
---

Historicamente, a Sass de Dart apenas estava disponível como um módulo de CommonJS. Isto significava que qualquer um usando-a a partir dum projeto que usava o suporte de módulo de ECMAScript nativo da Node.js era capaz de carregá-lo como se fornecesse uma [exportação padrão][default export]:

[default export]: https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export#using_the_default_export

```js
import sass from 'sass'; // Não fazer mais isto
```

Isto nunca foi pretendido pela equipa da Sass, e não correspondia as declarações de tipo fornecidas com o pacote, mas _funcionava_. Nós decidimos remover este suporte na Sass de Dart 2.0.0 e exige que os utilizadores de módulo de ECMAScript apenas usem as exportações nomeadas do pacote:

```js
import * as sass from 'sass'; // Fazer isto
```

## Período de Transição {#transition-period}

{% compatibility 'dart: "1.54.0"', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

Até a Sass de Dart 2.0.0, continuaremos a suportar que os utilizadores carreguem a exportação padrão da Sass. A primeira vez que quaisquer propriedades na exportação padrão forem acessadas, emitirão um aviso de depreciação ao `console.error()`. Para evitar este erro, use `import * as sass from 'sass'`.
