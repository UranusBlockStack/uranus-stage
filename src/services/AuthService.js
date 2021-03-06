import store from '../store/store'
import { httpLang } from './HttpService'
import jwt from 'jsonwebtoken'
import moment from 'moment'

/// ---// Conversation State Manage  Functions

const defaultUserStatus =
  {
    userName: '',
    userId: '',
    loginType: 'mobile',
    userAddress: '',
    loginRole: 'Seller',
    loginLanguage: 'en-us',
    activity: {
      currentact: '',
      attendlist: []
    }
  }

function setToken (token, user) {
  localStorage.setItem('token', token)
  store.dispatch('authenticate', user)
}

/// 更新属性值功能，支持操作二级属性， 如果不使用二级属性，第二个参数设置为null
function updatePropValue(propName, subPropName = null, value = null) {
  const userData = getUserBaseInfo()

  let userTmpVar = defaultUserStatus
  if (userData) {
    userTmpVar = userData
  }
  if (!subPropName) {
    userTmpVar[propName] = value
  } else {
    // console.log('prop', propName, '--', subPropName, value)
    userTmpVar[propName][subPropName] = value
  }

  localStorage.setItem('currentUserStatus', JSON.stringify(userTmpVar))
}

export function getDefaultUserStatus () {
  return defaultUserStatus
}

export function getToken () {
  return localStorage.getItem('token')
}

export function getUserBaseInfo() {
  const curUserState = localStorage.getItem('currentUserStatus')
  return JSON.parse(curUserState)
}

export function setCurLang(lang) {
  updatePropValue('loginLanguage', null, lang)
}

export function getCurLang() {
  const curUserState = localStorage.getItem('currentUserStatus')
  return JSON.parse(curUserState).loginLanguage
}

export function setCurRole(role) {
  updatePropValue('loginRole', null, role)
}

export function getCurRole() {
  const curUserState = localStorage.getItem('currentUserStatus')
  return JSON.parse(curUserState).loginRole
}

export function getCurActivity() {
  const curUserState = localStorage.getItem('currentUserStatus')
  return JSON.parse(curUserState).activity.currentact
}

export function setCurActivity(activitycode) {
  updatePropValue('activity', 'currentact', activitycode)
}

export function getCurUserName() {
  const curUserState = localStorage.getItem('currentUserStatus')
  return JSON.parse(curUserState).userName
}

export function getCurUserId() {
  const curUserState = localStorage.getItem('currentUserStatus')
  return JSON.parse(curUserState).userId
}

/// -- 这个目前不能使用
export function getUsername () {
  const token = decodeToken()
  if (!token) {
    return null
  }
  return token.user.userName
}

/// -- 这个目前不能使用
export function getUserId () {
  const token = decodeToken()
  if (!token) {
    return null
  }
  return token.user.id
}

export function tokenNeedUpdate() {
  let tokenRefreshTimeMark = localStorage.getItem('tokenLastUpdateTime')
  if (!tokenRefreshTimeMark) {
    localStorage.setItem('tokenLastUpdateTime', moment().utc().format())
    tokenRefreshTimeMark = localStorage.getItem('tokenLastUpdateTime')
  }

  const refreshDuration = store.state.refreshDuration
  const updateEdge = moment(tokenRefreshTimeMark).add(refreshDuration, 'minutes')
  const nowTime = moment()
  return nowTime > updateEdge
}

export function refreshToken(lang) {
  const token = localStorage.getItem('token')
  const newLastUpdateTime = moment().utc().format()
  localStorage.setItem('tokenLastUpdateTime', newLastUpdateTime)
  return httpLang(lang).post('/auth/users/refresh/' + token)
      .then(function (refreshedToken) {
        localStorage.setItem('token', refreshedToken.data.data.token)
      })
}

/// / Auth API Wraps

export function isLoggedIn () {
  const token = localStorage.getItem('token')
  return token != null
}

export function login (lang, userLoginfo) {
  return httpLang(lang).post('/auth/users/signin', userLoginfo)
        .then(function(res) {
          if (res.data.success) {
            const userdata = res.data.data

            if (res) {
              const curLoginUserInfo = {
                userName: userLoginfo.loginName,
                userId: userdata.id,
                loginType: userLoginfo.loginType,
                userAddress: userdata.accountAddress,
                loginRole: getCurRole(),
                loginLanguage: 'en-us',
                activity: {}
              }
              setToken(userdata.token, curLoginUserInfo)
              localStorage.setItem('currentUserStatus', JSON.stringify(curLoginUserInfo))
              res['curLoginUserInfo'] = curLoginUserInfo
            }
          }

          return res
        })
}

export function logout () {
  localStorage.clear()
  store.dispatch('authenticate')
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

// 检查手机或邮箱验证码是否正确
export function checkCaptcha (lang, receiver, captcha) {
  return httpLang(lang).get(`/auth/captcha/${receiver}/${captcha}`)
}

export function country (lang) {
  return httpLang(lang).get('/auth/country')
}
