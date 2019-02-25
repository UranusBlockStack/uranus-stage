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
