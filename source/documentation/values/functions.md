---
title: Funções
---

{% render 'doc_snippets/call-impl-status' %}

As [funções][Functions] também podem ser valores! Tu não podes escrever diretamente uma função como um valor, mas podes passar um nome de função para a [função `meta.get-function()`][`meta.get-function()` function] para recebê-la como um valor. Assim que tiveres um valor de função, podes passá-lo para a [função `meta.call()`][`meta.call()` function] para chamá-la. Isto é útil para escrita de *funções de ordem mais elevada* que chamam outras funções:

[Functions]: /documentation/at-rules/function
[`meta.get-function()` function]: /documentation/modules/meta#get-function
[`meta.call()` function]: /documentation/modules/meta#call

{% render 'code_snippets/example-first-class-function' %}
