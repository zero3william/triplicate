import Axios from 'axios'
import Qs from 'qs'
import { Message } from 'element-ui'

export default function(ctx, inject) {
  const cors = 'https://cors-anywhere.herokuapp.com/'
  const url_byName =
    'https://data.gcis.nat.gov.tw/od/data/api/6BBA2268-1367-4B42-9CCA-BC17499EBE8C'
  const url_byCode =
    'https://data.gcis.nat.gov.tw/od/data/api/5F64D864-61CB-4D0D-8AD9-492047CC1EA6'
  const api = {
    getCompanyCodeList: searchStr => {
      let reg = /^[0-9]*$/
      if (reg.test(searchStr)) {
        return Axios({
          url: `${cors}${url_byCode}?$format=json&$filter=Business_Accounting_NO eq ${searchStr}&$skip=0&$top=50`,
          method: 'GET'
        })
      } else {
        return Axios({
          url: `${cors}${url_byName}?$format=json&$filter=Company_Name like ${searchStr} and Company_Status eq 01&$skip=0&$top=50`,
          method: 'GET'
        })
      }
    },
    login: ({ email, password }) => {
      return Axios.post(
        cors + 'http://pei.usa543.com:6688/api/loginByEmail',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    },
    signup: ({ name, email, password, accountType = 'Email' }) => {
      return Axios.post(
        cors + 'http://pei.usa543.com:6688/api/registerUser',
        { name, email, password, accountType },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    },
    fbSignup: ({ name, email, accountType = 'fb' }) => {
      return Axios.post(
        cors + 'http://pei.usa543.com:6688/api/registerUser',
        { name, email, accountType },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    },
    addInvoice: params => {
      return Axios.post(
        cors + 'http://pei.usa543.com:6688/api/createInvoice',
        params,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    },
    fetchInvoice: ({ id }) => {
      return Axios.post(
        cors + 'http://pei.usa543.com:6688/api/retrieveInvoice',
        { id },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
  }

  inject('api', api)
}
