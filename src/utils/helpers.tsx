const currencyNum = (inp: any) => {
  const a = inp
    .split("")
    .reverse()
    .join("")
    .match(/.{1,3}/g)
    .join(".")
    .split("")
    .reverse()
    .join("");

  return a;
};

export const formatRupiah = (value) => {
  if (!value) {
    return "Rp 0";
  }
  return `Rp ${currencyNum(String(value))}`;
};
