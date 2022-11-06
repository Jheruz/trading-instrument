export default {
  QUOTES_LIST: '/ticker/price',
  QUOTES_PRICE: (symbol) => `/ticker?symbol=${symbol}`,
}
