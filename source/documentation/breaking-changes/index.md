---
title: Mudanças de Rutura
introduction: >
  Novas versões da Sass são as mais retro-compatíveis possíveis, mas algumas vezes uma mudança de rutura é necessária. A Sass precisa manter-se atualizada com a evolução da especificação da CSS, antigos equívocos do desenho da linguagem precisam de ocasionalmente ser corrigidos.
---

Antes de cada mudança de rutura ser lançada, as implementações de Sass produzirão avisos de depreciação para as folhas de estilos cujo comportamento mudará. Sempre que possível, estes avisos incluirão sugestões de como atualizar os estilos depreciados para torná-los compatíveis com a versão expedida.

Diferentes implementações têm diferentes políticas para as mudanças de rutura e depreciações. A [Sass de Dart][Dart Sass] emitirá avisos de depreciação por pelos menos três meses antes de lançar uma mudança de rutura, e lançará a mudança de rutura com um novo número de versão principal **a menos que esta mudança seja necessária para compatibilidade de CSS**. As mudanças de compatibilidade de CSS são com frequência não disruptivas e sensíveis ao tempo, assim podem ser lançadas com novos números de versão principal.

[Dart Sass]: /dart-sass

Estas mudanças de rutura estão para chegar brevemente ou foram lançadas recentemente:

* [Carregamento da Sass como uma exportação padrão na JavaScript não é mais permitido](/documentation/breaking-changes/default-export) começando na Sass de Dart 1.63.0.

* [Uma variável pode apenas ter uma única opção `!global` ou `default`](/documentation/breaking-changes/duplicate-var-flags) começando na Sass de Dart 1.62.0.

* [Os seletores com combinadores inválidos são inválidos](/documentation/breaking-changes/bogus-combinators) começando na Sass de Dart 1.54.0.

* [O símbolo `/` está mudando de uma operação de divisão para um separador de lista](/documentation/breaking-changes/slash-div) começando na Sass de Dart 1.33.0.

* [As funções são mais rigorosas sobre quais unidades permitem](/documentation/breaking-changes/function-units) começando na Sass de Dart 1.32.0.

* [A analise da sintaxe especial de `@-moz-document` será inválida](/documentation/breaking-changes/moz-document) começando na Sass de Dart 1.7.2.

* [Os seletores compostos não poderiam ser estendidos](/documentation/breaking-changes/extend-compound) na Sass de Dart 1.0.0 e Sass de Ruby 4.0.0.

* [A sintaxe para valores de propriedade personalizada de CSS mudada](/documentation/breaking-changes/css-vars) na Sass de Dart 1.0.0, LibSass 3.5.0, e Sass de Ruby 3.5.0.

## Adoção Prematura {#early-opt-in}

Os utilizadores de Sass de Dart podem optar em tratar as depreciações como erros prematuramente usando a [opção de linha de comando `--fatal-deprecation`](/documentation/cli/dart-sass/#fatal-deprecation).
