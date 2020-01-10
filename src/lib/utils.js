export const generateToken = () => {
  const tokenFragment = radix =>
    Math.random()
      .toString(radix)
      .substr(2);
  return `${tokenFragment(12)}-${tokenFragment(36)}-${tokenFragment(22)}`;
};
