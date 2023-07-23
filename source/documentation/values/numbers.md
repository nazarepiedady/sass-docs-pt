---
title: Números
introduction: >
  Os números na Sass têm dois componentes: o próprio número, e a sua unidade. Por exemplo, em `16px` o número é `16` e a unidade é `px`. Os números podem não ter nenhuma unidade, e podem ter unidades complexas. Consulte as [Unidades](#units) abaixo para mais detalhes.
---

{% codeExample 'numbers', false %}
  @debug 100; // 100
  @debug 0.8; // 0.8
  @debug 16px; // 16px
  @debug 5px * 2px; // 10px*px (read "square pixels")
  ===
  @debug 100  // 100
  @debug 0.8  // 0.8
  @debug 16px  // 16px
  @debug 5px * 2px  // 10px*px (read "square pixels")
{% endcodeExample %}

Os números da Sass suportam os mesmos formatos que os números da CSS, incluindo a [notação científica][scientific notation], que é escrita com um `e` entre o número e a sua potência de 10. Uma vez que o suporte para notação científica nos navegadores tem sido historicamente irregular, a Sass sempre compila-o para números completamente expandidos:

[scientific notation]: https://en.wikipedia.org/wiki/Scientific_notation

{% codeExample 'scientific-notation', false %}
  @debug 5.2e3; // 5200
  @debug 6e-2; // 0.06
  ===
  @debug 5.2e3  // 5200
  @debug 6e-2  // 0.06
{% endcodeExample %}

{% headsUp %}
  A Sass não faz distinção entre números inteiros e números decimais, então por exemplo `math.div(5, 2)` retorna `2.5` ao invés de `2`. Isto é o mesmo comportamento da JavaScript, mas diferente de muitas outras linguagens de programação.
{% endheadsUp %}

{% render 'doc_snippets/number-units' %}

## Precisão {#precision}

{% compatibility 'dart: true', 'libsass: false', 'ruby: "3.5.0"', 'feature: "Padrão do Digito 10"' %}
  A LibSass e versões mais antigas da Sass de Ruby predefinem para 5 dígitos de precisão numérica, mas podem ser configuradas para usar um número diferente. É recomendado que os utilizadores as configurem para 10 dígitos para mais exatidão e compatibilidade avançada.
{% endcompatibility %}

Os números da Sass suportam até 10 dígitos de precisão depois do ponto decimal. Isto significa algumas coisas diferentes:

* Apenas os primeiros dez dígitos de um número depois do ponto decimal será incluído na CSS gerada.

* Operações como [`==`][] e [`>=`][] considerarão dois números equivalentes se forem o mesmo até o décimo dígito depois do ponto decimal.

* Se um número for menor do que `0.0000000001` longe de um inteiro, é considerado como um inteiro para os fins de funções como [`list.nth()`][] que exigem argumentos inteiros.

[`==`]: /documentation/operators/equality
[`>=`]: /documentation/operators/relational
[`list.nth()`]: /documentation/modules/list#nth

{% codeExample 'precision', false %}
  @debug 0.012345678912345; // 0.0123456789
  @debug 0.01234567891 == 0.01234567899; // true
  @debug 1.00000000009; // 1
  @debug 0.99999999991; // 1
  ===
  @debug 0.012345678912345  // 0.0123456789
  @debug 0.01234567891 == 0.01234567899  // true
  @debug 1.00000000009  // 1
  @debug 0.99999999991  // 1
{% endcodeExample %}

{% funFact %}
  Os números arredondados para 10 dígitos de precisão *preguiçosamente* quando são usados num lugar onde a precisão é relevante. Isto significa que função matemáticas trabalharão com valor do número completo internamente para evitar acumular erros de arredondamentos adicionais.
{% endfunFact %}
