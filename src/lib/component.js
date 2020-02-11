export const parseFragmentFromString = html =>
  document.createRange().createContextualFragment(html || '');

export const useTemplateAsFragment = selector => {
  const template = document.getElementById(selector);
  if (!template || !template.content instanceof DocumentFragment) {
    throw new Error(`No template matching to selector "${selector}" was found!`);
  }
  const clone = template.content.cloneNode(true);
  return clone;
};
