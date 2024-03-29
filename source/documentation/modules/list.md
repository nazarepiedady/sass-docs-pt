---
title: sass:list
---

{% render 'doc_snippets/built-in-module-status' %}

{% funFact %}
  Na Sass, todo [mapa][map] conta como uma lista que contém uma lista de dois elementos para cada par de chave e valor. Por exemplo, `(1: 2, 3: 4)` conta como `(1 2, 3 4)`. Todas estas funções também funcionam para os mapas!

  [map]: /documentation/values/maps

  Os valores individuais também contam como listas. Todas estas funções tratam `1px` como uma lista que contém o valor `1px`.
{% endfunFact %}


{% function 'list.append($list, $val, $separator: auto)', 'append($list, $val, $separator: auto)',  'returns:list' %}
  Retorna uma cópia de `$list` com `$val` adicionado ao final.

  Se `$separator` for `comma`, `space`, ou `slash`, a lista retornada é separada por vírgula, separada por espaço, ou separada por barra, respetivamente. Se for `auto` (o padrão), a lista retornada usará o mesmo separador que a `$list` (ou `space` se `$list` não tiver um separador). Outros valores não são permitidos.

  [separator]: /documentation/values/lists

  Nota que ao contrário de [`list.join()`](#join), se `$val` for uma lista é encaixada dentro da lista retornada no lugar de ter todos os seus elementos adicionados à lista retornada:

  {% codeExample 'list-append', false %}
    @debug list.append(10px 20px, 30px); // 10px 20px 30px
    @debug list.append((blue, red), green); // blue, red, green
    @debug list.append(10px 20px, 30px 40px); // 10px 20px (30px 40px)
    @debug list.append(10px, 20px, $separator: comma); // 10px, 20px
    @debug list.append((blue, red), green, $separator: space); // blue red green
    ===
    @debug list.append(10px 20px, 30px)  // 10px 20px 30px
    @debug list.append((blue, red), green)  // blue, red, green
    @debug list.append(10px 20px, 30px 40px)  // 10px 20px (30px 40px)
    @debug list.append(10px, 20px, $separator: comma)  // 10px, 20px
    @debug list.append((blue, red), green, $separator: space)  // blue red green
  {% endcodeExample %}
{% endfunction %}


{% function 'list.index($list, $value)', 'index($list, $value)', 'returns:number | null' %}
  Retorna o [índice][index] do `$value` no `$list`.

  [index]: /documentation/values/lists#indexes

  Se `$value` não aparecer na `$list`, este retorna [`null`][]. Se `$value` aparecer várias vezes na `$list`, esta retorna o índice do seu primeiro aparecimento:

  [`null`]: /documentation/values/null

  {% render 'code_snippets/example-list-index' %}
{% endfunction %}


{% function 'list.is-bracketed($list)', 'is-bracketed($list)', 'returns:boolean' %}
  Retorna verdadeiro se `$list` tiver parênteses reto:

  {% codeExample 'list-is-bracketed', false %}
    @debug list.is-bracketed(1px 2px 3px); // false
    @debug list.is-bracketed([1px, 2px, 3px]); // true
    ===
    @debug list.is-bracketed(1px 2px 3px)  // false
    @debug list.is-bracketed([1px, 2px, 3px])  // true
  {% endcodeExample %}
{% endfunction %}


{% function 'list.join($list1, $list2, $separator: auto, $bracketed: auto)', 'join($list1, $list2, $separator: auto, $bracketed: auto)', 'returns:list' %}
  Retorna uma nova lista contendo os elementos de `$list1` seguido pelos elementos de `$list2`.

  {% headsUp %}
    Uma vez que valores individuais contam como listas de um elemento, é possível usar `list.join()` para adicionar um valor no final duma lista. No entanto, *isto não é recomendado*, uma vez que se este valor for uma lista será concatenado, o que é provavelmente o que estás a espera.

    Use [`list.append()`](#append) para adicionar um único valor à uma lista. Apenas use `list.join()` para combinar duas listas numa.
  {% endheadsUp %}

  Se `$separator` for `comma`, `space`, ou `slash`, a lista retornada é separada por vírgula, separada por espaço, ou separada por barra, respetivamente. Se for `auto` (o padrão), a lista retornada usará o mesmo separador que a `$list1` se esta tiver um separador, ou `$list2` se esta tiver um separador, ou então `space`. Outros valores não são permitidos.

  Se `$bracketed` for `auto` (o padrão), a lista retornada será envolvida em parênteses se `$list` estiver. De outro modo, a lista retornada terá parênteses reto se `$bracketed` for [verdadeiro][truthy] e sem parênteses se `$bracketed` for falso:

  [truthy]: /documentation/values/booleans#truthiness-and-falsiness

  {% codeExample 'list-join', false %}
    @debug list.join(10px 20px, 30px 40px); // 10px 20px 30px 40px
    @debug list.join((blue, red), (#abc, #def)); // blue, red, #abc, #def
    @debug list.join(10px, 20px); // 10px 20px
    @debug list.join(10px, 20px, $separator: comma); // 10px, 20px
    @debug list.join((blue, red), (#abc, #def), $separator: space); // blue red #abc #def
    @debug list.join([10px], 20px); // [10px 20px]
    @debug list.join(10px, 20px, $bracketed: true); // [10px 20px]
    ===
    @debug list.join(10px 20px, 30px 40px)  // 10px 20px 30px 40px
    @debug list.join((blue, red), (#abc, #def))  // blue, red, #abc, #def
    @debug list.join(10px, 20px)  // 10px 20px
    @debug list.join(10px, 20px, comma)  // 10px, 20px
    @debug list.join((blue, red), (#abc, #def), space)  // blue red #abc #def
    @debug list.join([10px], 20px)  // [10px 20px]
    @debug list.join(10px, 20px, $bracketed: true)  // [10px 20px]
  {% endcodeExample %}
{% endfunction %}

{% function 'list.length($list)', 'length($list)', 'returns:number' %}
  Retorna o comprimento da `$list`.

  Este também pode retornar o número de pares num mapa.

  {% codeExample 'list-length', false %}
    @debug list.length(10px); // 1
    @debug list.length(10px 20px 30px); // 3
    @debug list.length((width: 10px, height: 20px)); // 2
    ===
    @debug list.length(10px)  // 1
    @debug list.length(10px 20px 30px)  // 3
    @debug list.length((width: 10px, height: 20px))  // 2
  {% endcodeExample %}
{% endfunction %}


{% function 'list.separator($list)', 'list-separator($list)', 'returns:unquoted string' %}
  Retorna o nome do separador usado pela `$list`, ou `space`, `comma`, ou `slash`.

  Se `$list` não tiver um separador, retorna `space`.

  {% codeExample 'list-separator', false %}
    @debug list.separator(1px 2px 3px); // space
    @debug list.separator(1px, 2px, 3px); // comma
    @debug list.separator('Helvetica'); // space
    @debug list.separator(()); // space
    ===
    @debug list.separator(1px 2px 3px)  // space
    @debug list.separator(1px, 2px, 3px)  // comma
    @debug list.separator('Helvetica')  // space
    @debug list.separator(())  // space
  {% endcodeExample %}
{% endfunction %}


{% function 'list.nth($list, $n)', 'nth($list, $n)' %}
  Retorna o elemento da `$list` no [índice][index] `$n`.

  [index]: /documentation/values/lists#indexes

  Se `$n` for negativo, conta a partir do final da `$list`. Lança um erro se não existir nenhum elemento no índice `$n`.

  {% render 'code_snippets/example-list-nth' %}
{% endfunction %}


{% function 'list.set-nth($list, $n, $value)', 'set-nth($list, $n, $value)', 'returns:list' %}
  Retorna uma cópia de `$list` com o elemento no [índice][index] `$n` substituído por `$value`.

  [index]: /documentation/values/lists#indexes

  Se `$n` for negativo, conta a partir do final da `$list`. Lança um erro se não existir nenhum elemento no índice `$n`.

  {% codeExample 'list-set-nth', false %}
    @debug list.set-nth(10px 20px 30px, 1, 2em); // 2em 20px 30px
    @debug list.set-nth(10px 20px 30px, -1, 8em); // 10px, 20px, 8em
    @debug list.set-nth((Helvetica, Arial, sans-serif), 3, Roboto); // Helvetica, Arial, Roboto
    ===
    @debug list.set-nth(10px 20px 30px, 1, 2em); // 2em 20px 30px
    @debug list.set-nth(10px 20px 30px, -1, 8em); // 10px, 20px, 8em
    @debug list.set-nth((Helvetica, Arial, sans-serif), 3, Roboto); // Helvetica, Arial, Roboto
  {% endcodeExample %}
{% endfunction %}

{% function 'list.slash($elements...)', 'returns:list' %}
  Retorna uma lista separada por barra que contém `$elements`.

  {% headsUp %}
    Esta função é uma solução temporária para criação de listas separadas por barra. Eventualmente, serão escritas literalmente com barras, como em `1px / 2px / solid`, mas por enquanto as [barras são usadas para divisão][slashes are used for division] então a Sass não pode usá-los para a nova sintaxe até a antiga sintaxe ser removida.

    [slashes are used for division]: /documentation/breaking-changes/slash-div
  {% endheadsUp %}

  {% codeExample 'list-slash', false %}
    @debug list.slash(1px, 50px, 100px); // 1px / 50px / 100px
    ===
    @debug list.slash(1px, 50px, 100px)  // 1px / 50px / 100px
  {% endcodeExample %}
{% endfunction %}


{% function 'list.zip($lists...)', 'zip($lists...)', 'returns:list' %}
  Combina todas as listas em `$lists` numa única lista de sub-listas.

  Cada elemento na lista retornada contém todos os elementos naquela posição na `$lists`. A lista retornada é tão longa quanto a lista mais curta em `$lists`.

  A lista retornada é sempre separada por vírgula e as sub-listas são sempre separadas por espaço.

  {% codeExample 'list-zip', false %}
    @debug list.zip(10px 50px 100px, short mid long); // 10px short, 50px mid, 100px long
    @debug list.zip(10px 50px 100px, short mid); // 10px short, 50px mid
    ===
    @debug list.zip(10px 50px 100px, short mid long)  // 10px short, 50px mid, 100px long
    @debug list.zip(10px 50px 100px, short mid)  // 10px short, 50px mid
  {% endcodeExample %}
{% endfunction %}
