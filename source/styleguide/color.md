---
title: Cor & Definição do Tema
---

## Cores da Marca {#brand-colors}

<ul class="sl-l-grid sl-l-grid--full sl-l-large-grid--divide-by-3 sl-l-large-grid--gutters">
  {% for swatch in colors %}
    <li class="sl-l-grid__column">
      <p class="sl-color--{{ swatch }}-background">&nbsp;</p>
      <code>$sl-color--{{ swatch }}</code>
    </li>
  {% endfor %}
</ul>
