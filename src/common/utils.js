export const formatCurrency = (price, locales = "ka-GE", currency = "GEL") => {
  return new Intl.NumberFormat(locales, {
    style: "currency",
    currency: currency,
  }).format(price);
};

export const formatCurrencyWithSymbol = (amount) => {
  const formatter = new Intl.NumberFormat("ka-GE", {
    style: "currency",
    currency: "GEL",
  });
  const parts = formatter.formatToParts(amount);

  // Find the currency symbol and replace it with the Georgian Lari symbol
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].type === "currency") {
      parts[i].value = "₾";
      break;
    }
  }

  return parts.map((part) => part.value).join("");
};
