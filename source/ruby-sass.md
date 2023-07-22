---
layout: has_no_sidebars
title: Sass de Ruby
introduction: >
  A Sass de Ruby foi a implementação original da Sass, mas alcançou seu fim de vida desde 26 Março de 2019. Já não é suportada, e os utilizadores da Sass de Ruby deveriam migrar para uma outra implementação.
---

- <h2 id="but-why">Mas Porquê?</h2>
      
  Quando a Natalie e Hampton criaram a Sass primeiro em 2006, a Ruby foi a linguagem na vanguarda do desenvolvimento da web, as bases do sua já bem-sucedida linguagem de modelagem de conteúdo de hipertexto [Haml][], e a linguagem mais usada no seu dia-a-dia de trabalho. Escrever a Sass em Ruby a tornou prontamente disponível aos seus utilizadores existentes e o próspero ecossistema de Ruby inteiro.

  [Haml]: http://haml.info/

  Desde então, a Node.js tornou-se omnipresente para o ferramental de frontend enquanto a Ruby desbotou no último plano. Ao mesmo tempo, os projetos de Sass cresceram muito do que inicialmente prevemos, e as necessidades de desempenho ultrapassou a velocidade que a Ruby pode fornecer. Ambas [Sass de Dart][Dart Sass] e [LibSass][] são extremamente rápidas, fáceis de instalar, e estão prontamente disponíveis na npm. A Sass de Ruby não conseguiu acompanhar, e já não fazia mais sentido gastar os recursos da equipa principal sobre ela.

  [Dart Sass]: /dart-sass
  [LibSass]: /libsass

- <h2 id="migrating-away">Migrando para Fora</h2>

  Se executares a Sass de Ruby usando o executável `sass` da linha de comando, tudo o que precisas de fazer é instalar o [executável de linha de comando][install] da Sass de Dart. A interface não é idêntica, mas a maioria das opções funcionam da mesma maneira.

  [install]: /install

  Se usares a gema de `sass` como uma biblioteca, a gema [`sassc`][] é a maneira mais perfeita de afastar-se da Sass de Ruby. Ela a [LibSass][] para fornecer a mesma API para compilar a Sass e definir funções personalizadas como Sass de Ruby, exceto que usa o módulo `SassC` no lugar da `Sass`. No entanto, este [ainda não suporta][sassc#72] a mesma API de `Importer`. Tu podes também usar a gema [`sassc-rails`][] para ligar tranquilamente à Ruby on Rails.

  [`sassc`]: https://rubygems.org/gems/sassc
  [LibSass]: /libsass
  [sassc#72]: https://github.com/sass/sassc-ruby/issues/72
  [`sassc-rails`]: https://rubygems.org/gems/sassc-rails

  Alternativamente, se estás a usar uma sistema de construção de JavaScript, podes integrar esta com a [Sass de Dart][Dart Sass] como uma biblioteca de JavaScript.

  [Dart Sass]: /dart-sass
