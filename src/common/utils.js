export const formatCurrency = (price, locales = "ka-GE", currency = "GEL") => {
  return new Intl.NumberFormat(locales, {
    style: "currency",
    currency: currency,
  }).format(price);
};
