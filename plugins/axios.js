import Axios from 'axios'
import Qs from 'qs'
import { Message } from 'element-ui'

export default function(ctx, inject) {
  const cors = 'https://cors-anywhere.herokuapp.com/' // use cors-anywhere to fetch api data
  const url =
    'http://data.gcis.nat.gov.tw/od/data/api/6BBA2268-1367-4B42-9CCA-BC17499EBE8C' // origin api url

  const api = {
    getCompanyCodeList: payload =>
      Axios({
        url: `${cors}${url}?$format=json&$filter=Company_Name like ${payload.companyName} and Company_Status eq 01&$skip=0&$top=50`,
        method: 'GET'
      })
  }

  inject('api', api)
}
