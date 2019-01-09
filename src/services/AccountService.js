
import { httpLang} from './HttpService'

/** 账号 Account 管理  **/

export function userModify (lang, newUserInfo) {
  return httpLang(lang).put('/users', newUserInfo)
}

export function userInnerSearch (lang, cond) {
  return httpLang(lang).post('/users/inner/search', cond)
}


export function userBind (lang, bindType, bindReq) {
  return httpLang(lang).put(`/rancher/clusters/${bindType}`, bindReq)
}

export function userInfo (lang, id) {
  return httpLang(lang).get(`/users/${id}`)
}
