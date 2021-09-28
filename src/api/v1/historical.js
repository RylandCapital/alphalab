import * as api from '../../helpers/api_helper'

const getHistoricalLongAprs = (filters) => {
  return api.get(`/historical/longaprs/${filters.ticker}`, { params: filters })
}

const getHistoricalShortAprs = (filters) => {
  return api.get(`/historical/shortaprs/${filters.ticker}`, { params: filters })
}

const getHistoricalCommAprs = (filters) => {
  return api.get(`/historical/comaprs/${filters.ticker}`, { params: filters })
}

const getHistoricalAnchor = (filters) => {
  return api.get(`/historical/anchor/${filters.ticker}`, { params: filters })
}

const getSpreadHistStats = (filters) => {
  return api.get('/historical/spreadhiststats')
}

export default {
  getHistoricalLongAprs: getHistoricalLongAprs,
  getHistoricalShortAprs: getHistoricalShortAprs,
  getHistoricalCommAprs: getHistoricalCommAprs,
  getHistoricalAnchor: getHistoricalAnchor,
  getSpreadHistStats: getSpreadHistStats
}
