export const parseFragment = html => document.createRange().createContextualFragment(html);

export const dynamicFragment = (template, ...embeds) => {
  const parsed = embeds.map((embed, index) => {
    if (embed instanceof DocumentFragment) {
      console.log({ embed }, template[index]);
      return template[index] + embed;
    }
    if (typeof embed !== 'function' && typeof embed !== 'object') {
      console.log({ embed }, template[index]);
      return template[index] + embed;
    }

    if (embed() instanceof DocumentFragment) {
      console.log({ embed }, template[index]);
      return template[index] + embed();
    }

    console.log('function returning function', embed);
    return template[index] + embed();
  });

  const parsedTemplateString = [...parsed, template[template.length - 1]].join('');

  console.log(parsedTemplateString);
  return parseFragment(parsedTemplateString);
};
