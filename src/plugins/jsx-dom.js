function undashify(name) {
  return name.replace(/-(\w)/g, val => val.slice(1).toUpperCase());
}

export function h(name, attrs, ...children) {
  const el = document.createElement(name);
  for (const [attrName, attrValue] of Object.entries(attrs || {})) {
    const camelAttrName = undashify(attrName);
    if (camelAttrName in el) {
      el[camelAttrName] = attrValue;
    } else {
      el.setAttribute(attrName, attrValue);
    }
  }
  for (const child of children) {
    el.append(child);
  }
  return el;
}
