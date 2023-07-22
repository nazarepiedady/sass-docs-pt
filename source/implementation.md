---
layout: has_no_sidebars
title: Guia de Implementação
introduction: >
  A Sass tem uma comunidade próspera de implementações, com mais sendo produzido a todo momento. A equipa principal ama ver novas implementações a desenvolverem-se e amadurecer, querem ajudar de qualquer maneira que puderem.
---

<ul class="list-tiled">
<li>

<h2 id="resources">Recursos</h2>

* [`sass-spec`](https://github.com/sass/sass-spec) é um grupo de casos de teste agnóstico de implementação para verificar se uma implementação de Sass comporta-se de maneira correta. É a melhor maneira de rastrear a compatibilidade da tua implementação com a implementação de referência de Sass.

* [Como `@extend` Funciona](https://gist.github.com/nex3/7609394) é um resumo razoavelmente compreensivo do algoritmo usado pela mais traiçoeira funcionalidade da Sass. Natalie continua a dizer que a implementação de `@extend` é o código mais difícil que ela alguma vez teve de escrever, mas felizmente não tens de compreendê-lo desde o zero.

* **Chegue mais perto!** Se estiveres a trabalhar numa nova implementação, queremos ouvir a respeito dela. Envie um correio-eletrónico para [Natalie](mailto:nex342@gmail.com) e [Chris](mailto:chris@eppsteins.net), conte-nos sobre o fantástico trabalho estás a fazer, e pergunte sobre quaisquer cantos da linguagem que não faz muito sentido.

</li>
<li>

<h2 id="requirements">Requisitos</h2>

Nós amamos de todo o coração novas implementações de Sass, mas temos algumas restrições que pedimos que estas implementações sigam para chamarem-se "Sass", "implementações de Sass", ou parecido. A Sass é uma comunidade quanto é uma linguagem, e é importante que todas as implementações estejam dispostas a trabalhar pelo bem da comunidade.

Primeiro, pedimos que toda implementação adote as [diretrizes de comunidade da Sass](/community-guidelines) para suas próprias comunidades específica da implementação. Muito do que faz a comunidade de Sass forte é uma cultura de simpatia e respeito, e ter diretrizes claras e explícitas ajuda a produzir esta cultura.

Segundo, pedimos que as implementações não estendam a linguagem sem o assentimento de outras implementações principais e dos desenhistas da linguagem, Natalie e Chris. A única razão de uma comunidade de Sass existir é porque a linguagem possibilitam os estilos e abstrações serem partilhados entre os desenhistas, e é crucial para o ato de partilhar que o código de Sass que funciona para uma implementação funcione da mesma maneira para todas as implementações. Além disto, é importante que exista uma visão unificada para o desenho da linguagem.

</li>
<li>

<h2 id="making-language-changes">Fazendo Mudanças de Linguagem</h2>

A Sass pode continuar a evoluir como uma linguagem, claro. Nós temos [um processo][a process] para propor e iterar em novas funcionalidades da linguagem que qualquer um pode participar. As mudanças da linguagem são discutidas de maneira colaborativa, com peso particular dado aos responsáveis das implementações de Sass maduras. Tentativas serão feitas para chegar ao consenso com todos os interessados. No entanto, isto pode ser impossível em algumas circunstâncias, o derradeiro voto na matéria pertence a desenhista líder da Sass, Natalie.

[a process]: https://github.com/sass/sass/blob/main/CONTRIBUTING.md
