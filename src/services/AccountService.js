import {httpLang} from './HttpService'

/** 账号 Account 管理  **/

export function userModify (lang, newUserInfo) {
  return httpLang(lang).put('/accounts/users', newUserInfo)
}

export function userInnerSearch (lang, cond) {
  return httpLang(lang).post('/accounts/users/inner/search', cond)
}

export function userBind (lang, bindType, bindReq) {
  return httpLang(lang).put(`/accounts/users/${bindType}`, bindReq)
}

export function userInfo (lang, id) {
  return httpLang(lang).get(`/accounts/users/${id}`)
}

export function userBalcnce (lang) {
  return httpLang(lang).get('/accounts/users/balance')
}

/// 用户积分详情
export function userPoints (lang, userid) {
  return httpLang(lang).get(`/accounts/users/${userid}/points`)
}

/// 用户积分总结
export function userPointsSummary (lang, userid) {
  return httpLang(lang).post(`/accounts/users/{userid}/points/summary`)
}
