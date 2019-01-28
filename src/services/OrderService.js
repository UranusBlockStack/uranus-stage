import { httpLang } from './HttpService'

/** 订单 - Order Service ***/
export function orderApp (lang, appId) {
  return httpLang(lang).post(`/order/orders/app/${appId}`)
}

export function orderStatusInnerModify (lang) {
  return httpLang(lang).put('/order/orders/inner/order_status')
}

export function orderInnerSearch (lang, orderNo) {
  return httpLang(lang).post(`/orders/inner/${orderNo}`)
}

export function orderSearch (lang, queryData) {
  return httpLang(lang).post('/order/orders/search', queryData)
}

export function orderDelete (lang, orderNo) {
  return httpLang(lang).delete(`/order/orders/${orderNo}`)
}

export function orderResource(lang, orderData) {
  return httpLang(lang).post('/order/orders/resource', orderData)
}

// 交易收益统计
export function earnings(lang, type) {
  return httpLang(lang).get(`/order/statistics/earnings/${type}`)
}
