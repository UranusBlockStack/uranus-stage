
const orderStatus = [
    {id: 1, 'zh-cn': '未支付', 'en-us': 'unpaid'},
    {id: 2, 'zh-cn': '支付中', 'en-us': 'paying'},
    {id: 3, 'zh-cn': '支付成功', 'en-us': 'success'},
    {id: 4, 'zh-cn': '订单过期', 'en-us': 'overdue'},
    {id: 5, 'zh-cn': '支付超时', 'en-us': 'overtime'},
    {id: 6, 'zh-cn': '支付失败', 'en-us': 'failure'}
]

export const getOrderStatusName = (id, lang) => {
  const order = orderStatus.find(order => {
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
