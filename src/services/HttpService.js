import store from '../store'
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
  return axios.create({
    baseURL: store.state.apiUrl,
    headers: {
      Authorization: auth.getToken(),
      Language: language
    }
  })
}

export function httpLang2 (language) {
  const http = axios.create({
    baseURL: store.state.apiUrl,
    headers: {
      Authorization: auth.getToken(),
      Language: language
    }
  })

  http.interceptors.response.use(
        response => {
          return response
        },
        error => {

          // loadinginstace.close()
          console.log(error)
          if (error.response) {
            switch (error.response.status) {
              case 401:
                        // 这里写清除token的代码
                router.replace({
                  path: '/login'
                            // query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
                })
            }
          }
          return Promise.reject(error.response.data)
        }
    )

  return http
}
