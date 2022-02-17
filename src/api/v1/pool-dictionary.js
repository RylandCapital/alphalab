import * as api from '../../helpers/api_helper'


const getNexusDict = () => {
  return api.get('/info/nexusdict')
}

const getDashboardDict = () => {
  return api.get('/info/dashboarddict')
}

const getAstroDict = () => {
  return api.get('/info/astrodict')
}

const getDexPoolDict = () => {
  return api.get('/info/dexpooldict')
}




export default {
  getNexusDict: getNexusDict,
  getDashboardDict:getDashboardDict,
  getAstroDict:getAstroDict,
  getDexPoolDict:getDexPoolDict
}
