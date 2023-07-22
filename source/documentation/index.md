---
title: Documentação
introduction: >
  A Sass é uma linguagem de folha de estilo que é compilada para CSS. Ela permite-te usar [variáveis](/documentation/variables), [regras encaixadas](/documentation/style-rules#nesting), [misturas](/documentation/at-rules/mixin), [funções](/documentation/modules), e muito mais, tudo com uma sintaxe completamente compatível com a CSS. A Sass ajuda a manter grandes folhas de estilos bem organizadas e torna fácil partilhar o desenho dentro e através dos projetos.
---

- Se estiveres a procura de uma introdução à Sass, consulte [o passo-a-passo](/guide).

- Se quiseres consultar uma função embutida de Sass, não olhe nada além da [referência de módulo embutido](/documentation/modules).

- Se estiveres a chamar a Sass a partir da JavaScript, talvez queiras a [documentação da API de JavaScript][js].

- Ou a [documentação da API de Dart][dart] se estiveres a chamá-la a partir da Dart.

- De outro modo, use o índice da referência da linguagem!

[js]: https://github.com/sass/node-sass#usage
[dart]: https://pub.dartlang.org/documentation/sass/latest/sass/sass-library.html

## Versões Mais Antigas {#older-versions}

Esta documentação é escrita para a versão mais recente da linguagem de Sass. Se estiveres a usar a [Sass de Dart][Dart Sass] {{ releases['dart-sass'].version }}, terás acesso a todas funcionalidades descritas aqui. Mas se estiveres a usar uma versão mais antiga da Sass de Dart ou uma implementação de Sass depreciada como [LibSass] ou [Sass de Ruby][Ruby Sass], talvez exista algumas diferenças de comportamento.

[Dart Sass]: /dart-sass
[LibSass]: /libsass
[Ruby Sass]: /ruby-sass

Em qualquer parte que o comportamento diferir entre as versões ou implementações, a documentação inclui um indicador de compatibilidade como este:

{% compatibility 'dart: true', 'libsass: "3.6.0"', 'ruby: false', 'feature: "Nome da Funcionalidade"' %}{% endcompatibility %}

As implementações com um "✓" suporta completamente a funcionalidade em questão, e as implementações com um "✗" não a suporta de todo. As implementações com um número de versão começou a suportar a funcionalidade em questão naquela versão. As implementações também pode ser marcada como "parcial":

{% compatibility 'dart: true', 'libsass: "partial"', 'ruby: false' %}
  Os detalhes adicionais estarão neste bloco.
{% endcompatibility %}

Isto indica que a implementação apenas suporta alguns aspetos da funcionalidade. Estes indicadores de compatibilidade (e vários outros) têm um botão "▶", que pode ser clicado para mostrar mais detalhes sobre exatamente como as implementações diferem e quais versões suportam quais aspetos da funcionalidade em questão.
