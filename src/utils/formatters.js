const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  PLN: 'zł'
};

export const getCurrencySymbol = (currencyCode = 'USD') => {
  return CURRENCY_SYMBOLS[currencyCode] || '$';
};

export const formatCurrency = (amount, currencyCode = 'USD') => {
  const symbol = getCurrencySymbol(currencyCode);
  
  if (currencyCode === 'PLN') {
    return `${amount.toFixed(2)} ${symbol}`;
  }
  
  if (currencyCode === 'JPY') {
    return `${symbol}${amount.toLocaleString()}`;
  }

  return `${symbol}${amount.toFixed(2)}`;
};
