export default {
  QUOTES_LIST: '/ticker/price',
  QUOTES_PRICE: (symbol) => `/ticker?symbol=${symbol}`,
  QUOTES_PRICE_24HOURS: (symbol) => `/ticker/24hr?symbol=${symbol}`,
}
