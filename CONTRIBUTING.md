Contribuindo para a Documentação da Sass em Português
================================

A documentação da Sass em Português é de código-aberto. Vês um erro de programação ou digitação? Tens uma ideia? Faça o seguinte:

* **Faça a gentileza de ler o [Guia de Implementação][ig] e o [Guia de Estilo][sg]** antes de contribuir.
* Escreva uma descrição detalhada de que estás a adicionar no pedido de atualização do repositório (capturas de ecrã ajudam).
* Se houver um novo desenho ou CSS, adicione a @nazarepiedady como um revisor assim ele pode ver se precisa ser adicionado ao guia de estilo (ou se uma alternativa adequada existe).
* Submeta o pedido de atualização de repositório ao ramo `main`.
* Beba sumo.

## Executando Localmente

Este documentação é construída com a [Middleman][middleman], uma abstração de Ruby para construídas de locais estáticos.

Tu precisarás de ter a [Ruby][], [rubygems](http://rubygems.org/) e [bundler][] instaladas antes de poderes executar a documentação localmente.

Se as dependências acima estiverem instaladas, na tua linha de comando de preferência, navegue até o repositório do projeto e execute:

```
bundle install
bundle exec rake sass:import
bundle exec middleman
```

## Servindo em Produção

Toda vez que uma nova consolidação for empurrada para o ramo principal, esta será servida automaticamente em produção para sass-docs-pt.netlify.app. Fácil quanto isto!

Obrigado!

&mdash; Equipa Principal da Sass e [@nazarepiedady](@nazarepiedady)

[ig]:        https://sass-lang.com/implementation
[sg]:        https://sass-lang.com/styleguide
[middleman]: https://middlemanapp.com
[ruby]:      https://www.ruby-lang.org/en/downloads/
[bundler]:   https://bundler.io/
