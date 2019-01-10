import { httpLang } from './HttpService'

/** 钱包 - Wallet Service ***/
export function walletConfirmCode (lang, mobile_email) {
  return httpLang(lang).get(`wallet/wallet/confirmcode/${mobile_email}`)
}

export function orderStatusInnerModify (lang) {
  return httpLang(lang).put('/order/orders/inner/order_status')
}

export function orderInnerSearch (lang, orderNo) {
  return httpLang(lang).post(`/orders/inner/${orderNo}`)
}

export function orderSearch (lang, orderCond) {
  return httpLang(lang).post('/order/orders/search', orderCond)
}

export function orderDelete (lang, orderNo) {
  return httpLang(lang).delete(`/order/orders/${orderNo}`)
}
