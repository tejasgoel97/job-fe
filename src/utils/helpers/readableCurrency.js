import { currencyOptions } from "../constants/Options";

export function readableCurrency(amount, currency) {
  if (typeof amount !== "number" || isNaN(amount)) {
    return "Invalid amount";
  }
    const currencySymbols = currencyOptions.find(
      (option) => option.value === currency
    ).symbol;
    return `${currencySymbols}${amount.toLocaleString()}`;
}