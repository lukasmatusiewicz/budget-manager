export const formatCurrency = (amount, currencyCode = 'USD') => {
  const symbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    PLN: 'zł'
  };

  const symbol = symbols[currencyCode] || '$';
  
  if (currencyCode === 'PLN') {
    return `${amount.toFixed(2)} ${symbol}`;
  }
  
  if (currencyCode === 'JPY') {
    return `${symbol}${amount.toLocaleString()}`;
  }

  return `${symbol}${amount.toFixed(2)}`;
};
