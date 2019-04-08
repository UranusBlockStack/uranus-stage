import store from '../store/store'
import { httpLang } from './HttpService'

export function promoList (lang, cond) {
  return httpLang(lang).post('/promotion/promotions/search', cond)
}

export function promoInfo (lang, promoid) {
  return httpLang(lang).get(`/promotion/promotions/search/${promoid}`)
}

export function promoRuleList (lang, cond) {
  return httpLang(lang).post('/promotion/promotions/search', cond)
}

export function promoRuleInfo (lang, promoRuleid) {
  return httpLang(lang).get(`/promotion/promotions/search/${promoRuleid}`)
}

/// 用户参加活动
export function userJoinPromotion (lang, promoid, userid) {
  return httpLang(lang).post(`/promotion/promotions/${promoid}/users/${userid}`)
}