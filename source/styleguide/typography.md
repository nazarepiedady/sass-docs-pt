---
title: Tipografia
---

## Famílias {#families}

{% for font_family in font_families %}
  <dl class="guide-description-list">
    <dt class="sl-font-family--{{ font_family.style }}">{{ font_family.value }}</dt>
    <dd>
      <code>$sl-font-family--{{ font_family.style }}</code>
    </dd>
  </dl>
{% endfor %}
