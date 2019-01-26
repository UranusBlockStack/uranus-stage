/// 状态集合定义
const orderStatus = [
    {id: 1, 'zh-cn': '未支付', 'en-us': 'unpaid'},
    {id: 2, 'zh-cn': '支付中', 'en-us': 'paying'},
    {id: 3, 'zh-cn': '支付成功', 'en-us': 'success'},
    {id: 4, 'zh-cn': '订单过期', 'en-us': 'overdue'},
    {id: 5, 'zh-cn': '支付超时', 'en-us': 'overtime'},
    {id: 6, 'zh-cn': '支付失败', 'en-us': 'failure'}
]

const tradeStatus = [
    {id: 0, 'en-us': 'UnConfirmed', 'zh-cn': '交易未确认'},
    {id: 1, 'en-us': 'Confirmed', 'zh-cn': '交易已确认'},
    {id: 10, 'en-us': 'Failed', 'zh-cn': '交易失败'}
]

/// / 公用函数 ---------------
/// 
export const getStatusName = (statusDefine, id, lang) => {
  const order = statusDefine.find(order => {
    if (order.id === id) {
      return true
    }
  })
  if (lang) {
    return order[lang]
  } else {
    return order
  }
}

export const getCNNamefromCode = (code) => {
  return orderStatus.find(order => {
    if (order['en-us'] === code) {
      return true
    }
  })
}

/// 状态获取的函数
//
export const getOrderStatusName = (id, lang) => {
  return getStatusName(orderStatus, id, lang)
}
export const getTradeStatusName = (id, lang) => {
  return getStatusName(tradeStatus, id, lang)
}
