import * as api from '../../helpers/api_helper'

const getHistoricalBacktester = (filters) => {
  return api.get(`/historical/backtester/${filters.ticker}`, { params: filters })
}

const getHistoricalLiquidStaking = (filters) => {
  return api.get(`/historical/liquidstaking/${filters.ticker}`, { params: filters })
}

const getHistoricalLongAprs = (filters) => {
  return api.get(`/historical/mirror/longaprs/${filters.ticker}`, { params: filters })
}

const getHistoricalShortAprs = (filters) => {
  return api.get(`/historical/mirror/shortaprs/${filters.ticker}`, { params: filters })
}
const getHistoricalTerraDash = (filters) => {
  return api.get(`/historical/terradashboard/${filters.ticker}`, { params: filters })
}

const getHistoricalAprs = (filters) => {
  return api.get(`/historical/pools/${filters.dex}/${filters.ticker}`, { params: filters })
}

const getHistoricalAprsRolled = (filters) => {
  return api.get(`/historical/rolled/pools/${filters.dex}/${filters.ticker}`, { params: filters })
}

const getHistoricalAnchor = (filters) => {
  return api.get(`/historical/anchor/${filters.ticker}`, { params: filters })
}

const getHistoricalNexus = (filters) => {
  return api.get(`/historical/nexus/${filters.ticker}`, { params: filters })
}

const getLiquidationProfile = (filters) => {
  return api.get('/historical/kujira/profile')
}

const getHistoricalLiquidationProfile = (filters) => {
  return api.get(`/historical/kujira/profiles/`, {params:  filters})
}

const getHistoricalLiquidations = (filters) => {
  return api.get(`/historical/kujira/liquidations/`, {params:  filters})
}

const getSpreadHistStats = (filters) => {
  return api.get('/historical/spreadhiststats')
}

export default {
  getHistoricalBacktester:getHistoricalBacktester,
  getHistoricalLongAprs: getHistoricalLongAprs,
  getHistoricalShortAprs: getHistoricalShortAprs,
  getHistoricalTerraDash: getHistoricalTerraDash,
  getHistoricalAprs:getHistoricalAprs,
  getHistoricalAnchor: getHistoricalAnchor,
  getHistoricalNexus: getHistoricalNexus,
  getSpreadHistStats: getSpreadHistStats,
  getLiquidationProfile:getLiquidationProfile,
  getHistoricalLiquidationProfile:getHistoricalLiquidationProfile,
  getHistoricalLiquidations:getHistoricalLiquidations,
  getHistoricalLiquidStaking:getHistoricalLiquidStaking,
  getHistoricalAprsRolled:getHistoricalAprsRolled
}
