import store from '../store/store'
import axios from 'axios'
import * as auth from './AuthService'

// Creates a global http method to use for making request to the server
export function http () {
  return axios.create({
    baseURL: store.state.apiUrl,
    headers: {
      Authorization: auth.getToken()
    }
  })
}

export function httpLang (language) {
  const axinstance = axios.create({
    baseURL: store.state.apiUrl,
    headers: {
      Authorization: auth.getToken(),
      Language: language
    }
  })

  axinstance.interceptors.response.use(function(response) {
    const axdata = response.data
    if (axdata.errCode === 'TOKEN_NOT_INVALID') {
      localStorage.setItem('token', '')
      location.href = '/'
    } else {
      return response
    }
  })

  return axinstance
}
