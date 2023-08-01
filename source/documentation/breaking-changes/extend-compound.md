---
title: "Mudança de Rutura: Extensão de Seletores Compostos"
introduction: >
  A LibSass atualmente permite que seletores compostos como `.message.info` sejam [estendidos](/documentation/at-rules/extend), mas a maneira como era estendida não correspondia a maneira que `@extend` está destinada a funcionar.
---

{% compatibility 'dart: true', 'libsass: false', 'ruby: false' %}{% endcompatibility %}

Quando um seletor estende um outro, a Sass estiliza todos os elementos que correspondem ao extensor como se também correspondessem a classe a ser estendida. Em outras palavras, se escreveres `.heads-up {@extend .info}`, funciona exatamente como se tivesses substituído `class="heads-up"` no teu HTML por `class="heads-up info"`.

Seguindo esta lógica, esperarias que `.heads-up {@extend .message.info}` funcionasse como a substituição de `class="heads-up"` por `class="heads-up info message"`. Mas não é assim como funciona neste exato momento na LibSass e Sass de Ruby -- ao invés de adicionar `.heads-up` para cada seletor que tiver *ou `.info` ou `.message`*, este apenas adiciona-a aos seletores que têm *`.info.message` ao mesmo tempo*:

{% codeExample 'extend-compound-bad', false %}
  // These should both be extended, but they won't be.
  .message {
    border: 1px solid black;
  }
  .info {
    font-size: 1.5rem;
  }

  .heads-up {
    @extend .message.info;
  }
  ===
  // These should both be extended, but they won't be.
  .message
    border: 1px solid black

  .info
    font-size: 1.5rem


  .heads-up
    @extend .message.info
{% endcodeExample %}

Para corrigir este problema, evitar mais confusão, e manter a implementação limpa e eficiente, a habilidade de estender seletores compostos não é suportada na Sass de Dart e será removida numa versão futura da LibSass. Por compatibilidade, os utilizadores deveriam estender cada seletor simples separadamente:

{% codeExample 'extend-compound-good' %}
  .message {
    border: 1px solid black;
  }
  .info {
    font-size: 1.5rem;
  }

  .heads-up {
    @extend .message, .info;
  }
  ===
  .message
    border: 1px solid black

  .info
    font-size: 1.5rem


  .heads-up
    @extend .message, .info
{% endcodeExample %}

{% headsUp %}
  Uma vez que a Sass não sabe os detalhes do HTML que a CSS estilizará, qualquer `@extend` pode precisar de gerar seletores adicionais que não aplicar-se-ão ao teu HTML em particular. Isto é especialmente verdadeiro quando se deixa de estender os seletores compostos.

  Na maioria das vezes, estes seletores adicionais não causarão quaisquer problemas, e apenas adicionam um pouco de bytes a mais ao CSS compactado. Mas algumas folhas de estilo podem estar a depender muito do comportamento antigo. Neste caso, recomendamos substituir o seletor composto com uma [seletor de pai][placeholder selector]:

  [placeholder selector]: /documentation/style-rules/placeholder-selectors

  {% codeExample 'extend-compound-heads-up' %}
    // Instead of just `.message.info`.
    %message-info, .message.info {
      border: 1px solid black;
      font-size: 1.5rem;
    }

    .heads-up {
      // Instead of `.message.info`.
      @extend %message-info;
    }
    ===
    // Instead of just `.message.info`.
    %message-info, .message.info
      border: 1px solid black
      font-size: 1.5rem


    .heads-up
      // Instead of `.message.info`.
      @extend %message-info
  {% endcodeExample %}
{% endheadsUp %}
