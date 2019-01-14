import store from '../store'
import { httpLang } from './HttpService'
import jwt from 'jsonwebtoken'

export function isLoggedIn () {
  const token = localStorage.getItem('token')
  return token != null
}

export function login (lang, user) {
  return httpLang(lang).post('/auth/users/signin', user)
    .then(res => {
      if (res) {
        const  loginInfo = {
            userName        : user.loginName,
            userId          : res.data.data.id,
            loginType       : '',
            loginRole       : '',
            loginLanguage   : '',
            userAddress     : ''
        }
        setToken(res.data.data.token, loginInfo)
      }
    })
}

export function logout () {
  localStorage.clear()
  store.dispatch('authenticate')
}

function setToken (token, user) {
  localStorage.setItem('token', token)
  store.dispatch('authenticate', user)
}

export function getToken () {
  return localStorage.getItem('token')
}

export function getUsername () {
  const token = decodeToken()
  if (!token) {
    return null
  }
  return token.user.userName
}

export function getUserId () {
  const token = decodeToken()
  if (!token) {
    return null
  }
  return token.user.id
}

export function registerUser (lang, user) {
  return httpLang(lang).post('/auth/users/signup', user)
}

function decodeToken () {
  const token = getToken()
  if (!token) {
    return null
  }
  return jwt.decode(token)
}

export function checkUser (lang, checkType, checkValue) {
  return httpLang(lang).get(`/auth/users/${checkType}/${checkValue}`)
}

export function resetPassword (lang, passPair) {
  return httpLang(lang).put('/auth/users/password', passPair)
}

export function forgetPassword (lang, passPair) {
  return httpLang(lang).put('/auth/users/forget_password', passPair)
}

export function captcha (lang, userinfo) {
  return httpLang(lang).post('/auth/captcha', userinfo)
}

export function country (lang) {
  return httpLang(lang).get('/auth/country')
}
