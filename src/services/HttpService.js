import store from '../store/store'
import axios from 'axios'
import * as auth from './AuthService'
import ServerInfo from '../store/ServerInfo'

// Creates a global http method to use for making request to the server
export function http (rancherCode) {
  return axios.create(ServerInfo[rancherCode])
}

export function httpLang (language) {
  const axinstance = axios.create({
    baseURL: store.state.apiUrl,
    headers: {
      Authorization: auth.getToken(),
      Language: language
    }
  })

  // axinstance.catch(error => {
  //   if (error.response) {
  //   } else if (error.request) {
  //     // if (error.request.readyState === 4 && error.request.status === 0) {
  //     // }
  //   } else {
  //     con sole.log('Error', error.message)
  //   }
  //   con sole.log(error.config)
  // })

  axinstance.defaults.timeout = store.state.defaultAxiosTimeout * 1000

  axinstance.interceptors.request.use(function (config) {
    return config
  }, function (error) {
    return Promise.reject(error)
  })

  axinstance.interceptors.response.use(function (response) {
    const axdata = response.data
    if (axdata.errCode === 'TOKEN_NOT_INVALID') {
      localStorage.setItem('token', '')
      location.href = '/'
    } else {
      return response
    }
  }, function (error) {
    return Promise.reject(error)
  })

  return axinstance
}
