import endpoints from './endpoints'

const apiLink = 'https://api.binance.com/api/v3'

function apiWrapper(path) {
  return new Promise((resolve, reject) => {
    fetch(`${apiLink}${path}`)
      .then((res) => res.json())
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}

function getSymbolList() {
  return apiWrapper(endpoints.QUOTES_LIST)
}

function getSymbolDetails(symbol) {
  return apiWrapper(endpoints.QUOTES_PRICE(symbol))
}

function getSymbolDetails24hours(symbol) {
  return apiWrapper(endpoints.QUOTES_PRICE_24HOURS(symbol))
}

export default {
  getSymbolList,
  getSymbolDetails,
  getSymbolDetails24hours,
}
