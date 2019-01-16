import store from '../store'
import { httpLang } from './HttpService'
import jwt from 'jsonwebtoken'

export function isLoggedIn () {
  const token = localStorage.getItem('token')
  return token != null
}

export function login (lang, userLoginfo) {
  return httpLang(lang).post('/auth/users/signin', userLoginfo)
    .then(res => {
      const userdata = res.data.data
      if (res) {
        const curLoginUserInfo = {
          userName: userLoginfo.loginName,
          userId: userdata.id,
          loginType: userLoginfo.loginType,
          userAddress: userdata.accountAddress,
          loginRole: getCurRole(),
          loginLanguage: 'en-us'
        }
        setToken(userdata.token, curLoginUserInfo)
        localStorage.setItem('currentUserStatus', JSON.stringify(curLoginUserInfo))
        return curLoginUserInfo
      }
    })
}

export function logout () {
  localStorage.clear()
  store.dispatch('authenticate')
}

/// / Conversation State Manage  Functions
function setToken (token, user) {
  localStorage.setItem('token', token)
  store.dispatch('authenticate', user)
}

export function getToken () {
  return localStorage.getItem('token')
}

export function getUserBaseInfo() {
  const curUserState = localStorage.getItem('currentUserStatus')
  return JSON.parse(curUserState)
}

export function setCurLang(lang) {
  updatePropValue('loginLanguage', lang)
}

export function getCurLang() {
  const curUserState = localStorage.getItem('currentUserStatus')
  return JSON.parse(curUserState).loginLanguage
}

export function setCurRole(role) {
  updatePropValue('loginRole', role)
}

const defaultUserStatus =
  {
    userName: '',
    userId: '',
    loginType: 'mobile',
    userAddress: '',
    loginRole: 'Seller',
    loginLanguage: 'en-us'
  }

export function getDefaultUserStatus () {
  return  defaultUserStatus
}

function updatePropValue(propName, value) {
  const userData = getUserBaseInfo()

  let userTmpVar = defaultUserStatus
  if (userData) {
    userTmpVar = userData
    userTmpVar[propName] = value
  }

  localStorage.setItem('currentUserStatus', JSON.stringify(userTmpVar))
}

export function getCurRole() {
  const curUserState = localStorage.getItem('currentUserStatus')
  return JSON.parse(curUserState).loginRole
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

/// / Auth API Wraps

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
