import { httpLang } from './HttpService'

/** 订单 - Order Service ***/
export function orderAdd (lang, orderInfo) {
  return httpLang(lang).post('/order/orders', orderInfo)
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
